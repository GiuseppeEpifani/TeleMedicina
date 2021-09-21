import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Alert, ActivityIndicator } from 'react-native';
import { DANGER, PRIMARY, SECONDARY, SUCCESS, WHITE } from '../../const/Colors';
import { AuthContext } from '../../context/Auth/AuthContext';
import { RecordContext } from '../../context/RecordFile/RecordContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import Card from '../../UI/Card';
import Hr from '../../UI/Hr';
import KeyboardView from '../../UI/KeyboardView';
import SwitchContainerLg from '../../UI/SwitchContainerLg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { formatDateHuman } from '../../helpers/formatDateHuman';
import { HomeContext } from '../../context/Home/HomeContext';
import NetInfo from "@react-native-community/netinfo";
import { CommonActions } from '@react-navigation/native';

export const Configuration = ({navigation}) => {

    const { logout, activeModeOffline } = useContext(AuthContext);
    const { cleanData } = useContext(RecordContext);
    const { getPatient, cleanDebounce } = useContext(HomeContext);

    const [modeApp, setModeApp] = useState(false);
    const [loadingDownloadDataBase, setLoadingDownloadDataBase] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingUploadDataBase, setLoadingUploadDataBase] = useState(false);
    const [cantPatient, setCantPatient] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [lastDownloadDataBaseDate, setLastDownloadDataBaseDate] = useState();
    const [lastUploadDataBase, setlastUploadDataBase] = useState();

    const handleLogout = () => {
        cleanData();
        logout();
    }

    const handleSetModeApp = async (mode) => {
        await AsyncStorage.setItem('modeApp', mode.toString());
        setModeApp(mode);
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'configuration'}],
            })
          );
        cleanDebounce(true);
        activeModeOffline(mode);
        await getPatient();
        cleanDebounce(false);
    }

    const loadPatientAsyncStorage = async () => {
        const cantPatient = await AsyncStorage.getItem('cantPatients');
        if (cantPatient) {
            setCantPatient(cantPatient);
        }
    }

    const loadConfingApp = async () => {
        const mode = await AsyncStorage.getItem('modeApp');
        const lastDateApp = await AsyncStorage.getItem('lastDownloadDataBase');
        const lastUploadDateApp = await AsyncStorage.getItem('lastUploadDataBase');

        if (mode) {
            setModeApp(mode == 'true');
        }

        if (lastDateApp) {
            setLastDownloadDataBaseDate(lastDateApp);
        }

        if (lastUploadDateApp) {
            setlastUploadDataBase(lastUploadDateApp);
        }
        setLoading(false);
    }

    const alertPrevDownloadDataBase = () => {
        Alert.alert(
			"Atención",
			` 1. Se descargará toda la información de los pacientes registrados.\n 2. Las fíchas asociadas a los pacientes no seran descargadas.\n 3. Esto puede tardar varios minutos, no cierra la aplicación.\n 4. En caso de que no halla descarga o se quede pausado, podria ser problema del servidor, por lo que se recomienda cerrar la aplicación y volver a intentar.` ,
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{ text: "Si, esta bien", onPress: () => { downloadDataBase([], 1, 0, 0, 0, 0) }}
			]
        );
    }

    const uploadDataBaseWithPatient = async () => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected) {
                try {
                    const patientsLocal = await AsyncStorage.getItem('listPatientsLocal');
                    if (patientsLocal) {
                        const patientsLocalParse = JSON.parse(patientsLocal);
                        for (let i = 0; i < patientsLocalParse.length; i++) {
                            const patient = patientsLocalParse[i];
                            const { data } = await teleMedicinaApi.post('/set.create_update_clinical_patients', patient);
                            const user = data.data;

                            const records = await AsyncStorage.getItem(`records_for_create_${user.rbd}`);

                            if (records) {
                                setLoadingUploadDataBase(true);
                                const recordParse = JSON.parse(records);
                        
                                for (let x = 0; x < recordParse.length; x++) {
                                    let currentRecord = recordParse[x];
                                    currentRecord.clinical_patients_id = user._id;

                                    let new_images_local = [];
                                    if (currentRecord.clinical_record_new.health_check && currentRecord.clinical_record_new.health_check.audiovisual_support) {
                                        let new_audiovisual_support = [];

                                        for (let e = 0; e < currentRecord.clinical_record_new.health_check.audiovisual_support.length; e++) {
                                            const dateId = new Date();
                                            let image = {
                                                file: null,
                                                route_name: `clinical_record/${user._id}/health_checks`,
                                                guid_name: (`${user._id}_${dateId}_${e}.jpeg`)
                                            }
                                
                                            let file = {
                                                file: `${user._id}_${dateId}_${e}.jpeg`,
                                                file_name: (`${user._id}_${dateId}_${e}.jpeg`),
                                                size: null,
                                                extension: "jpeg",
                                                route: `clinical_record/${user._id}/health_checks`,
                                                icon_file: "far fa-file-image",
                                                type_file: "image"
                                            }
                                            new_audiovisual_support.push(file);
                                            new_images_local.push(image);
                                        }
                                        currentRecord.clinical_record_new.health_check.audiovisual_support = new_audiovisual_support;
                                    }

                                    let dimensionFallsAndBumps = currentRecord.clinical_record_new.clinical_interview.find(item => item._id === '000000000000000000000006');

                                    let imageFallsAndBumps;
                                    if (dimensionFallsAndBumps) {
                                        let  dimensionFallsAndBumpsImg =  dimensionFallsAndBumps.question.find(({question_id}) => question_id === '60526705bd99de221332c176');
                                        
                                        if (dimensionFallsAndBumpsImg) {
                                            const dateIdDimension = new Date();
                                            imageFallsAndBumps = {
                                                file: null,
                                                route_name: `clinical_record/${user._id}/dimension`,
                                                guid_name: (`${user._id}_${dateIdDimension}.jpeg`)
                                            }
                                    
                                            let file = {
                                                file: `${user._id}_${dateIdDimension}.jpeg`,
                                                file_name: (`${user._id}_${dateIdDimension}.jpeg`),
                                                size: null,
                                                extension: "jpeg",
                                                route: `clinical_record/${user._id}/dimension`,
                                                icon_file: "far fa-file-image",
                                                type_file: "image"
                                            }

                                            dimensionFallsAndBumpsImg.answer = file;
                                        }
                                    }
          
                                    const { data: {clinical_records} } = await teleMedicinaApi.post('/set.create_update_patient_clinical_file', currentRecord);
                        
                                    if (clinical_records.health_check && clinical_records.health_check.audiovisual_support_length > 0) {
                                        const imagesHealthCheck = await AsyncStorage.getItem(`${currentRecord.clinical_record_new.id}_health_check_to_create`);
                                        if (imagesHealthCheck) {
                                            const imagesHealthCheckParse = JSON.parse(imagesHealthCheck);
                                            for (let a = 0; a < clinical_records.health_check.audiovisual_support_length; a++) {
                                                let img = imagesHealthCheckParse[a];
                                                let imageToUpload = new_images_local[a];
                                                imageToUpload.file = img.file;
                                                await teleMedicinaApi.post('/set.update_file_base_64', imageToUpload);
                                            };
                                            await AsyncStorage.removeItem(`${currentRecord.clinical_record_new.id}_health_check_to_create`);
                                        }
                                    }

                                    const imageDimension= await AsyncStorage.getItem(`${currentRecord.clinical_record_new.id}_dimension_falls_and_bumps_to_create`);
                                    if (imageDimension) {
                                        const imageDimensionParse = JSON.parse(imageDimension);
                                        imageFallsAndBumps.file = imageDimensionParse.file;
                                        await teleMedicinaApi.post('/set.update_file_base_64', imageFallsAndBumps);
                                        await AsyncStorage.removeItem(`${currentRecord.clinical_record_new.id}_dimension_falls_and_bumps_to_create`);
                                    }

                                    await AsyncStorage.removeItem(`records_for_create_${user.rbd}`);
                                    await AsyncStorage.removeItem(`records_${user.rbd}`);
                                }
                                setPercentage(Math.round((i/(patientsLocalParse.length)) * 100));
                            }
                        }
                    }

                } catch (error) {
                    console.log(error);
                }
            } else {
                Alert.alert(
                    "Sin conexion a internet",
                    'No se pueden subir los datos a la nube',
                    [
                        {
                            text: "Esta bien",
                            style: "cancel"
                        },
                    ]
                );
            }
        });
    }

    const uploadDataBase = async () => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected) {
                try {
                    const patientsWithRecords = await AsyncStorage.getItem('list_patient_with_records');
                    const patientsWithRecordsParse = JSON.parse(patientsWithRecords);
                    if (patientsWithRecordsParse) {
                        const cantPatientsWithRecords = patientsWithRecordsParse.length;

                        for (let i = 0; i < patientsWithRecordsParse.length; i++) {
                            const rbd = patientsWithRecordsParse[i];
                            const records = await AsyncStorage.getItem(`records_for_create_${rbd}`);

                            if (records) {
                                const recordParse = JSON.parse(records);
                        
                                for (let x = 0; x < recordParse.length; x++) {
                                    const currentRecord = recordParse[x];
                                    const { data: {clinical_records} } = await teleMedicinaApi.post('/set.create_update_patient_clinical_file', currentRecord);
                        
                                    if (clinical_records.health_check && clinical_records.health_check.audiovisual_support_length > 0) {
                                        const imagesHealthCheck = await AsyncStorage.getItem(`${currentRecord.clinical_record_new.id}_health_check_to_create`);
                                        if (imagesHealthCheck) {
                                            const imagesHealthCheckParse = JSON.parse(imagesHealthCheck);
                                            for (let a = 0; a < clinical_records.health_check.audiovisual_support_length; a++) {
                                                const img = imagesHealthCheckParse[a];
                                                await teleMedicinaApi.post('/set.update_file_base_64', img);
                                            };
                                            await AsyncStorage.removeItem(`${currentRecord.clinical_record_new.id}_health_check_to_create`);
                                        }
                                    }

                                    const imageDimension= await AsyncStorage.getItem(`${currentRecord.clinical_record_new.id}_dimension_falls_and_bumps_to_create`);
                                    if (imageDimension) {
                                        const imageDimensionParse = JSON.parse(imageDimension);
                                        await teleMedicinaApi.post('/set.update_file_base_64', imageDimensionParse);
                                        await AsyncStorage.removeItem(`${currentRecord.clinical_record_new.id}_dimension_falls_and_bumps_to_create`);
                                    }

                                    await AsyncStorage.removeItem(`records_for_create_${rbd}`);
                                    await AsyncStorage.removeItem(`records_${rbd}`);
                                }
                                setPercentage(Math.round((i/(cantPatientsWithRecords)) * 100));
                            }
                        }
                        await AsyncStorage.removeItem('list_patient_with_records');
                        const lastDate = formatDateHuman(new Date() ,'YYYY-MM-DD HH:mm:ss', 'HH:mm a, DD MMMM - YYYY');
                        setlastUploadDataBase(lastDate);
                        await AsyncStorage.setItem('lastUploadDataBase', lastDate);
                    } else {
                        Alert.alert(
                            "Sin datos",
                            'No hay datos almacenados localmente para subir',
                            [
                                {
                                    text: "Esta bien",
                                    style: "cancel"
                                },
                            ]
                        );
                    }
                    setLoadingUploadDataBase(false);
                } catch (error) {
                    console.log(error)
                }
            } else {
                Alert.alert(
                    "Sin conexion a internet",
                    'No se pueden subir los datos a la nube',
                    [
                        {
                            text: "Esta bien",
                            style: "cancel"
                        },
                    ]
                );
            }
        })
    }
    
    const downloadDataBase = async (patients, numberPage, cantPage, repeat, percentageBack, cantPatients) => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected) {
                cleanDebounce(true);
                await AsyncStorage.removeItem('listPatients');
                await AsyncStorage.removeItem('cantPatients');
                if (cantPatient > 0) setCantPatient(0);
                setLoadingDownloadDataBase(true);
                setPercentage(percentageBack);
                let listPatientPaginate = [];
                let arrayPatient = patients;
                let page = numberPage;
                let totalPage = cantPage;
                let totalPatients = cantPatients;
                try {
                    do {
                        if (repeat == 0) {
                            let { data: {patients, lastPage} } = await teleMedicinaApi.post(`/get.pager_patients?page=${page}`, { pagination: 500 });
                            arrayPatient = [ ...arrayPatient, ...patients];
                            totalPage = lastPage;
                            page++;
                            totalPatients = totalPatients + patients.length;
                            setPercentage(Math.round((page/(totalPage + 1)) * 100));
                        } else {
                            let { data: {patients, lastPage} } = await teleMedicinaApi.post(`/get.pager_patients?page=${page}`, { pagination: 500 });
                            arrayPatient = [...arrayPatient, ...patients];
                            totalPage = lastPage;
                            page++;
                            totalPatients = totalPatients + patients.length;
                            setPercentage(Math.round((page/(totalPage + 1)) * 100));
                        }
                    } while(page <= totalPage);

                    let accumulatedPatient = [];
                    let index = 1
                    arrayPatient.forEach((patient) => {
                        if (index < 20) {
                            accumulatedPatient.push(patient);
                            index++;
                        } else {
                            accumulatedPatient.push(patient);
                            listPatientPaginate.push({patients: accumulatedPatient});
                            accumulatedPatient = [];
                            index = 1;
                        }
                    });

                    if (index < 20) {
                        if (accumulatedPatient.length > 0) listPatientPaginate.push({patients: accumulatedPatient});
                    }

                    await AsyncStorage.setItem('listPatients', JSON.stringify(listPatientPaginate));
                    await AsyncStorage.setItem('lastPage', totalPage.toString());
                    const lastDate = formatDateHuman( new Date() ,'YYYY-MM-DD HH:mm:ss', 'HH:mm a, DD MMMM - YYYY');
                    await AsyncStorage.setItem('lastDownloadDataBase', lastDate);
                    await AsyncStorage.setItem('cantPatients', totalPatients.toString());
                    setCantPatient(totalPatients);
                    setLastDownloadDataBaseDate(lastDate);
                    getPatient();
                    setLoadingDownloadDataBase(false);
                } catch (error) {
                    console.log(error);
                    Alert.alert(
                        "discriptor",
                        error,
                        [
                            {
                                text: "Esta bien",
                                style: "cancel"
                            },
                        ]
                    );
                    setTimeout(() => {
                        downloadDataBase(arrayPatient, page, totalPage, 1, percentage, totalPatients);
                    }, 60000);
                }

                try {
                    let pageClinicalRecordLast = 1;
                    let arrayClinicalRecordLast = [];
                    let totalPageClinicalRecord = 0;
                    do {
                        let { data: {data, lastPage} } = await teleMedicinaApi.post(`/get.last_clinical_file?page=${pageClinicalRecordLast}`, { pagination: 500 });
                        arrayClinicalRecordLast = [ ...arrayClinicalRecordLast, ...data];
                        totalPageClinicalRecord = lastPage;
                        pageClinicalRecordLast++;
                    } while(pageClinicalRecordLast <= totalPageClinicalRecord);
                    await AsyncStorage.setItem('clinical_record_last', JSON.stringify(arrayClinicalRecordLast));
                } catch (error) {
                    console.log(error)
                }
                cleanDebounce(false);
            } else {
                Alert.alert(
                    "Sin conexion a internet",
                    'No se puede descargar la base de datos',
                    [
                        {
                            text: "Esta bien",
                            style: "cancel"
                        },
                    ]
                );
            }
        })
    }

    useEffect(() => {
        loadConfingApp();
        loadPatientAsyncStorage();
    }, [])

    return (
        <KeyboardView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>
            <View style={{flex: 1, padding: 30}}>
                <View style={{flex: 5}}>
                    <Card header title={'Configuración'} padding={10}>
                    { !loading &&
                    <>
                        <Text style={{fontWeight: 'bold', fontSize: 22, color: PRIMARY}}>Información de la aplicación</Text>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17, color: SECONDARY}}>Modo de la aplicación</Text>
                            <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 17, marginLeft: 4}}>
                                {
                                   !modeApp &&
                                   <Text style={{color: SUCCESS}}>Online:</Text>
                                }
                                {
                                    modeApp &&
                                    <Text style={{color: DANGER}}>Offline:</Text>
                                }
                            </Text>
                            <SwitchContainerLg value={modeApp} onValueChange={(value) => handleSetModeApp(value)} />
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17, color: SECONDARY}}>Pacientes guardados localmente:</Text>
                            <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 17, marginLeft: 4, marginBottom: 10}}>{cantPatient}</Text>
                        </View>
                        <Hr />
                        <Text style={{fontWeight: 'bold', fontSize: 22, color: PRIMARY, marginTop: 10}}>Base de datos</Text>
                        <View style={{flexDirection: 'row', marginLeft: 5}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17, color: SECONDARY}}>Ultima descarga:</Text>
                            {
                                (lastDownloadDataBaseDate) &&
                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 17, marginLeft: 4}}>{lastDownloadDataBaseDate}</Text>
                            }
                            {
                                (!lastDownloadDataBaseDate) &&
                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 17, marginLeft: 4}}>Sin descargas</Text>
                            }
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17, color: SECONDARY}}>Ultima subida:</Text>
                            {
                                (lastUploadDataBase) &&
                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 17, marginLeft: 4}}>{lastUploadDataBase}</Text>
                            }
                            {
                                (!lastUploadDataBase) &&
                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 17, marginLeft: 4}}>Sin subidas</Text>
                            }
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17, color: SECONDARY, marginRight: 6, marginTop: 5}}>Descargar base de datos del servidor:</Text>
                            <View>
                                <Button 
                                    title={ !loadingDownloadDataBase ? "Descargar" : `Descargando... (${percentage}%)`} 
                                    titleStyle={{fontSize: 14, fontWeight: 'bold', marginLeft: 10}}  
                                    containerStyle={{borderRadius: 20}}
                                    buttonStyle={ !loadingDownloadDataBase ? {backgroundColor: PRIMARY, height: 40, width: 180, borderRadius: 20} : {backgroundColor: PRIMARY, height: 40, width: 200, borderRadius: 20}}
                                    disabled={loadingDownloadDataBase}
                                    icon={
                                        <Icon
                                            name="cloud-download"
                                            size={25}
                                            color="white"
                                        />
                                    }
                                    onPress={alertPrevDownloadDataBase}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10, marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17, color: SECONDARY, marginRight: 6, marginTop: 5}}>Subir base de datos local:</Text>
                            <View>
                                <Button 
                                    title={ !loadingUploadDataBase ? "Subir" : `Subiendo... (${percentage}%)`} 
                                    titleStyle={{fontSize: 14, fontWeight: 'bold', marginLeft: 10}}  
                                    containerStyle={{borderRadius: 20}}
                                    buttonStyle={ !loadingUploadDataBase ? {backgroundColor: PRIMARY, height: 40, width: 180, borderRadius: 20} : {backgroundColor: PRIMARY, height: 40, width: 200, borderRadius: 20}}
                                    disabled={loadingUploadDataBase}
                                    icon={
                                        <Icon
                                            name="cloud-upload"
                                            size={25}
                                            color="white"
                                        />
                                    }
                                    onPress={() => {
                                        uploadDataBaseWithPatient();
                                        uploadDataBase();
                                    }}
                                />
                            </View>
                        </View>
                        <Hr />
                        <View style={{marginVertical: 14}}>
                            <Button title="Cerrar sesión" 
                                titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                containerStyle={{borderRadius: 20}}
                                buttonStyle={{backgroundColor: PRIMARY, height: 40, width: 200, borderRadius: 20}}
                                disabled={modeApp}
                                icon={
                                    <Icon
                                        name="logout"
                                        size={25}
                                        color="white"
                                    />
                                }
                                onPress={handleLogout}
                            /> 
                        </View>
                    </>}
                    { loading &&
                        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                        </View>
                    }
                    </Card>
                </View>
                <View style={{flex: 0.5}}/>
            </View> 
        </KeyboardView>
    )
}