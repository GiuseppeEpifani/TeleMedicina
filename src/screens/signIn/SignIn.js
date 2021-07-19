import React, { useContext, useState, useEffect }  from 'react'
import { Button } from 'react-native-elements';
import { View, Text, Keyboard, Image, Alert } from 'react-native';
import { AuthContext } from '../../context/Auth/AuthContext'
import Card from '../../UI/Card';
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import InputText from '../../UI/InputText';
import { useForm } from '../../hooks/useForm';
import { EMAIL_INVALID, FIELD_COMPLETE } from '../../const/Fields';
import { styles } from './style';
import { PRIMARY } from '../../const/Colors';

export const SignIn = ({ navigation }) => {

    const { signIn,errorMessage, removeError} = useContext(AuthContext)
    const [isValidEmail, setisValidEmail] = useState(true)
    const [formValues, handleInputChange] = useForm({ email: { value: '', isComplete: false }, password: { value: '', isComplete: false }});
    const [validField, setValidField] = useState(false)
    const { email, password } = formValues;

    useEffect(() => {
        if (errorMessage.length === 0) return;

        Alert.alert(
            'Login incorrecto', errorMessage, [ { text: 'Esta bien', onPress: removeError } ]
        );

    }, [errorMessage])
 
    const handleSubmit = () => {
        setValidField(true);
        if (email.isComplete && password.isComplete) {
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            let isValid = emailRegex.test(email.value);

            if (!isValid) {
                setisValidEmail(false); 
                return
            }

            setisValidEmail(true);
            signIn({email, password});
            Keyboard.dismiss(); 
        }
    }

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={200} barColor={PRIMARY}>
            <View style={{flex: 1,  padding: 30}}>
                <View style={{ alignItems: 'center', marginBottom: 20, flex: 1}}>
                    <Image style={styles.logo} source={require('../../assets/logo_telemedicina.png')} />
                </View>
                <View style={{ flex: 1 }}>
                    <Card header={false} padding={15}>
                            <Text style={styles.title}>Bienvenido a TeleMedicina</Text>

                            <InputText
                                label="Correo electrónico"
                                onChangeText={text => handleInputChange(text, 'email')}
                                labelError={ validField ? email.value ? !isValidEmail ? EMAIL_INVALID : false : FIELD_COMPLETE : false}
                                value={email.value}
                                placeholder={'Ingrese su correo electrónico'} 
                                keyboardType={'default'} 
                                nameIcon={"email"} 
                            />

                            <InputText 
                                label="Contraseña"
                                onChangeText={text => handleInputChange(text, 'password')}
                                labelError={ validField ? password.value ? false : FIELD_COMPLETE : false }
                                value={password.value} 
                                placeholder={'*********************'} 
                                keyboardType={'default'}
                                secureTextEntry={true}
                                nameIcon={"lock"} 
                            />

                            <Button
                                containerStyle={{ borderRadius: 15, marginTop: 10 }}
                                buttonStyle={{backgroundColor: PRIMARY}}
                                title="Iniciar Sesión"
                                loading={false}
                                onPress={ () => handleSubmit() }
                            />

                            <Text style={styles.textRecovery} onPress={() => navigation.navigate('PasswordRecovery')}>Recuperar contraseña</Text>
                    </Card>
                </View>
                <View style={{flex: 0.08}}/>
            </View>
        </KeyboardScrollView>
    )
}