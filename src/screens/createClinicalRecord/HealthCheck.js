import React, { useState, useContext } from 'react'
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
import { HomeContext } from '../../context/Home/HomeContext';
import { RecordContext } from '../../context/RecordFile/RecordContext';
import { useForm } from '../../hooks/useForm';
import TextArea from '../../UI/TextArea';

export const HealthCheck = ({navigation}) => {
    const { patient } = useContext(HomeContext);
    const { updatedRecordHealthCheck, currentRecord, uploadImages } = useContext(RecordContext);
    const [formValues, handleInputChange] = useForm({ bloodPressureSystolic: { value: currentRecord.health_check.blood_pressure_systolic, isComplete: false }, bloodPressureDiastolic: { value: currentRecord.health_check.blood_pressure_diastolic, isComplete: false }, heartRate: { value: currentRecord.health_check.heart_rate, isComplete: false }, breathingFrequency: { value: currentRecord.health_check.breathing_frequency, isComplete: false }, bloodGlucose: { value: currentRecord.health_check.blood_glucose, isComplete: false }, bloodGlucoseType: { value: currentRecord.health_check.blood_glucose_type, isComplete: false }, o2Saturation: { value: currentRecord.health_check.o2_saturation, isComplete: false }, temperature: { value: currentRecord.health_check.temperature, isComplete: false }, weight: { value: currentRecord.health_check.weight, isComplete: false }, height: { value: currentRecord.health_check.height, isComplete: false }, currentHealthStatus: { value: currentRecord.health_check.current_health_status, isComplete: false }});
    const { bloodPressureSystolic, bloodPressureDiastolic, heartRate, breathingFrequency, bloodGlucose, bloodGlucoseType, o2Saturation, temperature, weight, height, currentHealthStatus } = formValues;
    
    const [loading, setLoading] = useState(false);
    const [audiovisualSupport, setaudiovisualSupport] = useState((currentRecord.health_check.audiovisual_support) ? currentRecord.health_check.audiovisual_support : []);
    const [images, setImages] = useState([]);

    const saveRecord = async () => {
        if (bloodPressureSystolic.value && bloodPressureSystolic.value > 300 || bloodPressureSystolic.value && isNaN(bloodPressureSystolic.value)) {
            return;
        }

        if (bloodPressureDiastolic.value && bloodPressureDiastolic.value > 200 || bloodPressureDiastolic.value && isNaN(bloodPressureDiastolic.value)) {
            return;
        }

        if (heartRate.value && heartRate.value > 400 || heartRate.value && isNaN(heartRate.value)) {
            return;
        }

        if (breathingFrequency.value && breathingFrequency.value > 80 || breathingFrequency.value && isNaN(breathingFrequency.value)) {
            return;
        }

        if (bloodGlucose.value && bloodGlucose.value > 500 || bloodGlucose.value && isNaN(bloodGlucose.value)) {
            return;
        }

        if (o2Saturation.value && o2Saturation.value > 100 || o2Saturation.value && isNaN(o2Saturation.value)) {
            return;
        }

        if (temperature.value && temperature.value > 50 || temperature.value && isNaN(temperature.value)) {
            return;
        }

        if (weight.value && weight.value > 500 || weight.value && isNaN(weight.value)) {
            return;
        }

        if (height.value && height.value > 2.9 || height.value && isNaN(height.value)) {
            return;
        }

        setLoading(true);

        let audiovisualSupportLength = (audiovisualSupport) ? audiovisualSupport.length : 0;
        let audiovisualSupportArray = [];
        if (images.length > 0) {
            audiovisualSupportArray = await uploadImages(images, patient._id);
            audiovisualSupportArray = [...audiovisualSupport, ...audiovisualSupportArray];
            audiovisualSupportLength = audiovisualSupportArray.length;
        }

        let health_check = [];

        if (audiovisualSupportLength > 0 || audiovisualSupportArray.length > 0 || bloodPressureSystolic.value || bloodPressureDiastolic.value || heartRate.value ||
            breathingFrequency.value || bloodGlucose.value || o2Saturation.value || temperature.value || weight.value || height.value) {
            health_check = 
                {
                    audiovisual_support: (images.length > 0) ? audiovisualSupportArray : audiovisualSupport,
                    audiovisual_support_length: audiovisualSupportLength,
                    blood_glucose: bloodGlucose.value,
                    blood_glucose_type: bloodGlucoseType.value,
                    blood_pressure_diastolic: bloodPressureDiastolic.value,
                    blood_pressure_systolic: bloodPressureSystolic.value,
                    breathing_frequency: breathingFrequency.value,
                    current_health_status: currentHealthStatus.value,
                    heart_rate: heartRate.value,
                    height: height.value,
                    o2_saturation: o2Saturation.value, 
                    temperature: temperature.value,
                    weight: weight.value
                };
        }
            
        await updatedRecordHealthCheck(patient._id, health_check)
        navigation.navigate('Dimensions');
        setLoading(false);
    }

    const handleDeleteVisualSupport = (file) => {
        setaudiovisualSupport(audiovisualSupport.filter(value => value.file !== file));
    }

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
                    <CardInfoPatient patient={patient} />
                </View>
                <View  style={{flex: 0.05}}/>
				<View style={{flex: 1, paddingHorizontal: 30, marginTop: 10}}>
                    <Card padding={10}>
                        <ScrollView>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Presión arterial'}
                                        containerStyle={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                                        styleWidth={{width: '100%'}}
                                        labelError={(bloodPressureSystolic.value && bloodPressureSystolic.value > 300 || bloodPressureSystolic.value && isNaN(bloodPressureSystolic.value)) ?'Presión arterial sistólica tiene que estar entre 0.1 - 300' : false}
                                        value={bloodPressureSystolic.value}
                                        onChangeText={(text) => handleInputChange(text, "bloodPressureSystolic")} 
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={' '}
                                        containerStyle={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                        labelError={(bloodPressureDiastolic.value && bloodPressureDiastolic.value > 200  || bloodPressureDiastolic.value && isNaN(bloodPressureDiastolic.value)) ? 'Presión arterial diastólica tiene que estar entre 0.1 - 200' : false}
                                        textInfo={'mm Hg'}
                                        value={bloodPressureDiastolic.value}
                                        onChangeText={(text) => handleInputChange(text, "bloodPressureDiastolic")} 
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Frecuencia cardiaca'}
                                        labelError={(heartRate.value && heartRate.value > 400 || heartRate.value && isNaN(heartRate.value)) ? 'Frecuencia cardiaca tiene que estar entre 0.1 - 400. ppm' : false}
                                        textInfo={'ppm'}
                                        value={heartRate.value}
                                        onChangeText={(text) => handleInputChange(text, "heartRate")} 
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputText 
                                        label={'Frecuencia respiratoria'}
                                        labelError={(breathingFrequency.value && breathingFrequency.value > 80 || breathingFrequency.value && isNaN(breathingFrequency.value)) ? 'Frecuencia respiratoria tiene que estar entre 0.1 - 80' : false}
                                        value={breathingFrequency.value}
                                        onChangeText={(text) => handleInputChange(text, "breathingFrequency")} 
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Glicemia'}
                                        containerStyle={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                                        labelError={(bloodGlucose.value && bloodGlucose.value > 500 || bloodGlucose.value && isNaN(bloodGlucose.value)) ? 'Glicemia tiene que estar entre 0.1 - 500. mg/dl' : false}
                                        textInfo={'mg / dl'}
                                        value={bloodGlucose.value}
                                        onChangeText={(text) => handleInputChange(text, "bloodGlucose")}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={' '}
                                        containerStyle={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                        styleWidth={{width: '100%'}}
                                        labelError={false}
                                        value={bloodGlucoseType.value}
                                        onChangeText={(text) => handleInputChange(text, "bloodGlucoseType")} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Saturación O2'}
                                        labelError={(o2Saturation.value && o2Saturation.value > 100 || o2Saturation.value && isNaN(o2Saturation.value)) ? 'Satuarcion debe ser menor o igual que 100%' : false}
                                        textInfo={'%'}
                                        value={o2Saturation.value}
                                        onChangeText={(text) => handleInputChange(text, "o2Saturation")}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Temperatura'}
                                        labelError={(temperature.value && temperature.value > 50 || temperature.value && isNaN(temperature.value)) ? 'Temperatura tiene que estar entre 20 - 50. °c' : false}
                                        textInfo={'°C'}
                                        value={temperature.value}
                                        onChangeText={(text) => handleInputChange(text, "temperature")}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Peso'}
                                        labelError={(weight.value && weight.value > 500 || weight.value && isNaN(weight.value)) ? 'Peso tiene que estar entre 0.1 - 500. kg.' : false}
                                        textInfo={'Kg'}
                                        value={weight.value}
                                        onChangeText={(text) => handleInputChange(text, "weight")}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Estatura'}
                                        labelError={(height.value && height.value > 2.9 || height.value && isNaN(height.value)) ? 'Estatura tiene que estar entre 0.1 - 2.9. m' : false}
                                        textInfo={'mts'}
                                        value={height.value}
                                        onChangeText={(text) => handleInputChange(text, "height")}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
                                </View>
                            </View>
                            <TextArea label={'Estado de salud actual'} labelError={false} onChangeText={(text) => handleInputChange(text, "currentHealthStatus")} value={currentHealthStatus.value} keyboardType={'default'} />                                         
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <ContainerCamera setImages={setImages} images={images} audiovisualSupport={audiovisualSupport} handleDeleteVisualSupport={handleDeleteVisualSupport} patientId={patient._id} label={'Apoyo Audiovisual'} />
                                </View>
                                <View style={{flex: 1}}/>
                            </View>
                        </ScrollView>
                    </Card>
                </View>
                <View style={{flex: 0.05}}/>
                <View style={{height: 80, marginBottom: 70}}>
                    <Button title="Siguiente" buttonStyle={{height: 70, backgroundColor: PRIMARY}} titleStyle={{fontSize: 32, fontWeight: 'bold', marginLeft: 10}} 
                        icon={
                            <Icon
                                name="menu-right"
                                size={56}
                                color="white"
                            />
                        }
                        loading={loading}
                        disabled={loading}
                        iconRight
                        onPress={saveRecord}
                    />
                </View>            
            </View>
        </KeyboardScrollView>
    )
}
