import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        backgroundColor: '#CDE9FF'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',       
        fontSize: 30,
        color: '#888',
        marginBottom: 8
    },
    marginBottom: {
        marginBottom: 20
    },
    textDescription: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        marginBottom: 8,
        color: '#8c8c8c'
    },
    logo: {
        resizeMode: 'stretch', 
        width: 500, 
        height: 350
    }
});