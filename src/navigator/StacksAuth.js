import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RegisterPatient } from '../screens/registerPatient/RegisterPatient';
import { Home } from '../screens/home/Home';
import { InfoPatient } from '../screens/infoPatient/InfoPatient';
import { EditPatient } from '../screens/editPatient/EditPatient';

const Stack = createStackNavigator();

export const StacksAuth = () => {
 
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <> 
				<Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="RegisterPatient" component={RegisterPatient} />
                <Stack.Screen name="EditPatient" component={EditPatient} />
                <Stack.Screen name="InfoPatient" component={InfoPatient} />
            </>
        </Stack.Navigator>
    )
}