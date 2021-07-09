import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SECONDARY, VERY_LIGHT, BLACK, WHITE } from '../const/Colors';

const InputText = (props) => {
    return (
        <View style={props.labelError && props.labelError.trim().length > 0  ? {...styles.container, ...{marginBottom: 60}} : styles.container}>
            { (props.label) && <Text style={styles.label}>{props.label}</Text> }
            <View style={styles.containerInput}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {(props.nameIcon != '') && <MaterialCommunityIcons name={props.nameIcon} size={35} style={styles.icon} color={SECONDARY}/>}
                    <TextInput
                        style={{...styles.input, ...props.styleWidth}}
                        onChangeText={props.onChangeText}
                        placeholder={props.placeholder}
                        keyboardType={props.keyboardType}
                        value={props.value}
                        editable={props.editable} 
                        selectTextOnFocus={props.selectTextOnFocus}
                        secureTextEntry={props.secureTextEntry}
                    />
                    { props.buttonDelete &&
                        <Button
                            containerStyle={{width: 120}}
                            buttonStyle={{backgroundColor: WHITE, height: '100%'}}                         
                            onPress={(props.onPress) ? props.onPress : () => {}}
                            icon={
                                <MaterialCommunityIcons
                                    name="delete-forever"
                                    size={30}
                                    color={(props.onPress) ? PRIMARY : WHITE}
                                />
                            }
                        />
                    }
                </View>
            </View>
            { (props.labelError) && <Text style={styles.labelError}>{props.labelError}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
        height: 50,
        marginBottom: 50
    },
    containerInput: {
        height: 50,
        borderRadius: 40,
        borderColor: VERY_LIGHT,
        borderWidth: 1,
        overflow: 'hidden'
    },
    input: {
        width: '100%',
        marginLeft: 8,
        fontSize: 18,
        color: BLACK,
        borderWidth: 0,
    },
    icon: {
        marginLeft: 10,
        marginTop: 6
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: SECONDARY,
        marginLeft: 10,
        marginBottom: 5
    },
    labelError: {
        fontSize: 14,
        color: 'red',
        marginLeft: 10,
        marginTop: 5,
    }
});

export default InputText;
