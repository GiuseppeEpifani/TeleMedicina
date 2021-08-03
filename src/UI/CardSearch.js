import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { PRIMARY, SECONDARY, VERY_LIGHT } from '../const/Colors';
import SwitchContainer from './SwitchContainer';

const CardSearch = props => {
	return (
		<View style={{...styles.card, ...props.style}}>
			{ props.header && 
                <View style={styles.header}>
                    <Text style={styles.title}>{props.title}</Text>
                    { props.switchHeader && 
                        <View style={{marginLeft: 'auto', padding: 5, marginRight: 4}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold', color: SECONDARY, marginRight: 5, fontSize: 18}}><Text style={!props.valueSwitch ? {color: '#000000'} : {color: SECONDARY}}>{props.titleFirstSwitch}</Text>/<Text style={props.valueSwitch ? {color: '#000000'} : {color: SECONDARY}}>{props.titleSecondSwitch}</Text></Text>
                                <SwitchContainer value={props.valueSwitch} onValueChange={(value) => props.setSwitch(value)} />
                            </View>
                        </View> 
                    }
                </View> 
            }
			<View style={{padding: props.padding}}>{props.children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flex: 1,
		shadowColor: 'black',
		shadowOpacity: 0.50,
		shadowRadius: 8,
		elevation: 10,
		borderRadius: 15,
		backgroundColor: 'white',
		overflow: 'hidden'
	},
	header: {
		justifyContent: 'center',
        flexDirection: 'row',
		width: '100%',
        height: 50,
        backgroundColor: VERY_LIGHT
	},
	title: {
		color: PRIMARY,
		padding: 3,
		marginLeft: 8,
		fontWeight: 'bold',
		fontSize: 26,
	}
});

export default CardSearch;
