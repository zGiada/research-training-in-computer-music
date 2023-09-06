import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function Note({ navigation, AppState }) {
    const { note } = AppState;

    const handlePress = (ele) => {
        setNote(ele);
        navigation.navigate('AllNotes');
    }

    return (
        <View style={styles.screen}>
            <Text>Note Title: {note.noteTitle}</Text>
            <Text>Note Text: {note.noteText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        margin: 20,
        padding: 20,
        borderWidth: 3
    }
})