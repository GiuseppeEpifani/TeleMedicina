import React from 'react'
import { Keyboard, SafeAreaView, StatusBar, TouchableWithoutFeedback, View } from 'react-native'
import { SCREEN_HEIGHT } from '../const/Dimensions'

const KeyboardView = props => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: props.backgroundColor}}>
            <StatusBar backgroundColor={props.barColor}></StatusBar>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{height: SCREEN_HEIGHT}}>
                        {props.children}
                    </View>
                </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default KeyboardView;