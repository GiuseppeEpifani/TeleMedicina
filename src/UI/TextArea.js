import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { DANGER, SECONDARY, VERY_LIGHT } from '../const/Colors';

const TextArea = (props) => {

    return (
        <View>
            { props.label && <Text style={styles.label}>{props.label}</Text> }
            <View style={(props.labelError) ? styles.containerError : styles.container}>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    keyboardType={props.keyboardType}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    style={{justifyContent: "flex-start", textAlignVertical: 'top'}}
                    maxLength={(props.maxLength) ? props.maxLength : 200}                         
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
    containerError: {
        borderWidth: 1, 
        borderColor: DANGER,
        borderRadius: 20, 
        paddingHorizontal: 10, 
        marginVertical: 10
    },
    labelError: {
        fontSize: 14,
        color: 'red',
        marginLeft: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: SECONDARY,
        marginLeft: 10    
    }
});


export default TextArea;