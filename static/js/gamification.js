function actualizarRanking() {
  const alumnos = getData("alumnos");
  const puntos = getData("bolsaPuntos");
  const ranking = alumnos.map(al => ({
    nombre: `${al.nombre} ${al.apellidoPaterno}`,
    total: puntos.filter(p => p.alumnoId === al.id).reduce((sum, p) => sum + p.puntos, 0)
  })).sort((a,b) => b.total - a.total);
  const tbody = document.querySelector("#rankingPuntos tbody");
  tbody.innerHTML = "";
  ranking.forEach(r => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = r.nombre;
    row.insertCell(1).textContent = r.total;
  });
}

function cargarSelectAlumnos() {
  const alumnos = getData("alumnos");
  const select = document.getElementById("selAlumnoPuntos");
  select.innerHTML = '<option value="">Seleccionar</option>';
  alumnos.forEach(al => {
    const opt = document.createElement("option");
    opt.value = al.id;
    opt.textContent = `${al.nombre} ${al.apellidoPaterno}`;
    select.appendChild(opt);
  });
}

document.getElementById("asignarPuntos")?.addEventListener("click", () => {
  const alumnoId = parseInt(document.getElementById("selAlumnoPuntos").value);
  const puntos = parseInt(document.getElementById("puntos").value);
  const concepto = document.getElementById("concepto").value;
  if (!alumnoId || isNaN(puntos)) return alert("Seleccione alumno y puntos válidos");
  const nuevaTransaccion = {
    id: Date.now(),
    alumnoId,
    puntos,
    concepto,
    fecha: new Date().toISOString().split("T")[0]
  };
  const bolsa = getData("bolsaPuntos");
  bolsa.push(nuevaTransaccion);
  setData("bolsaPuntos", bolsa);
  actualizarRanking();
  alert("Puntos asignados");
});

actualizarRanking();
cargarSelectAlumnos();