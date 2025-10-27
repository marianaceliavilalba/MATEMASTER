// Banco de preguntas (puedes agregar más)
const preguntas = [
  {tema:"Suma",pregunta:"8 + 7 = ?",opciones:["15","16","14","17"],respuesta:"15"},
  {tema:"Resta",pregunta:"20 − 13 = ?",opciones:["6","7","8","9"],respuesta:"7"},
  {tema:"Multiplicación",pregunta:"6 × 9 = ?",opciones:["54","56","48","63"],respuesta:"54"},
  {tema:"División",pregunta:"36 ÷ 6 = ?",opciones:["5","6","7","8"],respuesta:"6"},
  {tema:"Álgebra",pregunta:"x + 4 = 10 → x = ?",opciones:["5","6","7","8"],respuesta:"6"},
  {tema:"Factorización",pregunta:"Factor común de 12 y 18",opciones:["6","12","18","3"],respuesta:"6"},
  {tema:"Potencias",pregunta:"2³ = ?",opciones:["6","8","9","4"],respuesta:"8"},
  {tema:"Fracciones",pregunta:"1/2 + 1/4 = ?",opciones:["3/4","1/4","2/6","2/4"],respuesta:"3/4"},
  {tema:"Porcentajes",pregunta:"50 % de 80 = ?",opciones:["35","40","45","50"],respuesta:"40"},
  {tema:"Ecuaciones",pregunta:"2x = 14 → x = ?",opciones:["6","7","8","9"],respuesta:"7"}
];

let indice = 0, aciertos = 0, tiempoPorPregunta = 15, timer, barra;

const $ = id => document.getElementById(id);
const hide = el => el.classList.add("hidden");
const show = el => el.classList.remove("hidden");

$("btn-start").onclick = () => {
  hide($("start-screen"));
  show($("quiz-screen"));
  indice = 0; aciertos = 0;
  cargarPregunta();
};

function cargarPregunta(){
  const p = preguntas[indice];
  $("question-text").textContent = p.pregunta;
  const cont = $("options-container");
  cont.innerHTML = "";
  p.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = e => seleccionar(e.target, op);
    cont.appendChild(btn);
  });
  $("btn-next").classList.add("hidden");
  iniciarTimer();
}

function iniciarTimer(){
  let ancho = 100;
  const paso = 100 / tiempoPorPregunta;
  barra = setInterval(() => {
    ancho -= paso;
    $("timer").style.width = ancho + "%";
    if (ancho <= 0) {
      clearInterval(barra);
      seleccionar(null, null); // tiempo agotado
    }
  }, 1000);
}

function seleccionar(boton, respuesta){
  clearInterval(barra);
  const p = preguntas[indice];
  const btns = [...$("options-container").children];
  btns.forEach(b => {
    b.disabled = true;
    if (b.textContent === p.respuesta) b.classList.add("correct");
  });
  if (respuesta === p.respuesta) {
    aciertos++;
    if (boton) boton.classList.add("correct");
  } else if (boton) {
    boton.classList.add("incorrect");
  }
  $("btn-next").classList.remove("hidden");
}

$("btn-next").onclick = () => {
  indice++;
  if (indice < preguntas.length) cargarPregunta();
  else mostrarResultados();
};

function mostrarResultados(){
  hide($("quiz-screen"));
  show($("result-screen"));
  const nota = Math.round((aciertos / preguntas.length) * 100);
  $("score-circle").style.background = `conic-gradient(var(--verde-claro) ${nota * 3.6}deg, var(--verde-menta) 0deg)`;
  $("score-circle").textContent = nota + "%";
  // Guardar / actualizar progreso
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
    const key = "solved_" + user.email;
    const anteriores = parseInt(localStorage.getItem(key) || "0");
    localStorage.setItem(key, anteriores + aciertos);
    localStorage.setItem("last_" + user.email, new Date().toLocaleString());
    }
  const temas = [...new Set(preguntas.map(p => p.tema))];
  const lista = $("topics-to-review");
  lista.innerHTML = "";
  temas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = "Repasa " + t;
    lista.appendChild(li);
  });
}

$("btn-restart").onclick = () => location.reload();

$("btn-certificate").onclick = () => {
  // Genera un mini-certificado con canvas (simplificado)
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 350;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e8f5e9";
  ctx.fillRect(0, 0, 600, 350);
  ctx.fillStyle = "#1b5e20";
  ctx.font = "bold 32px 'Segoe UI'";
  ctx.fillText("Certificado MateMaster", 130, 100);
  ctx.font = "24px 'Segoe UI'";
  ctx.fillText(`Has obtenido ${Math.round((aciertos / preguntas.length) * 100)} % de aciertos`, 120, 180);
  ctx.fillText(`Fecha: ${new Date().toLocaleDateString()}`, 150, 250);
  const enlace = document.createElement("a");
  enlace.download = "certificado_matemaster.png";
  enlace.href = canvas.toDataURL();
  enlace.click();
};