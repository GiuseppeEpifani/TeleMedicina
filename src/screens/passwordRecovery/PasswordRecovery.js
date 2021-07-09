import React from 'react'
import { Button } from 'react-native-elements';
import { View, Text, Image } from 'react-native';
import Card from '../../UI/Card'
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import ArrowBack from '../../UI/ArrowBack';
import InputText from '../../UI/InputText';
import { useForm } from '../../hooks/useForm';
import { FIELD_COMPLETE, EMAIL_INVALID } from '../../const/Fields';
import { PRIMARY } from '../../const/Colors';
import { styles } from './style';

export const PasswordRecovery = ({ navigation }) => {

    const [ formValues, handleInputChange ] = useForm({  email: { value: '', isComplete: false }});
    const { email } = formValues;

    const handleSubmit = () => {
    }

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={150}>
            <View style={{flex: 0.5}}>
                <ArrowBack navigation={navigation}/>
            </View>
            <View style={{flex: 5}}>
                <View style={{alignItems: 'center', marginBottom: 40, flex: 1}}>
                    <Image style={styles.logo} source={require('../../assets/logo_telemedicina.png')}/>
                </View>
                <View style={{padding: 40, flex: 1}}>
                    <Card header={false} padding={15}>
                        <Text style={styles.title}>¿Olvidaste la contraseña?</Text>
                        <Text style={styles.textDescription}>Lo entendemos pasan cosas. Simplemente ingrese su dirección de correo electrónico a continuación y le enviaremos un enlace para reestablecer su contraseña.</Text>

                        <InputText 
                            label="Correo electrónico"
                            labelError={(!email.isComplete ? FIELD_COMPLETE : !email.isValid ? EMAIL_INVALID : '')}
                            onChangeText={text => handleInputChange(text, 'email')}
                            value={email.value} 
                            placeholder={'Ingrese su correo electrónico'} 
                            keyboardType={'default'} 
                            nameIcon={"email"} 
                        />

                        <Button
                        containerStyle={{ borderRadius: 15, marginTop: 10 }}
                        buttonStyle={{backgroundColor: PRIMARY}}
                        title="Reestablecer contraseña"
                        loading={false}
                        onPress={ () => handleSubmit() }
                        />
                    </Card>
                </View>
            </View>
        </KeyboardScrollView>        
    )
}