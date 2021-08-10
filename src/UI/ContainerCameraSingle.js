import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { SECONDARY, WHITE } from '../const/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera} from 'react-native-image-picker';
import { Image } from 'react-native-elements';
import { Text } from 'react-native';
import { URL } from '../const/Url';

const ContainerCamera = ({setImage, label, imageSupport, setImageSupport, patientId, tempUri, imageLocal}) => {

    const [TempUri, setTempUri] = useState(tempUri);

    const takePhoto = () => {
        launchCamera(
            { 
                mediaType: 'photo',
                quality: 0.5,
                selectionLimit: 0,
                includeBase64: true            
            }, 
            ({assets, didCancel}) => {

                if (didCancel) return;
                const res = assets[0];
                if (!res.uri) return;

                setImage({ base64: `data:image/jpeg;base64,${res.base64}`, tempUri: res.uri });
                setTempUri(res.uri);
            }
        );
    }

    const handleDeleteImage = () => {
        setTempUri(null);
        setImage({base64: null, tempUri: null});
        setImageSupport(null);
    }

    return (
        <View>
            { (label) && <Text style={styles.label}>{label}</Text> }
            <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                {
                    (TempUri) &&
                    <View style={styles.containerImage} key={TempUri}>
                        <TouchableOpacity onPress={handleDeleteImage} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                            <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: TempUri }}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                }
                {         
                    (!TempUri && !imageLocal && imageSupport) &&
                    <View style={styles.containerImage} key={imageSupport.file}>
                        <TouchableOpacity onPress={() => setImageSupport(null)} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                            <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: `${URL}/storage/clinical_record/${patientId}/dimension/${imageSupport.file}` }}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                }
                {
                    (imageLocal) &&
                    <View style={styles.containerImage} key={TempUri}>
                        <TouchableOpacity onPress={handleDeleteImage} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                            <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: imageLocal }}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                }
                {
                    (!TempUri && !imageSupport) &&
                    <TouchableOpacity onPress={takePhoto}>
                        <View style={styles.container}>
                            <View style={styles.subContainer}>
                                <View style={styles.lastContainer}>
                                    <MaterialCommunityIcons name="camera-plus" size={55} color={SECONDARY}/>
                                </View>
                            </View>    
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {		
        height: 100,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 4
	},
	subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
		width: 90,
        height: 90,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: SECONDARY,
        marginHorizontal: 5,
        backgroundColor: WHITE
	},
    lastContainer: {
        justifyContent: 'center',
        alignItems: 'center',
		width: 80,
        height: 80,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: SECONDARY,
        backgroundColor: WHITE
    },
    containerImage: {
        margin: 10,
        width: 90,
        height: 90,
        borderRadius: 22,
        overflow: 'hidden'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: SECONDARY,
        marginLeft: 10,
        marginBottom: 5
    },
});

export default ContainerCamera;