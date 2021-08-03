import React, { useContext } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../../context/Auth/AuthContext';
import { RecordContext } from '../../context/RecordFile/RecordContext';

export const Configuration = () => {

    const { logout } = useContext(AuthContext);
    const { cleanData } = useContext(RecordContext);

    const handleLogout = () => {
        cleanData();
        logout();
    }
    
    return (
        <View>
            
        </View>
    )
}
