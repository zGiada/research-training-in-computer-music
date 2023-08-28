import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import SimpleSvgComponent from './components/SimpleSvgComponent';


export default function App() {
  const [svgColor, setSvgColor] = useState('#ffff00');
  const [SVGdim, setSVGdim] = useState(200);
  const [yCoordinate, setYCoordinate] = useState(0); // Change the state name to setYCoordinate

  const changeColor = () => {
    const listColors = ['#ff110f', '#ff00ff', '#0000ff', '#ffffff', '#ffff00', '#f1035f'];
    const randomIndex = Math.floor(Math.random() * listColors.length);
    setSvgColor(listColors[randomIndex]);
  };
  
  const increaseSize = () => {
    setSVGdim(SVGdim + 10);
  };

  const decreaseSize = () => {
    if (SVGdim > 10) {
      setSVGdim(SVGdim - 10);
    }
  };

  const goingUp = () => {
    setYCoordinate(yCoordinate - 10); 
  };

  const goingDown = () => {
    setYCoordinate(yCoordinate + 10);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./img/bg.jpeg')}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <SimpleSvgComponent svgColor={svgColor} width={SVGdim} height={SVGdim} yCoordinate={yCoordinate} />          
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the content inside the container
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-around', // Evenly distribute buttons
    alignItems: 'center', // Center the buttons vertically
    backgroundColor: '#333', // Navbar background color
    height: 150, // Adjust the height as needed
    position: 'absolute',
    bottom: 0, // Fixed to the bottom
    left: 0,
    right: 0,
  },
  navButton: {
    backgroundColor: 'gray', // Set button background color
    borderColor: '#444', // Border color of the button
    borderWidth: 1, // Border width of the button
    flex: 1, // Equal width for each button
    alignItems: 'center', // Center the button's content
    paddingVertical: 25, // Adjust the vertical padding
  },
  buttonText: {
    color: 'white', // Text color of the button
    fontSize: 14,
    textAlign: 'center',
  },
});