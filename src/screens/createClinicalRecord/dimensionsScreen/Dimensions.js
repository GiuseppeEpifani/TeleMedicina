import React, { useContext, useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Badge, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SUCCESS, WHITE } from '../../../const/Colors'
import KeyboardScrollView from '../../../UI/KeyboardScrollView'
import { CardInfoPatient } from '../../../components/infoPatient/CardInfoPatient';
import ButtonWithShadow from '../../../UI/ButtonWithShadow';
import { HomeContext } from '../../../context/Home/HomeContext';
import { RecordContext } from '../../../context/RecordFile/RecordContext';

export const Dimensions = ({navigation}) => {

    const { patient } = useContext(HomeContext);
    const { updatedRecordClinicalInterview } = useContext(RecordContext);

    const handleEndTest = async () => {
        updatedRecordClinicalInterview(patient._id);
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
                    <CardInfoPatient patient={patient} />
                </View>
                <View style={{flex: 0.05}}/>
                <View style={{flex: 1}}>
                    <ScrollView>
                        <View style={{paddingHorizontal: 30, alignItems: 'center'}}>
                            <ButtonWithShadow text={'Dolor'} onPress={() => {navigation.navigate('Pain')}}/>
                            <ButtonWithShadow text={'Problemas comportamiento'} onPress={() => {navigation.navigate('BehaviorProblems')}}/>
                            <ButtonWithShadow text={'Problemas respiratorios'} onPress={() => {navigation.navigate('RespiratoryProblems')}}/>
                            <ButtonWithShadow text={'Problemas digestivos'} onPress={() => {navigation.navigate('DigestiveProblems')}}/>
                            <ButtonWithShadow text={'Problemas urinarios'} onPress={() => {navigation.navigate('UrinaryProblems')}}/>
                            <ButtonWithShadow text={'Caídas y golpes'} onPress={() => {navigation.navigate('FallsAndBumps')}}/>
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
                        onPress={handleEndTest}
                    />
                </View>
            </View>
        </KeyboardScrollView>
    )
}