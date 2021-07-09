import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowBack from '../../UI/ArrowBack'
import Card from '../../UI/Card'
import PickerSingleSelect from '../../UI/PickerSingleSelect';
import DatePicker from '../../UI/DatePicker';
import InputText from '../../UI/InputText'
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import RadioButton from '../../UI/RadioButton';
import { styles } from './style';
import { PRIMARY, WHITE, WARNING } from '../../const/Colors';
import { HomeContext } from '../../context/Home/HomeContext';
import { useForm } from '../../hooks/useForm';
import { FIELD_COMPLETE, EMAIL_INVALID, RUN_INVALID, PHONE_INVALID } from '../../const/Fields';
import { validate, format } from 'rut.js'
import { LoadingScreen } from '../../UI/LoadingScreen';
import { useGetRegions } from '../../hooks/useGetRegions';

export const EditPatient = ({navigation}) => {

    const { updatePatient, loading, patient } = useContext(HomeContext);
    const [selectedGender, setSelectedGender] = useState(1)
    const [isValidEmail, setisValidEmail] = useState(true);
    const [isValidRun, setisValidRun] = useState(true);
    const [isValidPhone, setisValidPhone] = useState(true);
    const [validInputs, setValidInputs] = useState(false);
    const [regions, setRegions] = useState([]);
    const [idSelectedRegion, setIdSelectedRegion] = useState(null);
    const [provinces, setProvinces] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState(null);
    const [communes, setCommunes] = useState([]);
    const [communeSelected, setCommuneSelected] = useState(null);
    const [formValues, handleInputChange] = useForm({ email: { value: patient.email, isComplete: patient.email ? true : false }, address: { value: patient.address, isComplete: patient.address ? true : false }, birthday: { value: patient.birthday, isComplete: patient.birthday ? true : false }, lastname: { value: patient.lastname, isComplete: patient.lastname ? true : false }, phone: { value: patient.phone, isComplete: patient.phone ? true : false }, rbd: { value: patient.rbd, isComplete: patient.rbd ? true : false }, surname: { value: patient.surname, isComplete: patient.surname ? true : false }, name: { value: patient.name, isComplete: patient.name ? true : false }});
    const { email, address, birthday, lastname, phone, rbd, surname, name } = formValues;
    const arrayRegions = useGetRegions();

    useEffect(() => {
        if (arrayRegions) {
            let regions = JSON.parse(arrayRegions);
            const regionsFormat = regions.map(region => { return { label: region.region, value: region._id } });
            setRegions(regionsFormat);
            if (patient.commune) {
                regions.forEach(region => {
                    region.provinces.forEach(province => {
                        province.communes.forEach(commune => {
                            if (commune.code == patient.commune.code) {
                                setIdSelectedRegion(region._id);
                                const { provinces } = regions.find(regionCurrent => regionCurrent._id === region._id);
                                const provincesName = provinces.map(({name}) => { return { label: name, value: name }});
                                const provincesFound = provinces.find(prov => prov.name == province.name);
                                const communesFormat = provincesFound.communes.map(commune => { return { label: commune.name, value: commune.code } });
                                setProvinces(provincesName);
                                setCommunes(communesFormat);
                                setProvinceSelected(province.name);
                                setCommuneSelected(commune.code);
                            }
                        });
                    });
                });
            }
        }
    }, [arrayRegions]);

    const handleSetRegion = (value) => {
        const regionValue = value();
        setIdSelectedRegion(value);
        setProvinceSelected(null);
        setCommuneSelected(null);
        setCommunes([]);
        const regions = JSON.parse(arrayRegions);
        const { provinces } = regions.find(region => region._id === regionValue);
        const provincesName = provinces.map(({name}) => { return { label: name, value: name }});
        setProvinces(provincesName);
    }

    const handleSetProvince = (value) => {
        const provinceValue = value();
        setProvinceSelected(value);
        setCommuneSelected(null);
        const regions = JSON.parse(arrayRegions);
        const { provinces } = regions.find(region => region._id === idSelectedRegion);
        const provincesFound = provinces.find(prov => prov.name == provinceValue);
        const communesFormat = provincesFound.communes.map(commune => { return { label: commune.name, value: commune.code } });
        setCommunes(communesFormat);
    }

    const handleGetDate = (dateString) => {
        handleInputChange(dateString, 'birthday');
    }

    const handleSetPatient = async () => {
        if (birthday.isComplete  && rbd.isComplete && name.isComplete) {
            if (!validate(rbd.value)) {
                setValidInputs(true);
                return setisValidRun(false);
            } else {
                setisValidRun(true);
            }

            if (email.isComplete) {
                const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                let isValidEmail = emailRegex.test(email.value);

                if (!isValidEmail) {
                    setValidInputs(true);
                    return setisValidEmail(false);
                } else {
                    setisValidEmail(true); 
                }
            }

            if (phone.isComplete) {
                if (phone.value.trim().length != 9 || phone.value.charAt(0) != 9) {
                    setValidInputs(true);
                    return setisValidPhone(false);
                } else {
                    setisValidPhone(false);
                }
            }
      
            if (idSelectedRegion && !provinceSelected && !communeSelected || idSelectedRegion && !provinceSelected || idSelectedRegion &&  !communeSelected) {
                return;
            }

            let comuneObject = null;
            if (communeSelected) {
                comuneObject = communes.find(commune => commune.value == communeSelected);
                comuneObject = {
                    code: comuneObject.value,
                    name: comuneObject.label
                };
            }

            await updatePatient(
                {
                    id: patient._id,
                    email: email.value,
                    gender: selectedGender,
                    address: address.value, 
                    birthday: birthday.value, 
                    commune: comuneObject, 
                    lastname: lastname.value, 
                    phone: phone.value, 
                    rbd: rbd.value, 
                    surname: surname.value, 
                    name: name.value 
                }
            );

            navigation.goBack();
        } else {
            setValidInputs(true);
        }
    }

    if (loading) return <LoadingScreen text={'Editando pacíente'} />

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={50} barColor={PRIMARY} backgroundColor={WHITE}>
            <View style={{flex: 1}}>
                <View style={{flex: 0.1, marginBottom: 26}}>
                    <ArrowBack navigation={navigation}/>
                </View>
                <View style={{flex: 5, padding: 30}}>
                    <Card header title={`Pacíente run: ${patient.rbd}`}>
                        <View style={{height: '90.8%', padding: 12}}>
                            <ScrollView style={{padding: 8}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <InputText
                                            label={'RUN'}
                                            labelError={ validInputs ? rbd.value ? !isValidRun ? RUN_INVALID : false : FIELD_COMPLETE : false}
                                            onChangeText={(text) => handleInputChange(format(text), 'rbd')}
                                            value={rbd.value}
                                            keyboardType={'numeric'}
                                            placeholder={'Ingrese su run'}
                                            keyboardType={'default'} 
                                            nameIcon={"card-account-details"}
                                        />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText
                                            label={'Nombres'}
                                            labelError={!name.isComplete && validInputs && FIELD_COMPLETE}
                                            onChangeText={(text) => handleInputChange(text, 'name')}
                                            value={name.value}
                                            placeholder={'Ingrese sus nombres'} 
                                            keyboardType={'default'} 
                                            nameIcon={"account-details"} 
                                        />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <InputText
                                            label={'Apellido paterno'}
                                            labelError={!lastname.isComplete && validInputs && FIELD_COMPLETE}
                                            onChangeText={(text) => handleInputChange(text, 'lastname')}
                                            value={lastname.value}
                                            placeholder={'Ingrese su apellido'} 
                                            keyboardType={'default'} 
                                            nameIcon={"account-details"}
                                        />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText
                                            label={'Apellido materno'}
                                            labelError={!surname.isComplete && validInputs && FIELD_COMPLETE}
                                            onChangeText={(text) => handleInputChange(text, 'surname')}
                                            value={surname.value}
                                            placeholder={'Ingrese su apellido'}
                                            keyboardType={'default'} 
                                            nameIcon={"account-details"} 
                                        />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <Text style={styles.labelRadio}>Género</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity onPress={() => {setSelectedGender(1)}}>
                                                <RadioButton selected={selectedGender == 1} label={'Género'} labelRadio={'Masculino'}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {setSelectedGender(0)}}>
                                                <RadioButton selected={selectedGender == 0} label={' '} labelRadio={'Femenino'}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <DatePicker handleGetDate={handleGetDate} value={birthday.value} labelError={!birthday.isComplete && validInputs && FIELD_COMPLETE} label={'Fecha de nacimiento'} />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                            label={'Teléfono'}
                                            labelError={ validInputs ? phone.value ? !isValidPhone ? PHONE_INVALID : false : FIELD_COMPLETE : false}
                                            onChangeText={(text) => handleInputChange(text, 'phone')}
                                            value={phone.value}
                                            placeholder={'Ingrese su teléfono'} 
                                            keyboardType={'numeric'} 
                                            nameIcon={"phone"}
                                        />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText
                                            label={'Correo'}
                                            labelError={ validInputs ? email.value ? !isValidEmail ? EMAIL_INVALID : false : FIELD_COMPLETE : false}
                                            onChangeText={(text) => handleInputChange(text, 'email')}
                                            value={email.value}
                                            placeholder={'Ingrese su correo'}
                                            keyboardType={'default'} 
                                            nameIcon={"email"} 
                                        />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <PickerSingleSelect items={regions} label={"Región"} setValue={handleSetRegion} value={idSelectedRegion} />
                                    </View>
                                    <View style={{flex:0.050}} />
                                    <View style={{flex: 1}}>
                                        <PickerSingleSelect items={provinces} label={"Provincia"} setValue={handleSetProvince} value={provinceSelected} value={provinceSelected} labelError={(idSelectedRegion && !provinceSelected) ? FIELD_COMPLETE : false} />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <PickerSingleSelect items={communes} label={"Comuna"} setValue={setCommuneSelected} value={communeSelected} value={communeSelected} labelError={(idSelectedRegion && !communeSelected) ? FIELD_COMPLETE : false} />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                            label={'Dirección'}
                                            onChangeText={(text) => handleInputChange(text, 'address')}
                                            value={address.value}
                                            placeholder={'Ingrese su dirección'} 
                                            keyboardType={'default'} 
                                            nameIcon={"map-marker"} 
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{height: '5%', width: '100%'}}>
                            <Button title="Editar" buttonStyle={{height: 50, backgroundColor: WARNING}} titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                icon={
                                    <Icon
                                        name="account-edit"
                                        size={25}
                                        color="white"
                                    />
                                }
                                onPress={handleSetPatient}
                            />
                        </View>
                    </Card>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        </KeyboardScrollView>
    )
}