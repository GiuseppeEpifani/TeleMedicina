import React, { createContext, useEffect, useReducer } from 'react'
import teleMedicinaApi from '../../api/teleMedicinaApi';
import teleMedicinaLogin from '../../api/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer } from './AuthReducer';

const authInitialState = {
    isLoggedIn: false,
    username: {},
    errorMessage: '',
    token: null,
    status: 'checking',
    loading: false
}

export const AuthContext = createContext(authInitialState);

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        try {
            if (token) {
                const { data } = await teleMedicinaApi.post('/refresh');
                await AsyncStorage.setItem('token', data.access_token); 
                dispatch({type: 'refreshToken', payLoad: data.access_token });
            } else {
                return dispatch({type: 'notAuthenticated'});
            }
    
        } catch (error) {
            dispatch({type: 'notAuthenticated'});
        }
    }

    const signIn = async ({email, password}) => {
        try {
            dispatch({ type: 'setLoading' });
            const { data } = await teleMedicinaLogin.post('/auth/login', { email: email.value.toLowerCase() , password: password.value });
            dispatch({ type: 'signIn', payLoad: { username: data.email, token: data.token} });
            await AsyncStorage.setItem('token', data.token);

        } catch (error) {
            dispatch({ type: 'addError', payLoad: 'Algo salio mal, credenciales incorrectas o error de respuesta' });
            console.log(error)
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    }

    const removeError = () => {
        dispatch({ type: 'removeError' });
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            signIn,
            logout,
            removeError
        }}>
            { children }
        </AuthContext.Provider>
    )

}