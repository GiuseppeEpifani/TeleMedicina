import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StacksAuth } from './StacksAuth';
import { LIGHT, PRIMARY, VERY_LIGHT } from '../const/Colors';
import { Profile } from '../screens/profile/Profile';
import { Configuration } from '../screens/configuration/Configuration';

export const Tabs = () => {
    return <TabsAndroid/>
}

const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
    return (
		<BottomTabAndroid.Navigator
			sceneAnimationEnabled={ true }
			initialRouteName="StacksAuth"
			activeColor={PRIMARY}
			inactiveColor={LIGHT}
			barStyle={{
				backgroundColor: VERY_LIGHT
			}}
		>
			<BottomTabAndroid.Screen name="StacksAuth" options={{ title: 'Pacientes', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="doctor" color={color} size={26} />) }} component={ StacksAuth } />
			<BottomTabAndroid.Screen name="profile" options={{ title: 'Mi perfil', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-settings" color={color} size={26} />) }} component={ Profile } />
			<BottomTabAndroid.Screen name="configuration" options={{ title: 'Configuración', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="cog" color={color} size={26} />) }} component={ Configuration } />
		</BottomTabAndroid.Navigator>
    );
  }
