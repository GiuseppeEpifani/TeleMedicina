import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements'
import { PRIMARY, SECONDARY, SUCCESS, WHITE } from '../../../const/Colors';
import Fab from '../../../UI/Fab';
import CardWithText from '../../../UI/CardWithText';
import PickerSingleSelect from '../../../UI/PickerSingleSelect';
import RadioButton from '../../../UI/RadioButton';

export const BehaviorProblems = ({navigation}) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Brazo derecho', value: 'apple'},
        {label: 'Brazo izquierdo', value: 'banana'},
        {label: 'Pierna derecha', value: '1'},
    ]);
    const [valueSinglePicker, setvalueSinglePicker] = useState(null);
    const [openSingle, setOpenSingle] = useState(false);
    const [itemsSingle, setItemsSingle] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'},
        {label: 'Apple', value: '1'},
    ]);
    const [cheked, setChecked] = useState(false)

    return (
        <View style={{flex: 1}}>
            <View style={{height: 26, width: '100%', flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                    <Badge value="1" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                </View>
                <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                    <Badge value="2" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                </View>
                <View style={{flex: 1, justifyContent: 'center', width: '33.33%', backgroundColor: SUCCESS}}>
                    <Badge value="3" badgeStyle={{backgroundColor: WHITE}} textStyle={{color: PRIMARY}} />
                </View>
            </View>

            <View style={{flex: 1}}>
                <View style={{flex: 1, paddingHorizontal: 30, marginTop: 10}}>
                    <CardWithText padding={10} title={'Problemas comportamiento'}>
                    
                        <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Encuesta de problemas de comportamiento</Text>
                        
                        <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"¿cual es tu nivel de consciencia?'"} />                   

                        <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Escala de cincinnati</Text>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"Sonrisa"} />                   
                            </View>
                            <View style={{flex:0.050}}/>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"Movilidad brazos"} />                   
                            </View>
                            <View style={{flex:0.050}}/>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"Palabras"} />                   
                            </View>
                        </View>

                        <Text style={{fontSize: 22, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 10}}>Escala coma de glasgow</Text>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"Apertura ocular"} />                   
                            </View>
                            <View style={{flex:0.050}}/>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"Respuesta verbal"} />                   
                            </View>
                            <View style={{flex:0.050}}/>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"Respuesta motriz"} />                   
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                <Text style={{fontWeight: 'bold', fontSize: 16, color: SECONDARY, marginLeft: 10, marginBottom: 12}}>¿Tiene problemas para movilizar el cuerpo?</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                    <TouchableOpacity onPress={() => {}}>
                                        <RadioButton selected labelRadio={'Si'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {}}>
                                        <RadioButton labelRadio={'No'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"¿Le cuesta mover los brazos?"} />                   
                            </View>
                            <View style={{flex:0.050}}/>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"¿Le cuesta mover las piernas?"} />                   
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"¿En qué pierna siente esa sensación?"} />                   
                            </View>
                        </View>
                    </CardWithText>
                </View>
                <View style={{flex: 0.05}}/>
            </View>
            <Fab icon={"text-box-check"} onPress={() => { navigation.navigate('DimensionsInto')}}/> 
        </View>
    )
}
