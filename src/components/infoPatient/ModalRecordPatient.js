import React, { useContext, useState, useEffect } from 'react'
import { Modal, Text, View, StyleSheet, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SECONDARY, SUCCESS, VERY_LIGHT, WHITE } from '../../const/Colors';
import { SCREEN_HEIGHT } from '../../const/Dimensions';
import { URL } from '../../const/Url';
import { HomeContext } from '../../context/Home/HomeContext';
import { formatDate } from '../../helpers/formatDate';
import { formatDateHuman } from '../../helpers/formatDateHuman';
import ImageViewer from 'react-native-image-zoom-viewer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Hr from '../../UI/Hr';
import { getMultipleImageHealthCheck } from '../../helpers/recordsLocal/getMultipleImageHealthCheck';
import { getSingleImageDimension } from '../../helpers/recordsLocal/getSingleImageDimension';
import { modeApp } from '../../helpers/modeApp';

const ModalRecordPatient = ({setModalVisible, modalVisible, record}) => {
    
    const { patient } = useContext(HomeContext);
    const [showModalHealtCheck, setShowModalHealtCheck] = useState(false);
    const [showModalDimensions, setShowModalDimensions] = useState(false);

    const thereIsPain = record.clinical_interview.some(item => item._id === '000000000000000000000001');
    const painDimension = record.clinical_interview.find(item => item._id === '000000000000000000000001');
    const thereIsBehaviorProblems = record.clinical_interview.some(item => item._id === '000000000000000000000002');
    const behaviorProblemsDimension = record.clinical_interview.find(item => item._id === '000000000000000000000002');
    const thereIsRespiratoryProblems = record.clinical_interview.some(item => item._id === '000000000000000000000003');
    const respiratoryProblemsDimension = record.clinical_interview.find(item => item._id === '000000000000000000000003');
    const thereIsDigestiveProblems = record.clinical_interview.some(item => item._id === '000000000000000000000004');
    const DigestiveProblemsDimension = record.clinical_interview.find(item => item._id === '000000000000000000000004');
    const thereIsUrinaryProblems = record.clinical_interview.some(item => item._id === '000000000000000000000005');
    const urinaryProblemsDimension = record.clinical_interview.find(item => item._id === '000000000000000000000005');
    const thereIsFallsAndBumps = record.clinical_interview.some(item => item._id === '000000000000000000000006');
    const fallsAndBumpsDimension = record.clinical_interview.find(item => item._id === '000000000000000000000006');
    const [appIsLocal, setAppIsLocal] = useState(false);
    const [imagesLocalhealtCheck, setImagesLocalhealtCheck] = useState([]);
    const [imagesLocalDimension, setImagesLocalDimension] = useState();

    const imagesHealtCheck = (record.health_check.audiovisual_support && record.health_check.audiovisual_support.length > 0) ? record.health_check.audiovisual_support.map(item => {
        return {
            url: `${URL}/storage/clinical_record/${patient._id}/health_checks/${item.file}`,
        }
    }) : [];

    const imagesHealtCheckLocal = (imagesLocalhealtCheck && imagesLocalhealtCheck.length > 0) ? imagesLocalhealtCheck.map(item => {
        return {
            url: item.file
        }
    }) : [];

    const imagesDimension = (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '60526705bd99de221332c176')) ? [
        {
            url: `${URL}/storage/clinical_record/${patient._id}/dimension/${fallsAndBumpsDimension.question.find(item => item.question_id === '60526705bd99de221332c176').answer.file}`,
        }
    ] : [];

    const imagesDimensionLocal = (imagesLocalDimension) ? [
        {
            url: imagesLocalDimension,
        }
    ] : [];

    const getImagesLocal = async () => {
        const isLocal = await modeApp();
        setAppIsLocal(isLocal);
        if (isLocal) {
            const images = await getMultipleImageHealthCheck(record.id);
            if (images && images.length > 0) setImagesLocalhealtCheck(images);
            const imageDimension = await getSingleImageDimension(record.id);
            if (imageDimension) setImagesLocalDimension(imageDimension.file);
        }
    }

    const closeModals = () => {
        if (showModalHealtCheck) {
            setShowModalHealtCheck(false);
        }

        if (showModalDimensions) {
            setShowModalDimensions(false);
        }
    }

    const renderHeader = () => {
        return (
            <TouchableHighlight onPress={closeModals} style={{height: 50, backgroundColor: WHITE, width: 50, position: 'absolute', left: 20, top: 20, zIndex: 1000, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}} activeOpacity={0.6} underlayColor="#DDDDDD">
                <MaterialCommunityIcons name="close" size={46} color={PRIMARY} />
            </TouchableHighlight>
        )
    }

    useEffect(() => {
        getImagesLocal();
    }, [record.health_check.audiovisual_support, fallsAndBumpsDimension]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <Modal visible={showModalHealtCheck} transparent={true}>
                <ImageViewer 
                    imageUrls={appIsLocal ? imagesHealtCheckLocal : imagesHealtCheck}
                    renderHeader={renderHeader}
                />
            </Modal>
            <Modal visible={showModalDimensions} transparent={true}>
                <ImageViewer 
                    imageUrls={appIsLocal ? imagesDimensionLocal : imagesDimension}
                    renderHeader={renderHeader}
                />
            </Modal>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{height: 50, backgroundColor: VERY_LIGHT, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: PRIMARY, fontWeight: 'bold', fontSize: 26, marginLeft: 8}}>Ficha Clínica</Text>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Icon
                                name="close-circle"
                                size={35}
                                color={PRIMARY}
                                style={{marginRight: 10}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 3, paddingHorizontal: 30}}>
                        <ScrollView>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <Icon
                                    name="calendar"
                                    size={35}
                                    color={SECONDARY}
                                />
                                <Text style={{fontSize: 20, marginVertical: 2, color: SECONDARY}}>CREADO EL:</Text>
                                <Text style={{fontSize: 20, marginLeft: 6, color: PRIMARY, fontWeight: 'bold'}}>{formatDateHuman(record.created_at, 'YYYY-MM-DD HH:mm:ss', 'HH:mm a, DD MMMM - YYYY')}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon
                                    name="account-edit"
                                    size={35}
                                    color={SECONDARY}
                                />
                                <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>{record.digitador.name} {record.digitador.lastname} - {record.digitador.rbd}</Text>
                            </View>
                            <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>Tipo de consulta: {record.type_of_query.name}</Text>
                            <Hr/>
                            {
                                (record.status == 2) &&
                                <>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Icon
                                        name="calendar"
                                        size={35}
                                        color={SECONDARY}
                                    />
                                    <Text style={{fontSize: 20, marginVertical: 2, color: SUCCESS}}>CERRADO EL:</Text>
                                    <Text style={{fontSize: 20, marginLeft: 6, color: SUCCESS, fontWeight: 'bold'}}>{formatDateHuman(record.updated_at, 'YYYY-MM-DD HH:mm:ss', 'HH:mm a, DD MMMM - YYYY')}</Text>
                                </View> 
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon
                                        name="account-edit"
                                        size={35}
                                        color={SECONDARY}
                                    />
                                    <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>{record.diagnosis.digitador.name} {record.diagnosis.digitador.lastname} - {record.diagnosis.digitador.rbd}</Text>
                                </View>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: SUCCESS, marginLeft: 6, marginVertical: 2}}>Observación</Text>
                                <Text style={{fontSize: 16, marginLeft: 6, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>{record.diagnosis.observation}</Text>
                                <Text style={{fontSize: 20, fontWeight: 'bold', color: SUCCESS, marginLeft: 6, marginVertical: 2}}>Indicación</Text>
                                <Text style={{fontSize: 16, marginLeft: 6, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>{record.diagnosis.indication}</Text>
                                <Hr/>
                            </>
                            }
                            <>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Motivo de consulta y/o síntomas actuales</Text>
                            <Text style={{fontSize: 16, marginLeft: 6, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>{record.reason_for_consultation}</Text>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Antecedentes mórbidos</Text>
                            {
                                (Array.isArray(record.morbid_antecedent.pathology)) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Patología: <Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}>{record.morbid_antecedent.pathology.map(({name}) => name).join(', ')}</Text></Text>
                            }
                            {
                                (!Array.isArray(record.morbid_antecedent.pathology)) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Patología: <Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}>Sin seleccionar</Text></Text>
                            }
                            {
                                (record.morbid_antecedent.other) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Otro:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.morbid_antecedent.other}</Text></Text>
                            }
                            {
                                (record.morbid_antecedent.drugs) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Fármaco:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.morbid_antecedent.drugs}</Text></Text>
                            }
                            {
                                (record.morbid_antecedent.prostate) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Postrado:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {(record.morbid_antecedent.prostate) ? 'Si' : 'No'}</Text></Text>
                            }
                            {
                                (record.morbid_antecedent.home_oxigen) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Postrado:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {(record.morbid_antecedent.home_oxigen) ? 'Si' : 'No'}</Text></Text>
                            }
                            <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Alergías:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {(record.morbid_antecedent.allergies) ? 'Si' : 'No'}</Text></Text>
                            {
                                (record.morbid_antecedent.allergies) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Alergías:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.morbid_antecedent.allergies_array.map(({name}) => name).join(', ')}</Text></Text>
                            }
                            {
                                (record.morbid_antecedent.last_rule_date) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Fecha de la última regla:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {formatDate(new Date(record.morbid_antecedent.last_rule_date.substr(0, 10)))}</Text></Text>
                            }
                            {
                                (record.morbid_antecedent.previous_pregnancies) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Embarazos anteriores:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.morbid_antecedent.previous_pregnancies}</Text></Text>
                            }
                            {
                                (record.morbid_antecedent.abortion) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Aborto:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.morbid_antecedent.abortion}</Text></Text>
                            }
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Control salud</Text>
                            {
                                (Array.isArray(record.health_check)) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sin control de salud</Text>
                            }
                            {
                                (record.health_check.blood_pressure_diastolic || record.health_check.blood_pressure_systolic) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Presión Arterial:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.blood_pressure_systolic}/{record.health_check.blood_pressure_diastolic} mm Hg</Text></Text>
                            }
                            {
                                (record.health_check.heart_rate) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Frecuencia Cardiaca:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.heart_rate} ppm</Text></Text>
                            }
                            {
                                (record.health_check.breathing_frequency) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Frecuencia Respiratoria:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.breathing_frequency}</Text></Text>
                            }
                            {
                                (record.health_check.blood_glucose) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Glicemia:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.blood_glucose} mg/dl {record.health_check.blood_glucose_type}</Text></Text>
                            }
                            {
                                (record.health_check.o2_saturation) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Saturación O2:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.o2_saturation}%</Text></Text>
                            }
                            {
                                (record.health_check.temperature) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Temperatura:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.temperature} °C</Text></Text>
                            }
                            {
                                (record.health_check.weight) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Peso:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.weight} kg</Text></Text>
                            }
                            {
                                (record.health_check.height) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Estatura :<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {record.health_check.height} mts</Text></Text>
                            }
                            {
                                (record.health_check.audiovisual_support && record.health_check.audiovisual_support.length > 0) &&
                                <>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Apoyo visual:</Text>
                                    <Button
                                        containerStyle={{borderRadius: 20, overflow: 'hidden'}}
                                        buttonStyle={{backgroundColor: PRIMARY, width: 140, borderRadius: 20, marginVertical: 5, overflow: 'hidden'}}
                                        title="Ver fotos"
                                        onPress={() => setShowModalHealtCheck(true)}
                                    />
                                </>
                            }
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Dolor</Text>
                            {
                                (!thereIsPain) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sin dolores</Text>
                            }
                            {
                                (thereIsPain && painDimension.question.find(item => item.question_id === '605144b412e6f719115d52e2')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Tiene algún dolor:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {painDimension.question.find(item => item.question_id === '605144b412e6f719115d52e2').answer}</Text></Text>                      
                            }
                            {
                                (thereIsPain && painDimension.question.find(item => item.question_id === '6051451363dbbc42e6432142')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Puede Indicar hasta 3 lugares:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {painDimension.question.find(item => item.question_id === '6051451363dbbc42e6432142').answer.join(', ')}</Text></Text>                      
                            }
                            {
                                (thereIsPain && painDimension.question.find(item => item.question_id === '605145648330ff55a27d6aa2')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Cómo es el dolor?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {painDimension.question.find(item => item.question_id === '605145648330ff55a27d6aa2').answer}</Text></Text>                      
                            }
                            {
                                (thereIsPain && painDimension.question.find(item => item.question_id === '605145ce12e6f719115d52e3')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Hace cuánto le duele?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {painDimension.question.find(item => item.question_id === '605145ce12e6f719115d52e3').answer}</Text></Text>                      
                            }
                            {
                                (thereIsPain && painDimension.question.find(item => item.question_id === '6051463463dbbc42e6432143')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Que tanto le duele?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {painDimension.question.find(item => item.question_id === '6051463463dbbc42e6432143').answer}</Text></Text>                      
                            }
                            {
                                (thereIsPain && painDimension.question.find(item => item.question_id === '605146508330ff55a27d6aa3')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Observación/Comentario:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {painDimension.question.find(item => item.question_id === '605146508330ff55a27d6aa3').answer}</Text></Text>                      
                            }
                            </>
                            <>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Problemas comportamiento</Text>
                            {
                                (!thereIsBehaviorProblems) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sin problemas comportamiento</Text>
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '6052614705651e70c874f5d0')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿cual es tu nivel de consciencia?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '6052614705651e70c874f5d0').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451b')) &&
                                <>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Escala de cincinnati</Text>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sonrisa:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451b').question[0].answer.text}</Text></Text>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Movilidad brazos:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451b').question[1].answer.text}</Text></Text>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Palabras:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451b').question[2].answer.text}</Text></Text>                        
                                </>
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451c')) &&
                                <>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Escala coma de glasgow</Text>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Apertura ocular:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451c').question[0].answer.text}</Text></Text>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Respuesta verbal:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451c').question[1].answer.text}</Text></Text>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Respuesta motriz:<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60ca72443d2da079df46451c').question[2].answer.text}</Text></Text>                        
                                </>
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60526161e56a0a32731ff89e')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Tiene problemas para movilizar el cuerpo?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60526161e56a0a32731ff89e').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '605261a3bd99de221332c16f')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Le cuesta mover los brazos?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '605261a3bd99de221332c16f').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '605261e205651e70c874f5d1')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Le cuesta mover las piernas?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '605261e205651e70c874f5d1').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60526204e56a0a32731ff89f')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Tiene algunas sensación extraña en extremidades?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60526204e56a0a32731ff89f').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60526235bd99de221332c170')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Que sensación extraña?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60526235bd99de221332c170').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '6052627905651e70c874f5d2')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿En qué brazo siente esa sensación?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '6052627905651e70c874f5d2').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '605262b8e56a0a32731ff8a0')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿En qué pierna siente esa sensación?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '605262b8e56a0a32731ff8a0').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '605262f1bd99de221332c171')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Algún lado de la cara se ve caído?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '605262f1bd99de221332c171').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '6052632805651e70c874f5d3')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué lado de la cara se ve distinto o extraño?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '6052632805651e70c874f5d3').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60526344e56a0a32731ff8a1')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Le cuesta pronunciar las palabras?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60526344e56a0a32731ff8a1').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '6052639dbd99de221332c172')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué problema tiene?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '6052639dbd99de221332c172').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '605263e705651e70c874f5d4')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Cómo es su comportamiento o conducta?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '605263e705651e70c874f5d4').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60526406e56a0a32731ff8a2')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Es capaz de reconocer a las personas?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60526406e56a0a32731ff8a2').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '60526413bd99de221332c173')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Reconoce la fecha?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '60526413bd99de221332c173').answer}</Text></Text>                      
                            }
                            {
                                (thereIsBehaviorProblems && behaviorProblemsDimension.question.find(item => item.question_id === '6052644e05651e70c874f5d5')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Es capaz de entender las órdenes, indicaciones o preguntas?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {behaviorProblemsDimension.question.find(item => item.question_id === '6052644e05651e70c874f5d5').answer}</Text></Text>                      
                            }
                            </>
                            <>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Problemas respiratorios</Text>
                            {
                                (!thereIsRespiratoryProblems) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sin problemas respiratorios</Text>
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525a76bd99de221332c166')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Respira con mucho esfuerzo?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525a76bd99de221332c166').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525a9a05651e70c874f5c7')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿A qué velocidad?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525a9a05651e70c874f5c7').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525ab6e56a0a32731ff898')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Se le marcan las costillas al respirar?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525ab6e56a0a32731ff898').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525adabd99de221332c167')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Se le marcan las clavículas al respirar?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525adabd99de221332c167').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525afb05651e70c874f5c8')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿El tórax se mueve igual en ambos lados?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525afb05651e70c874f5c8').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525b4c05651e70c874f5c9')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Cómo se expande el tórax?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525b4c05651e70c874f5c9').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525b7de56a0a32731ff89a')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Tiene tos?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525b7de56a0a32731ff89a').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525bb3bd99de221332c168')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿De qué color tiene la punta de los dedos?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525bb3bd99de221332c168').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525bf305651e70c874f5ca')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Le cuesta respirar al estar acostado?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525bf305651e70c874f5ca').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525c21bd99de221332c169')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿De qué color tiene los labios?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525c21bd99de221332c169').answer}</Text></Text>                      
                            }
                            {
                                (thereIsRespiratoryProblems && respiratoryProblemsDimension.question.find(item => item.question_id === '60525c4505651e70c874f5cb')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Logra escuchar secreciones en los pulmones?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {respiratoryProblemsDimension.question.find(item => item.question_id === '60525c4505651e70c874f5cb').answer}</Text></Text>                      
                            }
                            </>
                            <>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Problemas digestivos</Text>
                            {
                                (!thereIsDigestiveProblems) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sin problemas digestivos</Text>
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521ba405651e70c874f5c2')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Problemas digestivos<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521ba405651e70c874f5c2').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521bd2e56a0a32731ff894')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Náuseas<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521bd2e56a0a32731ff894').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521be205651e70c874f5c3')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Vómitos<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521be205651e70c874f5c3').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521c16bd99de221332c162')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Cuántas veces?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521c16bd99de221332c162').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521c65e56a0a32731ff895')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué aspecto tiene el vomito?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521c65e56a0a32731ff895').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521c8005651e70c874f5c4')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Diarrea<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521c8005651e70c874f5c4').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521cd6e56a0a32731ff896')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Cuántos episodios de diarrea?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521cd6e56a0a32731ff896').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521d55bd99de221332c163')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué color tiene la deposición?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521d55bd99de221332c163').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521cf705651e70c874f5c5')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Que Consistencia tiene la deposición?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521cf705651e70c874f5c5').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521d7ce56a0a32731ff897')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Ha ingerido alguna comida, medicamento o sustancia que le podría causar los síntomas?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521d7ce56a0a32731ff897').answer}</Text></Text>                      
                            }
                            {
                                (thereIsDigestiveProblems && DigestiveProblemsDimension.question.find(item => item.question_id === '60521d9b05651e70c874f5c6')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Si es posible, escriba otra información que desee entregar sobre el estómago, intestino o gases<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {DigestiveProblemsDimension.question.find(item => item.question_id === '60521d9b05651e70c874f5c6').answer}</Text></Text>                      
                            }
                            </>
                            <>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Problemas urinarios</Text>
                            {
                                (!thereIsUrinaryProblems) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sin problemas urinarios</Text>
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525d1505651e70c874f5ce')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Usa sonda permanente para orinar?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525d1505651e70c874f5ce').answer}</Text></Text>                      
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525d50e56a0a32731ff89b')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué molestia tiene el orinar?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525d50e56a0a32731ff89b').answer}</Text></Text>                      
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525d8ebd99de221332c16a')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Cuántas veces va al baño a orinar?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525d8ebd99de221332c16a').answer}</Text></Text>                      
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525de2e56a0a32731ff89c')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Cuándo va al baño, Qué cantidad de orina hace?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525de2e56a0a32731ff89c').answer}</Text></Text>                      
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525e2dbd99de221332c16b')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué color tiene la orina?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525e2dbd99de221332c16b').answer}</Text></Text>                      
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525e7f05651e70c874f5cf')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué olor percibe en la orina?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525e7f05651e70c874f5cf').answer}</Text></Text>                      
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525ebde56a0a32731ff89d')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Qué sientes cuando terminas de orinar?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525ebde56a0a32731ff89d').answer}</Text></Text>                      
                            }
                            {
                                (thereIsUrinaryProblems && urinaryProblemsDimension.question.find(item => item.question_id === '60525ee0bd99de221332c16c')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Logras observar pus a través de la orina<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {urinaryProblemsDimension.question.find(item => item.question_id === '60525ee0bd99de221332c16c').answer}</Text></Text>                      
                            }
                            </>
                            <>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 2}}>Caídas y gopes</Text>
                            {
                                (!thereIsFallsAndBumps) && 
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Sin caídas ni gopes</Text>
                            }
                            {
                                (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '6052652ae56a0a32731ff8a3')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Ha sufrido alguna caída o golpe?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {fallsAndBumpsDimension.question.find(item => item.question_id === '6052652ae56a0a32731ff8a3').answer}</Text></Text>                      
                            }
                            {
                                (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '60526597bd99de221332c174')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿En caso de caída, cómo ocurrió?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {fallsAndBumpsDimension.question.find(item => item.question_id === '60526597bd99de221332c174').answer}</Text></Text>                      
                            }
                            {
                                (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '605265f605651e70c874f5d8')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿El golpe fue en?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {fallsAndBumpsDimension.question.find(item => item.question_id === '605265f605651e70c874f5d8').answer.join(', ')}</Text></Text>                      
                            }
                            {
                                (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '6052664fe56a0a32731ff8a4')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>¿Tiene algún sangra-miento o herida en?<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {fallsAndBumpsDimension.question.find(item => item.question_id === '6052664fe56a0a32731ff8a4').answer.join(', ')}</Text></Text>                      
                            }
                            {
                                (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '6052669dbd99de221332c175')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Presenta dolor, deformidad o inflamación en..<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {fallsAndBumpsDimension.question.find(item => item.question_id === '6052669dbd99de221332c175').answer.join(', ')}</Text></Text>                      
                            }
                            {
                                (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '605266f8e56a0a32731ff8a5')) &&
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Más agitado o confuso que lo habitual<Text style={{fontSize: 16, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}> {fallsAndBumpsDimension.question.find(item => item.question_id === '605266f8e56a0a32731ff8a5').answer}</Text></Text>                      
                            }
                            {
                                (thereIsFallsAndBumps && fallsAndBumpsDimension.question.find(item => item.question_id === '60526705bd99de221332c176')) &&
                                <>
                                    <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Apoyo visual:</Text>
                                    <Button
                                        containerStyle={{borderRadius: 20, overflow: 'hidden'}}
                                        buttonStyle={{backgroundColor: PRIMARY, width: 140, borderRadius: 20, marginVertical: 5, overflow: 'hidden'}}
                                        title="Ver fotos"
                                        onPress={() => setShowModalDimensions(true)}
                                    />
                                </>
                            }
                            </>
                        </ScrollView>
                    </View>
                    <View style={{height: 60}}>
                        <Hr/>
                        <View style={{flex: 1, alignSelf: 'flex-end', justifyContent: 'center'}}>      
                            <View style={{flexDirection: 'row', alignSelf: 'stretch', marginRight: 10}}>
                                <Button
                                    buttonStyle={{backgroundColor: VERY_LIGHT, width: 140}}
                                    titleStyle={{color: PRIMARY}}
                                    title="Salir"
                                    loading={false}
                                    onPress={ () => setModalVisible(!modalVisible) }
                                />
                            </View>
                        </View>                       
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        borderRadius: 20,
        height: SCREEN_HEIGHT - 200,
        width: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden'
    }
});

export default ModalRecordPatient;
