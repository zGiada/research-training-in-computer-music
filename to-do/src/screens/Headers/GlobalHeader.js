import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';


export default function GlobalFooter({ navigation }) {

    return (
        <View style={styles.headerCont}>
            <Image style={styles.logo} source={require('../../assets/images/logo2.png')}/>
            <Text>Note Application</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        alignItems: 'center',
        width: '100%',
        shadowOffset:{width: 1, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        backgroundColor: '#fff',
        elevation: 7
    },
    logo:{
        height: 30,
        width: 30
    }
})