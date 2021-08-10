import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { SECONDARY, WHITE } from '../const/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera } from 'react-native-image-picker';
import { Image } from 'react-native-elements';
import { Text } from 'react-native';
import { URL } from '../const/Url';

const ContainerCamera = ({setImages, label, images, audiovisualSupport, handleDeleteVisualSupport, patientId, imagesLocal, setimagesLocal, appIsLocal}) => {

    const [TempUri, setTempUri] = useState([]);

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

                setImages(Images => [{ base64: `data:image/jpeg;base64,${res.base64}`, urlTemp: res.uri }, ...Images]);
                setTempUri(TempUri => [res.uri, ...TempUri]);
            }
        );
    }

    const handleDeleteImage = (urlTemp) => {
        setTempUri(TempUri.filter( uri => uri !== urlTemp));
        setImages(images.filter(img => img.urlTemp !== urlTemp));
    }

    const hanldeDeleteImageLocal = (imageLocal) => {
        setimagesLocal(imagesLocal.filter(img => img.guid_name !== imageLocal.guid_name));
    }

    return (
        <View>
            { (label) && <Text style={styles.label}>{label}</Text> }
            <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                {
                    (TempUri.length > 0) &&
                    TempUri.map(urlTemp => (
                        <View style={styles.containerImage} key={urlTemp}>
                            <TouchableOpacity onPress={() => handleDeleteImage(urlTemp)} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                                <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: urlTemp }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    ))
                }
                {
                    (!appIsLocal && audiovisualSupport.length > 0 && imagesLocal.length == 0) &&
                    audiovisualSupport.map(item => (
                        <View style={styles.containerImage} key={item.file}>
                            <TouchableOpacity onPress={() => handleDeleteVisualSupport(item.file)} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                                <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: `${URL}/storage/clinical_record/${patientId}/health_checks/${item.file}` }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    ))
                }
                {
                    (imagesLocal.length > 0) &&
                    imagesLocal.map((item) => (
                        <View style={styles.containerImage} key={item.guid_name}>
                            <TouchableOpacity onPress={() => hanldeDeleteImageLocal(item)} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                                <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: item.file }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    ))
                }           
                {
                    ((TempUri.length + audiovisualSupport.length) < 4 || imagesLocal.length + TempUri.length < 4) &&
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