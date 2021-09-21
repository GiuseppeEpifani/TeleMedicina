import React, { createContext, useReducer } from 'react';
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { createPatient } from '../../helpers/patientsLocal/createPatient';
import { deletePatientLocal } from '../../helpers/patientsLocal/deletePatientLocal';
import { getPatientsFilter } from '../../helpers/patientsLocal/getPatientsFilter';
import { getPatientPaginate } from '../../helpers/patientsLocal/getPatientsPaginate';
import { modeApp } from '../../helpers/modeApp';
import { updatePatientLocal } from '../../helpers/patientsLocal/updatePatientLocal';
import { homeReducer } from './HomeReducer';
import NetInfo from "@react-native-community/netinfo";

const initialState = {
    patient: {},
    listPatient: [],
    loadingMorePatient: false,
	loading: false,
	totalPage: 0,
	numberPage: 0,
	disabled: false,
	message: '',
	loadingPatients: true,
	isCleanDebounce: false
}

export const HomeContext = createContext(initialState);

export const HomeProvider = ({ children }) => {

    const [homeState, dispatch] = useReducer(homeReducer, initialState);
	const { patient, listPatient, totalPage, numberPage } = homeState;

	const getPatient = async () => {
		setLoadingPatients(true);
		try {
			if (!await modeApp()) {
				NetInfo.fetch().then(async (state) => {
					if (state.isConnected) {
						const { data: {patients, lastPage} } = await teleMedicinaApi.post('/get.pager_patients');
						let arrayPatient = [];
						patients.forEach((patient, index) => {
						if (index === 0) {
							dispatch({type: 'setPatient', payLoad: patients[0]});
							arrayPatient =  [...arrayPatient, {...patient, select: true}];
						} else {
							arrayPatient =  [...arrayPatient, {...patient, select: false}];
						}
						});

						dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: 2, totalPage: lastPage}});
						if (patients.length === 0) dispatch({type: 'setPatient', payLoad: null});
						setLoadingPatients(false);
					} else {
						setLoadingPatients(false);
					}
				})
			} else {
				const { patients, lastPage } = await getPatientPaginate(0);
				let arrayPatient = [];
				patients.forEach((patient, index) => {
				   if (index === 0) {
					   dispatch({type: 'setPatient', payLoad: patients[0]});
					   arrayPatient =  [...arrayPatient, {...patient, select: true}];
				   } else {
					   arrayPatient =  [...arrayPatient, {...patient, select: false}];
				   }
			   });

			   dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: 1, totalPage: lastPage}});

			   if (patients.length === 0) {
				   dispatch({type: 'setPatient', payLoad: null});
				}
			   setLoadingPatients(false);
			}
		} catch (error) {
			console.log(error);
			setLoadingPatients(false);	
		}
	}

	const getPatientFilter = async ({rbd, name, lastname}) => {
		setLoadingPatients(true);	
		try {
			if (!await modeApp()) {
				const { data: { patients, lastPage }} = await teleMedicinaApi.post('/get.pager_patients', { rbd, name, lastname });
				let arrayPatient = [];
				patients.forEach((patient, index) => {
					if (index === 0) {
						dispatch({type: 'setPatient', payLoad: patients[0]});
						arrayPatient =  [...arrayPatient, {...patient, select: true}];
					} else {
						arrayPatient =  [...arrayPatient, {...patient, select: false}];
					} 
				});

				dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: 2, totalPage: lastPage}});
				if (patients.length === 0) dispatch({type: 'setPatient', payLoad: null});
			} else {
				if (rbd !== '-') {
					const patients = await getPatientsFilter({rbd, name, lastname});
					let arrayPatient = [];
					patients.forEach((patient, index) => {
						if (index === 0) {
							dispatch({type: 'setPatient', payLoad: patients[0]});
							arrayPatient =  [...arrayPatient, {...patient, select: true}];
						} else {
							arrayPatient =  [...arrayPatient, {...patient, select: false}];
						}
					});

					dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: 2, totalPage: 0}});
					if (patients.length === 0) dispatch({type: 'setPatient', payLoad: null});
				}
			}
			setLoadingPatients(false);
		} catch (error) {
			console.log(error);
			setLoadingPatients(false);
		}
	}

	const loadMorePatientWithFilter = async ({rbd, name, lastname}) => {
		try {
			if (rbd != '-') {
				if (numberPage < totalPage && totalPage) {
					const { data: {patients, lastPage} } = await teleMedicinaApi.post(`/get.pager_patients?page=${numberPage}`, { rbd, name, lastname });
					let arrayPatient = listPatient;
					patients.forEach((patient) => {
						arrayPatient =  [...arrayPatient, {...patient, select: false}];
					});
		
					dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: numberPage + 1, totalPage: lastPage}});
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
	
	const loadMorePatient = async () => {
		try {
			if (numberPage < totalPage && totalPage) {
				if (!await modeApp()) {
					const { data: {patients, lastPage} } = await teleMedicinaApi.post(`/get.pager_patients?page=${numberPage}`);
					let arrayPatient = listPatient;
					patients.forEach((patient) => {
						arrayPatient =  [...arrayPatient, {...patient, select: false}];
					});
		
					dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: numberPage + 1, totalPage: lastPage}});
				} else {
					const { patients, lastPage } = await getPatientPaginate(numberPage);
					let arrayPatient = listPatient;
					patients.forEach((patient) => {
						arrayPatient =  [...arrayPatient, {...patient, select: false}];
					});
		
					dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: numberPage + 1, totalPage: lastPage}});
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleSelectPatient = (selectPatient) => {
		if (patient.rbd != selectPatient.rbd) {
			let arrayPatient = listPatient.map(patientFound => (selectPatient.rbd == patientFound.rbd) ? {...patientFound, ...patientFound.select = true} : {...patientFound, ...patientFound.select = false});
			dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage, totalPage}});
            dispatch({type: 'setPatient', payLoad: selectPatient});
		} 
	}

	const createNewPatient = async (patient) => {
		try {
			cleanDebounce(true);
			dispatch({type: 'setLoading', payLoad: true});
			if (!await modeApp()) {
				await teleMedicinaApi.post('/set.create_update_clinical_patients', patient);
			} else {
				await createPatient(patient);
				if (listPatient.length <= 20) await getPatient();
			}
			dispatch({type: 'setLoading', payLoad: false});
			cleanDebounce(false);
			dispatch({type: 'setMessage', payLoad: 'Paciente creado'});
		} catch (error) {
			dispatch({type: 'setLoading', payLoad: false});
			console.log(error);
		}
	}

	const updatePatient = async (patient) => {
		try {
			dispatch({type: 'setLoading', payLoad: true});
			if (!await modeApp()) {
				const { data: patientUpdated } = await teleMedicinaApi.post('/set.create_update_clinical_patients', patient);
				let patientFound = listPatient.find(patientFound => patientFound._id == patient._id );
				patientFound = { ...patientFound, select: true };
				let newPatient = { ...patientFound, ...patientUpdated.data };
				let newListPatient = listPatient.map(value => (value._id == newPatient._id) ? newPatient : value);
				dispatch({type: 'setListPatient', payLoad: { listPatient: newListPatient, numberPage, totalPage}});
				dispatch({type: 'setPatient', payLoad: newPatient});
			} else {
				await updatePatientLocal(patient);
				let newPatient = { ...patient, ...{select: true, local: true} };
				let newListPatient = listPatient.map(value => (value.rbd == newPatient.rbd) ? newPatient : value);
				dispatch({type: 'setListPatient', payLoad: { listPatient: newListPatient, numberPage, totalPage}});
				dispatch({type: 'setPatient', payLoad: newPatient});
			}
			dispatch({type: 'setLoading', payLoad: false});
			dispatch({type: 'setMessage', payLoad: 'Paciente modificado'});
		} catch (error) {
			dispatch({type: 'setLoading', payLoad: false});
			console.log(error);
		}
	}

	const deletePatient = async ({id, rbd}) => {
		try {
			dispatch({type: 'setLoading', payLoad: true});
			if (!await modeApp()) {
				const { data } = await teleMedicinaApi.post('/delete.clinical_patients_id', { id });
				if (data) {
					let listPatientsFilter = listPatient.filter(patient => patient._id !== id);
					if (listPatientsFilter.length > 0) {
						listPatientsFilter[0].select = true;
						dispatch({type: 'setListPatient', payLoad: { listPatient: listPatientsFilter, numberPage: numberPage, totalPage: totalPage}});
						dispatch({type: 'setPatient', payLoad: listPatientsFilter[0]});
					} else {
						dispatch({type: 'setListPatient', payLoad: { listPatient: [], numberPage: null, totalPage: null}});
						dispatch({type: 'setPatient', payLoad: null});
					}	
				}
			} else {
				await deletePatientLocal(rbd);
				let listPatientsFilter = listPatient.filter(patient => patient.rbd !== rbd);
				if (listPatientsFilter.length > 0) {
					listPatientsFilter[0].select = true;
					dispatch({type: 'setListPatient', payLoad: { listPatient: listPatientsFilter, numberPage: numberPage, totalPage: totalPage}});
					dispatch({type: 'setPatient', payLoad: listPatientsFilter[0]});
				} else {
					dispatch({type: 'setListPatient', payLoad: { listPatient: [], numberPage: null, totalPage: null}});
					dispatch({type: 'setPatient', payLoad: null});
				}	
			}
			dispatch({type: 'setLoading', payLoad: false});
		} catch (error) {
			dispatch({type: 'setLoading', payLoad: false});
			console.log(error);
		}
	}

	const removeMessage = () => {
		dispatch({type: 'setMessage', payLoad: ''});
	}

	const setLoadingPatients = (value) => {
        dispatch({type: 'setLoadingPatients', payLoad: value});
    }

	const cleanDebounce = (value) => {
		dispatch({type: 'cleanDebounce', payLoad: value});
	}
	
    return (
        <HomeContext.Provider value={{
            ...homeState,
            handleSelectPatient,
            getPatient,
			getPatientFilter,
			loadMorePatient,
			loadMorePatientWithFilter,
			createNewPatient,
			updatePatient,
			deletePatient,
			removeMessage,
			setLoadingPatients,
			cleanDebounce
        }}>
            { children }
        </HomeContext.Provider>
    )

}