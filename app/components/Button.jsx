import React, { useState, useEffect } from "react";
import * as dimsFunctions from "../audio/setDimsValue";
function Button() {
  const [isListening, setIsListening] = useState(false);
  const [pitch, setPitch] = useState("--");
  const [volume, setVolume] = useState("--");
  const [note, setNote] = useState("--");
  const [vowel, setVowel] = useState("--");

  useEffect(() => {
    let audioContext = null;
    let analyser = null;
    let mediaStreamSource = null;
    let rafID = null;
    const buflen = 2048;
    const buf = new Float32Array(buflen);
    var buffer_pitch = [];
    var buffer_vol = [];
    var count_sil = 0;
    const noteStrings = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    function noteFromPitch(frequency) {
      var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
      return Math.round(noteNum) + 69;
    }

    function frequencyFromNoteNumber(note) {
      return 440 * Math.pow(2, (note - 69) / 12);
    }

    function centsOffFromPitch(frequency, note) {
      return Math.floor(
        (1200 * Math.log(frequency / frequencyFromNoteNumber(note))) /
          Math.log(2)
      );
    }
    function setFrequency(buf, sampleRate) {
      // Implements the ACF2+ algorithm
      var SIZE = buf.length;
      var rms = 0;

      for (var i = 0; i < SIZE; i++) {
        var val = buf[i];
        rms += val * val;
      }
      rms = Math.sqrt(rms / SIZE);

      if (rms < 0.01) {
        // not enough signal
        //console.log("rms: "+rms);
        return -1;
      }

      var r1 = 0,
        r2 = SIZE - 1,
        thres = 0.2;
      for (var i = 0; i < SIZE / 2; i++)
        if (Math.abs(buf[i]) < thres) {
          r1 = i;
          break;
        }
      for (var i = 1; i < SIZE / 2; i++)
        if (Math.abs(buf[SIZE - i]) < thres) {
          r2 = SIZE - i;
          break;
        }

      buf = buf.slice(r1, r2);
      SIZE = buf.length;

      var c = new Array(SIZE).fill(0);
      for (var i = 0; i < SIZE; i++)
        for (var j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i];

      var d = 0;
      while (c[d] > c[d + 1]) d++;
      var maxval = -1,
        maxpos = -1;
      for (var i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
          maxval = c[i];
          maxpos = i;
        }
      }
      var T0 = maxpos;

      var x1 = c[T0 - 1],
        x2 = c[T0],
        x3 = c[T0 + 1];
      var a = (x1 + x3 - 2 * x2) / 2;
      var b = (x3 - x1) / 2;
      if (a) T0 = T0 - b / (2 * a);

      return sampleRate / T0;
    }
    // Define a buffer to store previous audio buffer data
    const previousBuffers = [];

    function getStableVolume(buf) {
      const sumSquares = buf.reduce(
        (sum, amplitude) => sum + amplitude * amplitude,
        0
      );
      const rootMeanSquare = Math.sqrt(sumSquares / buf.length);

      // Add the root mean square value to the previousBuffers array
      previousBuffers.push(rootMeanSquare);

      // Keep a limited history of previous volume values
      // (adjust the history size as needed)
      const historySize = 10;
      if (previousBuffers.length > historySize) {
        previousBuffers.shift();
      }

      // Calculate the average of the previous volume values
      const averageVolume =
        previousBuffers.reduce((sum, value) => sum + value, 0) /
        previousBuffers.length;

      return Math.round(averageVolume * 100);
    }

    var vocali = ["I", "E", "A", "O", "U"];
    let vocale = vocali[Math.floor(Math.random() * vocali.length)];
    function getVowel(buf, sampleRate) {
      // donna
      var form1 = [320, 400, 620, 920, 640, 400, 360];
      var form2 = [2750, 2500, 2400, 1400, 1200, 920, 760];
      return vocale;
    }

    const initializeAudio = () => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            highpassFilter: true,
          },
        })
        .then((stream) => {
          mediaStreamSource = audioContext.createMediaStreamSource(stream);

          // Create DynamicsCompressor and get the reduction value
          const compressor = audioContext.createDynamicsCompressor();
          compressor.threshold.value = -50;
          compressor.knee.value = 40;
          compressor.ratio.value = 12;
          compressor.attack.value = 0;
          compressor.release.value = 0.25;

          compressor.reduction; // Just to avoid a warning, value is not used

          analyser = audioContext.createAnalyser();
          analyser.fftSize = 2048;
          mediaStreamSource.connect(analyser);
          startListening();
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    };
    function ArrayAvg(myArray) {
      var i = 0,
        summ = 0,
        ArrayLen = myArray.length;
      while (i < ArrayLen) {
        summ = summ + myArray[i++];
      }
      return summ / ArrayLen;
    }
    const startListening = () => {
      if (!analyser) {
        return;
      }

      analyser.getFloatTimeDomainData(buf);
      const ac = setFrequency(buf, audioContext.sampleRate);
      const vol = getStableVolume(buf);
      const v = getVowel(buf, audioContext.sampleRate);

      if ((ac == -1 || ac < 100 || ac > 600) && (vol < 1 || vol > 50)) {
        setPitch("I'm listening...");
        setVolume("I'm listening...");
        setNote("I'm listening...");
        setVowel("I'm listening...");
        count_sil++;
        if (count_sil >= 50) {
          console.log("silence");
          buffer_pitch = [];
          buffer_vol = [];
          count_sil = 0;
        }
      } else {
        if (ac != -1 && ac >= 100 && ac <= 600 && vol > 0 && vol <= 50) {
          if (buffer_pitch.length > 1000) {
            buffer_pitch.shift();
            buffer_pitch.push(ac);
          } else {
            buffer_pitch.push(ac);
          }

          if (buffer_vol.length > 1000) {
            buffer_vol.shift();
            buffer_vol.push(vol);
          } else {
            buffer_vol.push(vol);
          }

          const pitchValue = Math.round(ArrayAvg(buffer_pitch));
          setPitch(pitchValue + "Hz");
          const yCoordValue = dimsFunctions.setyCoord(pitchValue);

          const volValue = Math.round(ArrayAvg(buffer_vol));
          setVolume(volValue);
          const radValue = dimsFunctions.setRad(volValue);

          const n = noteFromPitch(pitchValue);
          setNote(noteStrings[n % 12]);

          setVowel(v);
        }
      }

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
      rafID = window.requestAnimationFrame(startListening);
    };

    const stopListening = () => {
      buffer_pitch = [];
      buffer_vol = [];
      count_sil = 0;
      if (audioContext) {
        if (rafID) {
          window.cancelAnimationFrame(rafID);
        }
        mediaStreamSource.disconnect(); // Disconnect the mediaStreamSource
        audioContext
          .close()
          .then(() => {
            audioContext = null;
            analyser = null;
            mediaStreamSource = null;
            /* console.log(
              "Microphone stopped.\nlen: " +
                buffer_pitch.filter((x, i) => buffer_pitch.indexOf(x) === i)
                  .length
            );*/
            setPitch("--");
            setVolume("--");
            setNote("--");
            setVowel("--");
          })
          .catch((err) => {
            console.error("Error stopping microphone:", err);
          });
      }
    };

    if (isListening) {
      initializeAudio();
    }

    return () => {
      stopListening();
    };
  }, [isListening]);

  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [stopButtonDisabled, setStopButtonDisabled] = useState(true);

  const handleStartListening = () => {
    setIsListening(true);
    setStartButtonDisabled(true);
    setStopButtonDisabled(false);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setStartButtonDisabled(false);
    setStopButtonDisabled(true);
  };
  return (
    <footer className="w-full flex text-white p-2 bg-transparent fixed inset-x-0 bottom-0">
      <div className="grid grid-cols-5 gap-5">
        <div className="grid grid-cols-2 btn-group">
          <button
            className={`btn ${
              startButtonDisabled ? "btn-disabled" : "btn-active"
            }`}
            onClick={handleStartListening}
            disabled={startButtonDisabled}
          >
            Start
          </button>
          <button
            className={`btn ${
              stopButtonDisabled ? "btn-disabled" : "btn-active"
            }`}
            onClick={handleStopListening}
            disabled={stopButtonDisabled}
          >
            Stop
          </button>
        </div>

        <p className="flex items-center">PITCH: {pitch}</p>
        <p className="flex items-center">VOLUME: {volume}</p>
        <p className="flex items-center">NOTE: {note}</p>
        <p className="flex items-center">VOCALE: {vowel}</p>
      </div>
    </footer>
  );
}

export default Button;
