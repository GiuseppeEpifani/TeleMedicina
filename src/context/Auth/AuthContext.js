import React, { createContext, useReducer } from 'react'
import { authReducer } from './AuthReducer';

// Estado inicial
const authInitialState = {
    isLoggedIn: false,
    username: 'undefined',
    errorMesagge: 'undefined',
    token: null,
    status: ''
}

// Crear el contexto
export const AuthContext = createContext(null);

// Componente proveedor del estado
export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState)

    const signIn = () => {
        dispatch({ type: 'signIn' });
    }

    const logout = () => {
        dispatch({ type: 'logout' });
    }

    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )

}