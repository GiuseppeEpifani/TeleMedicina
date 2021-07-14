import { useState, useEffect } from 'react'
import teleMedicinaApi from '../api/teleMedicinaApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetDimensions = () => {

    const [dimensions, setDimensions] = useState(null);

    useEffect(() => {
        getDimensions();
    }, [])

    const getDimensions = async () => {
        const dimensions = await AsyncStorage.getItem('dimensions');

        if (!dimensions) {
            try {
                const { data } = await teleMedicinaApi.post('/get.dimension_all');
                await AsyncStorage.setItem('dimensions', JSON.stringify(data));
                setDimensions(await AsyncStorage.getItem('dimensions'))
            } catch (error) {
                console.log(error);
            }
        } else {
            setDimensions(dimensions);
        }     
    }

    return dimensions;
}