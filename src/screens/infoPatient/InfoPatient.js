import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { PRIMARY, SUCCESS, WHITE } from '../../const/Colors'
import ArrowBack from '../../UI/ArrowBack'
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import { styles } from './style';
import { CardAttention } from '../../components/infoPatient/CardAttention'
import { CardInfoPatient } from '../../components/infoPatient/CardInfoPatient'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalAttencion from '../../components/infoPatient/ModalAttencion';


export const InfoPatient = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>  
            <ModalAttencion setModalVisible={setModalVisible} modalVisible={modalVisible} navigation={navigation}/>
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 0.3}}>
                        <ArrowBack navigation={navigation}/>
                    </View>
                    <View style={{flex: 2, paddingHorizontal: 30}}>
                        <CardInfoPatient/>
                    </View>
                </View>            
                <View style={{flex: 2.7}}>
                    <View style={{flex: 0.090, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 30}}>
                        <Button
                            icon={
                                <Icon
                                name="plus-box-multiple"
                                size={25}
                                color="white"
                                />
                            }
                            buttonStyle={{backgroundColor: SUCCESS, height: 40, width: 200, borderRadius: 20}}
                            titleStyle={{fontWeight: 'bold', marginLeft: 5}}
                            title="Crear atención"
                            onPress={() => setModalVisible(true)}
                        />   
                    </View>
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <View style={{paddingHorizontal: 30, marginVertical: 10}}>
                                <CardAttention/>
                                <CardAttention/>   
                            </View>     
                        </ScrollView>
                    </View>
                </View>
                <View style={{flex: 0.4}}/>
            </View>
        </KeyboardScrollView>
    )
}