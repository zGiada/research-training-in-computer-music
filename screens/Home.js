import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Footer from '../components/Footer';
import Header from '../components/Headers';

import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation, AppState }) {
    const { allNotes, setNote } = AppState;

    const handlePress = (ele) => {
        setNote(ele);
        navigation.navigate('Note');
    }

    return (
        <View>
            <Header />
            <View>
                <Text> hello </Text>
            </View>
            <Footer />
        </View>
    );
}