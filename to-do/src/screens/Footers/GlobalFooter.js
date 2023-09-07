import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function GlobalFooter({ navigation }) {

    return (
        <View style={styles.footerCont}>
            <TouchableOpacity onPress={() => navigation.navigate('AllNotes')}>
                <Icon name="notebook" size={30} color="#141414"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreateNote')}>
                <Icon name="note" size={30} color="#141414" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerCont: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: '#d8d8d8',
        borderTopWidth: 1
    }
})