import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/Auth/AuthContext';
import { StacksLogin } from './src/navigator/StacksLogin';

export const App = () => {
  return (
	<NavigationContainer>
		<AppState>
			<StacksLogin/>
		</AppState>
	</NavigationContainer>
	)
}

const AppState = ({ children }) => {
	return (
	  <AuthProvider>
		{ children }
	  </AuthProvider>
	)
}
