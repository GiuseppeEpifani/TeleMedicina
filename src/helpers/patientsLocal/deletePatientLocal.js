import AsyncStorage from '@react-native-async-storage/async-storage';

export const deletePatientLocal = async (rbd) => {
    try {
        const list = await AsyncStorage.getItem('listPatients');
        const listLocal = await AsyncStorage.getItem('listPatientsLocal');

        if (list) {
            let newListPatients = [];
            const listParse = JSON.parse(list);
            listParse.forEach(({patients}) => {
                const patientsFilter = patients.filter(patient => patient.rbd !== rbd);
                if (patientsFilter.length > 0) newListPatients.push({patients: patientsFilter});
            });

            await AsyncStorage.removeItem('listPatients');
            await AsyncStorage.setItem('listPatients', JSON.stringify(newListPatients));
        }

        if (listLocal) {
            let listLocalParse = JSON.parse(listLocal);
            const newListPatientsLocal = listLocalParse.filter(patient => patient.rbd !== rbd);
            await AsyncStorage.removeItem('listPatientsLocal');
            await AsyncStorage.setItem('listPatientsLocal', JSON.stringify(newListPatientsLocal));
        }
    } catch (error) {
        console.log(error);
    }
}