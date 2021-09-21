import React, { useContext } from 'react';
import { AuthContext } from '../context/Auth/AuthContext';
import { SignIn } from '../screens/signIn/SignIn';
import { PasswordRecovery } from '../screens/passwordRecovery/PasswordRecovery';
import { createStackNavigator } from '@react-navigation/stack';
import { StackInit } from './StackInit';
import { ScreenInit } from '../UI/ScreenInit';
import { LoadingScreen } from '../UI/LoadingScreen';
import { WithoutConnectionScreen } from '../UI/WithoutConnectionScreen';

const Stack = createStackNavigator();

export const StacksLogin = () => {

    const { isLoggedIn, status, loading, isConnected, uploadBaseData, appOffline, changeModeApp } = useContext(AuthContext);

    if (changeModeApp) return <LoadingScreen text={'Cambiando modo de la app...'}/>
    if (status == 'checking') return <ScreenInit/>
    if (!isConnected && !appOffline) return <WithoutConnectionScreen />
    if (uploadBaseData) return <LoadingScreen text={'Subiendo datos a la nube...'}/>
    if (loading) return <LoadingScreen text={'Iniciando sesión'}/>
 
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { (isLoggedIn || appOffline) ? (
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