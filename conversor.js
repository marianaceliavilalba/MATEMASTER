// Factores de conversión (base: unidad más pequeña)
const factores = {
  longitud: { mm:1, cm:10, m:1000, km:1000000, pulgada:25.4, pie:304.8, yarda:914.4 },
  masa: { mg:1, g:1000, kg:1000000, ton:1000000000, onza:28349.5, libra:453592 },
  tiempo: { s:1, min:60, h:3600, dia:86400, semana:604800, mes:2592000, año:31536000 },
  temperatura: { C:"C", F:"F", K:"K" },
  divisa: { EUR:1, USD:1.1 } // tasa fija demo
};

let chart, historial = JSON.parse(localStorage.getItem("histConversor") || "[]");
const $ = id => document.getElementById(id);
const hidden = el => el.classList.add("hidden");
const show = el => el.classList.remove("hidden");

function init() {
  cargarSelects("longitud");
  renderHistorial();
  renderGrafico();
  $("categoria").onchange = e => cargarSelects(e.target.value);
  $("btn-convertir").onclick = convertir;
  $("btn-copiar").onclick = copiarResultado;
  $("btn-qr").onclick = generarQR;
  $("btn-clear-hist").onclick = limpiarHistorial;
  $("btn-dark").onclick = () => {
    document.body.classList.toggle("dark");
    $("btn-dark").innerHTML = document.body.classList.contains("dark")
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  };
}

function cargarSelects(cat) {
  const de = $("de"), a = $("a");
  de.innerHTML = "";
  a.innerHTML = "";
  const unidades = Object.keys(factores[cat]);
  unidades.forEach(u => {
    de.innerHTML += `<option value="${u}">${u}</option>`;
    a.innerHTML += `<option value="${u}">${u}</option>`;
  });
  a.selectedIndex = 1; // diferente por defecto
}

function convertir() {
  const cat = $("categoria").value;
  const de = $("de").value;
  const a = $("a").value;
  const val = Number($("valor").value);
  if (isNaN(val)) return;

  let resultado;
  if (cat === "temperatura") {
    resultado = tempConvert(val, de, a);
  } else if (cat === "divisa") {
    resultado = (val * factores.divisa[a]) / factores.divisa[de];
  } else {
    const base = val * factores[cat][de];
    resultado = base / factores[cat][a];
  }

  $("resultado").value = resultado.toFixed(3);
  guardarHistorial(cat, val, de, resultado, a);
  renderHistorial();
  renderGrafico();
}

function tempConvert(val, de, a) {
  if (de === a) return val;
  if (de === "C" && a === "F") return val * 9 / 5 + 32;
  if (de === "C" && a === "K") return val + 273.15;
  if (de === "F" && a === "C") return (val - 32) * 5 / 9;
  if (de === "F" && a === "K") return (val - 32) * 5 / 9 + 273.15;
  if (de === "K" && a === "C") return val - 273.15;
  if (de === "K" && a === "F") return (val - 273.15) * 9 / 5 + 32;
}

function guardarHistorial(cat, val, de, res, a) {
  const item = {
    cat, val, de, res, a,
    fecha: new Date().toLocaleString()
  };
  historial.unshift(item);
  if (historial.length > 50) historial = historial.slice(0, 50);
  localStorage.setItem("histConversor", JSON.stringify(historial));
}

function renderHistorial() {
  const lista = $("lista-hist");
  lista.innerHTML = "";
  historial.forEach(it => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${it.val} ${it.de} → ${it.res} ${it.a}</span>
      <small>${it.fecha}</small>
    `;
    lista.appendChild(li);
  });
}

function renderGrafico() {
  const div = historial.filter(it => it.cat === "divisa" && it.de === "EUR" && it.a === "USD");
  if (div.length === 0) return;
  const labels = div.slice(0, 10).reverse().map(it => it.fecha.split(" ")[1]);
  const data = div.slice(0, 10).reverse().map(it => parseFloat(it.res));

  const ctx = $("chartHist").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "EUR → USD",
        data: data,
        borderColor: "#388e3c",
        backgroundColor: "rgba(56, 142, 60, 0.2)",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });
}

function copiarResultado() {
  const res = $("resultado").value;
  navigator.clipboard.writeText(res).then(() => {
    $("btn-copiar").innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
    setTimeout(() => $("btn-copiar").innerHTML = '<i class="fas fa-copy"></i> Copiar', 1500);
  });
}

function generarQR() {
  const res = $("resultado").value;
  const de = $("de").value;
  const a = $("a").value;
  const val = $("valor").value;
  const texto = `${val} ${de} = ${res} ${a}`;
  const qrDiv = $("qrcode");
  qrDiv.innerHTML = "";
  new QRCode(qrDiv, { text: texto, width: 128, height: 128 });
  show(qrDiv);
}

function limpiarHistorial() {
  if (!confirm("¿Borrar todo el historial?")) return;
  historial = [];
  localStorage.removeItem("histConversor");
  renderHistorial();
  if (chart) chart.destroy();
}

init();

