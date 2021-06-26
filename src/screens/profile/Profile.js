import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from '../../context/Auth/AuthContext';
import { styles } from './style';

export const Profile = () => {

    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View>
                <Button onPress={logout} title={'Cerrar sesión'} />
            </View>
        </View>
    )
}
