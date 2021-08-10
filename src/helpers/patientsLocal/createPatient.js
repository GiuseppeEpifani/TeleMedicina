import AsyncStorage from "@react-native-async-storage/async-storage";

export const createPatient = async (patient) => {
    try {
        const list = await AsyncStorage.getItem('listPatients');
        const listLocal = await AsyncStorage.getItem('listPatientsLocal');

        if (list) {
            const listParse = JSON.parse(list);
            let { patients } = listParse[listParse.length -1];
            if (patients.length < 20) {
                patients.push({...patient, local: true});
            } else {
                listParse.push({patients: [{...patient, local: true}]})
            }
            await AsyncStorage.removeItem('listPatients');
            await AsyncStorage.setItem('listPatients', JSON.stringify(listParse));
        }

        if (listLocal) {
            let listLocalParse = JSON.parse(listLocal);
            await AsyncStorage.removeItem('listPatientsLocal');
            listLocalParse.push(patient);
            await AsyncStorage.setItem('listPatientsLocal', JSON.stringify(listLocalParse));
        } else {
            let newListLocal = [];
            newListLocal.push(patient);
            await AsyncStorage.setItem('listPatientsLocal', JSON.stringify(newListLocal));
        }
    } catch (error) {
        console.log(error);
    }
}