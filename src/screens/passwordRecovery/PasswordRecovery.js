import React, { useState } from 'react'
import { Button } from 'react-native-elements';
import { View, Text, Image, Alert } from 'react-native';
import Card from '../../UI/Card'
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import ArrowBack from '../../UI/ArrowBack';
import InputText from '../../UI/InputText';
import { FIELD_COMPLETE, EMAIL_INVALID } from '../../const/Fields';
import { PRIMARY } from '../../const/Colors';
import { styles } from './style';
import teleMedicinaLogin from '../../api/baseURL';

export const PasswordRecovery = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [validField, setValidField] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [email, setEmail] = useState();

    const handleSubmit = async () => {
        setValidField(true);
        if (email) {
            const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            let isValid = emailRegex.test(email);
            setIsValidEmail(isValid);
            if (isValid) {
                setLoading(true);
                try {
                    const { data } = await teleMedicinaLogin.post('/password/email', { email });
                    Alert.alert(
                        'Notificación', data.message, [ { text: 'Esta bien' } ]
                    );
                    setEmail();
                    setValidField(false);
                } catch (error) {
                    console.log(error);
                    setEmail();
                    setValidField(false);
                    setLoading(false);
                }
            }
        }
        setLoading(false);
    }

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={150}>
            <View style={{flex: 0.5}}>
                <ArrowBack onPress={() => navigation.goBack()} />
            </View>
            <View style={{flex: 5}}>
                <View style={{alignItems: 'center', marginBottom: 40, flex: 1}}>
                    <Image style={styles.logo} source={require('../../assets/logo_telemedicina.png')}/>
                </View>
                <View style={{padding: 30, flex: 1}}>
                    <Card header={false} padding={15}>
                        <Text style={styles.title}>¿Olvidaste la contraseña?</Text>
                        <Text style={styles.textDescription}>Lo entendemos pasan cosas. Simplemente ingrese su dirección de correo electrónico a continuación y le enviaremos un enlace para reestablecer su contraseña.</Text>

                        <InputText 
                            label="Correo electrónico"
                            labelError={ validField ? email ? !isValidEmail ? EMAIL_INVALID : false : FIELD_COMPLETE : false}
                            onChangeText={setEmail}
                            value={email} 
                            placeholder={'Ingrese su correo electrónico'} 
                            keyboardType={'default'} 
                            nameIcon={"email"} 
                        />

                        <Button
                        containerStyle={{ borderRadius: 15, marginTop: 10 }}
                        buttonStyle={{backgroundColor: PRIMARY}}
                        title="Reestablecer contraseña"
                        loading={loading}
                        disabled={loading}
                        onPress={ () => handleSubmit() }
                        />
                    </Card>
                </View>
                <View style={{flex: 0.05}} />
            </View>
        </KeyboardScrollView>        
    )
}