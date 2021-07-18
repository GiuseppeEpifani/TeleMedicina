import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements'
import { PRIMARY, SECONDARY, SUCCESS, WHITE } from '../../../const/Colors';
import Fab from '../../../UI/Fab';
import CardWithText from '../../../UI/CardWithText';
import PickerSingleSelect from '../../../UI/PickerSingleSelect';
import RadioButton from '../../../UI/RadioButton';
import { ScrollView } from 'react-native';
import { RecordContext } from '../../../context/RecordFile/RecordContext';

export const BehaviorProblems = ({navigation}) => {

    const { saveDimension, currentRecord } = useContext(RecordContext);
    const thereIsDimension = currentRecord.clinical_interview.length > 0 && currentRecord.clinical_interview.some(item => item._id === '000000000000000000000002');
    const currentDimension = currentRecord.clinical_interview.find(item => item._id === '000000000000000000000002');

    const [consciousnessLevel, setConsciousnessLevel] = useState([{ label: "Mismo nivel de consciencia que el habitual", value: "Mismo nivel de consciencia que el habitual" }, { label: "Más bajo que lo habitual", value: "Más bajo que lo habitual" }, { label: "Está inconsciente, no responde aunque lo sacuda", value: "Está inconsciente, no responde aunque lo sacuda" },]);
    const [consciousnessLevelSelected, setConsciousnessLevelSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '6052614705651e70c874f5d0')?.answer : null);
    const [smile, setSmile] = useState([{ label: "Simétrica", value: JSON.stringify({value: 0, text: 'Simétrica'}) }, { label: "Asimétrica", value: JSON.stringify({value: 1, text: "Asimétrica"}) }]);
    const [smileSelected, setSmileSelected] = useState((thereIsDimension) ? JSON.stringify(currentDimension.question.find(item => item.question_id === '60ca72443d2da079df46451b')?.question[0].answer) : null);
    const [armMobility, setArmMobility] = useState([{ label: "Ambos suben a la misma altura", value: JSON.stringify({value: 0, text: "Ambos suben a la misma altura"}) }, { label: "Uno sube más que el otro", value: JSON.stringify({value: 1, text: "Uno sube más que el otro"}) }]);
    const [armMobilitySelected, setArmMobilitySelected] = useState((thereIsDimension) ? JSON.stringify(currentDimension.question.find(item => item.question_id === '60ca72443d2da079df46451b')?.question[1].answer) : null);
    const [words, setWords] = useState([{ label: "Pronuncia su nombre o una palabra simple sin problema", value: JSON.stringify({value: 0, text: "Pronuncia su nombre o una palabra simple sin problema"}) }, { label: "Le cuesta o no puede hablar", value: JSON.stringify({value: 1, text: "Le cuesta o no puede hablar"}) }]);
    const [wordsSelected, setWordsSelected] = useState((thereIsDimension) ? JSON.stringify(currentDimension.question.find(item => item.question_id === '60ca72443d2da079df46451b')?.question[2].answer) : null);
    const [eyeAperture, setEyeAperture] = useState([{ label: "Espontanea", value: JSON.stringify({value: 4, text: "Espontanea"}) }, { label: "A la voz", value: JSON.stringify({value: 3, text: "A la voz"}) }, { label: "Al dolor", value: JSON.stringify({value: 2, text: "Al dolor"}) }, { label: "Ninguna", value: JSON.stringify({value: 1, text: "Ninguna"}) }]);
    const [eyeApertureSelected, setEyeApertureSelected] = useState((thereIsDimension) ? JSON.stringify(currentDimension.question.find(item => item.question_id === '60ca72443d2da079df46451c')?.question[0].answer) : null);
    const [verbalResponse, setVerbalResponse] = useState([{ label: "Orientada", value: JSON.stringify({value: 5, text: "Orientada"}) }, { label: "Confusa", value: JSON.stringify({value: 4, text: "Confusa"}) }, { label: "Inapropiada", value: JSON.stringify({value: 3, text: "Inapropiada"}) }, { label: "Sonidos", value: JSON.stringify({value: 2, text: "Sonidos"}) }, { label: "Ninguna", value: JSON.stringify({value: 1, text: "Ninguna"}) }]);
    const [verbalResponseSelected, setVerbalResponseSelected] = useState((thereIsDimension) ? JSON.stringify(currentDimension.question.find(item => item.question_id === '60ca72443d2da079df46451c')?.question[1].answer) : null);
    const [motorResponse, setMotorResponse] = useState([{ label: "Obedece", value: JSON.stringify({value: 6, text: 'Obedece'}) }, { label: "Localiza", value: JSON.stringify({value: 5, text: "Localiza"}) }, { label: "Retira", value: JSON.stringify({value: 4, text: "Retira"}) }, { label: "Flexión", value: JSON.stringify({value: 3, text: "Flexión"}) }, { label: "Extensión", value: JSON.stringify({value: 2, text: "Extensión"}) }, { label: "Ninguna", value: JSON.stringify({value: 1, text: "Ninguna"}) }]);
    const [motorResponseSelected, setMotorResponseSelected] = useState((thereIsDimension) ? JSON.stringify(currentDimension.question.find(item => item.question_id === '60ca72443d2da079df46451c')?.question[2].answer) : null);
    const [problemsMovingBody, setProblemsMovingBody] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526161e56a0a32731ff89e')?.answer : null);
    const [difficultToMoveArms, setDifficultToMoveArms] = useState([{ label: "Le cuesta mover el brazo derecho", value: "Le cuesta mover el brazo derecho" }, { label: "Le cuesta mover el brazo izquierdo", value: "Le cuesta mover el brazo izquierdo" }, { label: "Le cuesta mover los dos brazos", value: "Le cuesta mover los dos brazos" }]);
    const [difficultToMoveArmsSelected, setDifficultToMoveArmsSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '605261a3bd99de221332c16f')?.answer : null);
    const [difficultToMoveLegs, setDifficultToMoveLegs] = useState([{ label: "Le cuesta mover la pierna derecha", value: "Le cuesta mover la pierna derecha" }, { label: "Le cuesta mover la pierna izquierda", value: "Le cuesta mover la pierna izquierda" }, { label: "Le cuesta mover las dos piernas", value: "Le cuesta mover las dos piernas" }]);
    const [difficultToMoveLegsSelected, setDifficultToMoveLegsSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '605261e205651e70c874f5d1')?.answer : null);
    const [limbSensation, setLimbSensation] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526204e56a0a32731ff89f')?.answer : null);
    const [whatLimbSensation, setWhatLimbSensation] = useState([{ label: "Adormecimiento", value: "Adormecimiento" }, { label: "Hormigueo", value: "Hormigueo" }, { label: "Electricidad", value: "Electricidad" }, { label: "Falta de fuerza", value: "Falta de fuerza" }]);
    const [whatLimbSensationSelected, setWhatLimbSensationSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526235bd99de221332c170')?.answer : null);
    const [whatArmFeels, setWhatArmFeels] = useState([{ label: "Solo en el derecho", value: "Solo en el derecho" }, { label: "Solo en el izquierdo", value: "Solo en el Izquierdo" }, { label: "En ambos", value: "En ambos" }, { label: "En ninguno", value: "En ninguno" }]);
    const [whatArmFeelsSelected, setWhatArmFeelsSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '6052627905651e70c874f5d2')?.answer : null);
    const [whatLegsFeels, setWhatLegsFeels] = useState([{ label: "Solo en el derecho", value: "Solo en el derecho" }, { label: "Solo en el izquierdo", value: "Solo en el Izquierdo" }, { label: "En ambos", value: "En ambos" }, { label: "En ninguno", value: "En ninguno" }]);
    const [whatLegsFeelsSelected, setWhatLegsFeelsSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '605262b8e56a0a32731ff8a0')?.answer : null);
    const [someSideOfTheFaceLooksDown, setSomeSideOfTheFaceLooksDown] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '605262f1bd99de221332c171')?.answer : null);
    const [whichSideOfTheFace, setWhichSideOfTheFace] = useState([{ label: "El lado derecho", value: "El lado derecho" }, { label: "El lado izquierdo", value: "El lado izquierdo" }]);
    const [whichSideOfTheFaceSelected, setWhichSideOfTheFaceSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '6052632805651e70c874f5d3')?.answer : null);
    const [hardPronunceWords, setHardPronunceWords] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526344e56a0a32731ff8a1')?.answer : null);
    const [whichProblemHave, setWhichProblemHave] = useState([{ label: "No logra pronunciar ninguna palabra", value: "No logra pronunciar ninguna palabra" }, { label: "Le cuesta pronunciar las palabras", value: "Le cuesta pronunciar las palabras" }, { label: "Le cuesta encontrar las palabras adecuadas", value: "Le cuesta encontrar las palabras adecuadas" }, { label: "Le cuesta entender las palabras", value: "Le cuesta entender las palabras" },]);
    const [whichProblemHaveSelected, setWhichProblemHaveSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '6052639dbd99de221332c172')?.answer : null);
    const [behaviour, setBehaviour] = useState([{ label: "Su comportamiento es el de siempre", value: "Su comportamiento es el de siempre" }, { label: "Está agitado o más activo de lo habitual", value: "Está agitado o más activo de lo habitual" }, { label: "Está más tranquilo que lo habitual", value: "Está más tranquilo que lo habitual" }]);
    const [behaviourSelected, setBehaviourSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '605263e705651e70c874f5d4')?.answer : null);
    const [recognizePeople, setRecognizePeople] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526406e56a0a32731ff8a2')?.answer : null);
    const [recognizeTheDate, setRecognizeTheDate] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526413bd99de221332c173')?.answer : null);
    const [understandOrders, setUnderstandOrders] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '6052644e05651e70c874f5d5')?.answer : null);
    const [errorCincinnati, setErrorCincinnati] = useState(false);
    const [errorGlasgow, setErrorGlasgow] = useState(false);

    const handleSaveDimension = async () => {
        if (consciousnessLevelSelected || smileSelected || armMobilitySelected || wordsSelected || eyeApertureSelected || verbalResponseSelected || motorResponseSelected
            || problemsMovingBody || difficultToMoveArmsSelected || difficultToMoveLegsSelected || limbSensation || whatLimbSensationSelected || whatArmFeelsSelected || 
            whatLegsFeelsSelected || someSideOfTheFaceLooksDown || whichSideOfTheFaceSelected || hardPronunceWords || whichProblemHaveSelected || behaviourSelected ||
            recognizePeople || recognizeTheDate || understandOrders) {

            let dimension = {
                active: 1,
                description: 'Encuesta de problemas de comportamiento',
                name: 'Problemas comportamiento',
                question: [],
                _id: '000000000000000000000002'
            };

            if (consciousnessLevelSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿cual es tu nivel de consciencia?</p>",
                        answer: consciousnessLevelSelected,
                        question_id: "6052614705651e70c874f5d0",
                        question_type: 1
                    }
                );
            }

            if (smileSelected || armMobilitySelected || wordsSelected) {
                if (smileSelected && armMobilitySelected && wordsSelected) {
                    setErrorCincinnati(false);
                    dimension.question.push(
                        {
                            text_question: "Escala de cincinnati",
                            question_id: "60ca72443d2da079df46451b",
                            question_type: 5,
                            question: [
                                {
                                    text_question: "<p>Sonrisa</p>",
                                    answer: JSON.parse(smileSelected)
                                },
                                {
                                    text_question: "<p>Movilidad brazos</p>",
                                    answer: JSON.parse(armMobilitySelected)
                                },
                                {
                                    text_question: "<p>Palabras</p>",
                                    answer: JSON.parse(wordsSelected)
                                }
                            ],
                            result_text: 2,
                            result_max: 3
                        }
                    );
                } else {
                    setErrorCincinnati(true);                 
                    return;
                }
            }

            if (eyeApertureSelected || verbalResponseSelected || motorResponseSelected) {
                if (eyeApertureSelected && verbalResponseSelected && motorResponseSelected) {
                    setErrorGlasgow(false);
                    dimension.question.push(
                        {
                            text_question: "Escala coma de glasgow",
                            question_id: "60ca72443d2da079df46451c",
                            question_type: 6,
                            question: [
                              {
                                text_question: "<p>Apertura ocular</p>",
                                answer: JSON.parse(eyeApertureSelected)
                              },
                              {
                                text_question: "<p>Respuesta verbal</p>",
                                answer: JSON.parse(verbalResponseSelected)      
                              },
                              {
                                text_question: "<p>Respuesta motriz</p>",
                                answer: JSON.parse(motorResponseSelected)  
                              }
                            ],
                            result_text: 12,
                            result_max: 15
                        }
                    );
                } else {
                    setErrorGlasgow(true);                  
                    return;
                }
            }

            if (problemsMovingBody) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Tiene problemas para movilizar el cuerpo?</p>",
                        answer: problemsMovingBody,
                        question_id: "60526161e56a0a32731ff89e",
                        question_type: 2
                    }
                );
            }

            if (difficultToMoveArmsSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Le cuesta mover los brazos?</p>",
                        answer: difficultToMoveArmsSelected,
                        question_id: "605261a3bd99de221332c16f",
                        question_type: 1
                    }
                );
            }

            if (difficultToMoveLegsSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Le cuesta mover las piernas?</p>",
                        answer: difficultToMoveLegsSelected,
                        question_id: "605261e205651e70c874f5d1",
                        question_type: 1
                    }
                );
            }

            if (limbSensation) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Tiene algunas sensación extraña en extremidades?</p>",
                        answer: limbSensation,
                        question_id: "60526204e56a0a32731ff89f",
                        question_type: 2
                    }
                );
            }

            if (whatLimbSensationSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Que sensación extraña?</p>",
                        answer: whatLimbSensationSelected,
                        question_id: "60526235bd99de221332c170",
                        question_type: 1
                    }
                );
            }

            if (whatArmFeelsSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿En qué brazo siente esa sensación?</p>",
                        answer: whatArmFeelsSelected,
                        question_id: "6052627905651e70c874f5d2",
                        question_type: 1
                    }
                );
            }

            if (whatLegsFeelsSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿En qué pierna siente esa sensación?</p>",
                        answer: whatLegsFeelsSelected,
                        question_id: "605262b8e56a0a32731ff8a0",
                        question_type: 1
                    }
                );
            }

            if (someSideOfTheFaceLooksDown) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Algún lado de la cara se ve caído?</p>",
                        answer: someSideOfTheFaceLooksDown,
                        question_id: "605262f1bd99de221332c171",
                        question_type: 2
                    }
                );
            }

            if (whichSideOfTheFaceSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Qué lado de la cara se ve distinto o extraño?</p>",
                        answer: whichSideOfTheFaceSelected,
                        question_id: "6052632805651e70c874f5d3",
                        question_type: 1
                    }
                );
            }

            if (hardPronunceWords) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Le cuesta pronunciar las palabras?</p>",
                        answer: hardPronunceWords,
                        question_id: "60526344e56a0a32731ff8a1",
                        question_type: 2
                    }
                );
            }

            if (whichProblemHaveSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Qué problema tiene?</p>",
                        answer: whichProblemHaveSelected,
                        question_id: "6052639dbd99de221332c172",
                        question_type: 1
                    }
                );
            }

            if (behaviourSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Cómo es su comportamiento o conducta?</p>",
                        answer: behaviourSelected,
                        question_id: "605263e705651e70c874f5d4",
                        question_type: 1
                    }
                );
            }

            if (recognizePeople) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Es capaz de reconocer a las personas?</p>",
                        answer: recognizePeople,
                        question_id: "60526406e56a0a32731ff8a2",
                        question_type: 2
                    }
                );
            }

            if (recognizeTheDate) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Reconoce la fecha?</p>",
                        answer: recognizeTheDate,
                        question_id: "60526413bd99de221332c173",
                        question_type: 2
                    }
                );
            }

            if (understandOrders) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Es capaz de entender las órdenes, indicaciones o preguntas?</p>",
                        answer: understandOrders,
                        question_id: "6052644e05651e70c874f5d5",
                        question_type: 2
                    }
                );
            }

            saveDimension(dimension);
        }
        navigation.navigate('DimensionsInto');
    }

    return (
        <View style={{flex: 1}}>
            <View style={{height: 26, width: '100%', flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                    <Badge value="1" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                </View>
                <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                    <Badge value="2" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                </View>
                <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                    <Badge value="3" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                </View>
            </View>

            <View style={{flex: 1}}>
                <View style={{flex: 1, paddingHorizontal: 30, marginTop: 10}}>
                    <CardWithText padding={10} title={'Problemas comportamiento'}>
                        <ScrollView>
                            <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Encuesta de problemas de comportamiento</Text>
                            
                            <PickerSingleSelect setItems={setConsciousnessLevel} items={consciousnessLevel} setValue={setConsciousnessLevelSelected} value={consciousnessLevelSelected} label={"¿cual es tu nivel de consciencia?"} />                   

                            <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Escala de cincinnati</Text>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <PickerSingleSelect setItems={setSmile} items={smile} setValue={setSmileSelected} value={smileSelected} label={"Sonrisa"} />                   
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <PickerSingleSelect setItems={setArmMobility} items={armMobility} setValue={setArmMobilitySelected} value={armMobilitySelected} label={"Movilidad brazos"} />                   
                                </View>
                            </View>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect setItems={setWords} items={words} setValue={setWordsSelected} value={wordsSelected} label={"Palabras"} />                   
                            </View>
                            {
                                (errorCincinnati) &&
                                <Text style={{fontSize: 14, color: 'red', marginLeft: 10}}>Debe seleccionar todas las alternativas de escala de cincinnati</Text>
                            }

                            <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Escala coma de glasgow</Text>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <PickerSingleSelect setItems={setEyeAperture} items={eyeAperture} setValue={setEyeApertureSelected} value={eyeApertureSelected} label={"Apertura ocular"} />                   
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <PickerSingleSelect setItems={setVerbalResponse} items={verbalResponse} setValue={setVerbalResponseSelected} value={verbalResponseSelected} label={"Respuesta verbal"} />                   
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <PickerSingleSelect setItems={setMotorResponse} items={motorResponse} setValue={setMotorResponseSelected} value={motorResponseSelected} label={"Respuesta motriz"} />                   
                                </View>
                            </View>
                                {
                                    (errorGlasgow) &&
                                    <Text style={{fontSize: 14, color: 'red', marginLeft: 10}}>Debe seleccionar todas las alternativas de escala de glasgow</Text>
                                }

                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Tiene problemas para movilizar el cuerpo?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setProblemsMovingBody('Si')}}>
                                    <RadioButton selected={problemsMovingBody == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setProblemsMovingBody('No')}}>
                                    <RadioButton selected={problemsMovingBody == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <PickerSingleSelect setItems={setDifficultToMoveArms} items={difficultToMoveArms} setValue={setDifficultToMoveArmsSelected} value={difficultToMoveArmsSelected} label={"¿Le cuesta mover los brazos?"} />                   
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <PickerSingleSelect setItems={setDifficultToMoveLegs} items={difficultToMoveLegs} setValue={setDifficultToMoveLegsSelected} value={difficultToMoveLegsSelected} label={"¿Le cuesta mover las piernas?"} />                   
                                </View>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Tiene algunas sensación extraña en extremidades?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setLimbSensation('Si')}}>
                                    <RadioButton selected={limbSensation == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setLimbSensation('No')}}>
                                    <RadioButton selected={limbSensation == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect setItems={setWhatLimbSensation} items={whatLimbSensation} setValue={setWhatLimbSensationSelected} value={whatLimbSensationSelected} label={"¿Que sensación extraña?"} />                   
                            </View>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect setItems={setWhatArmFeels} items={whatArmFeels} setValue={setWhatArmFeelsSelected} value={whatArmFeelsSelected} label={"¿En qué brazo siente esa sensación?"} />                   
                            </View>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect setItems={setWhatLegsFeels} items={whatLegsFeels} setValue={setWhatLegsFeelsSelected} value={whatLegsFeelsSelected} label={"¿En qué pierna siente esa sensación?"} />                   
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Algún lado de la cara se ve caído?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setSomeSideOfTheFaceLooksDown('Si')}}>
                                    <RadioButton selected={someSideOfTheFaceLooksDown == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setSomeSideOfTheFaceLooksDown('No')}}>
                                    <RadioButton selected={someSideOfTheFaceLooksDown == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect setItems={setWhichSideOfTheFace} items={whichSideOfTheFace} setValue={setWhichSideOfTheFaceSelected} value={whichSideOfTheFaceSelected} label={"¿Qué lado de la cara se ve distinto o extraño?"} />                   
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Le cuesta pronunciar las palabras?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setHardPronunceWords('Si')}}>
                                    <RadioButton selected={hardPronunceWords == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setHardPronunceWords('No')}}>
                                    <RadioButton selected={hardPronunceWords == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect setItems={setWhichProblemHave} items={whichProblemHave} setValue={setWhichProblemHaveSelected} value={whichProblemHaveSelected} label={"¿Qué problema tiene?"} />                   
                            </View>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect setItems={setBehaviour} items={behaviour} setValue={setBehaviourSelected} value={behaviourSelected} label={"¿Cómo es su comportamiento o conducta?"} />                   
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Es capaz de reconocer a las personas?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setRecognizePeople('Si')}}>
                                    <RadioButton selected={recognizePeople == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setRecognizePeople('No')}}>
                                    <RadioButton selected={recognizePeople == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Reconoce la fecha?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setRecognizeTheDate('Si')}}>
                                    <RadioButton selected={recognizeTheDate == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setRecognizeTheDate('No')}}>
                                    <RadioButton selected={recognizeTheDate == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Es capaz de entender las órdenes, indicaciones o preguntas?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setUnderstandOrders('Si')}}>
                                    <RadioButton selected={understandOrders == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setUnderstandOrders('No')}}>
                                    <RadioButton selected={understandOrders == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </CardWithText>
                </View>
                <View style={{flex: 0.05}}/>
            </View>
            <Fab icon={"text-box-check"} onPress={handleSaveDimension}/> 
        </View>
    )
}
