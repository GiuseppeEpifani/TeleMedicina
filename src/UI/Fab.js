import React from 'react'
import { TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, WHITE } from '../const/Colors';

const Fab = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <MaterialCommunityIcons size={36} color={WHITE} name={props.icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80, 
        width: 80, 
        borderRadius: 50, 
        backgroundColor: PRIMARY, 
        position: 'absolute', 
        bottom: 0, 
        right: 0, 
        marginBottom: 12, 
        marginRight: 12, 
        justifyContent: 'center', 
        alignItems: 'center', 
        elevation: 10,
    }
});

export default Fab;
