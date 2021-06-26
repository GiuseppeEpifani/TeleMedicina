import React from 'react'
import { Text, View } from 'react-native'
import Card from '../../UI/Card'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { SECONDARY } from '../../const/Colors';

export const CardInfoPatient = (props) => {
    return (
        <View style={{height: 180}}>
            <View style={{flex: 0.4}}>
                <Text style={styles.title}>Paciente clínico</Text>
            </View>
            <View style={{flex: 1}}>
                <Card>
                    <View style={styles.cardBody}>
                        <Text style={styles.textRun}>19.869.835-0 - <Text style={styles.textName}>Guieppe Epifani</Text></Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon name="calendar-range" size={35} color={SECONDARY}/>
                            <Text style={styles.textInfoBold}>Fecha de nacimiento: <Text style={styles.textInfo}>21-07-1998</Text></Text>
                        </View>
                    </View>
                </Card>
            </View>
        </View>
    )
}