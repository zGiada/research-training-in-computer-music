"use client";
import Header from "../components/Header";
import SunSleep from "../components/sunSleep";
import SunAwake from "../components/sunAwake";
import * as dimsFunctions from "../audio/setDimsValue";
import * as vowelFunctions from "../audio/audioManager";
import React, { useState, useEffect } from "react";

export default function Play() {
  // console.log(getCurrentDimension().width + " " + getCurrentDimension().height);
  //var svgColor = "yellow";
  const [svgColor, setSvgColor] = useState("yellow");
  // var rad = dimsFunctions.minRad;
  const [rad, setRad] = useState(dimsFunctions.minRad);

  var yCoordinate = 0;
  const [yCoord, setYCoord] = useState(
    (dimsFunctions.height - Math.round((dimsFunctions.height * 30) / 100)) / 2
  );
  // alert(yCoord);
  // (dimsFunctions.height - Math.round((dimsFunctions.height * 30) / 100)) / 2;

  const [sunListen, setSunListen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [pitch, setPitch] = useState("--");
  const [volume, setVolume] = useState("--");
  const [note, setNote] = useState("--");
  const [vowel, setVowel] = useState("--");

  useEffect(() => {
    var audioContext = null;
    let analyser = null;
    let mediaStreamSource = null;
    let rafID = null;
    const buflen = 2048;
    const buf = new Float32Array(buflen);
    var buffer_pitch = [];
    var buffer_vol = [];
    var buffer_vocal = [];
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

    function getVowel(buf, sampleRate) {
      // donna
      var form1 = [320, 400, 620, 920, 640, 400, 360];
      var form2 = [2750, 2500, 2400, 1400, 1200, 920, 760];
      var result = vowelFunctions.getVowel(buf, sampleRate);
      return result;
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
    function findMostRepeatedItem(arr) {
      let count = {};
      let mostRepeatedItem;
      let maxCount = 0;

      for (const item of arr) {
        if (count[item] === undefined) {
          count[item] = 1;
        } else {
          count[item]++;
        }

        if (count[item] > maxCount) {
          maxCount = count[item];
          mostRepeatedItem = item;
        }
      }

      return mostRepeatedItem;
    }
    const selectColor = (vocale) => {
      if (vocale == "I") {
        setSvgColor("blue");
      } else if (vocale == "E") {
        setSvgColor("#4CC94C");
      } else if (vocale == "A") {
        setSvgColor("red");
      } else if (vocale == "O") {
        setSvgColor("orange");
      } else if (vocale == "U") {
        setSvgColor("#C0C0C0");
      }
    };

    const startListening = () => {
      if (!analyser) {
        return;
      }

      analyser.getFloatTimeDomainData(buf);
      const ac = setFrequency(buf, audioContext.sampleRate);
      const vol = getStableVolume(buf);

      const v = getVowel(buf, audioContext.sampleRate);

      var MAX_BUF = 600;
      if (
        (ac == -1 ||
          ac < dimsFunctions.minPitch ||
          ac > dimsFunctions.maxPitch) &&
        (vol < dimsFunctions.minVol || vol > dimsFunctions.maxVol)
      ) {
        setPitch("...");
        setVolume("...");
        setNote("...");
        setVowel("...");
        setSunListen(false);
        setRad(dimsFunctions.minRad);
        setSvgColor("yellow");
        setYCoord(
          (dimsFunctions.height -
            Math.round((dimsFunctions.height * 30) / 100)) /
            2
        );
        count_sil++;
        if (count_sil >= 50) {
          console.log("silence");
          buffer_pitch = [];
          buffer_vol = [];
          buffer_vocal = [];
          count_sil = 0;
        }
      } else {
        if (ac != -1 && ac >= 100 && ac <= 600 && vol > 0 && vol <= 50) {
          if (buffer_pitch.length > MAX_BUF) {
            buffer_pitch.shift();
            buffer_pitch.push(ac);
          } else {
            buffer_pitch.push(ac);
          }

          if (buffer_vol.length > MAX_BUF) {
            buffer_vol.shift();
            buffer_vol.push(vol);
          } else {
            buffer_vol.push(vol);
          }
          if (v != 0) {
            if (buffer_vocal.length > MAX_BUF) {
              buffer_vocal.shift();
              buffer_vocal.push(v);
            } else {
              buffer_vocal.push(v);
            }
          } else {
            // v == 0
            if (buffer_vocal.length > MAX_BUF) {
              buffer_vocal.shift();
              buffer_vocal.push(findMostRepeatedItem(buffer_vocal));
            } else {
              buffer_vocal.push(findMostRepeatedItem(buffer_vocal));
            }
          }

          setSunListen(true);

          const pitchValue = Math.round(ArrayAvg(buffer_pitch));
          const yCoordValue = dimsFunctions.setPosPitch(pitchValue);
          var hz = pitchValue + "Hz";
          setPitch(hz);
          setYCoord(yCoordValue);

          const volValue = Math.round(ArrayAvg(buffer_vol));
          setVolume(volValue);
          const radValue = dimsFunctions.setRad(volValue);
          setRad(radValue);

          const n = noteFromPitch(pitchValue);
          setNote(noteStrings[n % 12]);

          const vocalValue = findMostRepeatedItem(buffer_vocal);
          selectColor(vocalValue);
          setVowel(vocalValue);
        }
      }

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
      rafID = window.requestAnimationFrame(startListening);
    };

    const stopListening = () => {
      buffer_pitch = [];
      buffer_vol = [];
      buffer_vocal = [];
      count_sil = 0;
      setSunListen(false);
      setRad(dimsFunctions.minRad);
      setSvgColor("yellow");
      setYCoord(
        (dimsFunctions.height - Math.round((dimsFunctions.height * 30) / 100)) /
          2
      );
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
    <main className="flex max-h-screen flex-col items-center ">
      <Header />
      <div className="absolute bg-wave min-h-[50vh] bottom-0 flex inset-x-0 text-white p-2"></div>
      {sunListen ? (
        <SunAwake
          svgColor={svgColor}
          rad={rad}
          yCoordinate={yCoord}
          heightSpaceSun={"90vh"}
        />
      ) : (
        <SunSleep
          svgColor={svgColor}
          rad={rad}
          yCoordinate={yCoord}
          heightSpaceSun={"90vh"}
        />
      )}
      <div className="fixed-square z-20">
        <p>
          pitch: <br />
          {pitch}
        </p>
        <p>
          intensity: <br />
          {volume}
        </p>
        <p>
          note: <br />
          {note}
        </p>
        <p>
          vowel: <br />
          {vowel}
        </p>
      </div>

      {/* FINALE CON SOLO DUE BOTTONI */}

      <div className="fixed inset-x-0 bg-base-100 bottom-0">
        <footer className="flex items-center justify-center py-2 bg-transparent">
          <div className="grid  grid-cols-2 btn-group">
            <button
              className={`btn w-32 ${
                startButtonDisabled ? "btn-disabled" : "btn-active"
              }`}
              onClick={handleStartListening}
              disabled={startButtonDisabled}
            >
              <span className="triangle-icon text-current"></span>
              Start
            </button>
            <button
              className={`btn w-32 ${
                stopButtonDisabled ? "btn-disabled" : "btn-active"
              }`}
              onClick={handleStopListening}
              disabled={stopButtonDisabled}
            >
              <span className="square-icon text-current"></span>
              Stop
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
