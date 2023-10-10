function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
/*********************** RAD PART ***********************/
const height = getCurrentDimension().height;
const width = getCurrentDimension().width;

const minVol = 0;
const maxVol = 50;

const minRad = 40; // Math.round((getCurrentDimension().width * 3.75) / 100);
const maxRad = 140; //Math.round((getCurrentDimension().width * 11.1) / 100);

/*function radDims() {
  var str = "min rad = " + minRad + " max rad = " + maxRad;
  return str;
}*/

function setRad(volume) {
  if (volume <= minVol) {
    return minRad;
  }
  if (volume >= maxVol) {
    return maxRad;
  }
  return minRad + Math.round((volume * (maxRad - minRad)) / (maxVol - minVol));
}

/*********************** yC PART ***********************/
const minPitch = 100;
const maxPitch = 600;

const usable_height =
  getCurrentDimension().height -
  Math.round((getCurrentDimension().height * 30) / 100);

// punto più basso = > quando pitch è <= 100      250
const lowest_pitch = usable_height / 2;
// punto più alto = > quando pitch è >= 600       -250
const highest_pitch = -lowest_pitch;

function setyCoord(pitch) {
  if (pitch <= minPitch) {
    return lowest_pitch;
  }
  if (pitch >= maxPitch) {
    return highest_pitch;
  }
  return (
    lowest_pitch -
    Math.round(
      ((pitch - minPitch) * (lowest_pitch - highest_pitch)) /
        (maxPitch - minPitch)
    )
  );
}

// Export the functions to make them accessible in other files
module.exports = {
  setRad,
  setyCoord,
  height,
  width,
};
