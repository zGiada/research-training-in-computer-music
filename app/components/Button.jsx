import React, { useState, useEffect } from "react";

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

    const noteStrings = [
      "C",
      "C#/Db",
      "D",
      "D#/Eb",
      "E",
      "F",
      "F#/Gb",
      "G",
      "G#/Ab",
      "A",
      "A#/Bb",
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

      // Keep a limited history of previous volume values (adjust the history size as needed)
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
    var vocali = [
      "I",
      "&Eacute ;",
      "&Egrave;",
      "A",
      "&Ograve;",
      "&Oacute;",
      "U",
    ];
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
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            highpassFilter: false,
          },
        })
        .then((stream) => {
          mediaStreamSource = audioContext.createMediaStreamSource(stream);
          analyser = audioContext.createAnalyser();
          analyser.fftSize = 2048;
          mediaStreamSource.connect(analyser);
          startListening();
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    };

    const startListening = () => {
      if (!analyser) {
        return;
      }

      analyser.getFloatTimeDomainData(buf);
      const ac = setFrequency(buf, audioContext.sampleRate);
      const vol = getStableVolume(buf);
      const v = getVowel(buf, audioContext.sampleRate);

      if (ac == -1) {
        setPitch("--");
        setVolume("--");
        setNote("--");
        setVowel("--");
      } else {
        setPitch(Math.round(ac) + " Hz");
        setVolume(vol);
        const n = noteFromPitch(ac);
        setNote(noteStrings[n % 12]);
        setVowel(v);
      }

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
      rafID = window.requestAnimationFrame(startListening);
    };

    const stopListening = () => {
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
            console.log("Microphone stopped.");
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

  const handleStartListening = () => {
    setIsListening(true);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };
  return (
    <div className="btn-group btn-group-vertical lg:btn-group-horizontal text-neutral-content">
      <button className="btn btn-active" onClick={handleStartListening}>
        Start Listening
      </button>
      <button className="btn" onClick={handleStopListening}>
        Stop Listening
      </button>
      <div>
        <p>PITCH: {pitch}</p>
        <p>VOLUME: {volume}</p>
        <p>NOTE: {note}</p>
        <p>VOCALE: {vowel}</p>
      </div>
    </div>
  );
}

export default Button;
