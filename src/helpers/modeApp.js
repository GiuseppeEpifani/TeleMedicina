import AsyncStorage from '@react-native-async-storage/async-storage';

export const modeApp = async () => {
    const mode = await AsyncStorage.getItem('modeApp');

    if (mode) {
        return mode == 'true';
    } else {
        return null;
    }
}