import React, { useState, useEffect, useContext } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { PRIMARY, WHITE } from '../../const/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../../UI/Card';
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import InputText from '../../UI/InputText';
import DatePicker from '../../UI/DatePicker';
import RadioButton from '../../UI/RadioButton';
import { FIELD_COMPLETE } from '../../const/Fields';
import Hr from '../../UI/Hr';
import teleMedicinaApi from '../../api/teleMedicinaApi';
import { getUser } from '../../helpers/getUser';
import { AuthContext } from '../../context/Auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = () => {

    const { isConnected, appOffline } = useContext(AuthContext);
    const [selectedGender, setSelectedGender] = useState(1)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [lastname, setLastname] = useState();
    const [surname, setSurname] = useState();
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [birthday, setBirthday] = useState();
    const [phone, setPhone] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [validated, setvalidated] = useState(false)

    const handleGetDate = (dateString) => {
        setBirthday(dateString);
    }

    const getUserConnected = async () => {
        if (isConnected) {
            const { data } = await teleMedicinaApi.post('/me');
            await AsyncStorage.setItem('user', JSON.stringify(data)); 
        }

        const user = await getUser();
        setName(user.name);
        setEmail(user.email);
        setLastname(user.lastname);
        setSurname(user.surname);
        setBirthday(user.birthday);
        setPhone(user.phone);
        setSelectedGender(user.gender);
        setLoading(false);
    }

    const updateUser = async () => {
        if (!isConnected) {
            Alert.alert(
                "Atención",
                "No se puede realizar esta acción cuando la aplicación esta modo offline." ,
                [
                    {
                        text: "Esta bien",
                        style: "cancel"
                    },
                ]
            );
            return;
        }

        setvalidated(true);
        if (name && email && lastname && birthday) {
            if (password || repeatPassword) {
                if (password != repeatPassword) {
                    return;
                }
        
                if (password.length < 6 || password.length > 15) {
                    return;
                }
            }
    
            setLoadingRequest(true);

            const user = {
                email,
                name,
                gender: selectedGender,
                lastname,
                surname,
                birthday,
                phone,
                password,
                password_score: 1
            };
            try {
                const { data } = await teleMedicinaApi.post('/set.update_profile', user);
    
                if (data.alert_type == 'success') {
                    Alert.alert(
                        'Notificación', data.message, [ { text: 'Esta bien' } ]
                    );
                    setPassword('');
                    setRepeatPassword('');
                    setvalidated(false);
                }

                setLoadingRequest(false);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getUserConnected();
    }, []);

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={50} barColor={PRIMARY} backgroundColor={WHITE}>
            <View style={{flex: 1, padding: 30}} pointerEvents={appOffline ? "none" : "auto"}>
                <View style={{flex: 5}}>
                    <Card header title={'Editar perfil'}>
                        {
                            (!loading) &&
                            <>
                                <View style={{height: '91%', padding: 12}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flex: 1}}>
                                            <InputText
                                                label={'Nombres'}
                                                labelError={(validated && !name) ? FIELD_COMPLETE : false}
                                                onChangeText={setName}
                                                value={name}
                                                editable={!isConnected}
                                                placeholder={'Ingrese sus nombres'} 
                                                keyboardType={'default'} 
                                                nameIcon={"account-details"} 
                                            />
                                        </View>
                                        <View style={{flex:0.050}}/>
                                        <View style={{flex: 1}}>
                                            <InputText
                                                label={'Apellido paterno'}
                                                labelError={(validated && !lastname) ? FIELD_COMPLETE : false}
                                                onChangeText={setLastname}
                                                value={lastname}
                                                placeholder={'Ingrese su apellido'} 
                                                keyboardType={'default'} 
                                                nameIcon={"account-details"}
                                            />
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flex: 1}}>
                                            <InputText
                                                label={'Apellido materno'}
                                                onChangeText={setSurname}
                                                value={surname}
                                                placeholder={'Ingrese su apellido'}
                                                keyboardType={'default'} 
                                                nameIcon={"account-details"} 
                                            />
                                        </View>
                                        <View style={{flex:0.050}}/>
                                        <View style={{flex: 1}}>
                                            <InputText
                                                label={'Correo'}
                                                labelError={(validated && !email) ? FIELD_COMPLETE : false}
                                                onChangeText={setEmail}
                                                value={email}
                                                placeholder={'Ingrese su correo'}
                                                keyboardType={'default'} 
                                                nameIcon={"email"} 
                                            />
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flex: 1}}>
                                            <InputText 
                                                label={'Teléfono'}
                                                labelError={false}
                                                onChangeText={setPhone}
                                                value={phone}
                                                placeholder={'Ingrese su teléfono'} 
                                                keyboardType={'numeric'} 
                                                nameIcon={"phone"}
                                            />
                                        </View>
                                        <View style={{flex:0.050}}/>
                                        <View style={{flex: 1}}>
                                            <DatePicker handleGetDate={handleGetDate} value={birthday} labelError={false} label={'Fecha de nacimiento'} />
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                                        <View style={{flex: 1}}>
                                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#A9A9A9', marginLeft: 10, marginBottom: 12}}>Género</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <TouchableOpacity onPress={() => {setSelectedGender(1)}}>
                                                    <RadioButton selected={selectedGender == 1} label={'Género'} labelRadio={'Masculino'}/>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {setSelectedGender(0)}}>
                                                    <RadioButton selected={selectedGender == 0} label={' '} labelRadio={'Femenino'}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <Hr />
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                                        <View style={{flex: 1}}>
                                            <InputText
                                                label={'Ingrese nueva contraseña'}
                                                labelError={(validated && password.trim().length > 0) ? (password != repeatPassword) ? 'La contraseña no coinciden' : (password.length < 6 || password.length > 16) ? 'La contraseña debe ser mayor que 6 caracteres y menor que 16' : false : false}
                                                onChangeText={setPassword}
                                                value={password}
                                                placeholder={'********'} 
                                                keyboardType={'default'} 
                                                secureTextEntry={true}
                                                nameIcon={"lock"} 
                                            />
                                        </View>
                                        <View style={{flex:0.050}}/>
                                        <View style={{flex: 1}}>
                                            <InputText
                                                label={'Repetir nueva contraseña'}
                                                labelError={(validated && repeatPassword.trim().length > 0) ? (password != repeatPassword) ? ' ' : (password.length < 6 || password.length > 16) ? ' ' : false : false}
                                                onChangeText={setRepeatPassword}
                                                value={repeatPassword}
                                                placeholder={'********'} 
                                                keyboardType={'default'}
                                                secureTextEntry={true}
                                                nameIcon={"lock"}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{height: '5%', width: '100%'}}>
                                    <Button title="Guardar" buttonStyle={{height: 50, backgroundColor: PRIMARY}} titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                        icon={
                                            <Icon
                                                name="content-save"
                                                size={25}
                                                color="white"
                                            />
                                        }
                                        loading={loadingRequest}
                                        disabled={loadingRequest}
                                        onPress={updateUser}
                                    />
                                </View>
                            </>
                        }
                        {
                            (loading) &&
                            <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size="large" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                            </View>
                        }
                    </Card>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        </KeyboardScrollView>
    )
}
