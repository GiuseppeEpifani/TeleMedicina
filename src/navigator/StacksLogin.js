import React, { useContext } from 'react';
import { Tabs } from './Tabs';
import { AuthContext } from '../context/Auth/AuthContext';
import { SignIn } from '../screens/signIn/SignIn';
import { PasswordRecovery } from '../screens/passwordRecovery/PasswordRecovery';
import { createStackNavigator } from '@react-navigation/stack';
import { StackInit } from './StackInit';

const Stack = createStackNavigator();

export const StacksLogin = () => {

    const { authState } = useContext(AuthContext)
 
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { authState.isLoggedIn ? (
            <> 
              	<Stack.Screen name="Tabs" component={Tabs} />
            </>
        ) : (
            <> 
				<Stack.Screen name="StackInit" component={StackInit} />
				<Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
            </>
        )}
        </Stack.Navigator>
    )
}