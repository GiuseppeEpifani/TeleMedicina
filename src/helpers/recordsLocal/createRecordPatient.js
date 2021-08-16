import AsyncStorage from "@react-native-async-storage/async-storage";

export const createRecordPatient = async ({rbd, recordFormat, record}) => {
    try {
        const listPatientWithRecord = await AsyncStorage.getItem('list_patient_with_records');
        const records = await AsyncStorage.getItem(`records_for_create_${rbd}`);
        const recordsFormat = await AsyncStorage.getItem(`records_${rbd}`);

        if (records) {
            let recordsForCreateParse = JSON.parse(records);
            let recordsParse = JSON.parse(recordsFormat);
            let recordFound = recordsParse.some(item => item.id == recordFormat.id);

            if (recordFound) {
                recordsForCreateParse = recordsForCreateParse.map(item => (item.clinical_record_new.id == record.clinical_record_new.id) ? record : item);
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

        if (listPatientWithRecord) {
            let listPatientWithRecordParse = JSON.parse(listPatientWithRecord);
            if (!listPatientWithRecordParse.some(run => run === rbd)) {
                listPatientWithRecordParse.push(rbd);
                await AsyncStorage.setItem('list_patient_with_records', JSON.stringify(listPatientWithRecordParse));
            }
        } else {
            await AsyncStorage.setItem('list_patient_with_records', JSON.stringify([rbd]));
        }

    } catch(error) {
        console.log(error);
    }
}