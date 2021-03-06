import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator, Text, FlatList } from 'react-native'
import { PRIMARY, SUCCESS, WHITE } from '../../const/Colors'
import ArrowBack from '../../UI/ArrowBack'
import KeyboardView from '../../UI/KeyboardView';
import CardAttention from '../../components/infoPatient/CardAttention'
import { CardInfoPatient } from '../../components/infoPatient/CardInfoPatient'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAttencion from '../../components/infoPatient/ModalAttencion';
import { RecordContext } from '../../context/RecordFile/RecordContext';
import { HomeContext } from '../../context/Home/HomeContext';
import { LoadingScreen } from '../../UI/LoadingScreen';
import Card from '../../UI/Card';
import { modeApp } from '../../helpers/modeApp';
import { getLastClinicalRecord } from '../../helpers/recordsLocal/getLastClinicalRecord';

export const InfoPatient = ({navigation}) => {

    const { getRecords, deleteRecord, createAttention, clinicalRecords, loading, cleanData, setCurrentRecord, finallyRecordPatient } = useContext(RecordContext);
    const { patient } = useContext(HomeContext);
    const [loadingData, setLoadingData] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [lastClinicalRecord, setLastClinicalRecord] = useState();

    useEffect(() => {
        getClinicalRecordLocal();
        loadingRecords();
    }, []);

    const getClinicalRecordLocal = async () => {
        if (await modeApp()) {
            const lastClinicalRecordAsync = await getLastClinicalRecord(patient._id);
            if (lastClinicalRecordAsync && lastClinicalRecordAsync.clinical_record) setLastClinicalRecord(lastClinicalRecordAsync.clinical_record);
        }
    }
    
    const loadingRecords = async () => {
        await getRecords({id: patient._id, rbd: patient.rbd});
        setLoadingData(false);
    }

    const finallyAttention = async ({recordId, observation, indication, record}) => {
        setLoadingData(true);
        await finallyRecordPatient({patientId: patient._id, rbd: patient.rbd, recordId, observation, indication, recordToFinally: record});
        setLoadingData(false);
    }

    const renderListRecord = ({item: record}) => {
		return (
            <View style={{paddingHorizontal: 30}}>
                <CardAttention navigation={navigation} record={record} deleteRecord={deleteRecord} setCurrentRecord={setCurrentRecord} finallyAttention={finallyAttention} patient={patient} />
            </View>
		)
	}

    const goBack = () => {
        cleanData();
        navigation.goBack();
    }

    if (loading) return <LoadingScreen text={'Eliminando ficha cl??nica'} />

    return (
        <KeyboardView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>  
            <ModalAttencion setModalVisible={setModalVisible} modalVisible={modalVisible} navigation={navigation} createRecord={createAttention} patient={patient}/>
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 0.5}}>
                        <ArrowBack onPress={goBack} />
                    </View>
                    <View style={{flex: 2.2, paddingHorizontal: 30}}>
                        <CardInfoPatient patient={patient} />
                    </View>
                </View>            
                <View style={{flex: 2.4}}>
                    <View style={{height: 45, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 30}}>
                        <Button
                            icon={
                                <Icon
                                    name="plus-box-multiple"
                                    size={25}
                                    color="white"
                                />
                            }
                            containerStyle={{elevation: 10, borderRadius: 20}}
                            buttonStyle={{backgroundColor: SUCCESS, height: 40, width: 200, borderRadius: 20}}
                            titleStyle={{fontWeight: 'bold', marginLeft: 5}}
                            title="Crear atenci??n"
                            disabled={loadingData}
                            onPress={() => setModalVisible(true)}
                        />   
                    </View>
                    <View style={{flex: 1}}>
                        {
                            (loadingData) &&
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', color: PRIMARY, fontSize: 28, marginBottom: 20}}>Cargando fichas...</Text>
                                <ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                            </View>
                        }
                        {
                            (clinicalRecords.length === 0 && !loadingData && !lastClinicalRecord) &&
                            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', paddingHorizontal: 30}}>
                                <View style={{height: 200}}>
                                    <Card padding={30}>
                                        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontWeight: 'bold', color: PRIMARY, fontSize: 28, marginBottom: 20}}>Sin fichas clinicas</Text>
                                        </View>
                                    </Card>
                                </View>
                            </View>
                        }
                        {
                            (clinicalRecords.length > 0 && !loadingData) &&
                            <FlatList
                                data={clinicalRecords}
                                keyExtractor={(recordRender, index) => (recordRender?.local) ? recordRender.id+''+index : recordRender._id }
                                renderItem={renderListRecord}
                            />
                        }
                    </View>
                </View>
                <View style={{flex: 0.3}}/>
            </View>
        </KeyboardView>
    )
}