import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArrowBack from '../../UI/ArrowBack'
import Card from '../../UI/Card'
import ComboBox from '../../UI/ComboBox';
import DatePicker from '../../UI/DatePicker';
import InputText from '../../UI/InputText'
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import RadioButton from '../../UI/RadioButton';
import { styles } from './style';
import { BLACK, PRIMARY, WARNING, WHITE } from '../../const/Colors';

export const EditPatient = ({navigation}) => {

    const handleGetDate = (dateString) => {
        console.log(dateString);
    }

    const handleGetCommune = (value) => {
        console.log(value);
    }

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={50} barColor={PRIMARY} backgroundColor={WHITE}>
            <View style={{flex: 1}}>
                <View style={{flex: 0.1, marginBottom: 26}}>
                    <ArrowBack navigation={navigation}/>
                </View>
                <View style={{flex: 5, padding: 30}}>
                    <Card header title={'Editar datos paciente'}>
                        <View style={{height: '90.8%', padding: 12}}>
                            <ScrollView style={{padding: 8}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                        label={'RUN'}
                                        labelError={false}
                                        onChangeText={() => {}} 
                                        placeholder={'Ingrese su run'} 
                                        keyboardType={'default'} 
                                        nameIcon={"card-account-details"}
                                    />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                        label={'Nombres'}
                                        labelError={false}
                                        onChangeText={(text) => {console.log(text)}} 
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
                                        labelError={false}
                                        onChangeText={() => {}} 
                                        placeholder={'Ingrese su apellido'} 
                                        keyboardType={'default'} 
                                        nameIcon={"account-details"}
                                    />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                        label={'Apellido materno'}
                                        labelError={false}
                                        onChangeText={(text) => {console.log(text)}} 
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
                                            <TouchableOpacity onPress={() => {}}>
                                                <RadioButton selected label={'Género'} labelRadio={'Masculino'}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {}}>
                                                <RadioButton label={' '} labelRadio={'Femenino'}/>
                                            </TouchableOpacity>
                                        </View>   
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <DatePicker handleGetDate={handleGetDate} labelError={false}/>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                        label={'Teléfono'}
                                        labelError={false}
                                        onChangeText={() => {}} 
                                        placeholder={'Ingrese su teléfono'} 
                                        keyboardType={'default'} 
                                        nameIcon={"phone"}
                                    />
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                        label={'Correo'}
                                        labelError={false}
                                        onChangeText={(text) => {console.log(text)}} 
                                        placeholder={'Ingrese su correo'} 
                                        keyboardType={'default'} 
                                        nameIcon={"email"} 
                                    />
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <ComboBox label={"Región"} styles={{zIndex: 2}} labelError={false} handleGetValue={handleGetCommune}/>                   
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <ComboBox label={"Provincia"} handleGetValue={handleGetCommune}/>                   
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{flex: 1}}>
                                        <ComboBox label={"Comuna"} labelError={false} handleGetValue={handleGetCommune}/>                   
                                    </View>
                                    <View style={{flex:0.050}}/>
                                    <View style={{flex: 1}}>
                                        <InputText 
                                            label={'Dirección'}
                                            labelError={false}
                                            onChangeText={(text) => {console.log(text)}} 
                                            placeholder={'Ingrese su dirección'} 
                                            keyboardType={'default'} 
                                            nameIcon={"map-marker"} 
                                        />            
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{height: '5%', width: '100%'}}>
                            <Button title="Guardar" buttonStyle={{height: 50, backgroundColor: WARNING}} titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}}  
                                icon={
                                    <Icon
                                        name="edit"
                                        size={25}
                                        color="white"
                                    />
                                }
                            />
                        </View>
                    </Card>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        </KeyboardScrollView>
    )
}