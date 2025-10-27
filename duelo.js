const preguntas = [
  {p:"7 × 8",o:["54","56","48","63"],r:"56"},
  {p:"20 − 13",o:["6","7","8","9"],r:"7"},
  {p:"36 ÷ 6",o:["5","6","7","8"],r:"6"},
  {p:"4²",o:["16","18","20","14"],r:"16"},
  {p:"√81",o:["8","9","10","7"],r:"9"},
  {p:"10 % de 80",o:["8","10","12","15"],r:"8"},
  {p:"2x = 14 → x",o:["6","7","8","9"],r:"7"},
  {p:"1/2 + 1/4",o:["3/4","1/4","2/6","2/4"],r:"3/4"},
  {p:"3 × 9",o:["27","24","30","21"],r:"27"},
  {p:"15 − 9",o:["5","6","7","8"],r:"6"}
];

let canal, soyCreador = false, codigoSala = "", miNum = 0, rival = 0, indice = 0, aciertos = [0, 0], timer, tiempo = 10;
const $ = id => document.getElementById(id);
const hidden = el => el.classList.add("hidden");
const show = el => el.classList.remove("hidden");

window.onload = () => {
  $("btn-crear").onclick = crearSala;
  $("btn-unirse").onclick = mostrarUnirse;
  $("btn-entrar").onclick = entrarSala;
  $("btn-revancha").onclick = () => location.reload();
};

function crearSala() {
  soyCreador = true;
  codigoSala = Math.random().toString(36).substring(2, 8).toUpperCase();
  canal = new BroadcastChannel(codigoSala);
  escuchar();
  mostrarEspera();
}

function mostrarUnirse() {
  show($("sala-screen"));
  hidden($("rol-screen"));
  $("sala-titulo").textContent = "Unirse a sala";
  $("codigo").value = "";
  $("btn-entrar").onclick = entrarSala;
}

function entrarSala() {
  const input = $("codigo").value.trim().toUpperCase();
  if (!input) return;
  codigoSala = input;
  canal = new BroadcastChannel(codigoSala);
  escuchar();
  canal.postMessage({tipo:"hola", soyCreador});
  mostrarEspera();
}

function escuchar() {
  canal.onmessage = e => {
    const msg = e.data;
    if (msg.tipo === "hola") {
      if (soyCreador) canal.postMessage({tipo:"ok", soyCreador});
      rival = 1;
      empezarDuelo();
    }
    if (msg.tipo === "ok") {
      rival = 0;
      empezarDuelo();
    }
    if (msg.tipo === "respuesta") {
      clearInterval(timer);
      mostrarResultado(msg.jugador, msg.correcta);
    }
  };
}

function mostrarEspera() {
  hidden($("rol-screen"));
  hidden($("sala-screen"));
  show($("wait-screen"));
  $("tu-codigo").textContent = codigoSala;
}

function empezarDuelo() {
  hidden($("wait-screen"));
  show($("duelo-screen"));
  indice = 0; aciertos = [0, 0];
  cargarPregunta();
}

function cargarPregunta() {
  if (indice >= 10) { finalizar(); return; }
  const p = preguntas[indice];
  $("pregunta").textContent = p.p;
  const cont = $("opciones");
  cont.innerHTML = "";
  p.o.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = e => responder(e.target, op === p.r);
    cont.appendChild(btn);
  });
  $("feedback").classList.add("hidden");
  iniciarTemporizador();
}

function iniciarTemporizador() {
  let t = tiempo;
  $("timer").textContent = t;
  timer = setInterval(() => {
    t--;
    $("timer").textContent = t;
    if (t <= 0) {
      clearInterval(timer);
      mostrarResultado(rival, false);
    }
  }, 1000);
}

function responder(boton, correcta) {
  clearInterval(timer);
  canal.postMessage({tipo:"respuesta", jugador:soyCreador?0:1, correcta});
  mostrarResultado(soyCreador?0:1, correcta);
}

function mostrarResultado(jug, correcta) {
  document.querySelectorAll(".opciones button").forEach(b => b.disabled = true);
  const feed = $("feedback");
  feed.classList.remove("hidden");
  if (correcta) {
    aciertos[jug]++;
    feed.textContent = "¡Correcto!";
    feed.className = "feedback ok";
  } else {
    feed.textContent = "Incorrecto";
    feed.className = "feedback ko";
  }
  actualizarPuntos();
  setTimeout(() => {
    indice++;
    cargarPregunta();
  }, 1500);
}

function actualizarPuntos() {
  document.querySelectorAll(".player")[0].querySelector(".puntos").textContent = aciertos[0];
  document.querySelectorAll(".player")[1].querySelector(".puntos").textContent = aciertos[1];
}

function finalizar() {
  hidden($("duelo-screen"));
  show($("final-screen"));
  const gan = aciertos[0] > aciertos[1] ? "Jugador 1" : aciertos[0] < aciertos[1] ? "Jugador 2" : "Empate";
  $("ganador-text").textContent = gan === "Empate" ? "¡Empate!" : `Ganador: ${gan} 🎉`;
}