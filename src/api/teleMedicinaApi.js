import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://54.227.176.51/api/auth';
const teleMedicinaApi = axios.create({ baseURL });

//Esto es un middleware para poner en la config el header del token
teleMedicinaApi.interceptors.request.use(

    async (config) => {
        const token = await AsyncStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.ContentType = 'Application/json';
            config.headers.Accept = 'Application/json';
        }

        return config;
    }
)

export default teleMedicinaApi;