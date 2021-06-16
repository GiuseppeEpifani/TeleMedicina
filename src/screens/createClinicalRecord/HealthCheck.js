import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Badge, Button, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SUCCESS, VERY_LIGHT, WHITE } from '../../const/Colors'
import KeyboardScrollView from '../../UI/KeyboardScrollView'
import InputText from '../../UI/InputText';
import ContainerCamera from '../../UI/ContainerCamera';
import Card from '../../UI/Card';
import { CardInfoPatient } from '../../components/infoPatient/CardInfoPatient';
import InputTextWithInfo from '../../UI/InputTextWithInfo';

export const HealthCheck = ({navigation}) => {

    const [uri, setUri] = useState();

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={50} barColor={PRIMARY} backgroundColor={WHITE}>
            <View style={{flex: 1}}>
                <View style={{height: 26, width: '100%', flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                        <Badge value="1" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                        <Badge value="2" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: VERY_LIGHT}}>
                        <Badge value="3" badgeStyle={{backgroundColor: PRIMARY}} textStyle={{color: WHITE}} />
                    </View>
                </View>

                <View style={{flex: 0.3, paddingHorizontal: 30, paddingBottom: 10}}>
                    <CardInfoPatient onlyDate/>
                </View>
				<View style={{flex: 1, paddingHorizontal: 30, marginTop: 10}}>
                    <Card padding={10}>
                        <ScrollView>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Presión arterial'}
                                        containerStyle={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                                        styleWidth={{width: '100%'}}
                                        labelError={false}
                                        onChangeText={() => {}} 
                                        placeholder={' '} 
                                        keyboardType={'default'}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={' '}
                                        containerStyle={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                        labelError={false}
                                        textInfo={'mm Hg'}
                                        onChangeText={() => {}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Frecuencia cardiaca'}
                                        labelError={false}
                                        textInfo={'ppm'}
                                        onChangeText={() => {}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputText 
                                        label={'Frecuencia respiratoria'}
                                        labelError={false}
                                        onChangeText={(text) => {console.log(text)}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Glicemia'}
                                        containerStyle={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                                        labelError={false}
                                        textInfo={'mg / dl'}
                                        onChangeText={() => {}}
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={' '}
                                        containerStyle={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                        styleWidth={{width: '100%'}}
                                        labelError={false}
                                        onChangeText={() => {}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Saturación O2'}
                                        labelError={false}
                                        textInfo={'%'}
                                        onChangeText={() => {}}
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Temperatura'}
                                        labelError={false}
                                        textInfo={'°C'}
                                        onChangeText={() => {}}
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Peso'}
                                        labelError={false}
                                        textInfo={'Kg'}
                                        onChangeText={() => {}}
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Estatura'}
                                        labelError={false}
                                        textInfo={'mts'}
                                        onChangeText={() => {}}
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>                                           
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <ContainerCamera setUri={setUri} label={'Apoyo Audiovisual'}/>
                                </View>
                                <View style={{flex: 1}}/>
                            </View>
                        </ScrollView>
                    </Card>
                </View>
                <View style={{flex: 0.05}}/>            
            </View>
            <View style={{flex: 0.18}}>
                <Button title="Siguiente" buttonStyle={{height: 70, backgroundColor: PRIMARY}} titleStyle={{fontSize: 32, fontWeight: 'bold', marginLeft: 10}} 
                    icon={
                        <Icon
                            name="menu-right"
                            size={56}
                            color="white"
                        />
                    }
                    iconRight
                    onPress={() => navigation.navigate('Dimensions')}
                    />
            </View>
        </KeyboardScrollView>
    )
}
