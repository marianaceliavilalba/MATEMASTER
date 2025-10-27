let chart; // instancia global de Chart.js
const $ = id => document.getElementById(id);

// Añadir fila dinámica
$("btn-add").onclick = () => {
  const div = document.createElement("div");
  div.className = "input-pair";
  div.innerHTML = `
    <input type="text" placeholder="Etiqueta" class="label-inp"/>
    <input type="number" placeholder="Valor" class="value-inp"/>
  `;
  $("inputs").appendChild(div);
};

// Limpiar todo
$("btn-clear").onclick = () => {
  $("inputs").innerHTML = `
    <div class="input-pair">
      <input type="text" placeholder="Etiqueta" class="label-inp"/>
      <input type="number" placeholder="Valor" class="value-inp"/>
    </div>
  `;
  if (chart) chart.destroy();
};

// Cambiar tipo de gráfico
document.querySelectorAll(".btn-chart").forEach(btn => {
  btn.onclick = e => {
    document.querySelectorAll(".btn-chart").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    actualizarGrafico(e.target.dataset.type);
  };
});

// Leer datos y graficar
function actualizarGrafico(tipo = "bar") {
  const pares = [...document.querySelectorAll(".input-pair")]
    .map(div => ({
      label: div.querySelector(".label-inp").value.trim(),
      value: Number(div.querySelector(".value-inp").value)
    }))
    .filter(p => p.label && !isNaN(p.value));

  if (pares.length === 0) return;

  const labels = pares.map(p => p.label);
  const data = pares.map(p => p.value);

  if (chart) chart.destroy();
  const ctx = $("myChart").getContext("2d");
  chart = new Chart(ctx, {
    type: tipo,
    data: {
      labels: labels,
      datasets: [{
        label: "Datos",
        data: data,
        backgroundColor: [
          "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9", "#388e3c", "#2e7d32"
        ],
        borderColor: "#1b5e20",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: tipo === "pie" }
      }
    }
  });
}

// Auto-graficar al cambiar cualquier input
["input", "change"].forEach(ev => {
  document.addEventListener(ev, e => {
    if (e.target.classList.contains("label-inp") || e.target.classList.contains("value-inp")) {
      actualizarGrafico(document.querySelector(".btn-chart.active").dataset.type);
    }
  });
});

// Exportar imagen
$("btn-img").onclick = () => {
  if (!chart) return;
  const url = chart.toBase64Image();
  const a = document.createElement("a");
  a.href = url;
  a.download = "grafico_matemaster.png";
  a.click();
};

// Exportar CSV
$("btn-csv").onclick = () => {
  const pares = [...document.querySelectorAll(".input-pair")]
    .map(div => ({
      label: div.querySelector(".label-inp").value.trim(),
      value: div.querySelector(".value-inp").value
    }))
    .filter(p => p.label && p.value !== "");
  if (pares.length === 0) return;
  let csv = "Etiqueta,Valor\n";
  pares.forEach(p => csv += `${p.label},${p.value}\n`);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "datos_matemaster.csv";
  a.click();
};

// Arranque
actualizarGrafico("bar");