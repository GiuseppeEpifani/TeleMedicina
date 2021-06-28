import React, { useEffect, useContext } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Card from '../../UI/Card';
import InputText from '../../UI/InputText';
import KeyboardView from '../../UI/KeyboardView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PatientReview from '../../components/home/PatientReview';
import ListItemPatient from '../../components/home/ListItemPatient';
import { PRIMARY, WHITE } from '../../const/Colors';
import { LoadingScreen } from '../../UI/LoadingScreen';
import { HomeContext } from '../../context/Home/HomeContext';

export const Home = ({navigation}) => {

 	const { getPatient, listPatient, patient, loadMorePatient, loading, handleSelectPatient, disabled } = useContext(HomeContext);

	useEffect(() => {
		getPatient();
	}, [])

	const renderListPatient = ({item: patientRender}) => {
		return (
			<View pointerEvents={disabled ? 'none' : 'auto'}>
				<ListItemPatient patientRender={patientRender} isSelected={patientRender.select} handleSelectPatient={handleSelectPatient} />
			</View>
		)
	}

	if (listPatient.length == 0) return <LoadingScreen text={'Cargando pacíentes'}/>

    return (
		<KeyboardView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>
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
									onEndReached={() => loadMorePatient()}
									onEndReachedThreshold={0.5}
									removeClippedSubviews={true}
								/>
								{ 
								loading && 
									<ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}}/>
								}										
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
		</KeyboardView>
    )
}