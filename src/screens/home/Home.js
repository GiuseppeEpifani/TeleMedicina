import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Button, ListItem, Avatar } from 'react-native-elements';
import Card from '../../UI/Card';
import InputText from '../../UI/InputText';
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PatientReview from '../../components/home/PatientReview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, WHITE } from '../../const/Colors';
import { styles } from './style';
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { LoadingScreen } from '../../UI/LoadingScreen';

export const Home = ({navigation}) => {

	const [listPatient, setListPatient] = useState([]);
	const [patient, setPatient] = useState(listPatient[0]);
	const [numberPage, setNumberPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0)

	useEffect(() => {
		getPatient();
	}, [])

	const getPatient = async () => {
		try {
			const { data: {patients, lastPage} } = await teleMedicinaApi.post('/auth/get.pager_patients');
			let arrayPatient = [];
			patients.forEach((patient, index) => {
				if (index === 0) {
					setPatient({...patient, select: true});
					arrayPatient =  [...arrayPatient, {...patient, select: true}];
				} else {
					arrayPatient =  [...arrayPatient, {...patient, select: false}];
				}
			});

			setListPatient(arrayPatient);
			setNumberPage(2);
			setTotalPage(lastPage);

		} catch (error) {
			console.log(error)
		}
	}

	const loadMorePatient = async () => {
		console.log('cargando mas datos')
		try {
			if (numberPage < totalPage) {
				const { data: {patients, lastPage} } = await teleMedicinaApi.post(`/auth/get.pager_patients?page=${numberPage}`);
				let arrayPatient = listPatient;
				patients.forEach((patient) => {
					arrayPatient =  [...arrayPatient, {...patient, select: false}];
				});
	
				setListPatient(arrayPatient);
				setNumberPage(numberPage + 1);
				setTotalPage(lastPage);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleSelectPatient = (selectPatient) => {
		if (patient.rbd != selectPatient.rbd) {
			setListPatient(listPatient.map(patient => {
				return (patient.rbd == selectPatient.rbd) ? {...patient, select: true} : {...patient, select: false} 
			}));
			setPatient(selectPatient);
		}
	}

	const renderListPatient = ({item: patientRender}) => {
		return (
			<TouchableOpacity onPress={() => {handleSelectPatient(patientRender)}} key={patientRender._id}>	
				<ListItem key={patientRender._id} bottomDivider containerStyle={ patientRender.select && { backgroundColor: PRIMARY} }>
					<Avatar 
						key={patientRender._id}
						rounded
						title={patientRender.name.charAt(0)}
						size="medium"
						containerStyle={{
							backgroundColor: "silver",
						}}
					/>
					<ListItem.Content>
						<ListItem.Title style={ patientRender.select && styles.textSelectList || {fontSize: 12} }>{patientRender.name} {patientRender.lastname}</ListItem.Title>
						<ListItem.Subtitle style={ patientRender.select && styles.textSelectList || {fontSize: 12}}>{patientRender.rbd}</ListItem.Subtitle>
					</ListItem.Content>
					{ patientRender.select && <MaterialCommunityIcons name="chevron-right" color={WHITE} size={35} style={{ position: 'absolute', right: 0 }}/> }
				</ListItem>
			</TouchableOpacity>
		)
	}

	if (listPatient.length == 0) return <LoadingScreen text={'Cargando pacíentes'}/>

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
								styleWidth={{width: '70%'}}
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
								<FlatList 
									data={listPatient}
									keyExtractor={ (patientRender) => patientRender._id}
									renderItem={renderListPatient}
									onEndReached={loadMorePatient}
									onEndReachedThreshold={0.5}
								/>											
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