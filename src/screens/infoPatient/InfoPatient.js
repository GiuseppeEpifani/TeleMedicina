import React, { useState, useEffect, useContext } from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { PRIMARY, SUCCESS, WHITE } from '../../const/Colors'
import ArrowBack from '../../UI/ArrowBack'
import KeyboardView from '../../UI/KeyboardView';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import { styles } from './style';
import { CardAttention } from '../../components/infoPatient/CardAttention'
import { CardInfoPatient } from '../../components/infoPatient/CardInfoPatient'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAttencion from '../../components/infoPatient/ModalAttencion';
import { RecordContext } from '../../context/RecordFile/RecordContext';
import { HomeContext } from '../../context/Home/HomeContext';
import { LoadingScreen } from '../../UI/LoadingScreen';

export const InfoPatient = ({navigation}) => {

    const { getRecords, deleteRecord, createAttention, clinicalRecords, loading, cleanData } = useContext(RecordContext);
    const { patient } = useContext(HomeContext);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getRecords(patient._id);
    }, [])

    const renderListRecord = ({item: record}) => {
		return (
            <View style={{paddingHorizontal: 30}}>
                <CardAttention navigation={navigation} record={record} deleteRecord={deleteRecord} />
            </View>
		)
	}

    const goBack = () => {
        cleanData();
        navigation.goBack();
    }

    if (loading) return <LoadingScreen text={'Eliminando ficha clínica'} />

    return (
        <KeyboardView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>  
            <ModalAttencion setModalVisible={setModalVisible} modalVisible={modalVisible} navigation={navigation} createRecord={createAttention} patient={patient}/>
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 0.3}}>
                        <ArrowBack onPress={goBack}/>
                    </View>
                    <View style={{flex: 2, paddingHorizontal: 30}}>
                        <CardInfoPatient patient={patient} />
                    </View>
                </View>            
                <View style={{flex: 2.7}}>
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
                            title="Crear atención"
                            onPress={() => setModalVisible(true)}
                        />   
                    </View>
                    <View style={{flex: 1}}>
                        {
                            (clinicalRecords.length > 0) &&
                            <OptimizedFlatList
                                data={clinicalRecords}
                                keyExtractor={ (recordRender) => recordRender._id}
                                renderItem={renderListRecord}
                            />	
                        }
                        {
                            (clinicalRecords.length === 0) &&
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: 'bold', color: PRIMARY, fontSize: 28, marginBottom: 20}}>Cargando fichas...</Text>
                                <ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                            </View>
                        }
                    </View>
                </View>
                <View style={{flex: 0.4}}/>
            </View>
        </KeyboardView>
    )
}