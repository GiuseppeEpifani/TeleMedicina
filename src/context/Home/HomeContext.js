import React, { createContext, useReducer } from 'react'
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { homeReducer } from './HomeReducer';

const initialState = {
    patient: {},
    listPatient: [],
    loadingMorePatient: false,
	loading: false,
	totalPage: 0,
	numberPage: 0,
	disabled: false,
	message: ''
}


export const HomeContext = createContext(initialState);

export const HomeProvider = ({ children }) => {

    const [homeState, dispatch] = useReducer(homeReducer, initialState);
	const { patient, listPatient, totalPage, numberPage } = homeState;

	const getPatient = async () => {
		try {
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
		} catch (error) {
			console.log(error)
		}
	}

	const getPatientFilter = async (rbd) => {
		try {
			const { data: { patients, lastPage }} = await teleMedicinaApi.post('/get.pager_patients', { rbd });
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
		} catch (error) {
			console.log(error)
		}
	}

	const loadMorePatientWithRbd = async (rbd) => {
		try {
			if (numberPage < totalPage && totalPage) {
				const { data: {patients, lastPage} } = await teleMedicinaApi.post(`/get.pager_patients?page=${numberPage}`, { rbd });
				let arrayPatient = listPatient;
				patients.forEach((patient) => {
					arrayPatient =  [...arrayPatient, {...patient, select: false}];
				});
	
            	dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: numberPage + 1, totalPage: lastPage}});
			}
		} catch (error) {
			console.log(error);
		}
	}
	
	const loadMorePatient = async () => {
		try {
			if (numberPage < totalPage && totalPage) {
				const { data: {patients, lastPage} } = await teleMedicinaApi.post(`/get.pager_patients?page=${numberPage}`);
				let arrayPatient = listPatient;
				patients.forEach((patient) => {
					arrayPatient =  [...arrayPatient, {...patient, select: false}];
				});
	
            	dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: numberPage + 1, totalPage: lastPage}});
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
			dispatch({type: 'setLoading', payLoad: true});
			await teleMedicinaApi.post('/set.create_update_clinical_patients', patient);
			dispatch({type: 'setLoading', payLoad: false});
			dispatch({type: 'setMessage', payLoad: 'Paciente creado'});
		} catch (error) {
			dispatch({type: 'setLoading', payLoad: false});
			console.log(error)
		}
	}

	const updatePatient = async (patient) => {
		try {
			dispatch({type: 'setLoading', payLoad: true});
			const { data: patientUpdated } = await teleMedicinaApi.post('/set.create_update_clinical_patients', patient);
			let patientFound = listPatient.find(patientFound => patientFound._id == patient._id );
			patientFound = { ...patientFound, select: true };
			let newPatient = { ...patientFound, ...patientUpdated.data };
			let newListPatient = listPatient.map(value => (value._id == newPatient._id) ? newPatient : value);
			dispatch({type: 'setListPatient', payLoad: { listPatient: newListPatient, numberPage, totalPage}});
            dispatch({type: 'setPatient', payLoad: newPatient});

			dispatch({type: 'setLoading', payLoad: false});
			dispatch({type: 'setMessage', payLoad: 'Pacíente modificado'});
		} catch (error) {
			dispatch({type: 'setLoading', payLoad: false});
			console.log(error)
		}
	}

	const deletePatient = async (id) => {
		try {
			dispatch({type: 'setLoading', payLoad: true});
			const { data } = await teleMedicinaApi.post('/delete.clinical_patients_id', { id });
			if (data) {
				let listPatientsFilter = listPatient.filter(patient => patient._id !== id);
				if (listPatientsFilter.length > 0) {
					listPatientsFilter[0].select = true;
					dispatch({type: 'setListPatient', payLoad: { listPatient: listPatientsFilter, numberPage: numberPage, totalPage: totalPage}});
					dispatch({type: 'setPatient', payLoad: listPatientsFilter[0]});
				} else {
					dispatch({type: 'setListPatient', payLoad: { listPatient: [], numberPage: null, totalPage: null}});
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
	
    return (
        <HomeContext.Provider value={{
            ...homeState,
            handleSelectPatient,
            getPatient,
			getPatientFilter,
			loadMorePatient,
			loadMorePatientWithRbd,
			createNewPatient,
			updatePatient,
			deletePatient,
			removeMessage
        }}>
            { children }
        </HomeContext.Provider>
    )

}