import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { SECONDARY, WHITE } from '../const/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Image } from 'react-native-elements';
import { Text } from 'react-native';

const ContainerCamera = ({setUri, label}) => {

    const [TempUri, setTempUri] = useState([]);

    const takePhoto = () => {
        launchCamera(
            { 
                mediaType: 'photo',
                quality: 0.5,
                selectionLimit: 0,
            }, 
            ({assets, didCancel}) => {

                if (didCancel) return;
                const {uri} = assets[0];
                if (!uri) return;

                setUri(uri);
                setTempUri(TempUri => [uri, ...TempUri]);
            }
        );
    }

    const handleDeleteImage = (urlTemp) => {
        setTempUri(TempUri.filter( uri => uri !== urlTemp));
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
                    (TempUri.length < 5) &&
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