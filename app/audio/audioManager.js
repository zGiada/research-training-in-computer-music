var p = 15;
var N = 256;
var f0;
var f1 = 22050;
var form = [];

// Formanti donna per I, é, È, A, O, ó, U
// I valori a margine (primo e ultimo) sono inesistenti: servono solo per agevolare il calcolo dei range nell'algoritmo
var form1 = [120, 200, 337, 522, 773, 542, 342, 308, 150];
var form2 = [2900, 3200, 2512, 2400, 1392, 1195, 920, 762, 580];

var vocali = ["I", "E", "E", "A", "O", "O", "U"];
var signal;

function getVowel(s, sampleRate) {
  signal = s;
  f0 = sampleRate;

  // Applica un filtro pre-elaborazione per ridurre il rumore
  signal = preProcessSignal(signal);

  // Step di autocorrelazione e calcolo delle radici
  let R = autocorrelation();
  let lpc = durbin(R);
  let roots = durand(lpc);
  let valid = formants(roots, f1);

  // Confronto formanti con i range corretti
  form = compare(valid);
  return form[0];
}

function preProcessSignal(s) {
  // Esempio di filtro passa-basso per rimuovere il rumore ad alta frequenza
  const filteredSignal = s.map((sample, i) => {
    return sample * Math.exp(-0.002 * i); // Filtro semplice per attenuare
  });
  return filteredSignal;
}

function autocorrelation() {
  usx = new Float32Array((signal.length * f1) / f0);
  var R = new Float32Array(p + 1);

  for (var k = 0; k <= p; k++) {
    R[k] = 0;
    for (var m = 0; m <= N - 1 - k; m++) {
      R[k] += efficientUs(m) * efficientUs(m + k);
    }
  }
  return R;
}

function ham(N, i) {
  return 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (N - 1));
}

let usx;
function efficientUs(i) {
  if (usx[i] == 0) {
    let ratio = f0 / f1;
    usx[i] = 0;
    let index = Math.floor(i * ratio);

    for (let j = 0; j < ratio; j++) {
      usx[i] += parseFloat(signal[index + j]) * ham(N, i);
    }
    usx[i] /= ratio;
  }
  return usx[i];
}

function durbin(R) {
  let lpc = [];
  let alpha = [];
  let k = [];
  let E = R[0];

  for (let i = 1; i <= p; i++) {
    k[i] = R[i];
    for (let j = 1; j <= i - 1; j++) {
      k[i] -= alpha[j][i - 1] * R[i - j];
    }
    k[i] /= E;
    alpha[i] = [];
    alpha[i][i] = k[i];
    for (let j = 1; j <= i - 1; j++) {
      alpha[j][i] = alpha[j][i - 1] - k[i] * alpha[i - j][i - 1];
    }
    E = (1 - k[i] * k[i]) * E;
  }

  for (let i = 0; i < p; i++) {
    lpc[i + 1] = -alpha[i + 1][p];
  }
  lpc[0] = 1;
  return lpc;
}

function durand(cf) {
  const deg = cf.length - 1;
  const n = 8;
  var roots = [];
  for (let i = 0; i < deg; i++) {
    const theta = (2 * Math.PI * i) / deg;
    const root = { real: Math.cos(theta), imag: Math.sin(theta) };
    roots[i] = root;
  }

  for (let i = 0; i < n; i++) {
    var preroots = roots;
    for (let j = 0; j < deg; j++) {
      var p = { real: cf[0], imag: 0 };
      for (let k = 1; k <= deg; k++) {
        p = sumc(mulc(p, preroots[j]), { real: cf[k], imag: 0 });
      }

      var div = { real: 1, imag: 0 };
      for (let k = 0; k < deg; k++) {
        if (j != k) {
          div = mulc(div, subc(preroots[j], preroots[k]));
        }
      }
      roots[j] = subc(preroots[j], divc(p, div));
    }
  }

  return roots;
}

function sumc(a, b) {
  return { real: a.real + b.real, imag: a.imag + b.imag };
}

function subc(a, b) {
  return { real: a.real - b.real, imag: a.imag - b.imag };
}

function mulc(a, b) {
  return {
    real: a.real * b.real - a.imag * b.imag,
    imag: a.real * b.imag + a.imag * b.real,
  };
}

function divc(a, b) {
  const denominator = b.real * b.real + b.imag * b.imag;
  return {
    real: (a.real * b.real + a.imag * b.imag) / denominator,
    imag: (a.imag * b.real - a.real * b.imag) / denominator,
  };
}

function formants(roots, fs) {
  let ff = [];
  for (let i = 0; i < roots.length; i++) {
    let f = (fs * Math.atan2(roots[i].imag, roots[i].real)) / (2 * Math.PI);
    let b =
      (-fs * Math.log(Math.sqrt(roots[i].real ** 2 + roots[i].imag ** 2))) /
      Math.PI;
    if (f >= 0 && b >= 0 && b <= 6400) {
      ff.push({ freq: f, band: b });
    }
  }
  ff.sort((a, b) => a.freq - b.freq);

  let valid = [0];
  let j = 0;
  let minval = [200, 700];
  let maxval = [1600, 3000];
  for (let i = 0; i < ff.length; i++) {
    if (ff[i].freq >= minval[j] && ff[i].freq <= maxval[j]) {
      valid[j + 1] = ff[i];
      j++;
    }
    if (j > 2) break;
  }
  return valid;
}

function compare(valid) {
  if (valid.length == 0) {
    valid[0] = valid[1] = valid[2] = valid[3] = valid[4] = valid[5] = 0;
  } else {
    if (valid[2] != null) {
      let i;
      for (i = 1; i <= 7; i++) {
        let max = form2[i - 1] - (form2[i - 1] - form2[i]) / 2;
        let min = form2[i + 1] + (form2[i] - form2[i + 1]) / 2;
        if (valid[2].freq > min && valid[2].freq < max) {
          let max1 = form1[i] + 200;
          let min1 = form1[i] - 200;
          if (!(valid[1].freq > min1 && valid[1].freq < max1)) {
            i = 8;
          }
          break;
        }
      }

      if (i != 8) {
        valid[0] = vocali[i - 1];
        console.log(vocali[i - 1]);
      }
    }
  }
  return valid;
}

module.exports = {
  getVowel,
};
