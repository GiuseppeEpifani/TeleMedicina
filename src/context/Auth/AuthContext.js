import React, { createContext, useEffect, useReducer } from 'react';
import { Alert } from 'react-native';
import teleMedicinaApi from '../../api/teleMedicinaApi';
import teleMedicinaLogin from '../../api/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { authReducer } from './AuthReducer';
import { formatDateHuman } from '../../helpers/formatDateHuman';
import { getUser } from '../../helpers/getUser';

const authInitialState = {
    isLoggedIn: false,
    username: {},
    errorMessage: '',
    token: null,
    status: 'checking',
    loading: false,
    uploadBaseData: false,
    isConnected: false,
    appOffline: false
}

export const AuthContext = createContext(authInitialState);

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        NetInfo.addEventListener(async (state) => {
            verifyConnection(state.isConnected);
        });
        getModeApp();
        checkToken();
    }, []);

    const uploadRecordsLocal = async () => {
        await uploadRecordWithPatientLocal();
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

                                    const imageDimension = await AsyncStorage.getItem(`${currentRecord.clinical_record_new.id}_dimension_falls_and_bumps_to_create`);
                                    if (imageDimension) {
                                        const imageDimensionParse = JSON.parse(imageDimension);
                                        imageFallsAndBumps.file = imageDimensionParse.file;
                                        await teleMedicinaApi.post('/set.update_file_base_64', imageFallsAndBumps);
                                        await AsyncStorage.removeItem(`${currentRecord.clinical_record_new.id}_dimension_falls_and_bumps_to_create`);
                                    }

                                    await AsyncStorage.removeItem(`records_for_create_${user.rbd}`);
                                    await AsyncStorage.removeItem(`records_${user.rbd}`);
                                }
                            }
                        }
                    }
                    dispatch({type: 'setUploadBaseData', payLoad: false });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    const uploadRecordWithPatientLocal = async () => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected) {
                try {
                    const patientsWithRecords = await AsyncStorage.getItem('list_patient_with_records');
                    const patientsWithRecordsParse = JSON.parse(patientsWithRecords);

                    if (patientsWithRecordsParse) {
                        for (let i = 0; i < patientsWithRecordsParse.length; i++) {
                            const rbd = patientsWithRecordsParse[i];
                            const records = await AsyncStorage.getItem(`records_for_create_${rbd}`);

                            if (records) {
                                dispatch({type: 'setUploadBaseData', payLoad: true });
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
                            }
                        }
                        await AsyncStorage.removeItem('list_patient_with_records');
                        const lastDate = formatDateHuman(new Date() ,'YYYY-MM-DD HH:mm:ss', 'HH:mm a, DD MMMM - YYYY');
                        await AsyncStorage.setItem('lastUploadDataBase', lastDate);
                    }
                } catch (error) {
                    console.log(error);
                    dispatch({type: 'setUploadBaseData', payLoad: false });
                }
            }
        });
    }

    const getModeApp = async () => {
        const user = await getUser();
        NetInfo.fetch().then(async (state) => {
            if (user) {
                await AsyncStorage.setItem('modeApp', (!state.isConnected) ? 'true' : 'false');
                dispatch({type: 'setModeAppOffline', payLoad: (!state.isConnected) ? true : false });
            } else {
                await AsyncStorage.setItem('modeApp', 'false');
                dispatch({type: 'setModeAppOffline', payLoad: false });
            }
        });
    }

    const activeModeOffline = async (mode) => {
        const user = await getUser();
        if (user) {
            await AsyncStorage.setItem('modeApp', mode.toString());
            dispatch({type: 'setModeAppOffline', payLoad: mode });
        } else {
            Alert.alert(
                'Sin usuario', 'Debe de haber iniciado sesión anteriormente, para poder usar el modo offline.', [ { text: "Esta bien", style: "cancel" } ]
            );
        }
        checkToken();
    }

    const checkToken = async () => {
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected) {
                const token = await AsyncStorage.getItem('token');

                try {
                    if (token) {
                        const { data } = await teleMedicinaApi.post('/refresh');
                        await AsyncStorage.setItem('token', data.access_token);
                        dispatch({type: 'refreshToken', payLoad: data.access_token });
                        await uploadRecordsLocal();
                    } else {
                        return dispatch({type: 'notAuthenticated'});
                    }
            
                } catch (error) {
                    dispatch({type: 'notAuthenticated'});
                }
            } else {
                dispatch({type: 'authenticated-off'});
            }
        });
    }

    const signIn = async ({email, password}) => {
        try {
            dispatch({ type: 'setLoading' });
            const { data } = await teleMedicinaLogin.post('/auth/login', { email: email.value.toLowerCase() , password: password.value });
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user)); 
            dispatch({ type: 'signIn', payLoad: { username: data.email, token: data.token} });
        } catch (error) {
            dispatch({ type: 'addError', payLoad: 'Algo salio mal, credenciales incorrectas o error de respuesta.' });
            console.log(error)
        }
    }

    const verifyConnection = (stateConnection) => {
        dispatch({ type: 'setIsConnected', payLoad: stateConnection });
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        dispatch({ type: 'logout' });
    }

    const removeError = () => {
        dispatch({ type: 'removeError' });
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            signIn,
            logout,
            removeError,
            verifyConnection,
            activeModeOffline,
            checkToken
        }}>
            { children }
        </AuthContext.Provider>
    )

}