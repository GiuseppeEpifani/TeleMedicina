import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMultipleImageHealthCheck = async ({recordId, imagesBase64}) => {
    try {
        await AsyncStorage.removeItem(`${recordId}_health_check_to_create`);
        await AsyncStorage.setItem(`${recordId}_health_check_to_create`, JSON.stringify(imagesBase64));
    } catch (error) {
        console.log(error);
    }
}