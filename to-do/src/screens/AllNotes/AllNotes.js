import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function AllNotes({ navigation, AppState }) {
    const { allNotes, setNote } = AppState;

    const handlePress = (ele) => {
        setNote(ele);
        navigation.navigate('Note');
    }

    return (
        <View style={styles.screen}>
            {allNotes.map((element, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => handlePress(element)} style={styles.button}>
                        <Text>{element.noteTitle}</Text>
                    </TouchableOpacity>
                );
            })}
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