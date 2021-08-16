import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteRecordLocal = async (id, rbd) => {
    try {
        const records = await AsyncStorage.getItem(`records_for_create_${rbd}`);
        const recordsFormat = await AsyncStorage.getItem(`records_${rbd}`);

        if (records) {
            let recordsForCreateParse = JSON.parse(records);
            let recordsParse = JSON.parse(recordsFormat);

            if (recordsParse.length > 1) {
                const newRecords = recordsForCreateParse.filter(item => item.id !== id);
                const newRecordsFormat = recordsParse.filter(item => item.id !== id);
                await AsyncStorage.setItem(`records_for_create_${rbd}`, JSON.stringify(newRecords));
                await AsyncStorage.setItem(`records_${rbd}`, JSON.stringify(newRecordsFormat));
                await AsyncStorage.removeItem(`${id}_health_check_to_create`);
                await AsyncStorage.removeItem(`${id}_dimension_falls_and_bumps_to_create`);
            } else if (recordsParse.length == 1) {
                await AsyncStorage.removeItem(`records_for_create_${rbd}`);
                await AsyncStorage.removeItem(`records_${rbd}`);
                await AsyncStorage.removeItem(`${id}_health_check_to_create`);
                await AsyncStorage.removeItem(`${id}_dimension_falls_and_bumps_to_create`);
            }
        }
    } catch(error) {
        console.log(error);
    }
}