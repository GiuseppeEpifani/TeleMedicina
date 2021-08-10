import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSingleImageDimension = async (recordId) => {
    try {
        const image = await AsyncStorage.getItem(`${recordId}_dimension_falls_and_bumps_to_create`);
        return JSON.parse(image);
    } catch (error) {
        console.log(error);
    }
}