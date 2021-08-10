import AsyncStorage from "@react-native-async-storage/async-storage";

export const getPatientPaginate = async (page) => {
    try {
        const list = await AsyncStorage.getItem('listPatients');
        const lastPage = await AsyncStorage.getItem('lastPage');

        if (list && lastPage) {
            const listParse = JSON.parse(list);
            return { patients: listParse[page].patients, lastPage }
        } else {
            return { patients: [], lastPage: 0 };
        }
    } catch (error) {
        console.log(error);
    }
}