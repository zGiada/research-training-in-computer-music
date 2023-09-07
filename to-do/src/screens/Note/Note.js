import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import GlobalFooter from '../Footers/GlobalFooter';
import GlobalHeader from '../Headers/GlobalHeader';
import Constants from 'expo-constants';

export default function Note({ navigation, AppState }) {
    const { note } = AppState;

    const handlePress = (ele) => {
        setNote(ele);
        navigation.navigate('AllNotes');
    }

    return (
        <View style={styles.screen}>
            <GlobalHeader />
            <View style={styles.body}>
            <Text>Note Title: {note.noteTitle}</Text>
            <Text>Note Text: {note.noteText}</Text>
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
    body: {
        flex: 8, justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
})