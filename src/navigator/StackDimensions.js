import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from '../screens/createClinicalRecord/dimensionsScreen/Dimensions';
import { Pain } from '../screens/createClinicalRecord/dimensionsScreen/Pain';
import { BehaviorProblems } from '../screens/createClinicalRecord/dimensionsScreen/BehaviorProblems';

const Stack = createStackNavigator();

export const StackDimensions = () => {
 
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <> 
                <Stack.Screen name="DimensionsInto" component={Dimensions} />
                <Stack.Screen name="Pain" component={Pain} />
                <Stack.Screen name="BehaviorProblems" component={BehaviorProblems} />

            </>
        </Stack.Navigator>
    )
}