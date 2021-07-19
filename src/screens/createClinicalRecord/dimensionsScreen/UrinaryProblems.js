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

export const UrinaryProblems = ({navigation}) => {

    const { saveDimension, currentRecord } = useContext(RecordContext);
    const thereIsDimension = currentRecord.clinical_interview.length > 0 && currentRecord.clinical_interview.some(item => item._id === '000000000000000000000005');
    const currentDimension = currentRecord.clinical_interview.find(item => item._id === '000000000000000000000005');

    const [urinationTube, setUrinationTube] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525d1505651e70c874f5ce')?.answer : null);
    const [discomfortsUrinate, setDiscomfortsUrinate] = useState([{ label: "Arde o quema", value: "Arde o quema" }, { label: "Duele como un retorcijón", value: "Duele como un retorcijón" }, { label: "Tiene ganas de orinar, pero no puede", value: "Tiene ganas de orinar, pero no puede" }, { label: "No siente nada extraño al orinar", value: "No siente nada extraño al orinar" }]);
    const [discomfortsUrinateSelected, setDiscomfortsUrinateSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525d50e56a0a32731ff89b')?.answer : null);
    const [timesHeGoesToTheBathroom, setTimesHeGoesToTheBathroom] = useState([{ label: "Más de lo normal", value: "Más de lo normal" }, { label: "Normal", value: "Normal" }, { label: "Menos de lo normal", value: "Menos de lo normal" }]);
    const [timesHeGoesToTheBathroomSelected, setTimesHeGoesToTheBathroomSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525d8ebd99de221332c16a')?.answer : null);
    const [amountOfUrine, setAmountOfUrine] = useState([{ label: "Más de lo normal", value: "Más de lo normal" }, { label: "Normal", value: "Normal" }, { label: "Menos de lo normal", value: "Menos de lo normal" }]);
    const [amountOfUrineSelected, setAmountOfUrineSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525de2e56a0a32731ff89c')?.answer : null);
    const [urineColor, setUrineColor] = useState([{ label: "Amarillo claro", value: "Amarillo claro" }, { label: "Amarillo oscuro", value: "Amarillo oscuro" }, { label: "Naranjo", value: "Naranjo" }, { label: "Como una bebida cola", value: "Como una bebida cola" }, { label: "Rojo intenso", value: "Rojo intenso" }, { label: "Amarillo con tintes rojos", value: "Amarillo con tintes rojos" }, { label: "Azul o verde", value: "Azul o verde" }]);
    const [urineColorSelected, setUrineColorSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525e2dbd99de221332c16b')?.answer : null)
    const [smellOfUrine, setSmellOfUrine] = useState([{ label: "Ningún olor", value: "Ningún olor" }, { label: "Amoniaco", value: "Amoniaco" }, { label: "Olor fuerte, pero aguantable", value: "Olor fuerte, pero aguantable" }, { label: "Olor muy fuerte, apenas aguantable", value: "Olor muy fuerte, apenas aguantable" }])
    const [smellOfUrineSelected, setSmellOfUrineSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525e7f05651e70c874f5cf')?.answer : null);
    const [sensations, setSensations] = useState([{ label: "Alivio por vaciar la vejiga", value: "Alivio por vaciar la vejiga" }]);
    const [sensationSelected, setSensationSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525ebde56a0a32731ff89d')?.answer : null);
    const [pusInUrine, setPusInUrine] = useState();

    const handleSaveDimension = () => {

        if (urinationTube || discomfortsUrinateSelected || timesHeGoesToTheBathroomSelected || amountOfUrineSelected || urineColorSelected || smellOfUrineSelected || sensationSelected || pusInUrine) {
            
            let dimension = 
                {
                    _id: "000000000000000000000005",
                    active: 1,
                    description: "Encuesta para identificar problemas urinarios",
                    nam: "Problemas urinarios",
                    question: []
                }

            if (urinationTube) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Usa sonda permanente para orinar?</p>",
                        answer: urinationTube,
                        question_id: "60525d1505651e70c874f5ce",
                        question_type: 2
                    }
                );
            }

            if (discomfortsUrinateSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Qué molestia tiene el orinar?</p>",
                        answer: discomfortsUrinateSelected,
                        question_id: "60525d50e56a0a32731ff89b",
                        question_type: 1
                    }
                );
            }

            if (timesHeGoesToTheBathroomSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Cuántas veces va al baño a orinar?</p>",
                        answer: timesHeGoesToTheBathroomSelected,
                        question_id: "60525d8ebd99de221332c16a",
                        question_type: 1
                    }
                );
            }

            if (amountOfUrineSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Cuándo va al baño, Qué cantidad de orina hace?</p>",
                        answer: amountOfUrineSelected,
                        question_id: "60525de2e56a0a32731ff89c",
                        question_type: 1
                    }
                );
            }

            if (urineColorSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Qué color tiene la orina ?</p>",
                        answer: urineColorSelected,
                        question_id: "60525e2dbd99de221332c16b",
                        question_type: 1
                    }
                );
            }

            if (smellOfUrineSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Qué olor percibe en la orina?</p>",
                        answer: smellOfUrineSelected,
                        question_id: "60525e7f05651e70c874f5cf",
                        question_type: 1
                    }
                );
            }

            if (sensationSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Qué sientes cuando terminas de orinar?</p>",
                        answer: sensationSelected,
                        question_id: "60525ebde56a0a32731ff89d",
                        question_type: 1
                    }
                );
            }

            if (pusInUrine) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Logras observar pus a través de la orina</p>",
                        answer: pusInUrine,
                        question_id: "60525ee0bd99de221332c16c",
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
                    <CardWithText padding={10} title={'Problemas urinarios'}>
                        <ScrollView>
                            <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Encuesta para identificar problemas urinarios</Text>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Usa sonda permanente para orinar?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setUrinationTube('Si')}}>
                                    <RadioButton selected={urinationTube == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setUrinationTube('No')}}>
                                    <RadioButton selected={urinationTube == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <PickerSingleSelect setItems={setDiscomfortsUrinate} items={discomfortsUrinate} setValue={setDiscomfortsUrinateSelected} value={discomfortsUrinateSelected} label={"¿Qué molestia tiene el orinar?"} />
                            <PickerSingleSelect setItems={setTimesHeGoesToTheBathroom} items={timesHeGoesToTheBathroom} setValue={setTimesHeGoesToTheBathroomSelected} value={timesHeGoesToTheBathroomSelected} label={"¿Cuántas veces va al baño a orinar?"} />
                            <PickerSingleSelect setItems={setAmountOfUrine} items={amountOfUrine} setValue={setAmountOfUrineSelected} value={amountOfUrineSelected} label={"¿Cuándo va al baño, Qué cantidad de orina hace?"} />
                            <PickerSingleSelect setItems={setUrineColor} items={urineColor} setValue={setUrineColorSelected} value={urineColorSelected} label={"¿Qué color tiene la orina?"} />
                            <PickerSingleSelect setItems={setSmellOfUrine} items={smellOfUrine} setValue={setSmellOfUrineSelected} value={smellOfUrineSelected} label={"¿Qué olor percibe en la orina?"} />
                            <PickerSingleSelect setItems={setSensations} items={sensations} setValue={setSensationSelected} value={sensationSelected} label={"¿Qué sientes cuando terminas de orinar?"} />
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Logras observar pus a través de la orina</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setPusInUrine('Si')}}>
                                    <RadioButton selected={pusInUrine == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setPusInUrine('No')}}>
                                    <RadioButton selected={pusInUrine == 'No'} labelRadio={'No'}/>
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
