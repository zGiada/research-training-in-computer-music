import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import SimpleSvgComponent from './components/SimpleSvgComponent';
import { styles } from "./Style";


export default function App() {  
  
  [svgColor, setSvgColor] = useState('yellow');
  
  const StartValueRadiusSVG = 15 ;
  const max_value_radius = StartValueRadiusSVG + (Math.round(StartValueRadiusSVG * 0.33) * 2);
  const min_value_radius = StartValueRadiusSVG - (Math.round(StartValueRadiusSVG * 0.33) * 2);
    
  [RadiusSVG, setRadiusSVG] = useState(StartValueRadiusSVG); 
  [yCoordinate, setYCoordinate] = useState(50); 

  
    
  const changeColor = () => {
              {/*  a     green=e       i        o         u   */}
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
    if (yCoordinate>20){
      setYCoordinate(yCoordinate - 15);
    }
    else{
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
    <View style={styles.container}>
      <ImageBackground
        source={require('./img/cloud.jpg')}
        style={styles.backgroundImage}
      >
        <View style={{
          width: '100%',
          height: '100%',
          justifyContent: 'space-around'
        }}
        >
          <SimpleSvgComponent svgColor={svgColor} rad={RadiusSVG} yCoordinate={yCoordinate} />
        </View>
      </ImageBackground>
      
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={changeColor}
          >
          <Text>Color</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={increaseSize}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={decreaseSize}>
          <Text>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={goingUp}>
          <Text>↑</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={goingDown}>
          <Text>↓</Text>
        </TouchableOpacity>
      </View>      
    </View>
  );
}
