import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ArrowBack = ({onPress}) => {
    return (
        <TouchableHighlight style={styles.goBack} onPress={onPress} activeOpacity={0.6} underlayColor="#DDDDDD">
            <MaterialCommunityIcons name="arrow-left" size={46} />
        </TouchableHighlight>
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