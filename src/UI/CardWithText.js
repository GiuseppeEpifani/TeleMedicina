import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PRIMARY, SECONDARY, VERY_LIGHT } from '../const/Colors';

const CardWithText = props => {
	return (
		<View style={{height: '100%'}}>
			<View style={{...styles.card, ...props.style}}>
				{ props.header && <View style={styles.header}>
					<Text style={styles.title}>{props.title}</Text>
					{ props.buttonHeader && <View style={{marginLeft: 'auto', padding: 5, marginRight: 4}}>
						<Button
						title={props.titleButton}
						containerStyle={{width: 200, borderRadius: 10}}
						icon={
							<Icon
							name="user-plus"
							style={{marginRight: 10}}
							size={16}
							color="white"
							/>
						}
						/>
					</View> }
				</View> }
				<Text style={{fontWeight: 'bold', marginLeft: 14, fontSize: 30, color: SECONDARY, elevation: 30}}>{props.title}</Text>
				<View style={{padding: props.padding, paddingBottom: 50}}>{props.children}</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		height: '98%',
		shadowColor: 'black',
		shadowOpacity: 0.50,
		shadowRadius: 8,
		elevation: 10,
		borderRadius: 15,
		backgroundColor: 'white',
		overflow: 'hidden',
		marginTop: 24,
	},
	header: {
		justifyContent: 'center',
		width: '100%',
        height: 50,
        backgroundColor: VERY_LIGHT
	},
	title: {
		color: PRIMARY,
		padding: 3,
		marginLeft: 8,
		fontWeight: 'bold',
		fontSize: 26
	}
});

export default CardWithText;
