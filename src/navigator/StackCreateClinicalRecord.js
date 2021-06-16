import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { HealthCheck } from '../screens/createClinicalRecord/HealthCheck';
import { MorbidHistory } from '../screens/createClinicalRecord/MorbidHistory';
import { PRIMARY, WHITE } from '../const/Colors';
import { StackDimensions } from './StackDimensions';

const Stack = createStackNavigator();

export const StackCreateClinicalRecord = () => {

    const config_transition_right = { cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, gestureDirection: 'horizontal', headerShown: true, headerTitleAlign: 'center',  headerStyle: { backgroundColor: PRIMARY }, headerTintColor: WHITE, headerTitleStyle: { fontWeight: 'bold' }};
 
    return (
        <Stack.Navigator screenOptions={config_transition_right}>
            <> 
                <Stack.Screen name="MorbidHistory" component={MorbidHistory} options={{...config_transition_right, title: 'Antecedentes mórbidos'}}/>
                <Stack.Screen name="HealthCheck" component={HealthCheck} options={{...config_transition_right, title: 'Control de salud'}}/>
                <Stack.Screen name="Dimensions" component={StackDimensions} options={{...config_transition_right, title: 'Dimensiones'}}/>
            </>
        </Stack.Navigator>
    )
}