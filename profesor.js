const CLAVE_DOCENTE = "mate2025"; // contraseña del docente para cambiar de comtraseña
let alumnos = [];

const $ = id => document.getElementById(id);
const hidden = el => el.classList.add("hidden");
const show = el => el.classList.remove("hidden");

$("btn-login").onclick = () => {
  if ($("clave").value === CLAVE_DOCENTE) {
    hidden($("login-box"));
    show($("dashboard"));
    cargarDatos();
  } else {
    show($("login-error"));
  }
};
$("btn-logout").onclick = () => location.reload();

function cargarDatos() {
  // Leemos todo lo que hayamos guardado
  const keys = Object.keys(localStorage).filter(k => k.startsWith("userData_"));
  alumnos = keys.map(k => {
    const data = JSON.parse(localStorage.getItem(k));
    const ej = parseInt(localStorage.getItem("solved_" + data.email) || "0");
    const last = localStorage.getItem("last_" + data.email) || "-";
    return { ...data, ejercicios: ej, last: last };
  });
  alumnos.sort((a, b) => b.ejercicios - a.ejercicios);
  renderTabla();
  $("total-alu").textContent = alumnos.length;
  $("total-ej").textContent = alumnos.reduce((s, a) => s + a.ejercicios, 0);
}

function renderTabla() {
  const tbody = $("tabla-alumnos").querySelector("tbody");
  tbody.innerHTML = "";
  alumnos.forEach((a, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>${a.ejercicios}</td>
      <td>${a.last}</td>
      <td>
        <button class="btn-danger" onclick="resetAlumno('${a.email}')">
          <i class="fas fa-user-times"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function resetAlumno(email) {
  if (!confirm(`¿Resetear progreso de ${email}?`)) return;
  localStorage.removeItem("solved_" + email);
  localStorage.removeItem("last_" + email);
  cargarDatos();
}

$("btn-reset-all").onclick = () => {
  if (!confirm("¿Borrar TODOS los progresos?")) return;
  alumnos.forEach(a => {
    localStorage.removeItem("solved_" + a.email);
    localStorage.removeItem("last_" + a.email);
  });
  cargarDatos();
};

$("btn-csv").onclick = () => {
  let csv = "Nombre,Email,Ejercicios,Última vez\n";
  alumnos.forEach(a => csv += `${a.name},${a.email},${a.ejercicios},${a.last}\n`);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte_matemaster.csv";
  a.click();
};