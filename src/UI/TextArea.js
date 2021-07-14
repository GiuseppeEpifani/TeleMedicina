import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { SECONDARY, VERY_LIGHT } from '../const/Colors';

const TextArea = (props) => {

    return (
        <View>
            { props.label && <Text style={styles.label}>{props.label}</Text> }
            <View style={styles.container}>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    style={{justifyContent: "flex-start", textAlignVertical: 'top'}}                           
                />
            </View>
            { (props.labelError) && <Text style={styles.labelError}>{props.labelError}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1, 
        borderColor: VERY_LIGHT,
        borderRadius: 20, 
        paddingHorizontal: 10, 
        marginVertical: 10
    },
    labelError: {
        fontSize: 14,
        color: 'red',
        marginLeft: 10,
        marginTop: 5,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: SECONDARY,
        marginLeft: 10    
    }
});


export default TextArea;