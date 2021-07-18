import React from 'react'
import { Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SECONDARY, VERY_LIGHT } from '../../const/Colors';
import { SCREEN_HEIGHT } from '../../const/Dimensions';
import Hr from '../../UI/Hr';

const ModalRecordPatient = (props) => {

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
                        <Text style={{color: PRIMARY, fontWeight: 'bold', fontSize: 26, marginLeft: 8}}>Ficha Clínica</Text>
                        <TouchableOpacity onPress={() => props.setModalVisible(!props.modalVisible)}>
                            <Icon
                                name="close-circle"
                                size={35}
                                color={PRIMARY}
                                style={{marginRight: 10}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 3, paddingHorizontal: 30}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <Icon
                                name="calendar"
                                size={35}
                                color={SECONDARY}
                            />
                            <Text style={{fontSize: 30, marginVertical: 2, color: SECONDARY}}>CREADO EL:</Text>
                            <Text style={{fontSize: 20, marginLeft: 6, color: PRIMARY, fontWeight: 'bold'}}>28 jun. 2021, 19:13 pm</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon
                                name="account-edit"
                                size={35}
                                color={SECONDARY}
                            />
                            <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>Fernando Aracena - 23.540.372-2</Text>
                        </View>
                        <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>Tipo de consulta: Terreno</Text>
                        <Hr/>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 10}}>Motivo de consulta y/o síntomas actuales</Text>
                        <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>th</Text>
                        <View>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 10}}>Antecedentes mórbidos</Text>  
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Patología:</Text>
                                <Text style={{fontSize: 20, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}>Sin patologías</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, marginLeft: 6, marginVertical: 2, color: SECONDARY}}>Alergías:</Text>
                                <Text style={{fontSize: 20, marginLeft: 6, color: SECONDARY, fontWeight: 'bold'}}>No</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginVertical: 10}}>Control salud</Text>  
                        </View> 
                    </View>
                    <View style={{height: 60}}>
                        <Hr/>
                        <View style={{flex: 1, alignSelf: 'flex-end', justifyContent: 'center'}}>      
                            <View style={{flexDirection: 'row', alignSelf: 'stretch', marginRight: 10}}>
                                <Button
                                    buttonStyle={{backgroundColor: VERY_LIGHT, width: 140}}
                                    titleStyle={{color: PRIMARY}}
                                    title="Salir"
                                    loading={false}
                                    onPress={ () => props.setModalVisible(!props.modalVisible) }
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

export default ModalRecordPatient;
