import React, { useState } from 'react'
import { Text, View, Alert, TouchableHighlight, TouchableOpacity  } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../UI/Card'
import Hr from '../../UI/Hr';
import { DANGER, SECONDARY, SUCCESS, WARNING, WHITE } from '../../const/Colors';
import { styles } from './styles';
import ModalRecordPatient from './ModalRecordPatient';

export const CardAttention = ({navigation, record, deleteRecord, setCurrentRecord}) => {

    const [modalVisible, setModalVisible] = useState(false);

    const createAlertDelete = () => {
		Alert.alert(
			"¿Esta seguro?",
			`¿Está seguro(a) de eliminar a , La ficha clínica creada ${record.created_at}` ,
			[
				{
					text: "Cancelar",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "Si, esta bien", onPress: () => deleteRecord(record._id) }
			]
		);
	};

    const continueRegister = async () => {
        setCurrentRecord(record);
        navigation.navigate('CreateClinicalRecord');
    }

    const status = record.status;

    return (
        <TouchableHighlight style={{flex: 1}}>
            <>
            {
                (!record.deleted_at) &&
                <View style={{height: 350, marginBottom: 10}}>
                    <ModalRecordPatient setModalVisible={setModalVisible} modalVisible={modalVisible} navigation={navigation}/>
                    <Card>
                        <View style={{...styles.cardAttention, borderLeftColor: (status == 1) ? WARNING : (status == 2) ? SUCCESS : SECONDARY}}>
                            <View style={{flexDirection: 'row', flex: 0.5}}>
                                <View style={{flex: 2}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Icon name="calendar-account" size={35} color={SECONDARY}/>
                                        <Text style={{fontSize: 22, color: SECONDARY, marginLeft: 5}}>Creado el: <Text style={{color: SUCCESS, fontWeight: 'bold', fontSize: 18}}>{record.created_at}</Text> </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                            <Icon name="account-edit" size={35} color={SECONDARY}/>
                                            <Text style={{fontSize: 18, color: SECONDARY, marginLeft: 5}}>{record.digitador.name} {record.digitador.lastname} - {record.digitador.rbd}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                    {
                                        (status !== 2) &&
                                        <Button
                                            icon={
                                                <Icon
                                                    name="delete"
                                                    size={25}
                                                    color="white"
                                                />
                                            }
                                            containerStyle={{marginRight: 2}}
                                            buttonStyle={styles.btnDelete}
                                            onPress={createAlertDelete}
                                        /> 
                                    }
                                    <Button
                                        icon={
                                            <Icon
                                                name="clipboard-plus"
                                                size={25}
                                                color="white"
                                            />
                                        }
                                        buttonStyle={styles.btnInfo}
                                        titleStyle={{fontWeight: 'bold', marginLeft: 5}}
                                        title="Ver ficha"
                                        onPress={() => setModalVisible(true)}
                                    />
                                </View>
                            </View>
                            <Hr/>
                            <View style={{flex: 1.4, padding: 2, marginTop: 5}}>
                                <View style={styles.containerBackground}>
                                    <View style={{height: 40, backgroundColor: SECONDARY}}>
                                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                                <Icon name="note-text" size={30} color={WHITE} style={{marginLeft: 5}}/>
                                                <Text style={{fontSize: 18, color: WHITE, marginLeft: 5}}>REGISTRO ANTECEDENTES</Text>
                                            </View>
                                            {
                                                (record.status != 2) &&
                                                <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} onPress={continueRegister}>
                                                    <Icon name="file-document-edit" size={30} color={WHITE} style={{marginRight: 5, alignSelf: 'flex-end'}}/>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <Text style={(Array.isArray(record.morbid_antecedent)) ? styles.textBackgroundWarning : styles.textBackgroundSuccess}>ANTECEDENTES</Text>
                                            <Icon name={(Array.isArray(record.morbid_antecedent)) ? "circle-off-outline" : "checkbox-marked-circle-outline"} size={30} color={(Array.isArray(record.morbid_antecedent)) ? WARNING : SUCCESS} style={{ marginLeft: 5}}/>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <Text style={(Array.isArray(record.health_check)) ? styles.textBackgroundWarning : styles.textBackgroundSuccess}>CONTROL DE SALUD</Text>
                                            <Icon name={(Array.isArray(record.health_check)) ? "circle-off-outline" : "checkbox-marked-circle-outline"} size={30} color={(Array.isArray(record.health_check)) ? WARNING : SUCCESS} style={{marginLeft: 5}}/>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <Text style={(record.clinical_interview.length > 0) ? styles.textBackgroundSuccess : styles.textBackgroundWarning}>ENTREVISTA CLÍNICA</Text>
                                            <Icon name={(record.clinical_interview.length > 0) ? "checkbox-marked-circle-outline" : "circle-off-outline"} size={30} color={(record.clinical_interview.length > 0) ? SUCCESS : WARNING} style={{marginLeft: 5}}/>
                                        </View>

                                    </View>
                                </View>
                                <View style={{flex: 0.1}}/>
                                <View style={{flex: 1.3, borderWidth: 1, borderColor: SECONDARY, borderRadius: 10, overflow: 'hidden'}}>
                                    <View style={{height: 40, backgroundColor: SECONDARY}}>
                                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                                            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                                <Icon name="clock" size={30} color={WHITE} style={{marginLeft: 5}}/>
                                                <Text style={{fontSize: 18, color: WHITE, marginLeft: 5}}>CIERRE ATENCIÓN</Text>
                                            </View>
                                            {
                                                (status == 2) &&
                                                <View style={{flex: 1, justifyContent: 'center'}}>
                                                    <Icon name="file-document-edit" size={30} color={WHITE} style={{marginRight: 5, alignSelf: 'flex-end'}}/>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        {
                                            (status == 0) &&
                                            <Button
                                                icon={
                                                    <Icon
                                                        name="file-document-edit"
                                                        size={20}
                                                        color="white"
                                                    />
                                                }
                                                buttonStyle={{backgroundColor: SUCCESS, height: 36, width: 200, borderRadius: 20}}
                                                titleStyle={{fontWeight: 'bold', marginLeft: 5, fontSize: 14}}
                                                title="Continuar registro"
                                                onPress={continueRegister}
                                            />
                                        }
                                        {
                                            (status == 1) &&
                                            <Button
                                                buttonStyle={{backgroundColor: SUCCESS, height: 36, width: 200, borderRadius: 20}}
                                                titleStyle={{fontWeight: 'bold', marginLeft: 5, fontSize: 14}}
                                                title="Finalizar atención"
                                                onPress={() => {}}
                                            />
                                        }
                                        {
                                            (status == 2) &&
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Icon name="checkbox-marked-circle-outline" size={30} color={SUCCESS} style={{marginLeft: 5}}/>
                                                <Text style={styles.textBackgroundSuccess}>Cerrado - {record.updated_at}</Text>
                                            </View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Card>
                </View> 
            }
            {
                (record.deleted_at) && 
                <View style={{height: 200, marginBottom: 10}}>
                    <Card>
                        <View style={{...styles.cardAttention, borderLeftColor: DANGER}}>
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name="calendar-account" size={35} color={SECONDARY}/>
                                    <Text style={{fontSize: 22, color: SECONDARY, marginLeft: 5}}>Creado el: <Text style={{color: SUCCESS, fontWeight: 'bold', fontSize: 18}}>{record.created_at}</Text> </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                        <Icon name="account-edit" size={35} color={SECONDARY}/>
                                        <Text style={{fontSize: 18, color: SECONDARY, marginLeft: 5}}>{record.digitador.name} {record.digitador.lastname} - {record.digitador.rbd}</Text>
                                    </View>
                                </View>
                            </View>
                            <Hr/>
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon name="calendar-account" size={35} color={SECONDARY}/>
                                    <Text style={{fontSize: 22, color: SECONDARY, marginLeft: 5}}>Eliminado el: <Text style={{color: DANGER, fontWeight: 'bold', fontSize: 18}}>{record.deleted_at}</Text> </Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                        <Icon name="account-edit" size={35} color={SECONDARY}/>
                                        <Text style={{fontSize: 18, color: SECONDARY, marginLeft: 5}}>{record.digitador_delete.name} {record.digitador_delete.lastname} - {record.digitador_delete.rbd}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Card>
                </View>
            }
            </>
        </TouchableHighlight>
    )
}