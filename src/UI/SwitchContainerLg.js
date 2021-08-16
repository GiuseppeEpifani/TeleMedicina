import React from 'react'
import { View, StyleSheet, Text, Switch } from 'react-native';
import { SECONDARY } from '../const/Colors';

const SwitchContainerLg = (props) => {
    return (
        <View>
            { (props.label) && <Text style={styles.label}>{props.label}</Text> }
            <Switch value={props.value} onValueChange={props.onValueChange} />
        </View>  
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: SECONDARY,
        alignSelf: 'center',
        marginBottom: 5
	}
});

export default SwitchContainerLg;