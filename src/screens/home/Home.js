import React, { useEffect, useContext, useState } from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
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
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { format } from 'rut.js'
import { RecordContext } from '../../context/RecordFile/RecordContext';

export const Home = ({navigation}) => {

 	const { getPatient, listPatient, patient, loadMorePatient, removeMessage, handleSelectPatient, disabled, message, loading, getPatientFilter, loadMorePatientWithRbd } = useContext(HomeContext);

	const [inputSearch, setInputSearch] = useState('');
	const [loadingPatients, setLoadingPatients] = useState(false);
	const debouncedValue = useDebouncedValue(inputSearch);

	useEffect(() => {
		if (debouncedValue.trim().length == 0) {
			refreshListPatients();
		} else {
			handleDebounce();
		}
	}, [debouncedValue]);

	useEffect(() => {
		getPatient();
	}, []);

	useEffect(() => {
        if (message.length === 0) return;

        Alert.alert(
            'Notificación', message, [ { text: 'Esta bien', onPress: removeMessage } ]
        );

    }, [message]);

	const refreshListPatients = async () => {
		setLoadingPatients(true);
		await getPatient(debouncedValue);
		setLoadingPatients(false);
	}

	const handleDebounce = async () => {
		setLoadingPatients(true);
		await getPatientFilter(debouncedValue);
		setLoadingPatients(false);
	}

	const renderListPatient = ({item: patientRender}) => {
		return (
			<View pointerEvents={disabled ? 'none' : 'auto'}>
				<ListItemPatient patientRender={patientRender} isSelected={patientRender.select} handleSelectPatient={handleSelectPatient} />
			</View>
		)
	}

	if (loading) return <LoadingScreen text={'Eliminando pacíente'}/>

    return (
		<KeyboardView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>
			<View style={{flex: 1, padding: 20}}>
				<View style={{flex: 0.9, marginBottom: 30}}>
					<Card header={true} title={'Ficha clinica'} padding={9}>
						<View style={{alignItems: 'center'}}>
							<InputText 
								labelError={false}
								onChangeText={(text) => (text.trim().length > 0) ? setInputSearch(format(text)) : setInputSearch('')}
								value={inputSearch}
								editable={!loadingPatients} 
								placeholder={'Buscar por run'} 
								keyboardType={'numeric'}
								nameIcon={"account-search"} 
								styleWidth={{width: '70%'}}
								buttonDelete
								onPress={(inputSearch.trim().length > 0) ? () => setInputSearch('') : false}
							/>						
						</View>
					</Card>
				</View>
				<View style={{flex: 5}}>
					<Card header title={'Lista de pacientes'}>
						{
							loadingPatients &&
							<View style={{height: '96.5%', justifyContent: 'center', alignItems: 'center'}}>
								<ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}}/>
							</View>
						}
						{
							(listPatient.length == 0) && !loadingPatients &&
							<View style={{height: '96.5%', justifyContent: 'center', alignItems: 'center'}}>
								<Text style={{color: PRIMARY, fontSize: 22, fontWeight: 'bold'}}>Sin resultados</Text>
							</View>
						}
						{
							(listPatient.length > 0) && !loadingPatients &&
							<View style={{flexDirection: 'row', height: '96.5%'}}>	
								<View style={{flex: 1}}>
									<OptimizedFlatList
										data={listPatient}
										keyExtractor={ (patientRender) => patientRender._id}
										renderItem={renderListPatient}
										onEndReached={(inputSearch.trim().length == 0) ? loadMorePatient : () => loadMorePatientWithRbd(inputSearch)}
										onEndReachedThreshold={0.5}
										ListFooterComponent={
											(inputSearch.trim().length == 0) &&
											<ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}}/>
										}
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
						}				
					</Card>
				</View>
				<View style={{flex: 0.5}} />
			</View>
		</KeyboardView>
    )
}