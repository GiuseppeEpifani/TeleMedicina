import React, { useEffect, useContext, useState } from 'react';
import { View, ActivityIndicator, Alert, Text } from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { Button } from 'react-native-elements';
import Card from '../../UI/Card';
import InputText from '../../UI/InputText';
import KeyboardView from '../../UI/KeyboardView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PatientReview from '../../components/home/PatientReview';
import ListItemPatient from '../../components/home/ListItemPatient';
import { PRIMARY, VERY_LIGHT, WHITE } from '../../const/Colors';
import { LoadingScreen } from '../../UI/LoadingScreen';
import { HomeContext } from '../../context/Home/HomeContext';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { format } from 'rut.js';
import CardSearch from '../../UI/CardSearch';

export const Home = ({navigation}) => {

 	const { getPatient, isCleanDebounce, loadingPatients, listPatient, patient, loadMorePatient, removeMessage, handleSelectPatient, disabled, message, loading, getPatientFilter, loadMorePatientWithFilter, totalPage, numberPage } = useContext(HomeContext);
	const [inputRun, setInputRun] = useState('');
	const [inputName, setInputName] = useState('');
	const [inputLastName, setInputLastName] = useState('');
	const [typeSearch, setTypeSearch] = useState(false);
	const debouncedRun = useDebouncedValue(inputRun);
	const debouncedName = useDebouncedValue(inputName);
	const debouncedLastName = useDebouncedValue(inputLastName);

	useEffect(() => {
		if (debouncedRun.trim().length > 0 && debouncedRun == '-') return;
		if (debouncedRun.trim().length == 0 && debouncedName.trim().length == 0 && debouncedLastName.trim().length == 0) {
			refreshListPatients();
		} else {
			handleDebounce();
		}
	}, [debouncedRun, debouncedName, debouncedLastName]);

	useEffect(() => {
		if (isCleanDebounce) {
			setInputRun('');
			setInputName('');
			setInputLastName('');
		}
	}, [isCleanDebounce]);

	useEffect(() => {
		refreshListPatients();
	}, []);

	useEffect(() => {
        if (message.length === 0) return;
        Alert.alert('Notificación', message, [ { text: 'Esta bien', onPress: removeMessage } ]);
    }, [message]);

	const refreshListPatients = async () => {
		await getPatient();
	}

	const handleDebounce = async () => {
		await getPatientFilter({ rbd: debouncedRun, name: debouncedName, lastname: debouncedLastName });
	}

	const cleanDebounce = (value) => {
		setInputRun('');
		setInputName('');
		setInputLastName('');
		setTypeSearch(value);
	}

	const renderListPatient = ({item: patientRender}) => {
		return (
			<View pointerEvents={disabled ? 'none' : 'auto'}>
				<ListItemPatient patientRender={patientRender} isSelected={patientRender.select} handleSelectPatient={handleSelectPatient} />
			</View>
		)
	}

	if (loading) return <LoadingScreen text={'Eliminando paciente'}/>

    return (
		<KeyboardView scrollEnabled={false} extraHeight={200} barColor={PRIMARY} backgroundColor={WHITE}>
			<View style={{flex: 1, padding: 20}}>
				<View style={{flex: 0.9, marginBottom: 30}}>
					<CardSearch header={true} switchHeader valueSwitch={typeSearch} setSwitch={cleanDebounce} titleFirstSwitch={'Run'} titleSecondSwitch={'Nombre'} title={'Ficha clinica'} padding={9}>
						{
							(!typeSearch) &&
							<View style={{alignItems: 'center'}}>
								<InputText 
									onChangeText={(text) => (text.trim().length > 0) ? setInputRun(format(text)) : setInputRun('')}
									value={inputRun}
									editable={!loadingPatients} 
									placeholder={'Buscar por run'} 
									keyboardType={'numeric'}
									nameIcon={"account-search"} 
									styleWidth={{width: '90%'}}
									buttonDelete
									onPress={(inputRun.trim().length > 0) ? () => setInputRun('') : false}
								/>
							</View>
						}
						{
							(typeSearch) && 
							<View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
								<View style={{flex: 1}}>
									<InputText 
										onChangeText={(text) => (text.trim().length > 0) ? setInputName(text) : setInputName('')}
										value={inputName}
										editable={!loadingPatients} 
										placeholder={'Buscar por nombres'} 
										keyboardType={'default'}
										nameIcon={"account-search"} 
										styleWidth={{width: '90%'}}
										buttonDelete
										onPress={(inputName.trim().length > 0) ? () => setInputName('') : false}
									/>
								</View>
								<View style={{flex: 0.05}} />
								<View style={{flex: 1}}>
									<InputText 
										onChangeText={(text) => (text.trim().length > 0) ? setInputLastName(text) : setInputLastName('')}
										value={inputLastName}
										editable={!loadingPatients} 
										placeholder={'Buscar por apellido paterno'} 
										keyboardType={'default'}
										nameIcon={"account-search"} 
										styleWidth={{width: '90%'}}
										buttonDelete
										onPress={(inputLastName.trim().length > 0) ? () => setInputLastName('') : false}
									/>
								</View>		
							</View>
						}
					</CardSearch>
				</View>
				<View style={{flex: 5}}>
					<Card header title={'Lista de pacientes'}>
						{
							loadingPatients &&
							<View style={{height: '96.5%', justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
							</View>
						}
						{
							(listPatient.length == 0 && debouncedRun.trim().length > 0 && !loadingPatients || listPatient.length == 0 && debouncedName.trim().length > 0 && !loadingPatients || listPatient.length == 0 && debouncedLastName.trim().length == 0 && !loadingPatients) &&
							<View style={{height: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%', top: 200}}>
								<View style={{width: '60%', height: 60, elevation: 10, backgroundColor: VERY_LIGHT, justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
									<Text style={{color: PRIMARY, fontSize: 22, fontWeight: 'bold'}}>Sin resultados</Text>
								</View>
							</View>
						}
						{
							listPatient.length >= 0 && !loadingPatients &&
							<View style={{flexDirection: 'row', height: '96.5%'}}>	
								<View style={{flex: 1}}>
									<OptimizedFlatList
										data={listPatient}
										keyExtractor={ (patientRender) => (patientRender?.local) ? patientRender.rbd : patientRender._id}
										renderItem={renderListPatient}
										onEndReached={(debouncedRun.trim().length == 0 && debouncedName.trim().length == 0 && debouncedLastName.trim().length == 0) ? loadMorePatient : () => debouncedRun != '-' ? loadMorePatientWithFilter({rbd: debouncedRun, name: debouncedName, lastname: debouncedLastName}) : loadMorePatient()}
										onEndReachedThreshold={0.5}
										ListFooterComponent={
											(numberPage < totalPage && totalPage) &&
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