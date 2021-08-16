import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { PRIMARY, SUCCESS, VERY_LIGHT } from '../const/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import { AuthContext } from '../context/Auth/AuthContext';

export const WithoutConnectionScreen = () => {

    const { activeModeOffline } = useContext(AuthContext);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name="emoticon-sad" size={200} color={VERY_LIGHT} />
            <Text style={{fontSize: 32, fontWeight: 'bold', color: PRIMARY, marginBottom: 60}}>No hay conexion a internet</Text>
            <Button
                containerStyle={{elevation: 10, borderRadius: 20}}
                buttonStyle={{backgroundColor: SUCCESS, height: 40, width: 200, borderRadius: 20}}
                titleStyle={{fontWeight: 'bold', marginLeft: 5}}
                title="Activar modo offline"
                onPress={() => activeModeOffline(true)}
            />  
        </View>
    )
}
