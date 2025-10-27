const problemas = {
  facil: {
    compras: [
      {
        historia: "María compró 3 cuadernos iguales y pagó 18 € en total.",
        pregunta: "¿Cuánto costó cada cuaderno?",
        opciones: ["6 €","5 €","7 €","8 €"],
        respuesta: "6 €",
        pasos: [
          "Total = 18 €",
          "Número de cuadernos = 3",
          "División: 18 ÷ 3 = 6",
          "Cada cuaderno costó 6 €"
        ]
      }
    ],
    deportes: [
      {
        historia: "Un corredor da 4 vueltas a una pista de 400 m.",
        pregunta: "¿Cuántos metros recorrió en total?",
        opciones: ["1 600 m","1 200 m","800 m","2 000 m"],
        respuesta: "1 600 m",
        pasos: [
          "Longitud de la pista = 400 m",
          "Vueltas = 4",
          "Multiplicación: 400 × 4 = 1 600",
          "Recorrió 1 600 m"
        ]
      }
    ],
    viajes: [
      {
        historia: "Un coche consume 5 litros cada 100 km.",
        pregunta: "¿Cuántos litros gastará en 300 km?",
        opciones: ["15 L","10 L","20 L","25 L"],
        respuesta: "15 L",
        pasos: [
          "Consumo cada 100 km = 5 L",
          "Distancia = 300 km → 3 tramos de 100 km",
          "Multiplicación: 5 × 3 = 15",
          "Gastará 15 litros"
        ]
      }
    ],
    cocina: [
      {
        historia: "Una receta necesita 200 g de harina para 4 personas.",
        pregunta: "¿Cuántos gramos necesito para 10 personas?",
        opciones: ["500 g","400 g","600 g","300 g"],
        respuesta: "500 g",
        pasos: [
          "Harina para 4 personas = 200 g",
          "Harina por persona = 200 ÷ 4 = 50 g",
          "Personas nuevas = 10",
          "Multiplicación: 50 × 10 = 500 g"
        ]
      }
    ]
  }
};

let problemaActual = null, seleccion = null;
const $ = id => document.getElementById(id);
const hidden = el => el.classList.add("hidden");
const show = el => el.classList.remove("hidden");

$("btn-generar").onclick = generarProblema;

function generarProblema() {
  const tema = $("tema").value;
  const lista = problemas.facil[tema];
  problemaActual = lista[Math.floor(Math.random() * lista.length)];

  $("historia").textContent = problemaActual.historia;
  $("pregunta").textContent = problemaActual.pregunta;
  const cont = $("opciones");
  cont.innerHTML = "";
  problemaActual.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = e => seleccionar(e.target, op);
    cont.appendChild(btn);
  });
  hidden($("solucion-box"));
  show($("problema-box"));
}

function seleccionar(boton, op) {
  seleccion = op;
  document.querySelectorAll("#opciones button").forEach(b => b.disabled = true);
  if (op === problemaActual.respuesta) {
    boton.classList.add("correct");
  } else {
    boton.classList.add("incorrect");
    document.querySelector(`button[data-resp="${problemaActual.respuesta}"]`)?.classList.add("correct");
  }
  $("btn-resolver").classList.remove("hidden");
}

$("btn-resolver").onclick = () => {
  mostrarSolucion();
  iniciarPizarra();
};

function mostrarSolucion() {
  const ul = $("pasos");
  ul.innerHTML = "";
  problemaActual.pasos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    ul.appendChild(li);
  });
  show($("solucion-box"));
}

// ---------- PIZARRA ----------
let canvas, ctx, dibujando = false, color = "#000", grosor = 3;

function iniciarPizarra() {
  canvas = $("pizarra");
  ctx = canvas.getContext("2d");
  canvas.onmousedown = e => { dibujando = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };
  canvas.onmousemove = e => { if (dibujando) { ctx.lineTo(e.offsetX, e.offsetY); ctx.strokeStyle = color; ctx.lineWidth = grosor; ctx.stroke(); } };
  canvas.onmouseup = () => dibujando = false;
  canvas.onmouseout = () => dibujando = false;
  $("color-piz").oninput = e => color = e.target.value;
  $("grosor-piz").oninput = e => grosor = e.target.value;
}

function borrarPizarra() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function cerrarPizarra() {
  hidden($("solucion-box"));
}