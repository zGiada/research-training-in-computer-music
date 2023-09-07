import { StyleSheet, Dimensions } from 'react-native';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingTop:30,
        alignItems: 'center',
        width: '100%',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        backgroundColor: '#fff',
        elevation: 7
    },
    logo: {
        height: 50,
        width: 50
    },
    footerCont: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#d8d8d8',
        borderTopWidth: 1,
        backgroundColor: '#fff'
    }
});

export { styles }
