import React, { createContext, useReducer } from 'react'
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { homeReducer } from './HomeReducer';

const initialState = {
    patient: {},
    listPatient: [],
    loading: false,
	totalPage: 0,
	numberPage: 0,
	disabled: false
}


export const HomeContext = createContext(initialState);

export const HomeProvider = ({ children }) => {

    const [homeState, dispatch] = useReducer(homeReducer, initialState);
	const  { patient, listPatient, totalPage, numberPage, loading, disabled } = homeState;

	const getPatient = async () => {
		try {
			const { data: {patients, lastPage} } = await teleMedicinaApi.post('/auth/get.pager_patients');
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
	
	const loadMorePatient = async () => {
		console.log('loarmore')
		try {
			if (numberPage < totalPage && !loading && !disabled) {
				dispatch({type: 'setLoading', payLoad: true});

				const { data: {patients, lastPage} } = await teleMedicinaApi.post(`/auth/get.pager_patients?page=${numberPage}`);
				let arrayPatient = listPatient;
				patients.forEach((patient) => {
					arrayPatient =  [...arrayPatient, {...patient, select: false}];
				});
	
            	dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage: numberPage + 1, totalPage: lastPage}});
				dispatch({type: 'setLoading', payLoad: false});
				dispatch({type: 'setDisabled', payLoad: false});
			}
		} catch (error) {
			console.log(error);
			dispatch({type: 'setLoading', payLoad: false});
		}
	}

	const handleSelectPatient = (selectPatient) => {
		console.log('change')
		if (patient.rbd != selectPatient.rbd) {
			let arrayPatient = listPatient.map( patientFound => (selectPatient.rbd == patientFound.rbd) ? {...patientFound, ...patientFound.select = true} : {...patientFound, ...patientFound.select = false});

			dispatch({type: 'setListPatient', payLoad: { listPatient: arrayPatient, numberPage, totalPage}});
            dispatch({type: 'setPatient', payLoad: selectPatient});
		} 
	}
	
    return (
        <HomeContext.Provider value={{
            ...homeState,
            handleSelectPatient,
            getPatient,
			loadMorePatient
        }}>
            { children }
        </HomeContext.Provider>
    )

}