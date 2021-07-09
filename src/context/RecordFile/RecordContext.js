import React, { createContext, useReducer } from 'react'
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { recordReducer } from './RecordReducer';

const initialState = {
    clinicalRecords: [],
	loading: false,
	message: ''
}


export const RecordContext = createContext(initialState);

export const RecordProvider = ({ children }) => {

    const [recordState, dispatch] = useReducer(recordReducer, initialState);
	const { clinicalRecords } = recordState;

    const getRecords = async (id) => {
        try {
			const { data } = await teleMedicinaApi.post('/get.clinical_record_per_patient', { id });
			dispatch({type: 'setRecords', payLoad: data.clinical_record});
		} catch (error) {
			console.log(error)
		}
    }

    const deleteRecord = async (id) => {
        try {
            dispatch({type: 'setLoading', payLoad: true});
			const { data } = await teleMedicinaApi.post('/delete.patient_clinical_file_id', { id });
            let newRecordClinical = clinicalRecords.map(record => {
                if (record._id === id) {
                    return { ...record, ...{ deleted_at: data.deleted_at, digitador_delete: data.digitador_delete } };
                } else {
                    return record;
                }
            });
			dispatch({type: 'setRecords', payLoad: newRecordClinical});
            dispatch({type: 'setLoading', payLoad: false});
		} catch (error) {
			console.log(error)
		}
    }

    const createAttention = async (patient, reasonForConsultation, typeOfQuery) => {
        let record = 
            { 
                clinical_patients_id: patient._id,
                clinical_record_new: { 
                    clinical_interview: [],
                    diagnosis: {
                        observation: "",
                        indication: "",
                        digitador: {}
                    },
                    health_check: {},
                    morbid_antecedent:{},
                    patient: {
                        birthday: patient.birthday,
                        gender: patient.gender,
                        lastname: patient.lastname,
                        name: patient.name,
                        rbd: patient.rbd,
                        surname: (patient.surname) ? patient.surname : null
                    },
                    reason_for_consultation: reasonForConsultation,
                    status: 0,
                    type_of_query: {
                        type: typeOfQuery.id,
                        name: typeOfQuery.name
                    },
                    _id: 0
                }
            }
        try {
            const { data } = await teleMedicinaApi.post('/set.create_update_patient_clinical_file', record);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const cleanData = () => {
        dispatch({type: 'cleanData'});
    }
	
     return (
        <RecordContext.Provider value={{
            ...recordState,
            getRecords,
            deleteRecord,
            createAttention,
            cleanData
        }}>
            { children }
        </RecordContext.Provider>
    )
}