import { StyleSheet } from 'react-native'
import { PRIMARY } from '../../const/Colors';

export const styles = StyleSheet.create({
    cardBody: {
        height: '100%',
        borderLeftWidth: 10, 
        borderLeftColor: PRIMARY,
        padding: 20
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
        color: '#696969',
        marginBottom: 10
    },
    textName: {
        fontSize: 30,
        textAlign: 'left',
        color: '#696969',
        fontWeight: 'normal',
    },
    textInfoBold: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#696969',
        marginTop: 2,
        marginLeft: 5
    },
    textInfo: {
        fontSize: 22,
        textAlign: 'left',
        color: '#696969',
        fontWeight: 'normal',
    },
    cardAttention: {
        height: '100%', 
        borderLeftWidth: 10, 
        borderLeftColor: '#5cb85c',
        padding: 20
    },
    textCardAttention: {
        fontSize: 30,
        color: '#696969',
        fontWeight: 'bold'
    },
});