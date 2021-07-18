import React, { useContext } from 'react'
import { Alert, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './style';
import { WHITE } from '../../const/Colors';
import TextIcon from '../../UI/TextIcon';
import { HomeContext } from '../../context/Home/HomeContext';
import { formatDate } from '../../helpers/formatDate';

const PatientReview = ({navigation}) => {

    const { patient, deletePatient } = useContext(HomeContext)

    const createAlertDelete = () => {
		Alert.alert(
			"¿Esta seguro?",
			`Eliminara al pacíente con el run: ${patient.rbd}` ,
			[
				{
					text: "Cancelar",
					onPress: () => {},
					style: "cancel"
				},
				{ text: "Si, esta bien", onPress: () => deletePatient(patient._id) }
			]
		);
	};

    return ( 
        <View style={{flex: 1}}>
            { patient && 
            <View style={{flex: 1}}>
                <View style={styles.headerInfoPatient}>
                    <View style={{padding: 3}}>
                        <Text style={styles.titlePreview}>Datos del paciente</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('InfoPatient')}>
                        <MaterialCommunityIcons size={36} color={WHITE} style={{padding: 4, marginRight: 10}} name="clipboard-plus" />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1.3}}>
                    <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        style={{
                            resizeMode: 'stretch',
                            width: 220, 
                            height: 150
                        }} 
                        source={require('../../assets/logo_telemedicina.png')}
                    />
                        <Text style={styles.titlePatient}>{patient.name} {patient.lastname}</Text>      
                    </View>
                    <View style={styles.containerInfoPatient}>
                        <ScrollView>
                            <TextIcon label={"RUN"} text={patient.rbd} icon={"card-account-details"} hr/>
                            <TextIcon label={"Género"} text={ (patient.gender == 1) ? 'Masculino' : 'Femenino'} icon={"gender-male-female"} hr/>
                            <TextIcon label={"Fecha de nacimiento"} text={formatDate(new Date(`${patient.birthday}T12:00:00Z`))} icon={"calendar-range"} hr/>
                        </ScrollView>
                    </View>
                    <View style={{height: 50, flexDirection: 'row'}}>
                        <Button
                            onPress={() => navigation.navigate('EditPatient')}
                            containerStyle={{flex: 1}}
                            buttonStyle={styles.btnEdit}
                                icon={
                                    <Icon
                                        name="account-edit"
                                        style={{marginRight: 10}}
                                        size={22}
                                        color="white"
                                    />
                                }
                                title="Editar"
                        />
                        <Button
                            onPress={createAlertDelete}
                            containerStyle={{flex: 1}}
                            buttonStyle={styles.btnDelete}
                                icon={
                                    <Icon
                                        name="account-remove"
                                        style={{marginRight: 10}}
                                        size={22}
                                        color="white"
                                    />
                                }
                            title="Eliminar"
                        />
                    </View>	
                </View>
            </View>
            }
        </View>
    )
}

export default PatientReview;