import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import  Hr from './Hr'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LIGHT, SECONDARY } from '../const/Colors';

const TextIcon = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons size={36} color={SECONDARY} style={{padding: 4, marginRight: 10}} name={props.icon} />
                <Text style={styles.text}>{props.text}</Text>
            </View>
            {
                props.hr && <Hr/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
        width: '100%',
        marginBottom: 10
	},
	label: {
		fontWeight: 'bold', 
        fontSize: 16, 
        color: LIGHT, 
        marginLeft: 5, 
        marginBottom: 5
	},
	text: {
		fontSize: 18, 
        marginTop: 8
	}
});

export default TextIcon;