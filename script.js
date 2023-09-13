window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
var analyser = null;
var mediaStreamSource = null;
var rafID = null;
var buflen = 2048;
var buf = new Float32Array(buflen);
var pitchElem;

function setAudio() {
    audioContext = new AudioContext();
    // Attempt to get audio input
    navigator.mediaDevices.getUserMedia({
        "audio": {
            "mandatory": {
                "googEchoCancellation": "false",
                "googAutoGainControl": "false",
                "googNoiseSuppression": "false",
                "googHighpassFilter": "false"
            },
            "optional": []
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
        console.log(rms);
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


function startListening() {
    if (!analyser) {
        console.error("Analyser not initialized.");
        return;
    }

    analyser.getFloatTimeDomainData(buf);
    var ac = setFrequency(buf, audioContext.sampleRate);

    if (ac == -1) {
        pitchElem.innerText = "--";
    } else {
        pitch = ac;
        pitchElem.innerText = Math.round(pitch);
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