import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SECONDARY, VERY_LIGHT } from '../const/Colors';
import { Picker } from '@react-native-picker/picker';

const ComboBox = ({label, labelError, handleGetValue}) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
  
    useMemo(() => handleGetValue(selectedLanguage), [selectedLanguage])
  
    return (
        <View style={labelError ? {marginBottom: 8} : {marginBottom: 30}}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }>
                    <Picker.Item label="Seleccione" value={null} />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            { (labelError) && <Text style={styles.labelError}>{labelError}</Text> }
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    container: {
        height: 50,
        borderRadius: 40,
        borderColor: VERY_LIGHT,
        borderWidth: 1,
        overflow: 'hidden'
    }
});

export default ComboBox;