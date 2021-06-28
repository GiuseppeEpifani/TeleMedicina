import { StyleSheet } from 'react-native'
import { PRIMARY } from '../../const/Colors';

export const styles = StyleSheet.create({
    titlePatient: {
        fontSize: 22, 
        fontWeight: 'bold',
        marginTop: 14,
        textAlign: 'center',
        marginBottom: 7,
        marginLeft: 10
    },
    titlePreview: {
        color: '#ffffff', 
        marginLeft: 10, 
        fontWeight: 'bold', 
        fontSize: 22, 
        padding: 4
    },
    headerInfoPatient: {
        flex: 0.1, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between', 
        backgroundColor: PRIMARY
    },
    containerInfoPatient: {
        paddingHorizontal: 30, 
        flex: 1
    },
    btnEdit: {
        backgroundColor: '#FFC107', 
        height: '100%'
    },
    btnDelete: {
        backgroundColor: '#DC3545', 
        height: '100%'
    },
    textSelectList: {
        color: 'white', 
        fontSize: 12
    }
});