import AsyncStorage from "@react-native-async-storage/async-storage";

export const createRecordPatient = async ({rbd, recordFormat, record}) => {
    try {
        const records = await AsyncStorage.getItem(`records_for_create_${rbd}`);
        const recordsFormat = await AsyncStorage.getItem(`records_${rbd}`);

        if (records) {
            let recordsForCreateParse = JSON.parse(records);
            let recordsParse = JSON.parse(recordsFormat);
            let recordFound = recordsParse.some(item => item.id == recordFormat.id);

            if (recordFound) {
                recordsForCreateParse = recordsForCreateParse.map(item => (item.id == record.id) ? record : item);
                recordsParse = recordsParse.map(item => (item.id == recordFormat.id) ? recordFormat : item);
            } else {
                recordsForCreateParse.push(record);
                recordsParse.push(recordFormat);
            }
            await AsyncStorage.setItem(`records_for_create_${rbd}`, JSON.stringify(recordsForCreateParse));
            await AsyncStorage.setItem(`records_${rbd}`, JSON.stringify(recordsParse));
        } else {
            let newRecordForCreate = [];
            let newRecord = [];
            newRecord.push(recordFormat);
            newRecordForCreate.push(record);
            await AsyncStorage.setItem(`records_for_create_${rbd}`, JSON.stringify(newRecordForCreate));
            await AsyncStorage.setItem(`records_${rbd}`, JSON.stringify(newRecord));
        }
    } catch(error) {
        console.log(error);
    }
}