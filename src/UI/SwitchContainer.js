import React from 'react'
import { View, StyleSheet, Text, Switch } from 'react-native';
import { SECONDARY } from '../const/Colors';

const SwitchContainer = (props) => {
    return (
        <View style={props.labelError && props.labelError.trim().length > 0  ? {...styles.container, ...{marginBottom: 60}} : styles.container}>
            { (props.label) && <Text style={styles.label}>{props.label}</Text> }
            <View style={{alignSelf: 'center'}}>
                <Switch value={props.value} />
            </View>                         
        </View>
     
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginBottom: 30
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: SECONDARY,
        alignSelf: 'center',
        marginBottom: 5
	}
});

export default SwitchContainer;