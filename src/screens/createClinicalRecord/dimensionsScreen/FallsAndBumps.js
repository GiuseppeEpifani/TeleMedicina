import React, { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native';
import { Badge } from 'react-native-elements'
import { PRIMARY, SECONDARY, SUCCESS, WHITE } from '../../../const/Colors';
import Fab from '../../../UI/Fab';
import CardWithText from '../../../UI/CardWithText';
import PickerSingleSelect from '../../../UI/PickerSingleSelect';
import { ScrollView } from 'react-native';
import { RecordContext } from '../../../context/RecordFile/RecordContext';
import PickerMultiSelect from '../../../UI/PickerMultiSelect';
import ContainerCameraSingle from '../../../UI/ContainerCameraSingle';
import { HomeContext } from '../../../context/Home/HomeContext';
import { getSingleImageDimension } from '../../../helpers/recordsLocal/getSingleImageDimension';
import { modeApp } from '../../../helpers/modeApp';

export const FallsAndBumps = ({navigation}) => {

    const { saveDimension, removeDimension, currentRecord, saveNewImageFallsAndBumps, imageFallsAndBumps, cleanImageFallsAndBumps } = useContext(RecordContext);
    const { patient } = useContext(HomeContext);
    const thereIsDimension = currentRecord.clinical_interview.length > 0 && currentRecord.clinical_interview.some(item => item._id === '000000000000000000000006');
    const currentDimension = currentRecord.clinical_interview.find(item => item._id === '000000000000000000000006');

    const [fallsOrBumps, setFallsOrBumps] = useState([{ label: "Caída", value: "Caída" }, { label: "Golpe", value: "Golpe" }, { label: "Caída y golpe", value: "Caída y golpe" }]);
    const [fallsOrBumpsSelected, setFallsOrBumpsSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '6052652ae56a0a32731ff8a3')?.answer : null);
    const [asStep, setAsStep] = useState([{ label: "Cayó desde la cama", value: "Cayó desde la cama" }, { label: "Cayó mientras caminaba", value: "Cayó mientras caminaba" }, { label: "Cayó en la ducha o tina", value: "Cayó en la ducha o tina" }, { label: "Cayó desde menos de un metro de altura", value: "Cayó desde menos de un metro de altura" }, { label: "Cayó desde más de un metro de altura", value: "Cayó desde más de un metro de altura" }, { label: "Cayó desde más de 2 metros de altura", value: "Cayó desde más de 2 metros de altura" }]);
    const [asStepSelected, setAsStepSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526597bd99de221332c174')?.answer : null);
    const [woundSite, setWoundSite] = useState([{ label: "La cabeza", value: "La cabeza" }, { label: "El tórax o espalda", value: "El tórax o espalda" }, { label: "El abdomen", value: "El abdomen" }, { label: "Las piernas", value: "Las piernas" }, { label: "Los brazos", value: "Los brazos" }]);
    const [woundSiteSelected, setWoundSiteSelected] = useState((thereIsDimension && currentDimension.question.find(item => item.question_id === '605265f605651e70c874f5d8')) ? currentDimension.question.find(item => item.question_id === '605265f605651e70c874f5d8')?.answer : []);
    const [bleedingOrInjury, setBleedingOrInjury] = useState([{ label: "La cabeza", value: "La cabeza" }, { label: "El tórax o espalda", value: "El tórax o espalda" }, { label: "El abdomen", value: "El abdomen" }, { label: "Las piernas", value: "Las piernas" }, { label: "Los brazos", value: "Los brazos" }]);
    const [bleedingOrInjurySelected, setBleedingOrInjurySelected] = useState((thereIsDimension && currentDimension.question.find(item => item.question_id === '6052664fe56a0a32731ff8a4')) ? currentDimension.question.find(item => item.question_id === '6052664fe56a0a32731ff8a4')?.answer : []);
    const [painSwellingDeformity, setPainSwellingDeformity] = useState([{ label: "La cabeza", value: "La cabeza" }, { label: "El tórax o espalda", value: "El tórax o espalda" }, { label: "El abdomen", value: "El abdomen" }, { label: "Las piernas", value: "Las piernas" }, { label: "Los brazos", value: "Los brazos" }]);
    const [painSwellingDeformitySelected, setPainSwellingDeformitySelected] = useState((thereIsDimension && currentDimension.question.find(item => item.question_id === '6052669dbd99de221332c175')) ? currentDimension.question.find(item => item.question_id === '6052669dbd99de221332c175')?.answer : []);
    const [conscienceLevel, setConscienceLevel] = useState([{ label: "igual que siempre", value: "igual que siempre" }, { label: "Más agitado o confuso que lo habitual", value: "Más agitado o confuso que lo habitual" }, { label: "Más tranquilo o quieto que lo habitual", value: "Más tranquilo o quieto que lo habitual" }]);
    const [conscienceLevelSelected, setConscienceLevelSelected] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '605266f8e56a0a32731ff8a5')?.answer : null);
    const [imageSupport, setImageSupport] = useState((thereIsDimension) ? currentDimension.question.find(item => item.question_id === '60526705bd99de221332c176')?.answer : null);
    const [imageLocal, setImageLocal] = useState();
    const [loading, setloading] = useState(false);
    const [image, setImage] = useState(imageFallsAndBumps);

    useEffect(() => {
        getImageLocal();
    }, []);

    const handleSetValue = (value, setFunction, getValue) => {
        const item = value();

        if (getValue == item) {
            setFunction();
        } else {
            setFunction(item);
        }
    }

    const getImageLocal = async () => {
        if (await modeApp()) {
            const img = await getSingleImageDimension(currentRecord.id);
            if (img) setImageLocal(img.file);
        }
    }

    const handleSaveDimension = async () => {
        let dimension = 
            {
                _id: "000000000000000000000006",
                active: 1,
                description: "Encuesta de caídas y  golpes",
                name: "Caídas y gopes",
                question: []
            }
        
        if (fallsOrBumpsSelected) {
            dimension.question.push(
                {
                    text_question: "<p>¿Ha sufrido alguna caída o golpe?</p>",
                    answer: fallsOrBumpsSelected,
                    question_id: "6052652ae56a0a32731ff8a3",
                    question_type: 1
                }
            );
        }

        if (asStepSelected) {
            dimension.question.push(
                {
                    text_question: "<p>¿En caso de caída, cómo ocurrió?</p>",
                    answer: asStepSelected,
                    question_id: "60526597bd99de221332c174",
                    question_type: 1
                }
            );
        }

        if (woundSiteSelected.length > 0) {
            dimension.question.push(
                {
                    text_question: "<p>¿El golpe fue en?</p>",
                    answer: woundSiteSelected,
                    question_id: "605265f605651e70c874f5d8",
                    question_type: 1
                }
            );
        }

        if (bleedingOrInjurySelected.length > 0) {
            dimension.question.push(
                {
                    text_question: "<p>¿Tiene algún sangra-miento o herida en ?</p>",
                    answer: bleedingOrInjurySelected,
                    question_id: "6052664fe56a0a32731ff8a4",
                    question_type: 1
                }
            );
        }

        if (painSwellingDeformitySelected.length > 0) {
            dimension.question.push(
                {
                    text_question: "<p>Presenta dolor, deformidad o inflamación en.. </p>",
                    answer: painSwellingDeformitySelected,
                    question_id: "6052669dbd99de221332c175",
                    question_type: 1
                }
            );
        }

        if (conscienceLevelSelected) {
            dimension.question.push(
                {
                    text_question: "<p>¿Cómo es el nivel de consciencia luego de la caída o golpe?</p>",
                    answer: conscienceLevelSelected,
                    question_id: "605266f8e56a0a32731ff8a5",
                    question_type: 1
                }
            );
        }

        if (image.base64) {
            saveNewImageFallsAndBumps(image);
        } else {
            if (imageSupport) {
                dimension.question.push(
                    {
                        text_question: "<p>Adjunta imagenes</p>",
                        answer: imageSupport,
                        question_id: "60526705bd99de221332c176",
                        question_type: 4,
                        file: null
                    }
                );
            }
            cleanImageFallsAndBumps();
        }


        setloading(true);
        if (dimension.question.length > 0 || image.base64) {
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
                    <CardWithText padding={10} title={'Caídas y golpes'}>
                        <ScrollView>
                            <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Encuesta de caídas y golpes</Text>
                            <PickerSingleSelect setItems={setFallsOrBumps} items={fallsOrBumps} setValue={(value) => handleSetValue(value, setFallsOrBumpsSelected, fallsOrBumpsSelected)} value={fallsOrBumpsSelected} label={"¿Ha sufrido alguna caída o golpe?"} />
                            <PickerSingleSelect setItems={setAsStep} items={asStep} setValue={(value) => handleSetValue(value, setAsStepSelected, asStepSelected)} value={asStepSelected} label={"¿En caso de caída, cómo ocurrió?"} />
                            <PickerMultiSelect value={woundSiteSelected} setValue={setWoundSiteSelected} items={woundSite} setItems={setWoundSite} max={5} label={'¿El golpe fue en?'}/>
                            <PickerMultiSelect value={bleedingOrInjurySelected} setValue={setBleedingOrInjurySelected} items={bleedingOrInjury} setItems={setBleedingOrInjury} max={5} label={'¿Tiene algún sangra-miento o herida en?'}/>
                            <PickerMultiSelect value={painSwellingDeformitySelected} setValue={setPainSwellingDeformitySelected} items={painSwellingDeformity} setItems={setPainSwellingDeformity} max={5} label={'Presenta dolor, deformidad o inflamación en..'}/>
                            <PickerSingleSelect setItems={setConscienceLevel} items={conscienceLevel} setValue={(value) => handleSetValue(value, setConscienceLevelSelected, conscienceLevelSelected)} value={conscienceLevelSelected} label={"¿Cómo es el nivel de consciencia luego de la caída o golpe?"} />
                            <ContainerCameraSingle setImageLocal={setImageLocal} imageLocal={imageLocal} setImage={setImage} imageSupport={imageSupport} setImageSupport={setImageSupport} patientId={patient._id} tempUri={imageFallsAndBumps.tempUri} label={'Apoyo Audiovisual'} />
                        </ScrollView>
                    </CardWithText>
                </View>
                <View style={{flex: 0.05}}/>
            </View>
            <Fab icon={"text-box-check"} onPress={() => !loading && handleSaveDimension()} /> 
        </View>
    )
}
