import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
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

export const Configuration = () => {

    const { logout } = useContext(AuthContext);
    const { cleanData } = useContext(RecordContext);
    const { getPatient } = useContext(HomeContext);

    const [modeApp, setModeApp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cantPatient, setCantPatient] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [lastDate, setLastDate] = useState();

    const handleLogout = () => {
        cleanData();
        logout();
    }

    const handleSetModeApp = async (mode) => {
        await AsyncStorage.setItem('modeApp', mode.toString());
        setModeApp(mode);
        await getPatient();
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
        if (mode) {
            setModeApp(mode == 'true');
        }

        if (lastDateApp) {
            setLastDate(lastDateApp);
        }
        await getPatient();
    }

    const alertPrevDownloadDataBase = () => {
        Alert.alert(
			"Importante leer",
			` 1. Se descargará toda la inforamción de los pacientes registrados.\n 2. Las fíchas asociadas a los pacientes no seran descargadas.\n 3. Esto puede tardar varios minutos, no cierra la aplicación.\n 4. En caso de que no halla descarga o se quede pausado, podria ser problema del servidor, por lo que se recomienda cerrar la aplicación y volver a intentar.` ,
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{ text: "Si, esta bien", onPress: () => { downloadDataBase([], 1, 0, 0, 0, 0) }}
			]
        );
    }
    
    const downloadDataBase = async (patients, numberPage, cantPage, repeat, percentageBack, cantPatients) => {
        await AsyncStorage.removeItem('listPatients');
        await AsyncStorage.removeItem('cantPatients');
        if (cantPatient > 0) setCantPatient(0);
        setLoading(true);
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
                    arrayPatient = [ ...patients, ...arrayPatient];
                    totalPage = lastPage;
                    page++;
                    totalPatients = totalPatients + patients.length;
                    setPercentage(Math.round((page/(totalPage + 1)) * 100));
                } else {
                    let { data: {patients, lastPage} } = await teleMedicinaApi.post(`/get.pager_patients?page=${page}`, { pagination: 500 });
                    arrayPatient = [...patients, ...arrayPatient];
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
            setLastDate(lastDate);
            getPatient();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                downloadDataBase(arrayPatient, page, totalPage, 1, percentage, totalPatients);
            }, 60000);
        }
    }

    const cleanDataBase = async () => {
        Alert.alert(
			"¿Esta seguro?",
			'Eliminara toda la información almacenada localmente, y no podra ser recuperada.' ,
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{ text: "Si, esta bien", 
                onPress: async () => {
                    await AsyncStorage.removeItem('listPatients');
                    await AsyncStorage.removeItem('cantPatients');
                    await AsyncStorage.removeItem('lastDownloadDataBase');
                    setCantPatient(0);
                    setLastDate();
                }}
			]
        );
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
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: PRIMARY}}>Información de la aplicación</Text>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY}}>Modo de la aplicación</Text>
                            <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 24, marginLeft: 4}}>
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
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY}}>Pacientes guardados localmente:</Text>
                            <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 24, marginLeft: 4}}>{cantPatient}</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginBottom: 20}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY}}>Fichas guardadas localmente:</Text>
                            <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 24, marginLeft: 4}}>10</Text>
                        </View>
                        <Hr />
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: PRIMARY, marginTop: 10}}>Base de datos</Text>
                        <View style={{flexDirection: 'row', marginLeft: 5}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY}}>Ultima descarga:</Text>
                            {
                                (lastDate) &&
                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 24, marginLeft: 4}}>{lastDate}</Text>
                            }
                            {
                                (!lastDate) &&
                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 24, marginLeft: 4}}>Sin descargas</Text>
                            }
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY}}>Ultima subida:</Text>
                            <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 24, marginLeft: 4}}>10</Text>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY, marginRight: 6}}>Descargar base de datos del servidor:</Text>
                            <View>
                                <Button 
                                    title={ !loading ? "Descargar" : `Descargando... (${percentage}%)`} 
                                    titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                    containerStyle={{borderRadius: 20}}
                                    buttonStyle={ !loading ? {backgroundColor: PRIMARY, height: 40, width: 200, borderRadius: 20} : {backgroundColor: PRIMARY, height: 40, width: 250, borderRadius: 20}}
                                    disabled={!modeApp || loading}
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
                        <View style={{flexDirection: 'row', marginLeft: 5, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY, marginRight: 6}}>Subir base de datos local:</Text>
                            <View>
                                <Button title="Subir" 
                                    titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                    containerStyle={{borderRadius: 20}}
                                    buttonStyle={{backgroundColor: PRIMARY, height: 40, width: 200, borderRadius: 20}}
                                    icon={
                                        <Icon
                                            name="cloud-upload"
                                            size={25}
                                            color="white"
                                        />
                                    }
                                    onPress={() => {}}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 5, marginBottom: 20, marginTop: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, color: SECONDARY, marginRight: 6}}>Limpiar base de datos local:</Text>
                            <View>
                                <Button title="Limpiar" 
                                    titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                    containerStyle={{borderRadius: 20}}
                                    buttonStyle={{backgroundColor: PRIMARY, height: 40, width: 200, borderRadius: 20}}
                                    icon={
                                        <Icon
                                            name="trash-can"
                                            size={25}
                                            color="white"
                                        />
                                    }
                                    onPress={cleanDataBase}
                                />
                            </View>                       
                        </View>
                        <Hr />
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: PRIMARY, marginTop: 10}}>Sesión</Text>
                        <View style={{marginVertical: 10}}>
                            <Button title="Cerrar sesión" 
                                titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                containerStyle={{borderRadius: 20}}
                                buttonStyle={{backgroundColor: PRIMARY, height: 40, width: 200, borderRadius: 20}}
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
                        <Hr />                
                    </Card>
                </View>
                <View style={{flex: 0.5}}/>
            </View> 
        </KeyboardView>
    )
}
