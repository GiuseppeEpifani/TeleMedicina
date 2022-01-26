import React from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, SECONDARY, VERY_LIGHT, BLACK, WHITE, DANGER } from '../const/Colors';
import Tooltip from 'react-native-walkthrough-tooltip';

const InputText = (props) => {
    return (
        <View style={props.labelError && props.labelError.trim().length > 0  ? {...styles.container, ...{marginBottom: 60}} : styles.container}>
            <View style={{flexDirection: 'row'}}>
                { (props.label) && <Text style={styles.label}>{props.label}</Text> }
                {
                    (props.alert) &&
                    <Tooltip
                        isVisible={props.toolTipVisible.[props.computedObject]}
                        content={<Text>{props.labelAlert}</Text>}
                        placement="top"
                        onClose={() => props.setToolTipVisible({...props.toolTipVisible, [props.computedObject]: false})}
                    >
                        <TouchableOpacity onPress={() => { props.setToolTipVisible({...props.toolTipVisible, [props.computedObject]: true})}} style={{borderRadius: 50, backgroundColor: DANGER, top: -5, left: 5, zIndex: 100}}>
                            <MaterialCommunityIcons name={"alert-circle-outline"} size={26} color={WHITE} />
                        </TouchableOpacity>
                    </Tooltip>
                }
            </View>
            <View style={(props.labelError) ? styles.containerInputError : styles.containerInput}>
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
                        ref={props.refs} 
                    />
                    { props.buttonDelete &&
                        <Button
                            containerStyle={{width: 50, position: 'absolute', right: 0}}
                            buttonStyle={{backgroundColor: WHITE, height: '100%'} }
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
    containerInputError: {
        height: 50,
        borderRadius: 40,
        borderColor: DANGER,
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
