import React, { useContext } from 'react';
import { Tabs } from './Tabs';
import { AuthContext } from '../context/Auth/AuthContext';
import { SignIn } from '../screens/signIn/SignIn';
import { PasswordRecovery } from '../screens/passwordRecovery/PasswordRecovery';
import { createStackNavigator } from '@react-navigation/stack';
import { StackInit } from './StackInit';
import { ScreenInit } from '../UI/ScreenInit';
import { LoadingScreen } from '../UI/LoadingScreen';

const Stack = createStackNavigator();

export const StacksLogin = () => {

    const { isLoggedIn, status, loading } = useContext(AuthContext);
    if (loading) return <LoadingScreen text={'Iniciando sesión'}/>
    if (status == 'checking') return <ScreenInit/>
 
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { isLoggedIn ? (
            <> 
              	<Stack.Screen name="StackInit" component={StackInit} />
            </>
        ) : (
            <> 
				<Stack.Screen name="SignIn" component={SignIn} />
				<Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
            </>
        )}
        </Stack.Navigator>
    )
}