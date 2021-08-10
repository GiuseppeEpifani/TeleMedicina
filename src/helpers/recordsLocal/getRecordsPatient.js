import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRecordsPatient = async (rbd) => {
    const records = await AsyncStorage.getItem(`records_${rbd}`);

    if (records) {
        const recordsParse = JSON.parse(records);
        return recordsParse.reverse();
    } else {
        return [];
    }
}