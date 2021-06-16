import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 24,
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
        fontSize: 22,
        color: '#888',
        marginBottom: 20
    },
    textRecovery: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        color: '#0066cc',
    }
});