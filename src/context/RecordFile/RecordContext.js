import React, { createContext, useReducer, useEffect } from 'react'
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { modeApp } from '../../helpers/modeApp';
import { createRecordPatient } from '../../helpers/recordsLocal/createRecordPatient';
import { getRecordsPatient } from '../../helpers/recordsLocal/getRecordsPatient';
import { recordReducer } from './RecordReducer';
import { getUser } from '../../helpers/getUser';
import { saveSingleImageDimension } from '../../helpers/recordsLocal/saveSingleImageDimension';
import { saveMultipleImageHealthCheck } from '../../helpers/recordsLocal/saveMultipleImageHealthCheck';

const initialState = {
    clinicalRecords: [],
    currentRecord: {},
    imageFallsAndBumps: {
        base64: null,
        tempUri: null
    },
	loading: false,
	message: '',
    user: {}
}

export const RecordContext = createContext(initialState);

export const RecordProvider = ({ children }) => {

    const [recordState, dispatch] = useReducer(recordReducer, initialState);
	const { clinicalRecords, currentRecord, user } = recordState;

    useEffect(() => {
        getUserConnected();
    }, []);

    const getUserConnected = async () => {
        const user = await getUser();
        if (user) dispatch({type: 'setUser', payLoad: { name: user.name, lastname: user.lastname, rbd: user.rbd, _id: { $oid: user._id } }});
    }

    const getRecords = async ({id, rbd}) => {
        try {
            if (!await modeApp()) {
                const { data } = await teleMedicinaApi.post('/get.clinical_record_per_patient', { id });
                dispatch({type: 'setRecords', payLoad: data.clinical_record});
            } else {
                const records = await getRecordsPatient(rbd);
                dispatch({type: 'setRecords', payLoad: records});
            }
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
        const dateId = new Date();
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
                    _id: 0,
                    id: `${patient._id}_${dateId}`
                }
            }
        try {
            if (!await modeApp()) {
                const { data } = await teleMedicinaApi.post('/set.create_update_patient_clinical_file', record);
                const newRecordClinical = [ data.clinical_records,  ...clinicalRecords ];
                dispatch({type: 'setRecords', payLoad: newRecordClinical});
                dispatch({type: 'setCurrentRecord', payLoad: data.clinical_records});
            } else {
                let recordFormat =
                    {
                        clinical_interview: [],
                        clinical_patients_id: patient._id,
                        created_at: new Date(),
                        digitador: user,
                        health_check: [],
                        morbid_antecedent: [],
                        patient,
                        reason_for_consultation: reasonForConsultation,
                        type_of_query: {
                            type: typeOfQuery.id,
                            name: typeOfQuery.name
                        },
                        updated_at: null,
                        status: 0,
                        local: true,
                        id: `${patient._id}_${dateId}`
                    }
                await createRecordPatient({rbd: patient.rbd, record, recordFormat});
                const newRecordClinical = [ recordFormat,  ...clinicalRecords ];
                dispatch({type: 'setRecords', payLoad: newRecordClinical});
                dispatch({type: 'setCurrentRecord', payLoad: recordFormat});
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updatedRecordMorbidAntecedent = async ({patientId, morbid_antecedent, rbd}) => {
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
                        _id: currentRecord._id,
                        id: currentRecord.id
                    }
            };
        try {
            if (!await modeApp()) {
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
            } else {
                let recordFormat =
                    {
                        clinical_interview: currentRecord.clinical_interview,
                        clinical_patients_id: patientId,
                        created_at: currentRecord.created_at,
                        digitador: user,
                        health_check: currentRecord.health_check,
                        morbid_antecedent,
                        patient: currentRecord.patient,
                        reason_for_consultation: currentRecord.reason_for_consultation,
                        status: currentRecord.status,
                        diagnosis:
                            {
                                observation: "",
                                indication: "",
                                digitador: {}
                            },
                        type_of_query: currentRecord.type_of_query,
                        updated_at: null,
                        local: true,
                        id: currentRecord.id
                    }
                await createRecordPatient({rbd, record: recordToUpdated, recordFormat});
                let newRecordClinical = clinicalRecords.map(record => {
                    if (record.id == recordFormat.id) {
                        return recordFormat;
                    } else {
                        return record;
                    }
                });
                dispatch({type: 'setRecords', payLoad: newRecordClinical});
                dispatch({type: 'setCurrentRecord', payLoad: recordFormat});
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const updatedRecordHealthCheck = async ({patientId, health_check, rbd}) => {
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
                        _id: currentRecord._id,
                        id: currentRecord.id
                    }
            };
        try {
            if (!await modeApp()) {
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
            } else {
                let recordFormat =
                    {
                        clinical_interview: currentRecord.clinical_interview,
                        clinical_patients_id: patientId,
                        created_at: currentRecord.created_at,
                        digitador: user,
                        health_check,
                        morbid_antecedent: currentRecord.morbid_antecedent,
                        patient: currentRecord.patient,
                        reason_for_consultation: currentRecord.reason_for_consultation,
                        status: currentRecord.status,
                        diagnosis:
                            {
                                observation: "",
                                indication: "",
                                digitador: {}
                            },
                        type_of_query: currentRecord.type_of_query,
                        updated_at: null,
                        local: true,
                        id: currentRecord.id
                    }
                await createRecordPatient({rbd, record: recordToUpdated, recordFormat});
                let newRecordClinical = clinicalRecords.map(record => {
                    if (record.id == recordFormat.id) {
                        return recordFormat;
                    } else {
                        return record;
                    }
                });
                dispatch({type: 'setRecords', payLoad: newRecordClinical});
                dispatch({type: 'setCurrentRecord', payLoad: recordFormat});
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const updatedRecordClinicalInterview = async ({patientId, rbd}) => {
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
                        _id: currentRecord._id,
                        id: currentRecord.id
                    }
            };
        try {
            if (!await modeApp()) {
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
            } else {
                let recordFormat =
                    {
                        clinical_interview: currentRecord.clinical_interview,
                        clinical_patients_id: patientId,
                        created_at: currentRecord.created_at,
                        digitador: user,
                        health_check: currentRecord.health_check,
                        morbid_antecedent: currentRecord.morbid_antecedent,
                        patient: currentRecord.patient,
                        reason_for_consultation: currentRecord.reason_for_consultation,
                        diagnosis:
                        {
                            observation: "",
                            indication: "",
                            digitador: {}
                        },
                        type_of_query: currentRecord.type_of_query,
                        updated_at: null,
                        status: 1,
                        local: true,
                        id: currentRecord.id
                    }
                await createRecordPatient({rbd, record: recordToUpdated, recordFormat});
                let newRecordClinical = clinicalRecords.map(record => {
                    if (record.id == recordFormat.id) {
                        return recordFormat;
                    } else {
                        return record;
                    }
                });
                dispatch({type: 'setRecords', payLoad: newRecordClinical});
                dispatch({type: 'setCurrentRecord', payLoad: recordFormat});
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const finallyRecordPatient = async ({patientId, rbd, recordId, observation, indication, recordToFinally}) => {
        try {
            if (!await modeApp()) {
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
            } else {
                let recordToUpdated =
                    {
                        clinical_patients_id: patientId,
                        clinical_record_new:
                            {
                                clinical_interview: recordToFinally.clinical_interview,
                                diagnosis:
                                    {
                                        observation,
                                        indication,
                                        digitador: user
                                    },
                                health_check: recordToFinally.health_check,
                                morbid_antecedent: recordToFinally.morbid_antecedent,
                                patient: recordToFinally.patient,
                                reason_for_consultation: recordToFinally.reason_for_consultation,
                                status: 2,
                                type_of_query: recordToFinally.type_of_query,
                                _id: recordToFinally._id,
                                id: recordToFinally.id
                            }
                    };
                let recordFormat =
                    {
                        clinical_interview: recordToFinally.clinical_interview,
                        clinical_patients_id: patientId,
                        created_at: recordToFinally.created_at,
                        digitador: user,
                        health_check: recordToFinally.health_check,
                        morbid_antecedent: recordToFinally.morbid_antecedent,
                        patient: recordToFinally.patient,
                        reason_for_consultation: recordToFinally.reason_for_consultation,
                        diagnosis:
                            {
                                observation,
                                indication,
                                digitador: user
                            },
                        type_of_query: recordToFinally.type_of_query,
                        updated_at: new Date(),
                        status: 2,
                        local: true,
                        id: recordToFinally.id
                    }
                await createRecordPatient({rbd, record: recordToUpdated, recordFormat});
                let newRecordClinical = clinicalRecords.map(record => {
                    if (record.id == recordFormat.id) {
                        return recordFormat;
                    } else {
                        return record;
                    }
                });
                dispatch({type: 'setRecords', payLoad: newRecordClinical});
            }
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImages = async ({imgs, patientId, recordId}) => {
        let audiovisualSupport = [];
        let imagesLocal = [];
        
        for (let i = 0; i < imgs.length; i++) {
            const dateId = new Date();

            let image = {
                file: imgs[i].base64,
                route_name: `clinical_record/${patientId}/health_checks`,
                guid_name: (`${patientId}_${dateId}_${i}.jpeg`)
            }

            let file = {
                file: `${patientId}_${dateId}_${i}.jpeg`,
                file_name: (`${patientId}_${dateId}_${i}.jpeg`),
                size: null,
                extension: "jpeg",
                route: `clinical_record/${patientId}/health_checks`,
                icon_file: "far fa-file-image",
                type_file: "image"
            }
    
            try {
                if (!await modeApp()) {
                    await teleMedicinaApi.post('/set.update_file_base_64', image);
                    audiovisualSupport.push(file);
                } else {
                    imagesLocal.push(image)
                    audiovisualSupport.push(file);
                }
            } catch (error) {
                console.log(error)
            } 
        };

        if (await modeApp()) {
            try {
                await saveMultipleImageHealthCheck({recordId, imagesBase64: imagesLocal});
            } catch (error) {
                console.log(error);
            }
        }

        return audiovisualSupport;
    }

    const uploadSingleImage = async ({img, patientId, recordId}) => {
        const dateId = new Date();
        let image = {
            file: img,
            route_name: `clinical_record/${patientId}/dimension`,
            guid_name: (`${patientId}_${dateId}.jpeg`)
        }

        let file = {
            file: `${patientId}_${dateId}.jpeg`,
            file_name: (`${patientId}_${dateId}.jpeg`),
            size: null,
            extension: "jpeg",
            route: `clinical_record/${patientId}/dimension`,
            icon_file: "far fa-file-image",
            type_file: "image"
        }

        try {
            if (!await modeApp()) {
                await teleMedicinaApi.post('/set.update_file_base_64', image);
                return file;
            } else {
                await saveSingleImageDimension({recordId, imageBase64: image});
                return file;
            }
        } catch (error) {
            console.log(error)
        } 
    }

    const saveNewImageFallsAndBumps = (img) => {
        dispatch({type: 'saveNewImageFallsAndBumps', payLoad: img});
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

    const cleanImageFallsAndBumps = () => {
        dispatch({type: 'cleanImageFallsAndBumps'});
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
            finallyRecordPatient,
            uploadSingleImage,
            saveNewImageFallsAndBumps,
            cleanImageFallsAndBumps
        }}>
            { children }
        </RecordContext.Provider>
    )
}