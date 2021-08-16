import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeSingleImage = async (recordId) => {
    await AsyncStorage.removeItem(`${recordId}_dimension_falls_and_bumps_to_create`);
}