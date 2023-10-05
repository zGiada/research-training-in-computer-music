import React from "react";

export const AudioUtils = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var audioContext = null;
  var analyser = null;
  var mediaStreamSource = null;
  var rafID = null;
  var buflen = 2048;
  var buf = new Float32Array(buflen);
  var pitchElem;
  var noteElem;

function setAudio() {
  audioContext = new AudioContext();
  // Attempt to get audio input
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        highpassFilter: false,
      },
    })
    .then((stream) => {
      // Create an AudioNode from the stream.
      mediaStreamSource = audioContext.createMediaStreamSource(stream);

      // Connect it to the destination.
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      mediaStreamSource.connect(analyser);

      // Now that the audio context and analyzer are initialized,
      // you can start listening.
      startListening();
    })
    .catch((err) => {
      // always check for errors at the end.
      console.error(`${err.name}: ${err.message}`);
    });
}


  return <div>AudioUtils</div>;
};
