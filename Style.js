import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Center the content inside the container
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBar: {
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-around', // Evenly distribute buttons
        alignItems: 'center', // Center the buttons vertically
        backgroundColor: '#333', // Navbar background color
        height: 150, // Adjust the height as needed
        position: 'absolute',
        bottom: 0, // Fixed to the bottom
        left: 0,
        right: 0,
    },
    navButton: {
        backgroundColor: 'gray', // Set button background color
        borderColor: '#444', // Border color of the button
        borderWidth: 1, // Border width of the button
        flex: 1, // Equal width for each button
        alignItems: 'center', // Center the button's content
        paddingVertical: 25, // Adjust the vertical padding
    },
    buttonText: {
        color: 'white', // Text color of the button
        fontSize: 14,
        textAlign: 'center',
    }

});

export { styles }
