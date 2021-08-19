import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/Auth/AuthContext';
import { StacksLogin } from './src/navigator/StacksLogin';
import { HomeProvider } from './src/context/Home/HomeContext';
import { RecordProvider } from './src/context/RecordFile/RecordContext';

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
		<HomeProvider>
			<RecordProvider>
				{ children }
			</RecordProvider>
		</HomeProvider>
	  </AuthProvider>
	)
}
