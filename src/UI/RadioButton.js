import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LIGHT, PRIMARY } from '../const/Colors';

const RadioButton = (props) => {
    return (
		<View style={{flexDirection: 'row'}}>
			<View style={styles.container}>
				{ (props.selected) && <View style={styles.subContainer}/> }
			</View>
			<Text style={styles.labelRadio}>{props.labelRadio}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: PRIMARY,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10
    },
	subContainer: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: PRIMARY,
	},
	labelRadio: {
		fontWeight: 'bold',
		marginLeft: 6,
		fontSize: 18,
		color: LIGHT
	}
});

export default RadioButton;