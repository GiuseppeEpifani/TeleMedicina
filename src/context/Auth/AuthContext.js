import React, { createContext, useEffect, useReducer } from 'react'
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
        NetInfo.fetch().then(async (state) => {
            if (state.isConnected) {
                try {
                    const patientsWithRecords = await AsyncStorage.getItem('list_patient_with_records');
                    const patientsWithRecordsParse = JSON.parse(patientsWithRecords);
                    if (patientsWithRecordsParse) {
                        dispatch({type: 'setUploadBaseData', payLoad: true });
                        const cantPatientsWithRecords = patientsWithRecordsParse.length;
        
                        for (let i = 0; i < patientsWithRecordsParse.length; i++) {
                            const rbd = patientsWithRecordsParse[i];
                            const records = await AsyncStorage.getItem(`records_for_create_${rbd}`);
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
                            //setPercentage(Math.round((i/(cantPatientsWithRecords)) * 100));
                        }
                        await AsyncStorage.removeItem('list_patient_with_records');
                        const lastDate = formatDateHuman(new Date() ,'YYYY-MM-DD HH:mm:ss', 'HH:mm a, DD MMMM - YYYY');
                        await AsyncStorage.setItem('lastUploadDataBase', lastDate);
                        dispatch({type: 'setUploadBaseData', payLoad: false });
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

        if (user) {
            const modeApp = await AsyncStorage.getItem('modeApp');
            if (modeApp == 'true') {
                dispatch({type: 'setModeAppOffline', payLoad: true });
            } else {
                dispatch({type: 'setModeAppOffline', payLoad: false });
            }
        }
    }

    const activeModeOffline = async (mode) => {
        const user = await getUser();
        if (user) {
            await AsyncStorage.setItem('modeApp', mode.toString());
            dispatch({type: 'setModeAppOffline', payLoad: mode });
        }
    }

    const checkToken = async () => {
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
    }

    const signIn = async ({email, password}) => {
        try {
            dispatch({ type: 'setLoading' });
            const { data } = await teleMedicinaLogin.post('/auth/login', { email: email.value.toLowerCase() , password: password.value });
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user)); 
            dispatch({ type: 'signIn', payLoad: { username: data.email, token: data.token} });
        } catch (error) {
            dispatch({ type: 'addError', payLoad: 'Algo salio mal, credenciales incorrectas o error de respuesta' });
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
            activeModeOffline
        }}>
            { children }
        </AuthContext.Provider>
    )

}