import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { styles } from "../Style";

import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';

export default function Footer() {

    const StartValueRadiusSVG = 15;
    const max_value_radius = StartValueRadiusSVG + (Math.round(StartValueRadiusSVG * 0.33) * 2);
    const min_value_radius = StartValueRadiusSVG - (Math.round(StartValueRadiusSVG * 0.33) * 2);

    const changeColor = () => {
        {/*  a     green=e       i        o         u   */ }
        listColors = ['red', '#085708', 'blue', 'orange', '#696969'];
        const randomIndex = Math.floor(Math.random() * listColors.length);
        setSvgColor(listColors[randomIndex]);
    };
    const increaseSize = () => {
        if (RadiusSVG < max_value_radius) {
            setRadiusSVG(RadiusSVG + Math.round(StartValueRadiusSVG * 0.33));
        }
        else {
            setRadiusSVG(RadiusSVG);
        }
    };

    const decreaseSize = () => {
        if (RadiusSVG > min_value_radius) {
            setRadiusSVG(RadiusSVG - Math.round(StartValueRadiusSVG * 0.33));
        }
        else {
            setRadiusSVG(RadiusSVG);
        }
    };

    const goingUp = () => {
        if (yCoordinate > 20) {
            setYCoordinate(yCoordinate - 15);
        }
        else {
            setYCoordinate(yCoordinate);
        }
    };

    const goingDown = () => {
        if (yCoordinate < 80) {
            setYCoordinate(yCoordinate + 15);
        }
        else {
            setYCoordinate(yCoordinate);
        }
    };
    return (
        <View style={styles.footerCont}>

            <TouchableOpacity onPress={changeColor} >
                <Icon1 name="color-palette-outline" size={30} color="#575656" />
            </TouchableOpacity>

            <TouchableOpacity onPress={increaseSize}>
                <Icon name="pluscircleo" size={30} color="#575656" />
            </TouchableOpacity>

            <TouchableOpacity onPress={decreaseSize}>
                <Icon name="minuscircleo" size={30} color="#575656" />
            </TouchableOpacity>

            <TouchableOpacity onPress={goingUp}>
                <Icon name="upcircleo" size={30} color="#575656" />
            </TouchableOpacity>

            <TouchableOpacity onPress={goingDown}>
                <Icon name="downcircleo" size={30} color="#575656" />
            </TouchableOpacity>


        </View>
    );
}
