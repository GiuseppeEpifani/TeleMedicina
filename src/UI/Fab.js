import React from 'react'
import { TouchableHighlight, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIMARY, WHITE } from '../const/Colors';

const Fab = (props) => {
    return (
        <TouchableHighlight style={styles.container} onPress={props.onPress} activeOpacity={0.6} underlayColor="#DDDDDD">
            <MaterialCommunityIcons size={36} color={WHITE} name={props.icon} />
        </TouchableHighlight>
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
