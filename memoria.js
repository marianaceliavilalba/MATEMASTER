const ops = [
  ["7 × 8","56"],["12 + 5","17"],["9 − 4","5"],["36 ÷ 6","6"],
  ["4²","16"],["√81","9"],["3³","27"],["10% de 80","8"],
  ["2x = 14","x = 7"],["x + 3 = 9","x = 6"]
];
let nivel = 4, parejas, volteadas = [], acertadas = 0, movs = 0, tiempo = 0, tId;

const $ = id => document.getElementById(id);
const creaCarta = (txt, esOp) => {
  const div = document.createElement("div");
  div.className = "carta";
  div.dataset.val = txt;
  div.dataset.op = esOp;
  div.textContent = "?";
  div.onclick = voltear;
  return div;
};
function iniciar(){
  nivel = parseInt($("nivel").value);
  const total = nivel * nivel;
  if (total % 2 !== 0) nivel++; // siempre par
  parejas = ops.slice(0, (total / 2));
  const tab = $("tablero");
  tab.innerHTML = "";
  tab.style.gridTemplateColumns = `repeat(${nivel}, 1fr)`;
  const cartas = [];
  parejas.forEach(p => {
    cartas.push(creaCarta(p[0], true));
    cartas.push(creaCarta(p[1], false));
  });
  cartas.sort(() => Math.random() - 0.5);
  cartas.forEach(c => tab.appendChild(c));
  volteadas = []; acertadas = 0; movs = 0; tiempo = 0;
  $("movs").textContent = 0;
  $("tiempo").textContent = 0;
  $("ganador").classList.add("hidden");
  clearInterval(tId);
  tId = setInterval(() => {
    tiempo++;
    $("tiempo").textContent = tiempo;
  }, 1000);
}
function voltear(e){
  const carta = e.target;
  if (volteadas.length >= 2 || carta.classList.contains("acertada") || volteadas.includes(carta)) return;
  carta.textContent = carta.dataset.val;
  carta.classList.add("volteada");
  volteadas.push(carta);
  if (volteadas.length === 2) {
    movs++;
    $("movs").textContent = movs;
    setTimeout(comprobar, 600);
  }
}
function comprobar(){
  const [c1, c2] = volteadas;
  const par = parejas.find(p => (p[0] === c1.dataset.val && p[1] === c2.dataset.val) || (p[0] === c2.dataset.val && p[1] === c1.dataset.val));
  if (par) {
    c1.classList.add("acertada");
    c2.classList.add("acertada");
    acertadas += 2;
    if (acertadas === parejas.length * 2) finalizar();
  } else {
    c1.textContent = c2.textContent = "?";
    c1.classList.remove("volteada");
    c2.classList.remove("volteada");
  }
  volteadas = [];
}
function finalizar(){
  clearInterval(tId);
  $("final-movs").textContent = movs;
  $("final-tiempo").textContent = tiempo;
  $("ganador").classList.remove("hidden");
}
$("btn-start").onclick = iniciar;
$("btn-replay").onclick = iniciar;
iniciar(); // auto-arranque