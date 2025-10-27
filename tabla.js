const elementos = [
  {simbolo:"A",nombre:"Área Cuadrado",   formula:"A = a²",         desc:"Área de un cuadrado de lado a"},
  {simbolo:"B",nombre:"Área Rectángulo", formula:"A = b × h",      desc:"Área de un rectángulo de base b y altura h"},
  {simbolo:"C",nombre:"Área Triángulo",  formula:"A = (b × h)/2",  desc:"Área de un triángulo de base b y altura h"},
  {simbolo:"D",nombre:"Área Círculo",    formula:"A = π r²",       desc:"Área de un círculo de radio r"},
  {simbolo:"E",nombre:"Volumen Cubo",    formula:"V = a³",         desc:"Volumen de un cubo de arista a"},
  {simbolo:"F",nombre:"Volumen Esfera",  formula:"V = 4/3 π r³",   desc:"Volumen de una esfera de radio r"},
  {simbolo:"G",nombre:"Identidad (a+b)²",formula:"(a+b)² = a²+2ab+b²",desc:"Cuadrado de un binomio"},
  {simbolo:"H",nombre:"Identidad (a-b)²",formula:"(a-b)² = a²-2ab+b²",desc:"Cuadrado de un binomio diferencia"},
  {simbolo:"I",nombre:"Diferencia Cuadrados",formula:"a²-b²=(a+b)(a-b)",desc:"Factorización de diferencia de cuadrados"},
  {simbolo:"J",nombre:"Teorema Pitágoras",formula:"c² = a² + b²",  desc:"En triángulo rectángulo, hipotenusa c"},
  {simbolo:"K",nombre:"Ecuación Cuadrática",formula:"x = (-b±√Δ)/2a",desc:"Solución general de ax²+bx+c=0"},
  {simbolo:"L",nombre:"Distancia",       formula:"d = √[(x₂-x₁)²+(y₂-y₁)²]",desc:"Distancia entre dos puntos"},
  {simbolo:"M",nombre:"Pendiente",       formula:"m = (y₂-y₁)/(x₂-x₁)",desc:"Pendiente de una recta"},
  {simbolo:"N",nombre:"Media",           formula:"x̄ = Σx/n",        desc:"Media aritmética de n datos"},
  {simbolo:"O",nombre:"Mediana",         formula:"Posición central",desc:"Valor central de datos ordenados"},
  {simbolo:"P",nombre:"Varianza",        formula:"σ² = Σ(x-x̄)²/n", desc:"Medida de dispersión"},
  {simbolo:"Q",nombre:"Combinatoria",    formula:"C(n,k)=n!/(k!(n-k)!)",desc:"Combinaciones de n elementos tomados de k en k"},
  {simbolo:"R",nombre:"Probabilidad",    formula:"P = casos favorables/casos totales",desc:"Probabilidad simple"},
  {simbolo:"S",nombre:"Logaritmo",       formula:"log_b(x)=y ↔ b^y=x",desc:"Definición de logaritmo en base b"},
  {simbolo:"T",nombre:"Interés Simple",  formula:"I = P·r·t",      desc:"Interés simple: P capital, r tasa, t tiempo"}
];

let actual = null;
const $ = id => document.getElementById(id);
const hidden = el => el.classList.add("hidden");
const show = el => el.classList.remove("hidden");

function renderTabla(lista = elementos) {
  const tabla = $("tabla");
  tabla.innerHTML = "";
  lista.forEach(el => {
    const div = document.createElement("div");
    div.className = "elemento";
    div.innerHTML = `
      <div class="simbolo">${el.simbolo}</div>
      <div class="nombre">${el.nombre}</div>
      <div class="formula">${el.formula}</div>
    `;
    div.onclick = () => mostrarDetalle(el);
    tabla.appendChild(div);
  });
}

function mostrarDetalle(el) {
  actual = el;
  $("modal-title").textContent = el.nombre;
  $("modal-formula").textContent = el.formula;
  $("modal-desc").textContent = el.desc;
  $("ejercicio-box").classList.add("hidden");
  $("feedback").textContent = "";
  $("resp-user").value = "";
  show($("modal"));
}

$("close-modal").onclick = () => hidden($("modal"));

$("btn-ejercicio").onclick = () => generarEjercicio(actual);

