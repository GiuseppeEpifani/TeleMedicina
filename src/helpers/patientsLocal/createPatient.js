import AsyncStorage from "@react-native-async-storage/async-storage";

export const createPatient = async (patient) => {
    try {
        const list = await AsyncStorage.getItem('listPatients');
        const listLocal = await AsyncStorage.getItem('listPatientsLocal');

        let listParse;
        if (list) {
            listParse = JSON.parse(list);
        }

        if (listParse && listParse.length > 0) {
                let { patients } = listParse[listParse.length -1];
                if (patients.length < 20) {
                    patients.push({...patient, ...{local: true, id: `${new Date()}_${patient.rbd}`}});
                } else {
                    let cantPage = await AsyncStorage.getItem('lastPage');
                    await AsyncStorage.setItem('lastPage', (cantPage + 1).toString());
                    listParse.push({patients: [{...patient, ...{local: true, id: `${new Date()}_${patient.rbd}`}}]})
                }
                await AsyncStorage.removeItem('listPatients');
                await AsyncStorage.setItem('listPatients', JSON.stringify(listParse));
                await AsyncStorage.setItem('cantPatients', listParse.length.toString());
        } else {
            let newList = [];
            newList.push({...patient, ...{local: true, id: `${new Date()}_${patient.rbd}`}});
            await AsyncStorage.setItem('listPatients', JSON.stringify([{patients: newList}]));
            await AsyncStorage.setItem('lastPage', '1');
            await AsyncStorage.setItem('cantPatients', '1');
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