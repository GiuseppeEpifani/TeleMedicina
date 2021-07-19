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

export const RespiratoryProblems = ({navigation}) => {

    const { saveDimension, currentRecord } = useContext(RecordContext);
    const thereIsDimension = currentRecord.clinical_interview.length > 0 && currentRecord.clinical_interview.some(item => item._id === '000000000000000000000003');
    const currentDimension = currentRecord.clinical_interview.find(item => item._id === '000000000000000000000003');

    const [breatheEffort, setBreatheEffortt] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525a76bd99de221332c166')?.answer : null);
    const [speeds, setSpeeds] = useState([{ label: "Más lento de lo normal", value: "Más lento de lo normal" }, { label: "Normal", value: "Normal" }, { label: "Más rapido de lo normal", value: "Más rapido de lo normal" }]);
    const [speedSelected, setSpeedSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525a9a05651e70c874f5c7')?.answer : null);
    const [ribs, setRibs] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525ab6e56a0a32731ff898')?.answer : null);
    const [clavicles, setClavicles] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525adabd99de221332c167')?.answer : null);
    const [chestMoves, setChestMoves] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525afb05651e70c874f5c8')?.answer : null);
    const [howExpands, setHowExpands] = useState([{ label: "Más de lo normal", value: "Más de lo normal" }, { label: "Normal", value: "Normal" }, { label: "Menos de lo normal", value: "Menos de lo normal" }, { label: "Un lado más que el otro", value: "Un lado más que el otro" }]);
    const [howExpandsSelected, setHowExpandsSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525b4c05651e70c874f5c9')?.answer : null);
    const [hasCough, setHasCough] = useState([{ label: "Si, tiene tos seca", value: "Si, tiene tos seca" }, { label: "Si, tiene tos con secreciones", value: "Si, tiene tos con secreciones" }, { label: "No tiene tos", value: "No tiene tos" }]);
    const [hasCoughSelected, setHasCoughSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525b7de56a0a32731ff89a')?.answer : null);
    const [coloredFingers, setColoredFingers] = useState([{ label: "Normales", value: "Normales" }, { label: "Azulados", value: "Azulados" }]);
    const [coloredFingersSelected, setColoredFingersSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525bb3bd99de221332c168')?.answer : null);
    const [laboredBreathing, setLaboredBreathing] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525bf305651e70c874f5ca')?.answer : null);
    const [lipColor, setLipColor] = useState([{ label: "Normales", value: "Normales" }, { label: "Azulados", value: "Azulados" }]);
    const [lipColorSelected, setLipColorSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525c21bd99de221332c169')?.answer : null);
    const [lungSecretions, setLungSecretions] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60525c4505651e70c874f5cb')?.answer : null);
    const [loading, setloading] = useState(false);

    const handleSaveDimension = () => {

        if (breatheEffort || speedSelected || ribs || clavicles || chestMoves || howExpandsSelected || hasCoughSelected || coloredFingersSelected || 
            laboredBreathing || lipColorSelected || lungSecretions) {

            let dimension = 
                {
                    _id: "000000000000000000000003",
                    active: 1,
                    description: "Encuesta para identificar problemas respiratorios",
                    name: "Problemas respiratorios",
                    question: []
                };

            if (breatheEffort) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Respira con mucho esfuerzo?\t</p>",
                        answer: breatheEffort,
                        question_id: "60525a76bd99de221332c166",
                        question_type: 2
                    }
                );
            }

            if (speedSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿A qué velocidad?</p>",
                        answer: speedSelected,
                        question_id: "60525a9a05651e70c874f5c7",
                        question_type: 1
                    }
                );
            }
            
            if (ribs) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Se le marcan las costillas al respirar?</p>",
                        answer: ribs,
                        question_id: "60525ab6e56a0a32731ff898",
                        question_type: 2
                    }
                );
            }

            if (clavicles) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Se le marcan las clavículas al respirar?</p>",
                        answer: clavicles,
                        question_id: "60525adabd99de221332c167",
                        question_type: 2
                    }
                );
            }

            if (chestMoves) {
                dimension.question.push(
                    {
                        text_question: "<p>¿El tórax se mueve igual en ambos lados?</p>",
                        answer: chestMoves,
                        question_id: "60525afb05651e70c874f5c8",
                        question_type: 2
                    }
                );
            }

            if (howExpandsSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Cómo se expande el tórax?</p>",
                        answer: howExpandsSelected,
                        question_id: "60525b4c05651e70c874f5c9",
                        question_type: 1
                    }
                );
            }

            if (hasCoughSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Tiene tos?</p>",
                        answer: hasCoughSelected,
                        question_id: "60525b7de56a0a32731ff89a",
                        question_type: 1
                    }
                );
            }

            if (coloredFingersSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿De qué color tiene la punta de los dedos?</p>",
                        answer: coloredFingersSelected,
                        question_id: "60525bb3bd99de221332c168",
                        question_type: 1
                    }
                );
            }

            if (laboredBreathing) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Le cuesta respirar al estar acostado?</p>",
                        answer: laboredBreathing,
                        question_id: "60525bf305651e70c874f5ca",
                        question_type: 2
                    }
                );
            }

            if (lipColorSelected) {
                dimension.question.push(
                    {
                        text_question: "<p>¿De qué color tiene los labios?</p>",
                        answer: lipColorSelected,
                        question_id: "60525c21bd99de221332c169",
                        question_type: 1
                    }
                );
            }

            if (lungSecretions) {
                dimension.question.push(
                    {
                        text_question: "<p>¿Logra escuchar secreciones en los pulmones?</p>",
                        answer: lungSecretions,
                        question_id: "60525c4505651e70c874f5cb",
                        question_type: 2
                    }
                );
            }

            setloading(true);
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
                    <CardWithText padding={10} title={'Problemas respiratorios'}>
                        <ScrollView>
                            <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Encuesta para identificar problemas respiratorios</Text>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Respira con mucho esfuerzo?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setBreatheEffortt('Si')}}>
                                    <RadioButton selected={breatheEffort == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setBreatheEffortt('No')}}>
                                    <RadioButton selected={breatheEffort == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <PickerSingleSelect setItems={setSpeeds} items={speeds} setValue={setSpeedSelected} value={speedSelected} label={"¿cual es tu nivel de consciencia?"} />
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Se le marcan las costillas al respirar?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setRibs('Si')}}>
                                    <RadioButton selected={ribs == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setRibs('No')}}>
                                    <RadioButton selected={ribs == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Se le marcan las clavículas al respirar?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setClavicles('Si')}}>
                                    <RadioButton selected={clavicles == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setClavicles('No')}}>
                                    <RadioButton selected={clavicles == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿El tórax se mueve igual en ambos lados?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setChestMoves('Si')}}>
                                    <RadioButton selected={chestMoves == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setChestMoves('No')}}>
                                    <RadioButton selected={chestMoves == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <PickerSingleSelect setItems={setHowExpands} items={howExpands} setValue={setHowExpandsSelected} value={howExpandsSelected} label={"¿Cómo se expande el tórax?"} />
                            <PickerSingleSelect setItems={setHasCough} items={hasCough} setValue={setHasCoughSelected} value={hasCoughSelected} label={"¿Tiene tos?"} />
                            <PickerSingleSelect setItems={setColoredFingers} items={coloredFingers} setValue={setColoredFingersSelected} value={coloredFingersSelected} label={"¿De qué color tiene la punta de los dedos?"} />
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Le cuesta respirar al estar acostado?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setLaboredBreathing('Si')}}>
                                    <RadioButton selected={laboredBreathing == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setLaboredBreathing('No')}}>
                                    <RadioButton selected={laboredBreathing == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                            <PickerSingleSelect setItems={setLipColor} items={lipColor} setValue={setLipColorSelected} value={lipColorSelected} label={"¿De qué color tiene los labios?"} />
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Logra escuchar secreciones en los pulmones?</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <TouchableOpacity onPress={() => {setLungSecretions('Si')}}>
                                    <RadioButton selected={lungSecretions == 'Si'} labelRadio={'Si'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {setLungSecretions('No')}}>
                                    <RadioButton selected={lungSecretions == 'No'} labelRadio={'No'}/>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </CardWithText>
                </View>
                <View style={{flex: 0.05}}/>
            </View>
            <Fab icon={"text-box-check"} onPress={() => !loading && handleSaveDimension()} /> 
        </View>
    )
}
