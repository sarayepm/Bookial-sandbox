function cargarTablaNotas() {
  const cursoId = parseInt(document.getElementById("selCurso").value);
  const evalId = parseInt(document.getElementById("selEvaluacion").value);
  const alumnosCurso = getData("alumnos").filter(a => a.cursoId === cursoId);
  const califsExistentes = getData("calificaciones").filter(c => c.evaluacionId === evalId);
  const tbody = document.querySelector("#tablaNotas tbody");
  tbody.innerHTML = "";
  alumnosCurso.forEach(alumno => {
    const calif = califsExistentes.find(c => c.alumnoId === alumno.id) || { nota: "", pendiente: false, justificacion: "" };
    const row = tbody.insertRow();
    row.insertCell(0).textContent = `${alumno.nombre} ${alumno.apellidoPaterno}`;
    const notaCell = row.insertCell(1);
    const notaInput = document.createElement("input");
    notaInput.type = "number";
    notaInput.step = "0.01";
    notaInput.min = "1.0";
    notaInput.max = "7.0";
    notaInput.value = calif.nota;
    notaInput.disabled = calif.pendiente;
    notaCell.appendChild(notaInput);
    const pendCell = row.insertCell(2);
    const pendCheck = document.createElement("input");
    pendCheck.type = "checkbox";
    pendCheck.checked = calif.pendiente;
    pendCheck.addEventListener("change", () => {
      notaInput.disabled = pendCheck.checked;
      if (pendCheck.checked) notaInput.value = "";
    });
    pendCell.appendChild(pendCheck);
    const justCell = row.insertCell(3);
    const justInput = document.createElement("input");
    justInput.type = "text";
    justInput.value = calif.justificacion;
    justCell.appendChild(justInput);
    // Guardar referencia en dataset
    row.dataset.alumnoId = alumno.id;
  });
}

document.getElementById("guardarNotas").addEventListener("click", () => {
  const evalId = parseInt(document.getElementById("selEvaluacion").value);
  const nuevasCalifs = [];
  const rows = document.querySelectorAll("#tablaNotas tbody tr");
  rows.forEach(row => {
    const alumnoId = parseInt(row.dataset.alumnoId);
    const nota = row.cells[1].querySelector("input").value;
    const pendiente = row.cells[2].querySelector("input").checked;
    const justificacion = row.cells[3].querySelector("input").value;
    nuevasCalifs.push({ alumnoId, evaluacionId: evalId, nota: pendiente ? null : parseFloat(nota), pendiente, justificacion });
  });
  let todas = getData("calificaciones");
  todas = todas.filter(c => c.evaluacionId !== evalId);
  todas.push(...nuevasCalifs);
  setData("calificaciones", todas);
  alert("Calificaciones guardadas");
});