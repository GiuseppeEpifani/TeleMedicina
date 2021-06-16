import { StyleSheet } from 'react-native'
import { LIGHT, PRIMARY, SECONDARY } from '../../const/Colors';

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        padding: 60,
        backgroundColor: LIGHT
    },
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    marginBottom: {
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',       
        fontSize: 30,
        color: SECONDARY,
        marginBottom: 40
    },
    textRecovery: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        color: PRIMARY,
    },
    logo: {
        resizeMode: 'stretch', 
        width: 500, 
        height: 350
    }
});