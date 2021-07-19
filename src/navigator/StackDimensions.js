import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from '../screens/createClinicalRecord/dimensionsScreen/Dimensions';
import { Pain } from '../screens/createClinicalRecord/dimensionsScreen/Pain';
import { BehaviorProblems } from '../screens/createClinicalRecord/dimensionsScreen/BehaviorProblems';
import { RespiratoryProblems } from '../screens/createClinicalRecord/dimensionsScreen/RespiratoryProblems';
import { DigestiveProblems } from '../screens/createClinicalRecord/dimensionsScreen/DigestiveProblems';
import { UrinaryProblems } from '../screens/createClinicalRecord/dimensionsScreen/UrinaryProblems';
import { FallsAndBumps } from '../screens/createClinicalRecord/dimensionsScreen/FallsAndBumps';

const Stack = createStackNavigator();

export const StackDimensions = () => {
 
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <> 
                <Stack.Screen name="DimensionsInto" component={Dimensions} />
                <Stack.Screen name="Pain" component={Pain} />
                <Stack.Screen name="BehaviorProblems" component={BehaviorProblems} />
                <Stack.Screen name="RespiratoryProblems" component={RespiratoryProblems} />
                <Stack.Screen name="DigestiveProblems" component={DigestiveProblems} />
                <Stack.Screen name="UrinaryProblems" component={UrinaryProblems} />
                <Stack.Screen name="FallsAndBumps" component={FallsAndBumps} />
            </>
        </Stack.Navigator>
    )
}