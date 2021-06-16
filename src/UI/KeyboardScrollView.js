import React from 'react'
import { Keyboard, SafeAreaView, StatusBar, TouchableWithoutFeedback, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SCREEN_HEIGHT } from '../const/Dimensions'

const KeyboardScrollView = props => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: props.backgroundColor}}>
            <StatusBar backgroundColor={props.barColor}></StatusBar>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={props.scrollEnabled} extraHeight={props.extraHeight} enableOnAndroid={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{height: SCREEN_HEIGHT}}>
                        {props.children}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default KeyboardScrollView;