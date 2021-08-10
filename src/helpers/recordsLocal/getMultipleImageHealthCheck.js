import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMultipleImageHealthCheck = async (recordId) => {
    try {
        const images = await AsyncStorage.getItem(`${recordId}_health_check_to_create`);
        return JSON.parse(images);
    } catch (error) {
        console.log(error);
    }
}