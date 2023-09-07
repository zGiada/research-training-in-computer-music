import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import GlobalFooter from '../Footers/GlobalFooter';
import GlobalHeader from '../Headers/GlobalHeader';

import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AllNotes({ navigation, AppState }) {
    const { allNotes, setNote } = AppState;

    const handlePress = (ele) => {
        setNote(ele);
        navigation.navigate('Note');
    }

    return (
        <View style={styles.screen}>
            <GlobalHeader />
            <View style={styles.body}>
            {allNotes.map((element, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => handlePress(element)} style={styles.noteCont}>
                        <Text>{element.noteTitle}</Text>
                    </TouchableOpacity>
                );
            })}
            </View>
            <GlobalFooter AppState={AppState} navigation={navigation}></GlobalFooter>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight
    },
    noteCont: {
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 30,
        padding: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        backgroundColor: '#fff',
        shadowColor: '#000',
        borderWidth: 0.75,
        borderColor: '#d8d8d8',
        borderRadius: 12,
        elevation: 4
    },
    body:{
        flex: 8,
        width: '100%',
        paddingVertical: 20
    }
})