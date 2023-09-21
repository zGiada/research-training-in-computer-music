window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
var analyser = null;
var mediaStreamSource = null;
var rafID = null;
var buflen = 2048;
var buf = new Float32Array(buflen);
var pitchElem;
var noteElem;

var noteStrings = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];


function setAudio() {
    audioContext = new AudioContext();
    // Attempt to get audio input
    navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            highpassFilter: false
        }
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

function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
}

function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}

function centsOffFromPitch(frequency, note) {
    return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));
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

    if (rms < 0.01) {// not enough signal
        //console.log("rms: "+rms);
        return -1;
    }

    var r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (var i = 0; i < SIZE / 2; i++)
        if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (var i = 1; i < SIZE / 2; i++)
        if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    var c = new Array(SIZE).fill(0);
    for (var i = 0; i < SIZE; i++)
        for (var j = 0; j < SIZE - i; j++)
            c[i] = c[i] + buf[j] * buf[j + i];

    var d = 0; while (c[d] > c[d + 1]) d++;
    var maxval = -1, maxpos = -1;
    for (var i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
    }
    var T0 = maxpos;

    var x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    a = (x1 + x3 - 2 * x2) / 2;
    b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
}

// Define a buffer to store previous audio buffer data
const previousBuffers = [];

function getStableVolume(buf) {
    const sumSquares = buf.reduce((sum, amplitude) => sum + amplitude * amplitude, 0);
    const rootMeanSquare = Math.sqrt(sumSquares / buf.length);

    // Add the root mean square value to the previousBuffers array
    previousBuffers.push(rootMeanSquare);

    // Keep a limited history of previous volume values (adjust the history size as needed)
    const historySize = 10;
    if (previousBuffers.length > historySize) {
        previousBuffers.shift();
    }

    // Calculate the average of the previous volume values
    const averageVolume = previousBuffers.reduce((sum, value) => sum + value, 0) / previousBuffers.length;

    return Math.round(averageVolume * 100);
}
var vocali = ['I', '&Eacute ;', '&Egrave;', 'A', '&Ograve;', '&Oacute;', 'U'];
let vocale = vocali[(Math.floor(Math.random() * vocali.length))];
function getVowel(buf, sampleRate) {
    // donna
    var form1 = [320, 400, 620, 920, 640, 400, 360];
    var form2 = [2750, 2500, 2400, 1400, 1200, 920, 760];
    return vocale;
}
function startListening() {
    if (!analyser) {
        return;
    }

    analyser.getFloatTimeDomainData(buf);
    var ac = setFrequency(buf, audioContext.sampleRate);
    var vol = getStableVolume(buf);
    var vowel = getVowel(buf, audioContext.sampleRate);

    if (ac == -1) {
        pitchElem.innerText = "--";
        volumeElem.innerText = "--";
        noteElem.innerText = "--";
        vocaleElem.innerText = "--";
    } else {
        pitch = ac;
        pitchElem.innerText = Math.round(pitch) + " Hz";
        volumeElem.innerText = vol;
        var note = noteFromPitch(pitch);
        noteElem.innerText = noteStrings[note % 12];
        vocaleElem.innerHTML = vowel;
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    rafID = window.requestAnimationFrame(startListening);
}

function stopListening() {
    if (audioContext) {
        // Disconnect the mediaStreamSource from the analyser
        mediaStreamSource.disconnect(analyser);

        // Close the audio context
        audioContext.close().then(function () {
            audioContext = null;
            analyser = null;
            mediaStreamSource = null;
            console.log("Microphone stopped.");
            pitchElem.innerText = "--";
            volumeElem.innerText = "--";
            noteElem.innerText = "--";
            vocaleElem.innerText = "--";
        }).catch(function (err) {
            console.error("Error stopping microphone:", err);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const stopB = document.getElementById('stopButton');
    stopB.style.backgroundColor = 'gray';
    stopB.disabled = true;
    stopB.style.cursor = "not-allowed";

    pitchElem = document.getElementById("pitch");
    volumeElem = document.getElementById("volume");
    noteElem = document.getElementById("note");
    vocaleElem = document.getElementById("vocale");

    // Add event listeners to the buttons
    document.getElementById("startButton").addEventListener("click", function () {
        setAudio();
        const startB = document.getElementById('startButton');
        const stopB = document.getElementById('stopButton');
        startB.style.backgroundColor = 'gray';
        stopB.style.backgroundColor = 'whitesmoke';
        startB.disabled = true;
        startB.style.cursor = "not-allowed";
        stopB.style.cursor = "pointer";
        stopB.disabled = false;
    });

    document.getElementById("stopButton").addEventListener("click", function () {
        stopListening();
        const startB = document.getElementById('startButton');
        const stopB = document.getElementById('stopButton');
        startB.style.backgroundColor = 'whitesmoke';
        stopB.style.backgroundColor = 'gray';
        startB.disabled = false;
        stopB.disabled = true;
        stopB.style.cursor = "not-allowed";
        startB.style.cursor = "pointer";
    });
});