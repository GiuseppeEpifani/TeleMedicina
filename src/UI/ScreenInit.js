import React from 'react';
import { View, Image } from 'react-native';

export const ScreenInit = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e9ecee'}}>
            <Image style={{ resizeMode: 'stretch', width: 500, height: 350}} source={require('../assets/logo_telemedicina.png')} />
        </View>
    )
}
