import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Badge, Slider} from 'react-native-elements'
import { PRIMARY, SECONDARY, SUCCESS, WHITE } from '../../../const/Colors';
import PickerMultiSelect from '../../../UI/PickerMultiSelect';
import Fab from '../../../UI/Fab';
import CardWithText from '../../../UI/CardWithText';
import PickerSingleSelect from '../../../UI/PickerSingleSelect';
import RadioButton from '../../../UI/RadioButton';
import TextArea from '../../../UI/TextArea';

export const Pain = ({navigation}) => {
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
    const [valueSlider, setvalueSlider] = useState(0);

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
                    <CardWithText padding={10} title={'Encuesta de dolor'}>
                    
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: SECONDARY, marginLeft: 10, marginBottom: 6}}>Tiene algun dolor</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                            <TouchableOpacity onPress={() => {}}>
                                <RadioButton selected labelRadio={'Si'}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <RadioButton labelRadio={'No'}/>
                            </TouchableOpacity>
                        </View>
                    
                        <PickerMultiSelect open={open} setOpen={setOpen} value={value} setValue={setValue} items={items} setItems={setItems} label={'Puede Indicar hasta 3 lugares'} />
                    
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"¿Cómo es el dolor?"} />                   
                            </View>
                            <View style={{flex:0.050}}/>
                            <View style={{flex: 1}}>
                                <PickerSingleSelect open={openSingle} setOpen={setOpenSingle} value={valueSinglePicker} setValue={setvalueSinglePicker} items={itemsSingle} setItems={setItemsSingle} label={"¿Hace cuánto le duele?"} />                   
                            </View>
                        </View>

                        <View style={{padding: 10, marginBottom: 10}}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: SECONDARY}}>Me duele un: {valueSlider}</Text>
                            <Slider
                                thumbTintColor={PRIMARY}
                                trackStyle={{backgroundColor: PRIMARY}}
                                value={valueSlider}
                                onValueChange={(value) => setvalueSlider(value)}
                                maximumValue={10}
                                minimumValue={0}
                                step={1}
                            />
                        </View>
                        <TextArea label={'Observación/Comentario'} />

                    </CardWithText>
                </View>
                <View style={{flex: 0.05}}/>
            </View>
            <Fab icon={"text-box-check"} onPress={() => { navigation.navigate('DimensionsInto')}}/> 
        </View>
    )
}
