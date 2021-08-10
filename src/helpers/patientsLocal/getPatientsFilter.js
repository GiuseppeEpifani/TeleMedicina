import AsyncStorage from "@react-native-async-storage/async-storage";

export const getPatientsFilter = async ({rbd, name, lastname}) => {
    try {
        const list = await AsyncStorage.getItem('listPatients');
        let newArrayPatients = [];

        if (list) {
            const listParse = JSON.parse(list);
            listParse.forEach(({patients}) => {
                let patientsFilter = patients.filter(patient => {
                    if (rbd && rbd != '-') {
                        let rbdPatient = patient.rbd;
                        return rbdPatient.indexOf(rbd) > -1;  
                    }

                    if (name && lastname) {
                        let namePatient = patient.name.toLowerCase();
                        let lastnamePatient = patient.lastname ? patient.lastname.toLowerCase() : '';
                        return namePatient.indexOf(name) > -1 && lastnamePatient.indexOf(lastname) > -1;  
                    }

                    if (name) {
                        let namePatient = patient.name.toLowerCase();
                        return namePatient.indexOf(name) > -1;  
                    }

                    if (lastname) {
                        let lastnamePatient = patient.lastname ? patient.lastname.toLowerCase() : '';
                        return lastnamePatient.indexOf(lastname) > -1;  
                    }
                });
                newArrayPatients = [...newArrayPatients, ...patientsFilter];
            });

            return newArrayPatients;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}