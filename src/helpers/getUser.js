import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    return JSON.parse(user);
}