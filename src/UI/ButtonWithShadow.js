import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SUCCESS, VERY_LIGHT, WHITE } from '../const/Colors';

const ButtonWithShadow = ({text, onPress, thereAre}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.shadow} />
            <View style={styles.subContainer}>
                <Text style={{fontWeight: 'bold', fontSize: 36, color: WHITE}}>{text}</Text>
            </View>
            {
                (thereAre) &&
                <View style={styles.containerSelect}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons size={20} color={WHITE} name={'clipboard-check-multiple'} />
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}

export default ButtonWithShadow;

const styles = StyleSheet.create({
	container: {
        height: 90, 
        alignItems: 'center', 
        marginBottom: 10, 
        marginTop: 10, 
        width: '100%', 
        elevation: 1
    },
    shadow: {
        height: 80, 
        position: 'absolute', 
        backgroundColor: VERY_LIGHT, 
        left: -1, 
        top: 14, 
        width: '95%', 
        borderRadius: 20
    },
    containerSelect: {
        height: 40, 
        position: 'absolute', 
        backgroundColor: PRIMARY, 
        right: -1, 
        top: 5, 
        width: 40,
        borderWidth: 3,
        borderColor: WHITE, 
        borderRadius: 20
    },
    subContainer: {
        height: 80, 
        width: '95%', 
        backgroundColor: SUCCESS, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center'
    }

});

