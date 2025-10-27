const $ = id => document.getElementById(id);
const btnMic   = $("btn-mic");
const micText  = $("mic-text");
const trans    = $("transcription");
const resultBx = $("result-box");
const resultTxt= $("result-text");
const btnSpeak = $("btn-speak");

let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
  recognition = new SpeechRecognition();
} else {
  trans.textContent = "Tu navegador no soporta reconocimiento de voz.";
  btnMic.disabled = true;
}

if (recognition) {
  recognition.lang = "es-ES";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    micText.textContent = "Escuchando...";
    btnMic.classList.add("recording");
  };

  recognition.onresult = e => {
    const speech = e.results[0][0].transcript;
    trans.textContent = speech;
    resolver(speech);
  };

  recognition.onend = () => {
    micText.textContent = "Presiona y habla";
    btnMic.classList.remove("recording");
  };

  recognition.onerror = e => {
    micText.textContent = "Error, intenta de nuevo";
    btnMic.classList.remove("recording");
  };
}

btnMic.onclick = () => recognition.start();

// Motor de resolución súper-simple
function resolver(texto) {
  texto = texto.toLowerCase()
    .replace(/por|multiplicado/g, "*")
    .replace(/entre|dividido/g, "/")
    .replace(/más|suma/g, "+")
    .replace(/menos|resta/g, "-")
    .replace(/raíz cuadrada de|sqrt/g, "sqrt")
    .replace(/elevado a|al cuadrado/g, "**2");

  try {
    // Evalúa expresiones seguras
    const resultado = Function('"use strict";return (' + texto + ')')();
    mostrarResultado(resultado);
  } catch (e) {
    mostrarResultado("No entendí la operación");
  }
}

function mostrarResultado(val) {
  resultTxt.textContent = val;
  show(resultBx);
}

// Leer la respuesta
btnSpeak.onclick = () => {
  const utter = new SpeechSynthesisUtterance(resultTxt.textContent);
  utter.lang = "es-ES";
  speechSynthesis.speak(utter);
};

function show(el) { el.classList.remove("hidden"); }