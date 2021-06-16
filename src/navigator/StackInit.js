import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackCreateClinicalRecord } from './StackCreateClinicalRecord';
import { Tabs } from './Tabs';

const Stack = createStackNavigator();

export const StackInit = () => {
 
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <> 
				<Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="CreateClinicalRecord" component={StackCreateClinicalRecord} />
            </>
        </Stack.Navigator>
    )
}