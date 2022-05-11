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
import { useForm } from '../../../hooks/useForm';
import TextArea from '../../../UI/TextArea';

export const DigestiveProblems = ({navigation}) => {

    const { saveDimension, currentRecord, removeDimension } = useContext(RecordContext);
    const thereIsDimension = currentRecord.clinical_interview.length > 0 && currentRecord.clinical_interview.some(item => item._id === '000000000000000000000004');
    const currentDimension = currentRecord.clinical_interview.find(item => item._id === '000000000000000000000004');

    const [withDigestiveProblems, setWithDigestiveProblems] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521ba405651e70c874f5c2')?.answer : null);
    const [sickness, setSickness] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521bd2e56a0a32731ff894')?.answer : null);
    const [vomiting, setVomiting] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521be205651e70c874f5c3')?.answer : null);
    const [howOften, setHowOften] = useState([{ label: "Entre 1 y 2 veces", value: "Entre 1 y 2 veces" }, { label: "Entre 1 y 5 veces", value: "Entre 1 y 5 veces" }, { label: "Más de 5 veces", value: "Más de 5 veces" }]);
    const [howOftenSelected, setHowOftenSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521c16bd99de221332c162')?.answer : null);
    const [appearanceOfVomit, setAppearanceOfVomit] = useState([{ label: "Solo comida", value: "Solo comida" }, { label: "Mucosidades", value: "Mucosidades" }, { label: "Coloración rojiza", value: "Coloración rojiza" }, { label: "Sangre", value: "Sangre" }, { label: "Olor a excremento", value: "Olor a excremento" }]);
    const [appearanceOfVomitSelected, setAppearanceOfVomitSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521c65e56a0a32731ff895')?.answer : null);
    const [diarrhea, setDiarrhea] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521c8005651e70c874f5c4')?.answer : null);
    const [diarrheaEpisodes, setDiarrheaEpisodes] = useState([{ label: "Entre 1 y 2 veces", value: "Entre 1 y 2 veces" }, { label: "Entre 1 y 5 veces", value: "Entre 1 y 5 veces" }, { label: "Más de 5 veces", value: "Más de 5 veces" }]);
    const [diarrheaEpisodesSelected, setDiarrheaEpisodesSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521cd6e56a0a32731ff896')?.answer : null);
    const [formValues, handleInputChange] = useForm({ consistencyDeposition: { value: (thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521cf705651e70c874f5c5')?.answer : null, isComplete: false }, ingestedSubstance: { value: (thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521d7ce56a0a32731ff897')?.answer : null, isComplete: false }, additionalInformation: { value: (thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521d9b05651e70c874f5c6')?.answer : null, isComplete: false }});
    const [colorDeposition, setColorDeposition] = useState([{ label: "Café - Marrón", value: "Café - Marrón" }, { label: "Café con tintes rojizos o rosados", value: "Café con tintes rojizos o rosados" }, { label: "Café con sangre roja y brillante", value: "Café con sangre roja y brillante" }, { label: "Negra de muy mal olor", value: "Negra de muy mal olor" }]);
    const [colorDepositionSelected, setColorDepositionSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60521d55bd99de221332c163')?.answer : null);
    const { consistencyDeposition, ingestedSubstance, additionalInformation } = formValues;
    const [loading, setloading] = useState(false);

    const handleSetValue = (value, setFunction, getValue) => {
        const item = value();

        if (getValue == item) {
            setFunction();
        } else {
            setFunction(item);
        }
    }

    const handleSaveDimension = () => {
        let dimension = 
            {
                _id: "000000000000000000000004",
                active: 1,
                description: "Encuesta para identificar problemas digestivos",
                name: "Problemas digestivos",
                question: []
            };
        
        if (withDigestiveProblems) {
            dimension.question.push(
                {
                    text_question: "<p>Problemas digestivos </p>",
                    answer: withDigestiveProblems,
                    question_id: "60521ba405651e70c874f5c2",
                    question_type: 2
                }
            );
        }

        if (sickness) {
            dimension.question.push(
                {
                    text_question: "<p>Náuseas</p>",
                    answer: sickness,
                    question_id: "60521bd2e56a0a32731ff894",
                    question_type: 2
                }
            );
        }

        if (vomiting) {
            dimension.question.push(
                {
                    text_question: "<p>Vómitos</p>",
                    answer: vomiting,
                    question_id: "60521be205651e70c874f5c3",
                    question_type: 2
                }
            );
        }

        if (howOftenSelected) {
            dimension.question.push(
                {
                    text_question: "<p>¿Cuántas veces?</p>",
                    answer: howOftenSelected,
                    question_id: "60521c16bd99de221332c162",
                    question_type: 1
                }
            );
        }

        if (appearanceOfVomitSelected) {
            dimension.question.push(
                {
                    text_question: "<p>¿Qué aspecto tiene el vomito?</p>",
                    answer: appearanceOfVomitSelected,
                    question_id: "60521c65e56a0a32731ff895",
                    question_type: 1
                }
            );
        }

        if (diarrhea) {
            dimension.question.push(
                {
                    text_question: "<p>Diarrea</p>",
                    answer: diarrhea,
                    question_id: "60521c8005651e70c874f5c4",
                    question_type: 2
                }
            );
        }

        if (diarrheaEpisodesSelected) {
            dimension.question.push(
                {
                    text_question: "<p>¿Cuántos episodios de diarrea?</p>",
                    answer: diarrheaEpisodesSelected,
                    question_id: "60521cd6e56a0a32731ff896",
                    question_type: 1
                }
            );
        }

        if (colorDepositionSelected) {
            dimension.question.push(
                {
                    text_question: "<p>¿Qué color tiene la deposición?</p>",
                    answer: colorDepositionSelected,
                    question_id: "60521d55bd99de221332c163",
                    question_type: 1
                }
            );
        }

        if (consistencyDeposition.value) {
            dimension.question.push(
                {
                    text_question: "<p>¿Que Consistencia tiene la deposición?</p>",
                    answer: consistencyDeposition.value,
                    question_id: "60521cf705651e70c874f5c5",
                    question_type: 3
                }
            );
        }

        if (ingestedSubstance.value) {
            dimension.question.push(
                {
                    text_question: "<p>¿Ha ingerido alguna comida, medicamento o sustancia que le podría causar los síntomas?</p>",
                    answer: ingestedSubstance.value,
                    question_id: "60521d7ce56a0a32731ff897",
                    question_type: 3
                }
            );
        }

        if (additionalInformation.value) {
            dimension.question.push(
                {
                    text_question: "<p>Si es posible, escriba otra información que desee entregar sobre el estómago, intestino o gases</p>",
                    answer: additionalInformation.value,
                    question_id: "60521d9b05651e70c874f5c6",
                    question_type: 3
                }
            );
        }

        setloading(true);
        if (dimension.question.length > 0) {
            saveDimension(dimension);
        } else {
            removeDimension(dimension);
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
                    <CardWithText padding={10} title={'Problemas digestivos'}>
                        <ScrollView>
                            <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Encuesta para identificar problemas digestivos</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>Problemas digestivos</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                        <TouchableOpacity onPress={() => {setWithDigestiveProblems('Si')}}>
                                            <RadioButton selected={withDigestiveProblems == 'Si'} labelRadio={'Si'}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {setWithDigestiveProblems('No')}}>
                                            <RadioButton selected={withDigestiveProblems == 'No'} labelRadio={'No'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{width: 20}} />
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>Náuseas</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                        <TouchableOpacity onPress={() => {setSickness('Si')}}>
                                            <RadioButton selected={sickness == 'Si'} labelRadio={'Si'}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {setSickness('No')}}>
                                            <RadioButton selected={sickness == 'No'} labelRadio={'No'}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>Vómitos</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setVomiting('Si')}}>
                                    <RadioButton selected={vomiting == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setVomiting('No')}}>
                                    <RadioButton selected={vomiting == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <PickerSingleSelect setItems={setHowOften} items={howOften} setValue={(value) => handleSetValue(value, setHowOftenSelected, howOftenSelected)} value={howOftenSelected} label={"¿Cuántas veces?"} />
                            <PickerSingleSelect setItems={setAppearanceOfVomit} items={appearanceOfVomit} setValue={(value) => handleSetValue(value, setAppearanceOfVomitSelected, appearanceOfVomitSelected)} value={appearanceOfVomitSelected} label={"¿Qué aspecto tiene el vomito?"} />
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>Diarrea</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setDiarrhea('Si')}}>
                                    <RadioButton selected={diarrhea == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setDiarrhea('No')}}>
                                    <RadioButton selected={diarrhea == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <PickerSingleSelect setItems={setDiarrheaEpisodes} items={diarrheaEpisodes} setValue={(value) => handleSetValue(value, setDiarrheaEpisodesSelected, diarrheaEpisodesSelected)} value={diarrheaEpisodesSelected} label={"¿Cuántos episodios de diarrea?"} />
                            <TextArea onChangeText={(text) => handleInputChange(text, 'consistencyDeposition')} value={consistencyDeposition.value} label={'¿Que Consistencia tiene la deposición?'} />
                            <PickerSingleSelect setItems={setColorDeposition} items={colorDeposition} setValue={(value) => handleSetValue(value, setColorDepositionSelected, colorDepositionSelected)} value={colorDepositionSelected} label={"¿Qué color tiene la deposición?"} />
                            <TextArea onChangeText={(text) => handleInputChange(text, 'ingestedSubstance')} value={ingestedSubstance.value} label={'¿Ha ingerido alguna comida, medicamento o sustancia que le podría causar los síntomas?'} />
                            <TextArea onChangeText={(text) => handleInputChange(text, 'additionalInformation')} value={additionalInformation.value} label={'Si es posible, escriba otra información que desee entregar sobre el estómago, intestino o gases'} />
                        </ScrollView>
                    </CardWithText>
                </View>
                <View style={{flex: 0.05}}/>
            </View>
            <Fab icon={"text-box-check"} onPress={() => !loading && handleSaveDimension()} /> 
        </View>
    )   
}