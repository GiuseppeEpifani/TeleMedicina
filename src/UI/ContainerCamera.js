import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, TouchableHighlight } from 'react-native'
import { SECONDARY, WHITE } from '../const/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera } from 'react-native-image-picker';
import { Image } from 'react-native-elements';
import { URL } from '../const/Url';
import { modeApp } from '../helpers/modeApp';

const ContainerCamera = ({setImages, label, images, audiovisualSupport, handleDeleteVisualSupport, patientId, imagesLocal, setimagesLocal, appIsLocal}) => {

    const [TempUri, setTempUri] = useState([]);
    const [mode, setModeApp] = useState();

    useEffect(() => {
        loadModeApp();
    }, []);

    const loadModeApp = async () => {
        const state = await modeApp();
        setModeApp(state);
    }

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
        <>
            { (label) && <Text style={styles.label}>{label}</Text> }
            <ScrollView horizontal={true}>
            <View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
                {
                    (TempUri.length > 0) &&
                    TempUri.map(urlTemp => (
                        <TouchableHighlight style={styles.containerImage} key={urlTemp}>
                            <>
                            <TouchableOpacity onPress={() => handleDeleteImage(urlTemp)} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                                <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: urlTemp }}
                                style={{ width: 100, height: 100 }}
                            />
                            </>
                        </TouchableHighlight>
                    ))
                }
                {
                    (!appIsLocal && audiovisualSupport.length > 0 && imagesLocal.length == 0) &&
                        audiovisualSupport.map((item) => (
                            <TouchableHighlight style={styles.containerImage} key={item.file}>
                                <>
                                <TouchableOpacity onPress={() => handleDeleteVisualSupport(item.file)} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                                    <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                                </TouchableOpacity>
                                <Image
                                    source={{ uri: `${URL}/storage/clinical_record/${patientId}/health_checks/${item.file}` }}
                                    style={{ width: 100, height: 100 }}
                                />
                                </>
                            </TouchableHighlight>
                        )
                    ) 
                }
                {
                    (imagesLocal.length > 0) &&
                    imagesLocal.map((item) => (
                        <TouchableHighlight style={styles.containerImage} key={item.guid_name}>
                            <>
                            <TouchableOpacity onPress={() => hanldeDeleteImageLocal(item)} style={{position: 'absolute', right: 0, top: 0, zIndex: 1, marginRight: 5, marginTop: 5}}>
                                <MaterialCommunityIcons name="close-circle" size={22} color={'red'}/>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: item.file }}
                                style={{ width: 100, height: 100 }}
                            />
                            </>
                        </TouchableHighlight>
                    ))
                }
                {
                    (mode && imagesLocal.length + TempUri.length < 4 || !mode) &&
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
        </ScrollView>
        </>
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