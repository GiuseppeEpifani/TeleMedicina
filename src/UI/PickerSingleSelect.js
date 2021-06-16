import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SECONDARY, SUCCESS, VERY_LIGHT, WHITE } from '../const/Colors';

const PickerSingleSelect = (props) => {

    return (
        <View style={props.labelError && props.labelError.trim().length > 0  ? {...styles.container, ...{marginBottom: 60}} : styles.container}>
            { (props.label) && <Text style={styles.label}>{props.label}</Text> }
            <DropDownPicker
                style={{borderRadius: 20, borderColor: VERY_LIGHT}}
                placeholder="Seleccione"
                listMode="MODAL"
                mode="BADGE"
                showBadgeDot={false}
                searchable={true}
                searchPlaceholder="Buscar..."
                badgeColors={[SUCCESS]}
                badgeTextStyle={{
                    color: WHITE
                }}
                modalProps = { {
                    animationType : "fade"
                }}
                selectedItemLabelStyle = { {
                    fontWeight : "bold",
                    color: SUCCESS 
                }}
                selectedItemContainerStyle={{
                    backgroundColor: VERY_LIGHT
                }}
                multiple={false}
                min={1}
                open={props.open}
                value={props.value}
                items={props.items}
                setOpen={props.setOpen}
                setValue={props.setValue}
                setItems={props.setItems}
			/>
            { (props.labelError) && <Text style={styles.labelError}>{props.labelError}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginBottom: 50
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
        marginTop: 5
    }
});

export default PickerSingleSelect;