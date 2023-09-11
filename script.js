let microphone;
class Microphone {
    constructor() {
        this.initialized = false;
        /* navigator.mediaDevices ↓ is a read only property that returns a builtin MD obj which provides access to connected media input devices such as microphone */
        /* getUserMedia returns a *promise* that resolves in a media stream object which contains microphone audio data */
        /* *promise* is a special JS obj that represents eventual completion of asynchronus operation. 
            = to use when we want to wait for something to complete before we run some follow-up code */
        navigator.mediaDevices.getUserMedia({
            audio: {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }) // audio node
            .then(function (stream) {
                /* new AudioContext() => Web Audio API is a set of methods and properties that allow us to generate, play and analyse audio */
                /* Web Audio API methods allow us to process and synthesise audio directly inside browser. We can do mixing, processing and filtering tasks on sound */
                this.audioContext = new AudioContext();
                /* createMediaStreamSource => takes raw media stream (raw audio data from microphone) and converts it into audio nodes */
                this.microphone = this.audioContext.createMediaStreamSource(stream);
                /* createAnalyser => creates analyser node which can be used to expose audio time and frequency data to create visualisations */
                this.analyser = this.audioContext.createAnalyser();
                this.analyser.fftSize = 2048; // Fast Fourier Transform
                /* frequencyBinCount => is a read only property and it's always equal to half of fftSize value*/
                const bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(bufferLength);
                /* connect => allows us to direct data from one audio node to another */
                this.microphone.connect(this.analyser);
                this.initialized = true;


            }.bind(this)).catch(function (err) {
                alert(err);
            })
    }


    getFrequencyData() {
        this.analyser.getByteFrequencyData(this.dataArray);
        const maxMagnitude = Math.max(...this.dataArray);
        const maxIndex = this.dataArray.indexOf(maxMagnitude);
        const nyquist = this.audioContext.sampleRate / 2;
        const frequencyHz = (maxIndex / this.analyser.frequencyBinCount) * nyquist;
        return frequencyHz.toFixed(2);
    }

    getSamples() {
        /* getByteTimeDomainData => copies the current waveform or time domain data into an Uint8Array array we pass to it */
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e / 128 - 1);
        return normSamples;
    }
    getSoundIntensity() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e / 128 - 1);
        /* Use Root Mean Square RMS: is a measure of the magnitude of a set of numbers. It gives a sense for the typical size of the numbers. */
        let sum = 0;
        for (let i = 0; i < normSamples.length; i++) {
            sum += normSamples[i] * normSamples[i];
        }
        let volume = Math.sqrt(sum / normSamples.length);
        return volume;
    }
    stopListening() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach((track) => track.stop());
        }
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close().then(() => {
                this.initialized = false;
            });
        }
    }

}
class Bar {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    update(micInput) {
        this.height = micInput * 1000;
        //this.x++;
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
function main() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
    let isListening = false;

    if (!isListening) {
        document.getElementById("frequency").textContent = "none";
        //document.getElementById("icon").innerHTML = '<i class="fa fa-play-circle"></i>';
    }



    const toggleButton = document.getElementById("toggleButton");
    toggleButton.addEventListener("click", toggleMicrophone);

    function toggleMicrophone() {
        if (!isListening) {
            microphone = new Microphone();
            let bars = [];
            let barWidth = canvas.width / 256;



            function createBars() {
                for (let i = 0; i < 256; i++) {
                    let color = 'hsl(' + i + ', 100%, 50%)';
                    bars.push(new Bar(i * barWidth, canvas.height / 2, 1, 5, color));
                }
            }
            createBars();



            function animate() {
                if (microphone.initialized) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // generates audio samples from micro
                    const samples = microphone.getSamples();

                    const intensity = microphone.getSoundIntensity();
                    const frq = microphone.getFrequencyData();

                    frequencyDisplay = document.getElementById("frequency");
                    frequencyDisplay.textContent = frq;

                    // animate bars based on microphone data
                    bars.forEach(function (bar, i) {
                        bar.update(samples[i]);
                        bar.draw(ctx);
                    });
                }

                requestAnimationFrame(animate);


            }
            animate();
            toggleButton.textContent = "STOP";
            //document.getElementById("icon").innerHTML = '<i class="fa fa-stop-circle"></i>';
            isListening = true;

        }
        else {
            if (microphone) {
                microphone.stopListening();
            }
            toggleButton.textContent = "START";
            //document.getElementById("icon").innerHTML = '<i class="fa fa-play-circle"></i>';
            isListening = false;
            document.getElementById("frequency").textContent = "none";
        }
    }


}
window.addEventListener("load", main);
