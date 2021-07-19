import React, { createContext, useReducer } from 'react'
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { recordReducer } from './RecordReducer';

const initialState = {
    clinicalRecords: [],
    currentRecord: {},
	loading: false,
	message: ''
}


export const RecordContext = createContext(initialState);

export const RecordProvider = ({ children }) => {

    const [recordState, dispatch] = useReducer(recordReducer, initialState);
	const { clinicalRecords, currentRecord } = recordState;

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
            const newRecordClinical = [ data.clinical_records,  ...clinicalRecords ];
            dispatch({type: 'setRecords', payLoad: newRecordClinical});
            dispatch({type: 'setCurrentRecord', payLoad: data.clinical_records});
        } catch (error) {
            console.log(error)
        }
    }

    const updatedRecordMorbidAntecedent = async (patientId, morbid_antecedent) => {
        let recordToUpdated =
            {
                clinical_patients_id: patientId,
                clinical_record_new:
                    {
                        clinical_interview: currentRecord.clinical_interview,
                        diagnosis:
                            {
                                observation: "",
                                indication: "",
                                digitador: {}
                            },
                        health_check: currentRecord.health_check,
                        morbid_antecedent,
                        patient: currentRecord.patient,
                        reason_for_consultation: currentRecord.reason_for_consultation,
                        status: currentRecord.status,
                        type_of_query: currentRecord.type_of_query,
                        _id: currentRecord._id
                    }
            };
        try {
            const { data } = await teleMedicinaApi.post('/set.create_update_patient_clinical_file', recordToUpdated);
            let newRecordClinical = clinicalRecords.map(record => {
                if (record._id == data.clinical_records._id) {
                    return data.clinical_records;
                } else {
                    return record;
                }
            });
            dispatch({type: 'setRecords', payLoad: newRecordClinical});
            dispatch({type: 'setCurrentRecord', payLoad: data.clinical_records});
        } catch (error) {
            console.log(error)
        } 
    }

    const updatedRecordHealthCheck = async (patientId, health_check) => {
        let recordToUpdated =
            {
                clinical_patients_id: patientId,
                clinical_record_new:
                    {
                        clinical_interview: currentRecord.clinical_interview,
                        diagnosis:
                            {
                                observation: "",
                                indication: "",
                                digitador: {}
                            },
                        health_check,
                        morbid_antecedent: currentRecord.morbid_antecedent,
                        patient: currentRecord.patient,
                        reason_for_consultation: currentRecord.reason_for_consultation,
                        status: currentRecord.status,
                        type_of_query: currentRecord.type_of_query,
                        _id: currentRecord._id
                    }
            };
        try {
            const { data } = await teleMedicinaApi.post('/set.create_update_patient_clinical_file', recordToUpdated);
            let newRecordClinical = clinicalRecords.map(record => {
                if (record._id == data.clinical_records._id) {
                    return data.clinical_records;
                } else {
                    return record;
                }
            });
            dispatch({type: 'setRecords', payLoad: newRecordClinical});
            dispatch({type: 'setCurrentRecord', payLoad: data.clinical_records});
        } catch (error) {
            console.log(error)
        } 
    }

    const updatedRecordClinicalInterview = async (patientId) => {
        let recordToUpdated =
            {
                clinical_patients_id: patientId,
                clinical_record_new:
                    {
                        clinical_interview: currentRecord.clinical_interview,
                        diagnosis:
                            {
                                observation: "",
                                indication: "",
                                digitador: {}
                            },
                        health_check: currentRecord.health_check,
                        morbid_antecedent: currentRecord.morbid_antecedent,
                        patient: currentRecord.patient,
                        reason_for_consultation: currentRecord.reason_for_consultation,
                        status: 1,
                        type_of_query: currentRecord.type_of_query,
                        _id: currentRecord._id
                    }
            };
        try {
            const { data } = await teleMedicinaApi.post('/set.create_update_patient_clinical_file', recordToUpdated);
            let newRecordClinical = clinicalRecords.map(record => {
                if (record._id == data.clinical_records._id) {
                    return data.clinical_records;
                } else {
                    return record;
                }
            });
            dispatch({type: 'setRecords', payLoad: newRecordClinical});
            dispatch({type: 'setCurrentRecord', payLoad: data.clinical_records});
        } catch (error) {
            console.log(error)
        } 
    }

    const finallyRecordPatient = async ({patientId, recordId, observation, indication}) => {
        try {
            const { data } = await teleMedicinaApi.post('/set.update_diagnosis_clinical_record', {
                clinical_patients_id: patientId,
                id: recordId,
                indication,
                observation,
                status: 2
            });
            let newRecordClinical = clinicalRecords.map(record => {
                if (record._id == data._id) {
                    return data;
                } else {
                    return record;
                }
            });
            dispatch({type: 'setRecords', payLoad: newRecordClinical});
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImages = async (imgs, patientId) => {
        let audiovisualSupport = [];
        
        for (let i = 0; i < imgs.length; i++) {

            let image = {
                file: imgs[i].base64,
                route_name: `clinical_record/${patientId}/health_checks`,
                file_name: `${patientId}_${new Date()}.jpeg`
            }
    
            try {
                const { data } = await teleMedicinaApi.post('/set.update_file_base_64', image);
                audiovisualSupport.push({...data, ...{extension: 'jpeg'}});
            } catch (error) {
                console.log(error)
            } 
        };

        return audiovisualSupport;
    }

    const saveDimension = (dimension) => {
        dispatch({type: 'setDimension', payLoad: dimension});
    }

    const setCurrentRecord = (record) => {
        dispatch({type: 'setCurrentRecord', payLoad: record});
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
            cleanData,
            setCurrentRecord,
            updatedRecordMorbidAntecedent,
            updatedRecordHealthCheck,
            updatedRecordClinicalInterview,
            uploadImages,
            saveDimension,
            finallyRecordPatient
        }}>
            { children }
        </RecordContext.Provider>
    )
}