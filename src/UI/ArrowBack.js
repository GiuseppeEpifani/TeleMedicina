import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ArrowBack = ({navigation}) => {
    return (
        <TouchableOpacity style={{flex: 1}} onPress={ () => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={35} style={styles.goBack} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    goBack: {
        position: 'absolute',
        marginTop: 10,
        marginLeft: 10
    },
});

export default ArrowBack;