function generarEjercicio(el) {
  const box = $("ejercicio-box");
  box.classList.remove("hidden");
  $("feedback").textContent = "";

  let texto = "", sol = 0;
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  switch (el.simbolo) {
    case "A":
      const lado = rand(2, 10);
      texto = `Calcula el área de un cuadrado de lado ${lado} cm.`;
      sol = lado * lado;
      break;
    case "B":
      const b = rand(2, 10), h = rand(2, 10);
      texto = `Calcula el área de un rectángulo de base ${b} cm y altura ${h} cm.`;
      sol = b * h;
      break;
    case "C":
      const base = rand(2, 10), altura = rand(2, 10);
      texto = `Calcula el área de un triángulo de base ${base} cm y altura ${altura} cm.`;
      sol = (base * altura) / 2;
      break;
    case "D":
      const r = rand(1, 10);
      texto = `Hallá el área de un círculo de radio ${r} cm (π ≈ 3.14).`;
      sol = Math.round(Math.PI * r * r);
      break;
    case "E":
      const a = rand(2, 6);
      texto = `Calcula el volumen de un cubo de arista ${a} cm.`;
      sol = a ** 3;
      break;
    case "F":
      const radio = rand(1, 6);
      texto = `Calcula el volumen de una esfera de radio ${radio} cm (usa π ≈ 3.14).`;
      sol = Math.round((4 / 3) * 3.14 * radio ** 3);
      break;
    case "G":
      const x = rand(1, 5), y = rand(1, 5);
      texto = `Expandir: (${x}+${y})²`;
      sol = (x + y) ** 2;
      break;
    case "H":
      const m = rand(5, 10), n = rand(1, 4);
      texto = `Expandir: (${m}-${n})²`;
      sol = (m - n) ** 2;
      break;
    case "I":
      const p = rand(5, 10), q = rand(1, 4);
      texto = `Factorizar y calcular: ${p}²-${q}²`;
      sol = p ** 2 - q ** 2;
      break;
    case "J":
      const cat1 = rand(3, 8), cat2 = rand(3, 8);
      texto = `Un triángulo rectángulo tiene catetos ${cat1} cm y ${cat2} cm. Calcula la hipotenusa.`;
      sol = Math.round(Math.sqrt(cat1 ** 2 + cat2 ** 2));
      break;
    case "K":
      const A = 1, B = rand(-5, 5), C = rand(-5, 5);
      texto = `Resuelve: ${A}x²${B > 0 ? '+' : ''}${B}x${C > 0 ? '+' : ''}${C}=0 (usa √Δ ≈ ${Math.round(Math.sqrt(B * B - 4 * A * C))})`;
      sol = Math.round((-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A));
      break;
    case "L":
      const x1 = rand(0, 5), y1 = rand(0, 5), x2 = rand(6, 10), y2 = rand(6, 10);
      texto = `Distancia entre (${x1},${y1}) y (${x2},${y2}).`;
      sol = Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
      break;
    case "M":
      const xa = rand(0, 5), ya = rand(0, 5), xb = rand(6, 10), yb = rand(6, 10);
      texto = `Pendiente entre (${xa},${ya}) y (${xb},${yb}).`;
      sol = Math.round((yb - ya) / (xb - xa));
      break;
    case "N":
      const datos = Array.from({length: 5}, () => rand(1, 10));
      texto = `Hallá la media de los datos: ${datos.join(", ")}.`;
      sol = Math.round(datos.reduce((s, v) => s + v, 0) / datos.length);
      break;
    case "O":
      const dat = [rand(1, 5), rand(6, 10), rand(11, 15), rand(16, 20), rand(21, 25)].sort((a, b) => a - b);
      texto = `Mediana de: ${dat.join(", ")}.`;
      sol = dat[2];
      break;
    case "P":
      const dat2 = [rand(1, 3), rand(1, 3), rand(1, 3)];
      const prom = dat2.reduce((a, b) => a + b, 0) / dat2.length;
      texto = `Varianza de: ${dat2.join(", ")} (redondea).`;
      sol = Math.round(dat2.reduce((s, v) => s + (v - prom) ** 2, 0) / dat2.length);
      break;
    case "Q":
      const nn = rand(5, 8), kk = rand(2, 4);
      texto = `Calcula C(${nn},${kk}).`;
      function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
      sol = Math.round(fact(nn) / (fact(kk) * fact(nn - kk)));
      break;
    case "R":
      const favorables = rand(1, 5), totales = favorables + rand(2, 5);
      texto = `Probabilidad de sacar una bola roja si hay ${favorables} rojas de ${totales} en total.`;
      sol = Math.round((favorables / totales) * 100);
      break;
    case "S":
      const baseLog = 2, arg = 8;
      texto = `Calcula log_${baseLog}(${arg}).`;
      sol = Math.round(Math.log(arg) / Math.log(baseLog));
      break;
    case "T":
      const P = rand(100, 500), rr = rand(5, 15), t = rand(1, 3);
      texto = `Interés simple de \$${P} a ${rr}% anual por ${t} año(s).`;
      sol = Math.round(P * (rr / 100) * t);
      break;
    default:
      texto = "Ejercicio no implementado para esta fórmula.";
      sol = 0;
  }
  $("ejercicio-text").textContent = texto;
  box.dataset.sol = sol;
}

$("btn-check").onclick = () => {
  const resUser = Number($("resp-user").value);
  const sol = Number($("ejercicio-box").dataset.sol);
  const feed = $("feedback");
  if (resUser === sol) {
    feed.textContent = "¡Correcto! 🎉";
    feed.style.color = "#4caf50";
  } else {
    feed.textContent = `Incorrecto. Respuesta: ${sol}`;
    feed.style.color = "#f44336";
  }
  setTimeout(() => generarEjercicio(actual), 2000);
};

// Pizarra digital
const canvas = $("pizarra");
const ctx = canvas.getContext("2d");
let drawing = false;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = 200;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

canvas.onmousedown = e => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
};
canvas.onmousemove = e => {
  if (!drawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};
canvas.onmouseup = () => drawing = false;
canvas.onmouseleave = () => drawing = false;

$("btn-pizarra").onclick = () => {
  const cont = $("pizarra-container");
  cont.classList.toggle("hidden");
};
$("btn-borrar").onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Buscador
$("buscador").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtrados = elementos.filter(el =>
    el.nombre.toLowerCase().includes(q) ||
    el.formula.toLowerCase().includes(q)
  );
  renderTabla(filtrados);
});

// Dark mode
$("btn-dark").onclick = () => {
  document.body.classList.toggle("dark");
  $("btn-dark").innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
};

// Arranque
renderTabla();