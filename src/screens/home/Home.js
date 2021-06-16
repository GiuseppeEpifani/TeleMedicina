import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, ListItem, Avatar, Text } from 'react-native-elements';
import Card from '../../UI/Card';
import InputText from '../../UI/InputText';
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PatientReview from '../../components/home/PatientReview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, WHITE } from '../../const/Colors';
import { styles } from './style';

export const Home = ({navigation}) => {

	const list = [
		{
		  name: 'Giuseppe Epifani',
		  select: true,
		  run: '19.869.835-0'
		},
		{
			name: 'Caleb Epifani',
			select: false,
			run: '20.546.286-4'
		},
		{
			name: 'Jose Epifani',
			select: false,
			run: '8.841.885-9'
		}
	]

	const [patient, setPatient] = useState(list[0]);
	const [listPatient, setListPatient] = useState(list);

	const handleSelectPatient = (selectPatient) => {
		if (patient.run != selectPatient.run) {
			setListPatient(listPatient.map(patient => {
				return (patient.run == selectPatient.run) ? {...patient, select: true} : {...patient, select: false} 
			}));
			setPatient(selectPatient);
		}
	}

    return (
		<KeyboardScrollView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>
			<View style={{flex: 1, padding: 20}}>
				<View style={{flex: 0.9, marginBottom: 30}}>
					<Card header={true} title={'Ficha clinica'} padding={15}>
						<View style={{alignItems: 'center'}}>
							<InputText 
							labelError={false}
							onChangeText={() => {}} 
							placeholder={'Ingrese run o nombre'} 
							keyboardType={'default'} 
							nameIcon={"account-search"} 
							styleWidth={{width: 500}}
							buttonText
							buttonTitle={'Buscar'}
							/>						
						</View>
					</Card>
				</View>
				<View style={{flex: 5}}>
					<Card header title={'Lista de pacientes'}>
						<View style={{flexDirection: 'row', height: '96.5%'}}>
							<View style={{flex: 1}}>
								<ScrollView>							
									{
										listPatient.map((patient, i) => (
											<TouchableOpacity onPress={() => {handleSelectPatient(patient)}} key={i}>	
												<ListItem key={i} bottomDivider containerStyle={ patient.select && { backgroundColor: PRIMARY} }>
													<Avatar  key={i}
														rounded
														title={'Giuseppe Epifani'.charAt(0)}
														size="medium"
														containerStyle={{
															backgroundColor: "silver",
														}}
													/>
													<ListItem.Content>
														<ListItem.Title style={ patient.select && styles.textSelectList }>{patient.name}</ListItem.Title>
														<ListItem.Subtitle style={ patient.select && styles.textSelectList }>{patient.run}</ListItem.Subtitle>
													</ListItem.Content>
													{ patient.select && <MaterialCommunityIcons name="chevron-right" color={WHITE} size={35} style={styles.goBack}/> }
												</ListItem>
											</TouchableOpacity>
										))
									}				
								</ScrollView>
								<View style={{height: 50}}>
									<Button
									containerStyle={{flex: 1, backgroundColor: PRIMARY,}}
									buttonStyle={{backgroundColor: PRIMARY, height: '100%'}}
									icon={
										<Icon
											name="account-plus"
											style={{marginRight: 10}}
											size={22}
											color="white"
										/>
									}
									title="Nuevo paciente"
									onPress={ () => navigation.navigate('RegisterPatient')}
									/>
								</View>
							</View>
							<View style={{flex: 1.4, borderLeftWidth: 6, borderLeftColor: PRIMARY}}>
								<PatientReview navigation={navigation} patient={patient} />
							</View>
						</View>
					</Card>
				</View>
				<View style={{flex: 0.5}} />
			</View>
		</KeyboardScrollView>
    )
}