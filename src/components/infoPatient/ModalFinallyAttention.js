import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SECONDARY, VERY_LIGHT, WHITE } from '../../const/Colors';
import { SCREEN_HEIGHT } from '../../const/Dimensions';
import { FIELD_COMPLETE } from '../../const/Fields';
import Hr from '../../UI/Hr';
import TextArea from '../../UI/TextArea';

const ModalFinallyAttention = ({setModalVisible, modalVisible, record, finallyAttentionPatient}) => {
    
    const [validated, setValidated] = useState();
    const [observation, setObservation] = useState(record?.diagnosis?.observation);
    const [indication, setIndication] = useState(record?.diagnosis?.indication);

    const finallyAttention = async () => {
        setValidated(true);

        if (observation && indication) {
            finallyAttentionPatient({ recordId: record._id, observation, indication });
            setValidated(false);
        }
    }

    const cleanModal = () => {
        setModalVisible(!modalVisible);
        setValidated(false);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={cleanModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView>
                    <View style={{height: 50, backgroundColor: VERY_LIGHT, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: PRIMARY, fontWeight: 'bold', fontSize: 26, marginLeft: 8}}>Ficha Clínica</Text>
                        <TouchableOpacity onPress={cleanModal}>
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
                            <Text style={{fontSize: 20, marginLeft: 6, color: PRIMARY, fontWeight: 'bold'}}>{record.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon
                                name="account-edit"
                                size={35}
                                color={SECONDARY}
                            />
                            <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>{record.digitador.name} {record.digitador.lastname} - {record.digitador.rbd}</Text>
                        </View>
                        <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>Tipo de consulta: <Text style={{fontSize: 16, marginVertical: 4, color: SECONDARY}}>{record.type_of_query.name}</Text></Text>
                        <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>Motivo de consulta y/o síntomas actuales:</Text>
                        <Text style={{fontSize: 16, marginVertical: 4, color: SECONDARY}}>{record.reason_for_consultation}</Text>
                        <Text style={{fontSize: 18, marginVertical: 4, color: SECONDARY, fontWeight: 'bold'}}>Estado de salud actual:</Text>
                        {
                            (record.health_check.current_health_status) &&
                                <Text style={{fontSize: 16, marginVertical: 4, color: SECONDARY, marginBottom: 10}}>{record.health_check.current_health_status}</Text>
                        }
                        {
                            (record.health_check.current_health_status === undefined) &&
                                <Text style={{fontSize: 16, marginVertical: 4, color: SECONDARY, marginBottom: 10}}>Sin mención</Text> 
                        }
                        <Hr/>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginBottom: 6}}>Observación</Text>
                        <TextArea maxLength={500} onChangeText={setObservation} value={observation} labelError={(!observation && validated) ? FIELD_COMPLETE : false} />
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: PRIMARY, marginLeft: 6, marginBottom: 6}}>Indicación</Text>
                        <TextArea maxLength={500} onChangeText={setIndication} value={indication} labelError={(!indication && validated) ? FIELD_COMPLETE : false} />
                    </View>
                    </ScrollView>
                    <View style={{height: 60, marginTop: 10}}>
                        <Hr/>
                        <View style={{flex: 1, alignSelf: 'flex-end', justifyContent: 'center'}}>      
                            <View style={{flexDirection: 'row', alignSelf: 'stretch', marginRight: 10}}>
                                <Button
                                    buttonStyle={{backgroundColor: VERY_LIGHT, width: 140, marginRight: 5}}
                                    titleStyle={{color: PRIMARY}}
                                    title="Salir"
                                    onPress={cleanModal}
                                />
                                <Button
                                    buttonStyle={{backgroundColor: PRIMARY, width: 140}}
                                    titleStyle={{color: WHITE}}
                                    title="Guardar"
                                    loading={false}
                                    onPress={finallyAttention}
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
        height: SCREEN_HEIGHT - 200,
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

export default ModalFinallyAttention;