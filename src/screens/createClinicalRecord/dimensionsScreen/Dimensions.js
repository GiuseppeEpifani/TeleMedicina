import React, { useContext, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Badge, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SUCCESS, WHITE } from '../../../const/Colors'
import KeyboardScrollView from '../../../UI/KeyboardScrollView'
import { CardInfoPatient } from '../../../components/infoPatient/CardInfoPatient';
import ButtonWithShadow from '../../../UI/ButtonWithShadow';
import { HomeContext } from '../../../context/Home/HomeContext';
import { RecordContext } from '../../../context/RecordFile/RecordContext';
import { modeApp } from '../../../helpers/modeApp';
import { removeSingleImage } from '../../../helpers/recordsLocal/removeSingleImage';

export const Dimensions = ({navigation}) => {

    const { patient } = useContext(HomeContext);
    const { updatedRecordClinicalInterview, currentRecord, saveDimension, uploadSingleImage, imageFallsAndBumps } = useContext(RecordContext);
    const [loading, setloading] = useState(false);

    const handleEndTest = async () => {
        setloading(true);
        if (imageFallsAndBumps.base64) {
            let dimension = currentRecord.clinical_interview.find(item => item._id === '000000000000000000000006');
            let img = await uploadSingleImage({img: imageFallsAndBumps.base64, patientId: (patient._id) ? patient._id : patient.id, recordId: currentRecord.id});

            dimension.question.push(
                {
                    text_question: "<p>Adjunta imagenes</p>",
                    answer: img,
                    question_id: "60526705bd99de221332c176",
                    question_type: 4,
                    file: null
                }
            );
            saveDimension(dimension);
        } else {
            if (await modeApp()) {
                removeSingleImage(currentRecord.id);
            }
        }
        await updatedRecordClinicalInterview({patientId: patient._id, rbd: patient.rbd});
        navigation.navigate('InfoPatient');
    }

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={50} barColor={PRIMARY} backgroundColor={WHITE}>
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
                <View style={{flex: 0.3, paddingHorizontal: 30, paddingBottom: 10}}>
                    <View style={{position: 'absolute', right: 30, marginTop: 5, height: 50, zIndex: 10 }}>
                        <Button title="Volver" buttonStyle={{height: 40, width: 120, backgroundColor: PRIMARY, borderRadius: 20, zIndex: 10}} titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}} 
                            icon={
                                <Icon
                                    name="clipboard-arrow-left"
                                    size={22}
                                    color="white"
                                />
                            }
                            onPress={() => {navigation.navigate('InfoPatient')}}
                        />
                    </View>
                    <CardInfoPatient patient={patient} navigation={navigation} />
                </View>
                <View style={{flex: 0.05}}/>
                <View style={{flex: 1}}>
                    <ScrollView>
                        <View style={{paddingHorizontal: 30, alignItems: 'center'}}>
                            <ButtonWithShadow text={'Dolor'} onPress={() => {navigation.navigate('Pain')}} thereAre={currentRecord.clinical_interview.some(item => item._id === '000000000000000000000001')} />
                            <ButtonWithShadow text={'Problemas comportamiento'} onPress={() => {navigation.navigate('BehaviorProblems')}} thereAre={currentRecord.clinical_interview.some(item => item._id === '000000000000000000000002')} />
                            <ButtonWithShadow text={'Problemas respiratorios'} onPress={() => {navigation.navigate('RespiratoryProblems')}} thereAre={currentRecord.clinical_interview.some(item => item._id === '000000000000000000000003')} />
                            <ButtonWithShadow text={'Problemas digestivos'} onPress={() => {navigation.navigate('DigestiveProblems')}} thereAre={currentRecord.clinical_interview.some(item => item._id === '000000000000000000000004')} />
                            <ButtonWithShadow text={'Problemas urinarios'} onPress={() => {navigation.navigate('UrinaryProblems')}} thereAre={currentRecord.clinical_interview.some(item => item._id === '000000000000000000000005')} />
                            <ButtonWithShadow text={'Caídas y golpes'} onPress={() => {navigation.navigate('FallsAndBumps')}} thereAre={currentRecord.clinical_interview.some(item => item._id === '000000000000000000000006')} />
                        </View>
                    </ScrollView>
                </View>
                <View style={{height: 80, marginBottom: 70}}>
                    <Button title="Finalizar" buttonStyle={{height: 70, backgroundColor: PRIMARY}} titleStyle={{fontSize: 32, fontWeight: 'bold', marginLeft: 10}} 
                        icon={
                            <Icon
                                name="content-save"
                                size={36}
                                color="white"
                            />
                        }
                        disabled={loading}
                        loading={loading}
                        onPress={handleEndTest}
                    />
                </View>
            </View>
        </KeyboardScrollView>
    )
}