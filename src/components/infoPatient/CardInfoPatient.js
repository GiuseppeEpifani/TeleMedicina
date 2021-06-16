import React from 'react'
import { Text, View } from 'react-native'
import Card from '../../UI/Card'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { SECONDARY } from '../../const/Colors';

export const CardInfoPatient = (props) => {
    return (
        <View style={(props.onlyDate) ? {height: 180} : {height: 290}}>
            <View style={(props.onlyDate) ? {flex: 0.4} : {flex: 0.2}}>
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
                        { !props.onlyDate &&
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name="phone" size={35} color={SECONDARY}/>
                                <Text style={styles.textInfoBold}>Teléfono: <Text style={styles.textInfo}>999081586</Text></Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name="map-marker" size={35} color={SECONDARY}/>
                                <Text style={styles.textInfoBold}>Dirección: <Text style={styles.textInfo}>Olivar bajo</Text></Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon name="email" size={35} color={SECONDARY}/>
                                <Text style={styles.textInfoBold}>Correo: <Text style={styles.textInfo}>contacto@gmail.com</Text></Text>
                            </View>
                        </View>
                        }
                    </View>
                </Card>
            </View>
        </View>
    )
}