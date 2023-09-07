import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { styles } from "../Style";

export default function Header() {

    return (
        <View style={styles.headerCont}>
            <Text>Welcome</Text>
            <Image style={styles.logo} source={require('../img/sunsleep.png')} />
            <Text>SoundRise</Text>
        </View>
    );
}