import { useState, useEffect } from 'react'
import teleMedicinaApi from '../api/teleMedicinaApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetRegions = () => {

    const [regions, setRegions] = useState(null);

    useEffect(() => {
        getRegions();
    }, [])

    const getRegions = async () => {
        const regions = await AsyncStorage.getItem('regions');

        if (!regions) {
            try {
                const { data: {region} } = await teleMedicinaApi.post('/get.communes_and_usertype');
                await AsyncStorage.setItem('regions', JSON.stringify(region));
                setRegions(await AsyncStorage.getItem('regions'))
            } catch (error) {
                console.log(error);
            }
        } else {
            setRegions(regions);
        }     
    }

    return regions;
}