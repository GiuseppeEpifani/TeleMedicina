import React, { useContext, useState }  from 'react'
import { Button, CheckBox } from 'react-native-elements';
import { View, Text, Keyboard, Image } from 'react-native';
import { AuthContext } from '../../context/Auth/AuthContext'
import Card from '../../UI/Card';
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import InputText from '../../UI/InputText';
import { useForm } from '../../hooks/useForm';
import { EMAIL_INVALID, FIELD_COMPLETE } from '../../const/Fields';
import { styles } from './style';
import { PRIMARY } from '../../const/Colors';

export const SignIn = ({ navigation }) => {

    const [cheked, setChecked] = useState(false)
    const { authState, signIn, logout} = useContext(AuthContext)
    const [ formValues, handleInputChange, validateForm, setValidateForm, isSubmit ] = useForm({ fields: { email: { value: '', isValid: false, isComplete: false }, password: { value: '', isValid: false, isComplete: false }}, validate: false });
    const { email, password } = formValues;
    
    const handleSubmit = () => {
        setValidateForm(true);

        if (isSubmit) {
            signIn();
            Keyboard.dismiss();
        }
    }

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={200} barColor={PRIMARY}>
            <View style={{flex: 1,  padding: 30}}>
                <View style={{ alignItems: 'center', marginBottom: 20, flex: 1}}>
                    <Image style={styles.logo} source={require('../../assets/logo_telemedicina.png')}/>
                </View>
                <View style={{ flex: 1.2 }}>
                    <Card header={false} padding={15}>
                            <Text style={styles.title}>Bienvenido a TeleMedicina</Text>

                            <InputText 
                                label="Correo electrónico"
                                labelError={validateForm ? (!email.isComplete ? FIELD_COMPLETE : !email.isValid ? EMAIL_INVALID : '') : false}
                                onChangeText={text => handleInputChange(text, 'email')}
                                value={email.value} 
                                placeholder={'Ingrese su correo electrónico'} 
                                keyboardType={'default'} 
                                nameIcon={"email"} 
                            />

                            <InputText 
                                label="Contraseña"
                                labelError={validateForm ? (!password.isComplete ? FIELD_COMPLETE : '') : false}
                                onChangeText={text => handleInputChange(text, 'password')}
                                value={password.value} 
                                placeholder={'*********************'} 
                                keyboardType={'default'} 
                                nameIcon={"lock"} 
                            />

                            <CheckBox
                                title='Recuerdame'
                                onPress={ () => setChecked(!cheked)}
                                checked={cheked}
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
            </View>
        </KeyboardScrollView>
    )
}

