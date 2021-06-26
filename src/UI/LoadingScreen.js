import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { PRIMARY } from '../const/Colors'

export const LoadingScreen = ({text}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 36, fontWeight: 'bold', marginBottom: 20, color: PRIMARY}}>{text}</Text>
            <ActivityIndicator 
                size={50}
                color={PRIMARY}
            />
        </View>
    )
}
