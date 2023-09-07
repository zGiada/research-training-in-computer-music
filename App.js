import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import SimpleSvgComponent from './components/SimpleSvgComponent';
import { styles } from "./Style";
import Footer from './components/Footer';
import Header from './components/Header';

export default function App() {

  [svgColor, setSvgColor] = useState('yellow'); 
  [RadiusSVG, setRadiusSVG] = useState(15);
  [yCoordinate, setYCoordinate] = useState(50);

  return (
      <ImageBackground source={require('./img/cloud.jpg')} style={styles.backgroundImage}>
        <Header />
      <View style={styles.container}>
          <SimpleSvgComponent svgColor={svgColor} rad={RadiusSVG} yCoordinate={yCoordinate} />
        </View>
        <Footer />
      </ImageBackground>      
  );
}