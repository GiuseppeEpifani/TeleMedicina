import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Text, Alert, PermissionsAndroid } from 'react-native'
import { Badge, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SECONDARY, SUCCESS, VERY_LIGHT, WHITE } from '../../const/Colors'
import KeyboardScrollView from '../../UI/KeyboardScrollView';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InputText from '../../UI/InputText';
import ContainerCamera from '../../UI/ContainerCamera';
import Card from '../../UI/Card';
import { CardInfoPatient } from '../../components/infoPatient/CardInfoPatient';
import InputTextWithInfo from '../../UI/InputTextWithInfo';
import { HomeContext } from '../../context/Home/HomeContext';
import { RecordContext } from '../../context/RecordFile/RecordContext';
import TextArea from '../../UI/TextArea';
import { modeApp } from '../../helpers/modeApp';
import { getMultipleImageHealthCheck } from '../../helpers/recordsLocal/getMultipleImageHealthCheck';
import { manager } from '../../helpers/bleManager';
import base64js from 'base64-js';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export const HealthCheck = ({navigation}) => {
    const { patient } = useContext(HomeContext);
    const { updatedRecordHealthCheck, currentRecord, uploadImages } = useContext(RecordContext);
    
    const [loading, setLoading] = useState(false);
    const [audiovisualSupport, setaudiovisualSupport] = useState((currentRecord.health_check.audiovisual_support) ? currentRecord.health_check.audiovisual_support : []);
    const [bloodPressureSystolic, setBloodPressureSystolic] = useState(currentRecord.health_check.blood_pressure_systolic);
    const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState(currentRecord.health_check.blood_pressure_diastolic);
    const [breathingFrequency, setBreathingFrequency] = useState(currentRecord.health_check.breathing_frequency);
    const [bloodGlucose, setBloodGlucose] = useState(currentRecord.health_check.blood_glucose);
    const [heartRate, setHeartRate] = useState(currentRecord.health_check.heart_rate);
    const [bloodGlucoseType, setBloodGlucoseType] = useState(currentRecord.health_check.blood_glucose_type);
    const [o2Saturation, setO2Saturation] = useState(currentRecord.health_check.o2_saturation);
    const [temperature, setTemperature] = useState(currentRecord.health_check.temperature);
    const [weight, setWeight] = useState(currentRecord.health_check.weight);
    const [height, setHeight] = useState(currentRecord.health_check.height);
    const [currentHealthStatus, setCurrentHealthStatus] = useState(currentRecord.health_check.current_health_status);
    const [images, setImages] = useState([]);
    const [imagesLocal, setimagesLocal] = useState([]);
    const [appIsLocal, setAppIsLocal] = useState(false);
    const [scanBluetooth, setScanBluetooth] = useState();
    const [connectedBluetooth, setConnectedBluetooth] = useState();

     useEffect(() => {
        getImagesLocal();
    }, []);

    const getImagesLocal = async () => {
        const isLocal = await modeApp();
        setAppIsLocal(isLocal);
        if (isLocal) {
            const images = await getMultipleImageHealthCheck(currentRecord.id);
            if (images && images.length > 0) setimagesLocal(images);
        }
    }

    const saveRecord = async () => {
        if (bloodPressureSystolic && bloodPressureSystolic > 300 || bloodPressureSystolic && isNaN(bloodPressureSystolic)) {
            return;
        }

        if (bloodPressureDiastolic && bloodPressureDiastolic > 200 || bloodPressureDiastolic && isNaN(bloodPressureDiastolic)) {
            return;
        }

        if (heartRate && heartRate > 400 || heartRate && isNaN(heartRate)) {
            return;
        }

        if (breathingFrequency && breathingFrequency > 80 || breathingFrequency && isNaN(breathingFrequency)) {
            return;
        }

        if (bloodGlucose && bloodGlucose > 500 || bloodGlucose && isNaN(bloodGlucose)) {
            return;
        }

        if (o2Saturation && o2Saturation > 100 || o2Saturation && isNaN(o2Saturation)) {
            return;
        }

        if (temperature && temperature > 50 || temperature && isNaN(temperature)) {
            return;
        }

        if (weight && weight > 500 || weight && isNaN(weight)) {
            return;
        }

        if (height && height > 2.9 || height && isNaN(height)) {
            return;
        }

        setLoading(true);
        let imagesSavedLocal = [];
        let audiovisualSupportLength = (audiovisualSupport) ? audiovisualSupport.length : 0;
        let audiovisualSupportArray = [];
        if (images.length > 0) {
            if (!await modeApp()) {
                audiovisualSupportArray = await uploadImages({imgs: images, patientId: (patient._id) ? patient._id : patient.id, recordId: currentRecord.id });
                audiovisualSupportArray = [...audiovisualSupport, ...audiovisualSupportArray];
                audiovisualSupportLength = audiovisualSupportArray.length;
            } else {
                const newArrayImagesLocal = imagesLocal.map(({file}) => { return { base64: file } })
                const newImages = [...images, ...newArrayImagesLocal];
                audiovisualSupportArray = await uploadImages({imgs: newImages, patientId: (patient._id) ? patient._id : patient.id, recordId: currentRecord.id});
                audiovisualSupportLength = audiovisualSupportArray.length;
            }
        } else {
            if (await modeApp()) {
                imagesSavedLocal = await getMultipleImageHealthCheck(currentRecord.id);

                if (imagesSavedLocal && imagesSavedLocal.length > imagesLocal.length) {
                    const newArrayImagesLocal = imagesLocal.map(({file}) => { return { base64: file } })
                    audiovisualSupportArray = await uploadImages({imgs: newArrayImagesLocal, patientId: (patient._id) ? patient._id : patient.id, recordId: currentRecord.id});
                    audiovisualSupportLength = audiovisualSupportArray.length;
                }
            }
        }

        let health_check = [];

        if (audiovisualSupportLength > 0 || audiovisualSupportArray.length > 0 || bloodPressureSystolic || bloodPressureDiastolic || heartRate ||
            breathingFrequency || bloodGlucose || o2Saturation || temperature || weight || height) {
            health_check = 
                {
                    audiovisual_support: (images.length > 0 || await modeApp() && imagesSavedLocal && imagesSavedLocal.length > imagesLocal.length) ? audiovisualSupportArray : audiovisualSupport,
                    audiovisual_support_length: audiovisualSupportLength,
                    blood_glucose: bloodGlucose,
                    blood_glucose_type: bloodGlucoseType,
                    blood_pressure_diastolic: bloodPressureDiastolic,
                    blood_pressure_systolic: bloodPressureSystolic,
                    breathing_frequency: breathingFrequency,
                    current_health_status: currentHealthStatus,
                    heart_rate: heartRate,
                    height: height,
                    o2_saturation: o2Saturation, 
                    temperature: temperature,
                    weight: weight
                };
        }
            
        await updatedRecordHealthCheck({patientId: patient._id, health_check, rbd: patient.rbd})
        navigation.navigate('Dimensions');
        setLoading(false);
    }

    const handleDeleteVisualSupport = (file) => {
        setaudiovisualSupport(audiovisualSupport.filter(value => value.file !== file));
    }

    const startDeviceScan = async () => {
        manager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
            console.log('scaneando')
            if (error) {
                setConnectedBluetooth();
                setScanBluetooth();
                Alert.alert('Notificación', 'Se apago el bluetooth o el GPS, vuelva a encenderlo', [ { text: 'Esta bien'} ]);
                console.log(error)
            } else {
                if (device.name === 'Medical') {
                    connectedSensorMedical(device);
                }

                if (device.name === 'BPM_01') {
                    connectedSensorPressure(device);
                }

                if (device.name === 'TEMP') {
                    connectedSensorThermometer(device);
                }

                if (device.name === 'SDIC') {
                    connectedSensorBalance(device);
                }
            }
        })
    }

    const VerifyDeviceAndConnect = async (type) => {
        setScanBluetooth(type);
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted) {
              RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                interval: 10000,
                fastInterval: 5000,
              })
                .then(async (data) => {
                    const stateBluetooth = await BluetoothStateManager.getState();

                    if (stateBluetooth === 'PoweredOn') {
                        startDeviceScan();
                    } else {
                        await BluetoothStateManager.enable();
                        setTimeout(() => {
                            startDeviceScan();
                        }, 1000)
                    }
                })
                .catch((err) => {
                    setScanBluetooth();
                    console.log(err);
                });
        } else {
            Alert.alert('Notificación', 'Debe de darle permisos de ubicación a la aplicación', [ { text: 'Esta bien'} ]);
        }
    }

    const stopScanBluetooh = () => {
        manager.stopDeviceScan();
        setConnectedBluetooth();
        setScanBluetooth();
    }

    const connectedSensorMedical = (device) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(3);
            return device.discoverAllServicesAndCharacteristics()
        }) 
        .then((device) => {
            device.monitorCharacteristicForService('CDEACB80-5235-4C07-8846-93A37EE6B86D', 'CDEACB81-5235-4C07-8846-93A37EE6B86D', (error, characteristic) => {
                if (error) {
                    setConnectedBluetooth();
                    setScanBluetooth();
                    return
                }

                const arrayBytes = base64js.toByteArray(characteristic.value);
                if (arrayBytes.length === 4) {
                    console.log(arrayBytes)
                    if (arrayBytes[1] !== 255 && arrayBytes[2] !== 127 && arrayBytes[3] !== 0) {
                        setHeartRate(arrayBytes[1].toString());
                        setO2Saturation(arrayBytes[2].toString());
                    }
                }
            });
        }, (error) => {
            console.log(error.message);
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const connectedSensorPressure = (device) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(1);
            return device.discoverAllServicesAndCharacteristics()
        }) 
        .then((device) => {
            device.monitorCharacteristicForService('FFF0', 'FFF4', (error, characteristic) => {
                if (error) {
                    console.log(error)
                    setConnectedBluetooth();
                    setScanBluetooth();                    
                    return
                }

                const arrayBytes = base64js.toByteArray(characteristic.value);
                if (arrayBytes.length > 2) {
                    if (arrayBytes[1] > 0) {
                        setBloodPressureSystolic(arrayBytes[1].toString());
                    } else {
                        setBloodPressureSystolic(arrayBytes[2].toString());
                    }

                    if (arrayBytes[3] > 0) {
                        setBloodPressureDiastolic(arrayBytes[3].toString());
                    } else {
                        setBloodPressureDiastolic(arrayBytes[4].toString());
                    }
                }
            });
        }, (error) => {
            console.log(error.message)
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const connectedSensorThermometer = (device) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(4);
            return device.discoverAllServicesAndCharacteristics()
        }) 
        .then((device) => {
            device.monitorCharacteristicForService('1809', '2A1C', (error, characteristic) => {
                if (error) {
                    console.log(error);
                    setConnectedBluetooth();
                    setScanBluetooth();                    
                    return;
                }

                const arrayBytes = base64js.toByteArray(characteristic.value);
                const dataView = new DataView(arrayBytes.buffer);
                const value = getFloatValue(dataView, 1).toFixed(1);
                setTemperature(value.toString());
            });
        }, (error) => {
            console.log(error.message)
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const connectedSensorBalance = (device) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(5);
            return device.discoverAllServicesAndCharacteristics()
        }) 
        .then((device) => {
            device.monitorCharacteristicForService('FFF0', 'FFF3', (error, characteristic) => {
                if (error) {
                    console.log(error);
                    setConnectedBluetooth();
                    setScanBluetooth();                    
                    return;
                }

                const arrayBytes = base64js.toByteArray(characteristic.value);

                switch (arrayBytes[2]) {
                    case 1:
                        arrayBytes[4] = 1;
                        break;
                    case 2:
                        arrayBytes[4] = 2;
                        break;
                    case 3:
                        arrayBytes[4] = 3;
                        break;
                    case 4:
                        arrayBytes[4] = 4;
                        break;
                    case 5:
                        arrayBytes[4] = 5;
                        break;
                    case 6:
                        arrayBytes[4] = 6;
                      break;
                    case 7:
                        arrayBytes[4] = 7;
                        break;
                    case 8:
                        arrayBytes[4] = 8;
                        break;
                    case 9:
                        arrayBytes[4] = 9;
                        break;
                    case 10:
                        arrayBytes[4] = 10;
                        break;
                }

                const dataView = new DataView(arrayBytes.buffer);
                const valueInt = getFloatValue(dataView, 3);
                if (arrayBytes[2] == arrayBytes[4]) setWeight((valueInt / 1000).toString());
            });
        }, (error) => {
            console.log(error.message)
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const getFloatValue = (value, offset) => {
        const negative = value.getInt8(offset + 2) >>> 31;
    
        const [b0, b1, b2, exponent] = [
            value.getUint8(offset),
            value.getUint8(offset + 1),
            value.getUint8(offset + 2),
            value.getInt8(offset + 3)
        ];
    
        let mantissa = b0 | (b1 << 8) | (b2 << 16);
        if (negative) {
            mantissa |= 255 << 24;
        }
    
        return mantissa * Math.pow(10, exponent);
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
                    <View style={{position: 'absolute', right: 30, marginTop: 5, height: 50, zIndex: 10 }}>
                        <Button title="Volver" buttonStyle={{height: 40, width: 120, backgroundColor: PRIMARY, borderRadius: 20, zIndex: 10}} titleStyle={{fontSize: 18, fontWeight: 'bold', marginLeft: 10}} 
                            icon={
                                <Icon
                                    name="clipboard-arrow-left"
                                    size={22}
                                    color="white"
                                />
                            }
                            onPress={() => {navigation.navigate('InfoPatient')}}
                        />
                    </View>
                    <CardInfoPatient patient={patient} />
                </View>
                <View  style={{flex: 0.05}}/>
				<View style={{flex: 1, paddingHorizontal: 30, marginTop: 10}}>
                    <Card padding={10}>
                        <ScrollView>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                <View style={{flex: 1}}>
                                    { 
                                        scanBluetooth === 1 &&
                                        <View style={{flexDirection: 'row' ,height: 50, marginTop: 20, justifyContent: 'center', alignContent: 'center'}}> 
                                            {
                                                (scanBluetooth === 1 && !connectedBluetooth) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Conectando dispositivo...</Text>
                                            }
                                            {
                                                (scanBluetooth === 1 && connectedBluetooth === 1) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Obteniendo valores...</Text>
                                            }
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                                        </View>
                                    }
                                    {
                                        (!scanBluetooth || scanBluetooth != 1) &&
                                        <InputTextWithInfo 
                                            label={'Presión arterial'}
                                            containerStyle={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                                            styleWidth={{width: '100%'}}
                                            labelError={(bloodPressureSystolic && bloodPressureSystolic > 300 || bloodPressureSystolic && isNaN(bloodPressureSystolic)) ? 'Presión arterial sistólica tiene que estar entre 0.1 - 300' : false}
                                            value={bloodPressureSystolic}
                                            onChangeText={setBloodPressureSystolic} 
                                            placeholder={' '} 
                                            keyboardType={'numeric'}
                                        />
                                    }
                                </View>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            (scanBluetooth === 1 && connectedBluetooth === 1) &&
                                            <TouchableOpacity onPress={stopScanBluetooh} style={{position: 'absolute', right: 40, borderRadius: 50, backgroundColor: SUCCESS, top: -4, zIndex: 100}}>
                                                <MaterialCommunityIcons name="check-bold" size={26} color={WHITE} />
                                            </TouchableOpacity>
                                        }
                                        <TouchableOpacity onPress={() => {(scanBluetooth === 1 && !connectedBluetooth) ? stopScanBluetooh() : VerifyDeviceAndConnect(1);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 1 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                            <MaterialCommunityIcons name={scanBluetooth === 1 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                        </TouchableOpacity>
                                    </View>
                                    { 
                                        scanBluetooth === 1 &&
                                        <View style={{flexDirection: 'row' ,height: 50, marginTop: 20, justifyContent: 'center', alignContent: 'center'}}> 
                                            {
                                                (scanBluetooth === 1 && !connectedBluetooth) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Conectando dispositivo...</Text>
                                            }
                                            {
                                                (scanBluetooth === 1 && connectedBluetooth === 1) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Obteniendo valores...</Text>
                                            }
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                                        </View>
                                    }
                                    {
                                        (!scanBluetooth || scanBluetooth != 1) &&
                                        <InputTextWithInfo 
                                            label={' '}
                                            containerStyle={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                            labelError={(bloodPressureDiastolic && bloodPressureDiastolic > 200  || bloodPressureDiastolic && isNaN(bloodPressureDiastolic)) ? 'Presión arterial diastólica tiene que estar entre 0.1 - 200' : false}
                                            textInfo={'mm Hg'}
                                            value={bloodPressureDiastolic}
                                            onChangeText={setBloodPressureDiastolic} 
                                            placeholder={' '} 
                                            keyboardType={'numeric'}
                                        />
                                    }
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <TouchableOpacity onPress={() => {(scanBluetooth === 3 && !connectedBluetooth) ? stopScanBluetooh() : VerifyDeviceAndConnect(3);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 3 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                        <MaterialCommunityIcons name={scanBluetooth === 3 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                    </TouchableOpacity>
                                    { 
                                        scanBluetooth === 3 &&
                                        <View style={{flexDirection: 'row' ,height: 50, marginTop: 20, justifyContent: 'center', alignContent: 'center'}}> 
                                            {
                                                (scanBluetooth === 3 && !connectedBluetooth) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Conectando dispositivo...</Text>
                                            }
                                            {
                                                (scanBluetooth === 3 && connectedBluetooth === 3) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Obteniendo valores...</Text>
                                            }
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                                        </View>
                                    }
                                    {
                                       (!scanBluetooth || scanBluetooth != 3) && 
                                        <InputTextWithInfo 
                                            label={'Frecuencia cardiaca'}
                                            labelError={(heartRate && heartRate > 400 || heartRate && isNaN(heartRate)) ? 'Frecuencia cardiaca tiene que estar entre 0.1 - 400. ppm' : false}
                                            textInfo={'ppm'}
                                            value={heartRate}
                                            onChangeText={setHeartRate} 
                                            placeholder={' '} 
                                            keyboardType={'numeric'}
                                        />
                                    }
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputText 
                                        label={'Frecuencia respiratoria'}
                                        labelError={(breathingFrequency && breathingFrequency > 80 || breathingFrequency && isNaN(breathingFrequency)) ? 'Frecuencia respiratoria tiene que estar entre 0.1 - 80' : false}
                                        value={breathingFrequency}
                                        onChangeText={setBreathingFrequency} 
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
                                        labelError={(bloodGlucose && bloodGlucose > 500 || bloodGlucose && isNaN(bloodGlucose)) ? 'Glicemia tiene que estar entre 0.1 - 500. mg/dl' : false}
                                        textInfo={'mg / dl'}
                                        value={bloodGlucose}
                                        onChangeText={setBloodGlucose}
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
                                        value={bloodGlucoseType}
                                        onChangeText={setBloodGlucoseType} 
                                        placeholder={' '} 
                                        keyboardType={'default'} 
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <TouchableOpacity onPress={() => {(scanBluetooth === 3 && !connectedBluetooth) ? stopScanBluetooh() : VerifyDeviceAndConnect(3);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 3 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                        <MaterialCommunityIcons name={scanBluetooth === 3 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                    </TouchableOpacity>
                                    { 
                                        scanBluetooth === 3 &&
                                        <View style={{flexDirection: 'row' ,height: 50, marginTop: 20, justifyContent: 'center', alignContent: 'center'}}> 
                                            {
                                                (scanBluetooth === 3 && !connectedBluetooth) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Conectando dispositivo...</Text>
                                            }
                                            {
                                                (scanBluetooth === 3 && connectedBluetooth === 3) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Obteniendo valores...</Text>
                                            }
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                                        </View>
                                    }
                                    {
                                       (!scanBluetooth || scanBluetooth != 3) && 
                                       <InputTextWithInfo 
                                            label={'Saturación O2'}
                                            labelError={(o2Saturation && o2Saturation > 100 || o2Saturation && isNaN(o2Saturation)) ? 'Satuarcion debe ser menor o igual que 100%' : false}
                                            textInfo={'%'}
                                            value={o2Saturation}
                                            onChangeText={setO2Saturation}
                                            placeholder={' '} 
                                            keyboardType={'numeric'} 
                                        />
                                    }
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            (scanBluetooth === 4 && !connectedBluetooth) &&
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent', position: 'absolute', right: 40}} />
                                        }
                                        <TouchableOpacity onPress={() => {(scanBluetooth === 4 && !connectedBluetooth) ? stopScanBluetooh() : VerifyDeviceAndConnect(4);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 4 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                            <MaterialCommunityIcons name={scanBluetooth === 4 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                        </TouchableOpacity>
                                    </View>
                                    <InputTextWithInfo 
                                        label={'Temperatura'}
                                        labelError={(temperature && temperature > 50 || temperature && isNaN(temperature)) ? 'Temperatura tiene que estar entre 20 - 50. °c' : false}
                                        textInfo={'°C'}
                                        value={temperature}
                                        onChangeText={setTemperature}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
                                    
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <TouchableOpacity onPress={() => {(scanBluetooth === 5 && !connectedBluetooth) ? stopScanBluetooh() : VerifyDeviceAndConnect(5);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 5 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                        <MaterialCommunityIcons name={scanBluetooth === 5 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                    </TouchableOpacity>
                                    { 
                                        scanBluetooth === 5 &&
                                        <View style={{flexDirection: 'row' ,height: 50, marginTop: 20, justifyContent: 'center', alignContent: 'center'}}> 
                                            {
                                                (scanBluetooth === 5 && !connectedBluetooth) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Conectando dispositivo...</Text>
                                            }
                                            {
                                                (scanBluetooth === 5 && connectedBluetooth === 5) &&
                                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 8, marginTop: 10}}>Obteniendo valores...</Text>
                                            }
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent'}} />
                                        </View>
                                    }
                                    {
                                       (!scanBluetooth || scanBluetooth != 5) && 
                                        <InputTextWithInfo 
                                            label={'Peso'}
                                            labelError={(weight && weight > 500 || weight && isNaN(weight)) ? 'Peso tiene que estar entre 0.1 - 500. kg.' : false}
                                            textInfo={'Kg'}
                                            value={weight}
                                            onChangeText={setWeight}
                                            placeholder={' '} 
                                            keyboardType={'numeric'} 
                                        />
                                    }
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <InputTextWithInfo 
                                        label={'Estatura'}
                                        labelError={(height && height > 2.9 || height && isNaN(height)) ? 'Estatura tiene que estar entre 0.1 - 2.9. m' : false}
                                        textInfo={'mts'}
                                        value={height}
                                        onChangeText={setHeight}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
                                </View>
                            </View>
                            <TextArea label={'Estado de salud actual'} labelError={false} onChangeText={setCurrentHealthStatus} value={currentHealthStatus} keyboardType={'default'} />                                         
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <ContainerCamera appIsLocal={appIsLocal} setImages={setImages} images={images} audiovisualSupport={audiovisualSupport} handleDeleteVisualSupport={handleDeleteVisualSupport} patientId={patient._id} imagesLocal={imagesLocal} setimagesLocal={setimagesLocal} label={'Apoyo visual'} />
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
                        disabled={loading || scanBluetooth || connectedBluetooth}
                        iconRight
                        onPress={saveRecord}
                    />
                </View>            
            </View>
        </KeyboardScrollView>
    )
}
