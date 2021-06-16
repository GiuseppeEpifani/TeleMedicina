import React, { useState } from 'react'
import { View, Text, ScrollView} from 'react-native'
import { Badge, Button, Switch } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CardInfoPatient } from '../../components/infoPatient/CardInfoPatient';
import { LIGHT, PRIMARY, SUCCESS, VERY_LIGHT, WHITE } from '../../const/Colors'
import Card from '../../UI/Card';
import DatePicker from '../../UI/DatePicker';
import Hr from '../../UI/Hr';
import InputText from '../../UI/InputText';
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import PickerMultiSelect from '../../UI/PickerMultiSelect';
import SwitchContainer from '../../UI/SwitchContainer';

export const MorbidHistory = ({navigation}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'},
        {label: 'Apple', value: '1'},
    ]);

    const handleGetDate = (dateString) => {
        console.log(dateString);
    }

    return (
        <KeyboardScrollView scrollEnabled={false} extraHeight={50} barColor={PRIMARY} backgroundColor={WHITE}>
            <View style={{flex: 1}}>
                <View style={{height: 26, width: '100%', flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                        <Badge value="1" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: VERY_LIGHT}}>
                        <Badge value="2" badgeStyle={{backgroundColor: PRIMARY}} textStyle={{color: WHITE}} />
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
                            <PickerMultiSelect open={open} setOpen={setOpen} value={value} setValue={setValue} items={items} setItems={setItems} label={'Patología'}/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputText 
                                        label={'Otro'}
                                        labelError={false}
                                        onChangeText={() => {}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputText 
                                        label={'Fármaco'}
                                        labelError={false}
                                        onChangeText={(text) => {console.log(text)}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <SwitchContainer value={true} label={'Postrado'}/>
                                </View>
                                <View style={{flex: 1}}>
                                    <SwitchContainer value={true} label={'Oxígeno domiciliario'}/>
                                </View>
                                <View style={{flex: 1}}>
                                    <SwitchContainer value={true} label={'Alergías'}/>
                                </View>
                            </View>
                            <Hr/>
                            <Text style={{alignSelf: 'center', marginVertical: 10, fontSize: 26, fontWeight: 'bold', color: LIGHT}}>En caso de embarazo</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <DatePicker handleGetDate={handleGetDate} labelError={false} label={'Fecha de la última regla'}/>         
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputText 
                                        label={'Embarazos anteriores'}
                                        labelError={false}
                                        onChangeText={(text) => {console.log(text)}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputText 
                                        label={'Aborto'}
                                        labelError={false}
                                        onChangeText={() => {}} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
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
                    onPress={() => navigation.navigate('HealthCheck')}
                    />
            </View>
        </KeyboardScrollView>
    )
}
