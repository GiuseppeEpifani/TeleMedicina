import { StyleSheet } from 'react-native'
import { PRIMARY, LIGHT, SUCCESS, DANGER, INFO, SECONDARY, WARNING } from '../../const/Colors';

export const styles = StyleSheet.create({
    cardBody: {
        height: '100%',
        borderLeftWidth: 10, 
        borderLeftColor: PRIMARY,
        padding: 20
    },
    containerBackground: {
        flex: 2,
        borderWidth: 1, 
        borderColor: SECONDARY, 
        borderRadius: 10, 
        overflow: 'hidden'
    },
    title: {
        color: PRIMARY,
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 5
    },
    textRun: {
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'left',
        color: LIGHT,
        marginBottom: 10
    },
    textName: {
        fontSize: 30,
        textAlign: 'left',
        color: LIGHT,
        fontWeight: 'normal',
    },
    textInfoBold: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
        color: LIGHT,
        marginLeft: 5
    },
    textInfo: {
        fontSize: 22,
        textAlign: 'left',
        color: LIGHT,
        fontWeight: 'normal',
    },
    cardAttention: {
        height: '100%', 
        borderLeftWidth: 10, 
        borderLeftColor: SUCCESS,
        padding: 20
    },
    textCardAttention: {
        fontSize: 30,
        color: LIGHT,
        fontWeight: 'bold'
    },
    btnDelete: {
        backgroundColor: DANGER, 
        height: 40, 
        width: 40
    },
    btnInfo: {
        backgroundColor: INFO, 
        height: 40
    },
    textBackgroundSuccess: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: SUCCESS, 
        marginLeft: 5, 
        textAlign: 'center'
    },
    textBackgroundWarning: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color: WARNING, 
        marginLeft: 5, 
        textAlign: 'center'
    },
    
});