import React from 'react'
import { Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, VERY_LIGHT } from '../../const/Colors';
import { SCREEN_HEIGHT } from '../../const/Dimensions';
import Hr from '../../UI/Hr';
import RadioButton from '../../UI/RadioButton';
import TextArea from '../../UI/TextArea';

const ModalAttencion = (props) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!modalVisible);
        }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{height: 50, backgroundColor: VERY_LIGHT, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: PRIMARY, fontWeight: 'bold', fontSize: 26, marginLeft: 8}}>Ingreso atención</Text>
                        <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)}>
                            <Icon
                                name="close-circle"
                                size={35}
                                color={PRIMARY}
                                style={{marginRight: 10}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 3, padding: 30}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginBottom: 6}}>Motivo de consulta y/o síntomas actuales</Text>
                        <TextArea/>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginTop: 40}}>Tipo de consulta</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => {}}>
                                <RadioButton selected labelRadio={'Urgencia'}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <RadioButton labelRadio={'Control'}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <RadioButton labelRadio={'Terreno'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: 60}}>
                        <Hr/>
                        <View style={{flex: 1, alignSelf: 'flex-end', justifyContent: 'center'}}>      
                            <View style={{flexDirection: 'row', alignSelf: 'stretch', marginRight: 10}}>
                                <Button
                                    buttonStyle={{backgroundColor: VERY_LIGHT, width: 140}}
                                    titleStyle={{color: PRIMARY}}
                                    title="Cancelar"
                                    loading={false}
                                    onPress={ () => props.setModalVisible(!props.modalVisible) }
                                />
                                <Button
                                    buttonStyle={{backgroundColor: PRIMARY, marginLeft: 5, width: 140}}
                                    title="Guardar"
                                    loading={false}
                                    onPress={ () => {
                                        props.setModalVisible(!props.modalVisible);
                                        props.navigation.navigate('CreateClinicalRecord');
                                    }}
                                />
                            </View>
                        </View>                       
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        borderRadius: 20,
        height: SCREEN_HEIGHT - 400,
        width: '80%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden'
    }
});

export default ModalAttencion;