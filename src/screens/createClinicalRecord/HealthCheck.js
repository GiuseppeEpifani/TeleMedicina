import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Alert, PermissionsAndroid, Text, TouchableHighlight  } from 'react-native'
import { Badge, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {  PRIMARY, SUCCESS, VERY_LIGHT, WHITE } from '../../const/Colors'
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
import { MIN_FIELD_2 } from '../../const/Fields';

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
    const [toolTipVisible, setToolTipVisible] = useState({heartRate: false, bloodPressureSystolic: false, bloodPressureDiastolic: false, breathingFrequency: false, o2Saturation: false, temperature: false, bloodGlucose: false});

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

        if (currentHealthStatus && currentHealthStatus.trim().length < 2) {
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
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                setConnectedBluetooth();
                setScanBluetooth();
                Alert.alert('Notificación', 'Se apago el bluetooth o el GPS, vuelva a encenderlo', [ { text: 'Esta bien'} ]);
                console.log(error, 'scan');
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
                    console.log(JSON.stringify(err));
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

    const connectedSensorMedical = (device, i = 1) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(3);
            return device.discoverAllServicesAndCharacteristics()
        }) 
        .then((device) => {
            device.monitorCharacteristicForService('CDEACB80-5235-4C07-8846-93A37EE6B86D', 'CDEACB81-5235-4C07-8846-93A37EE6B86D', (error, characteristic) => {
                if (error) {
                    console.log(JSON.stringify(error));
                    if (i < 20) {
                        connectedSensorMedical(device, i++);
                        return;
                    } else {
                        setConnectedBluetooth();
                        setScanBluetooth();
                        return;
                    }
                }

                const arrayBytes = base64js.toByteArray(characteristic.value);
                if (arrayBytes.length === 4) {
                    if (arrayBytes[1] !== 255 && arrayBytes[2] !== 127 && arrayBytes[3] !== 0) {
                        setHeartRate(arrayBytes[1].toString());
                        setO2Saturation(arrayBytes[2].toString());
                    }
                }
            });
        }, (error) => {
            console.log(JSON.stringify(error));
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const connectedSensorPressure = (device, i = 1) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(1);
            return device.discoverAllServicesAndCharacteristics()
        }, (error) => {
            console.log(JSON.stringify(error), 'error conexion');
            setConnectedBluetooth();
            setScanBluetooth();
        }) 
        .then((device) => {
            if (device === undefined) return; 
            device.monitorCharacteristicForService('0000fff0-0000-1000-8000-00805f9b34fb', '0000fff4-0000-1000-8000-00805f9b34fb', (error, characteristic) => {
                if (error) {
                    if (i < 20) {
                        connectedSensorPressure(device, i++);
                        return;
                    } else {
                        setConnectedBluetooth();
                        setScanBluetooth();
                        return;
                    }
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
                    setConnectedBluetooth();
                    setScanBluetooth();
                }
            });
        }, (error) => {
            console.log(JSON.stringify(error), 'ERROR FUERA MONITOR');
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const connectedSensorThermometer = (device, i = 1) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(4);
            return device.discoverAllServicesAndCharacteristics()
        }, (error) => {
            console.log(JSON.stringify(error), 'error conexion');
            setConnectedBluetooth();
            setScanBluetooth();
        }) 
        .then((device) => {
            if (device === undefined) return; 
            device.monitorCharacteristicForService('1809', '2A1C', async (error, characteristic) => {
                if (error) {
                    console.log(JSON.stringify(error), 'error dentro');
                    if (i < 20) {
                        connectedSensorThermometer(device, i++);
                        return;
                    } else {
                        setConnectedBluetooth();
                        setScanBluetooth();
                        return;
                    }
                }

                const arrayBytes = base64js.toByteArray(characteristic.value);
                const dataView = new DataView(arrayBytes.buffer);
                const value = await getFloatValue(dataView, 1);
                setTemperature(value.toFixed(1).toString());
            });
        }, (error) => {
            console.log(JSON.stringify(error), 'error monitor');
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const connectedSensorBalance = (device, i = 1) => {
        manager.stopDeviceScan();
        device.connect()
        .then((device) => {
            setConnectedBluetooth(5);
            return device.discoverAllServicesAndCharacteristics()
        }) 
        .then((device) => {
            device.monitorCharacteristicForService('FFF0', 'FFF3', async (error, characteristic) => {
                if (error) {
                    console.log(JSON.stringify(error));
                    if (i < 20) {
                        connectedSensorBalance(device, i++);
                        return;
                    } else {
                        setConnectedBluetooth();
                        setScanBluetooth();                    
                        return;
                    }
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

                if (arrayBytes[2] == arrayBytes[4]) {
                    const dataView = new DataView(arrayBytes.buffer);
                    const valueInt = await getFloatValue(dataView, 3);
                    setWeight((valueInt / 1000).toString());
                }
            });
        }, (error) => {
            console.log(JSON.stringify(error));
            setConnectedBluetooth();
            setScanBluetooth();
        })
    }

    const getFloatValue = async (value, offset) => {
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
                                    <InputTextWithInfo 
                                        label={'Presión arterial'}
                                        containerStyle={{borderBottomRightRadius: 0, borderTopRightRadius: 0}}
                                        styleWidth={{width: '100%'}}
                                        labelError={(bloodPressureSystolic && bloodPressureSystolic > 300 || bloodPressureSystolic && isNaN(bloodPressureSystolic)) ? 'Presión arterial sistólica tiene que estar entre 0.1 - 300' : false}
                                        value={bloodPressureSystolic}
                                        editable={scanBluetooth !== 1}
                                        selectTextOnFocus={scanBluetooth !== 1}
                                        onChangeText={setBloodPressureSystolic} 
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                        toolTipVisible={toolTipVisible}
                                        setToolTipVisible={setToolTipVisible}
                                        computedObject={'bloodPressureSystolic'}
                                        alert={(bloodPressureSystolic && bloodPressureSystolic < 120 || bloodPressureSystolic && bloodPressureSystolic > 139) ? true : false}
                                        labelAlert={'Presión Arterial, fuera del rango normal'}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            (scanBluetooth === 1 && !connectedBluetooth) &&
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent', position: 'absolute', right: 40}} />
                                        }
                                        <TouchableOpacity onPress={() => {(scanBluetooth === 1 && !connectedBluetooth) ? stopScanBluetooh() : connectedBluetooth === 1 ? {} : VerifyDeviceAndConnect(1);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 1 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                            <MaterialCommunityIcons name={scanBluetooth === 1 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                        </TouchableOpacity>
                                    </View>
                                    <InputTextWithInfo 
                                        label={' '}
                                        containerStyle={{borderBottomLeftRadius: 0, borderTopLeftRadius: 0}}
                                        labelError={(bloodPressureDiastolic && bloodPressureDiastolic > 200  || bloodPressureDiastolic && isNaN(bloodPressureDiastolic)) ? 'Presión arterial diastólica tiene que estar entre 0.1 - 200' : false}
                                        textInfo={'mm Hg'}
                                        value={bloodPressureDiastolic}
                                        editable={scanBluetooth !== 1}
                                        selectTextOnFocus={scanBluetooth !== 1}
                                        onChangeText={setBloodPressureDiastolic} 
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                        toolTipVisible={toolTipVisible}
                                        setToolTipVisible={setToolTipVisible}
                                        computedObject={'bloodPressureDiastolic'}
                                        alert={(bloodPressureDiastolic && bloodPressureDiastolic < 80 || bloodPressureDiastolic && bloodPressureDiastolic > 89) ? true : false}
                                        labelAlert={'Presión Arterial, fuera del rango normal'}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            (scanBluetooth === 3 && !connectedBluetooth) &&
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent', position: 'absolute', right: 40}} />
                                        }
                                        <TouchableOpacity onPress={() => {(scanBluetooth === 3 && !connectedBluetooth) ? stopScanBluetooh() : connectedBluetooth === 3 ? {} : VerifyDeviceAndConnect(3);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 3 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                            <MaterialCommunityIcons name={scanBluetooth === 3 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                        </TouchableOpacity>
                                    </View>
                                    <InputTextWithInfo 
                                        label={'Frecuencia cardiaca'}
                                        labelError={(heartRate && heartRate > 400 || heartRate && isNaN(heartRate)) ? 'Frecuencia cardiaca tiene que estar entre 0.1 - 400. ppm' : false}
                                        textInfo={'ppm'}
                                        value={heartRate}
                                        editable={scanBluetooth !== 3}
                                        selectTextOnFocus={scanBluetooth !== 3}
                                        onChangeText={setHeartRate} 
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                        toolTipVisible={toolTipVisible}
                                        setToolTipVisible={setToolTipVisible}
                                        computedObject={'heartRate'}
                                        alert={(heartRate && heartRate < 60 || heartRate && heartRate > 100) ? true : false}
                                        labelAlert={'Frecuencia Cardiaca, fuera del rango normal'}
                                    />
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
                                        toolTipVisible={toolTipVisible}
                                        setToolTipVisible={setToolTipVisible}
                                        computedObject={'breathingFrequency'}
                                        alert={(breathingFrequency && breathingFrequency < 12 || breathingFrequency && breathingFrequency > 20) ? true : false}
                                        labelAlert={'Frecuencia Respiratoria, fuera del rango normal'}
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
                                        toolTipVisible={toolTipVisible}
                                        setToolTipVisible={setToolTipVisible}
                                        computedObject={'bloodGlucose'}
                                        alert={(bloodGlucose && bloodGlucose < 70 || bloodGlucose && bloodGlucose > 150) ? true : false}
                                        labelAlert={'Glicemia, fuera del rango normal'}
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
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            (scanBluetooth === 3 && !connectedBluetooth) &&
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent', position: 'absolute', right: 40}} />
                                        }
                                        <TouchableOpacity onPress={() => {(scanBluetooth === 3 && !connectedBluetooth) ? stopScanBluetooh() : connectedBluetooth === 3 ? {} : VerifyDeviceAndConnect(3);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 3 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                            <MaterialCommunityIcons name={scanBluetooth === 3 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                        </TouchableOpacity>
                                    </View>
                                    <InputTextWithInfo 
                                        label={'Saturación O2'}
                                        labelError={(o2Saturation && o2Saturation > 100 || o2Saturation && isNaN(o2Saturation)) ? 'Satuarcion debe ser menor o igual que 100%' : false}
                                        textInfo={'%'}
                                        editable={scanBluetooth !== 3}
                                        selectTextOnFocus={scanBluetooth !== 3}
                                        value={o2Saturation}
                                        onChangeText={setO2Saturation}
                                        placeholder={' '} 
                                        keyboardType={'numeric'}
                                        toolTipVisible={toolTipVisible}
                                        setToolTipVisible={setToolTipVisible}
                                        computedObject={'o2Saturation'}
                                        alert={(o2Saturation && o2Saturation < 92) ? true : false}
                                        labelAlert={'Saturación O2, fuera del rango normal'}
                                    />
                                </View>
                                <View style={{flex:0.050}}/>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            (scanBluetooth === 4 && !connectedBluetooth) &&
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent', position: 'absolute', right: 40}} />
                                        }
                                        <TouchableOpacity onPress={() => {(scanBluetooth === 4 && !connectedBluetooth) ? stopScanBluetooh() : connectedBluetooth === 4 ? {} : VerifyDeviceAndConnect(4);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 4 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
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
                                        toolTipVisible={toolTipVisible}
                                        setToolTipVisible={setToolTipVisible}
                                        computedObject={'temperature'}
                                        alert={(temperature && temperature > 37.5) ? true : false}
                                        labelAlert={'Temperatura, fuera del rango normal'}
                                    />
                                    
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            (scanBluetooth === 5 && !connectedBluetooth) &&
                                            <ActivityIndicator size="small" color={PRIMARY} style={{marginBottom: 10, backgroundColor: 'transparent', position: 'absolute', right: 40}} />
                                        }
                                        <TouchableOpacity onPress={() => {(scanBluetooth === 5 && !connectedBluetooth) ? stopScanBluetooh() : connectedBluetooth === 5 ? {} : VerifyDeviceAndConnect(5);}} style={{position: 'absolute', right: 10, borderRadius: 50, backgroundColor: connectedBluetooth === 5 ? SUCCESS : PRIMARY, top: -4, zIndex: 100}}>
                                            <MaterialCommunityIcons name={scanBluetooth === 5 && !connectedBluetooth ? "close-thick" : "bluetooth-audio"} size={26} color={WHITE} />
                                        </TouchableOpacity>
                                    </View>
                                    <InputTextWithInfo 
                                        label={'Peso'}
                                        labelError={(weight && weight > 500 || weight && isNaN(weight)) ? 'Peso tiene que estar entre 0.1 - 500. kg.' : false}
                                        textInfo={'Kg'}
                                        value={weight}
                                        editable={scanBluetooth !== 5}
                                        selectTextOnFocus={scanBluetooth !== 5}
                                        onChangeText={setWeight}
                                        placeholder={' '} 
                                        keyboardType={'numeric'} 
                                    />
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
                            <TextArea label={'Estado de salud actual'} labelError={(currentHealthStatus && currentHealthStatus.trim().length < 2) ? MIN_FIELD_2 : false} onChangeText={setCurrentHealthStatus} value={currentHealthStatus} keyboardType={'default'} />                                         
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 1}}>
                                    <ContainerCamera appIsLocal={appIsLocal} setImages={setImages} images={images} audiovisualSupport={audiovisualSupport} handleDeleteVisualSupport={handleDeleteVisualSupport} patientId={patient._id} imagesLocal={imagesLocal} setimagesLocal={setimagesLocal} label={'Apoyo visual'} />
                                </View>
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
