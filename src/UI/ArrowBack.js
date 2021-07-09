import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ArrowBack = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.goBack} onPress={onPress}>
            <MaterialCommunityIcons name="arrow-left" size={46} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    goBack: {
        position: 'absolute',
        marginTop: 2,
        marginLeft: 20,
        borderRadius: 50
    },
});

export default ArrowBack;