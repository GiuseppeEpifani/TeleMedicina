import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSingleImageDimension = async ({recordId, imageBase64}) => {
    await AsyncStorage.removeItem(`${recordId}_dimension_falls_and_bumps_to_create`);
    await AsyncStorage.setItem(`${recordId}_dimension_falls_and_bumps_to_create`, JSON.stringify(imageBase64));
}