import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from '../screens/createClinicalRecord/dimensionsScreen/Dimensions';
import { Pain } from '../screens/createClinicalRecord/dimensionsScreen/Pain';

const Stack = createStackNavigator();

export const StackDimensions = () => {
 
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <> 
                <Stack.Screen name="DimensionsInto" component={Dimensions} />
                <Stack.Screen name="Pain" component={Pain} />

            </>
        </Stack.Navigator>
    )
}