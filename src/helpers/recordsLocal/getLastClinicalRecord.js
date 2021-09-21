import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLastClinicalRecord = async (id) => {
    const records = await AsyncStorage.getItem('clinical_record_last');

    if (records) {
        const recordsParse = JSON.parse(records);
        return recordsParse.find(record => record._id == id);
    } else {
        return null;
    }
}