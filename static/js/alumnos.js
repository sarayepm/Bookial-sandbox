document.addEventListener("DOMContentLoaded", function() {
  // Obtener referencias
  const tablaBody = document.querySelector("#tablaAlumnos tbody");
  const modal = document.getElementById("modalAlumno");
  const btnNuevo = document.getElementById("btnNuevoAlumno");
  const btnCerrar = document.querySelector(".btn-cerrar");
  const guardarBtn = document.getElementById("guardarAlumno");
  const modalTitulo = document.getElementById("modalTitulo");
  const alumnoIdInput = document.getElementById("alumnoId");
  const rutInput = document.getElementById("rut");
  const nombreInput = document.getElementById("nombre");
  const apellidoPInput = document.getElementById("apellidoPaterno");
  const apellidoMInput = document.getElementById("apellidoMaterno");
  const emailInput = document.getElementById("email");
  const cursoSelect = document.getElementById("cursoId");
  const estadoSelect = document.getElementById("estado");

  // Función para cargar cursos en el select
  function cargarCursos() {
    const cursos = getData("cursos");
    cursoSelect.innerHTML = '<option value="">Seleccionar curso</option>';
    cursos.forEach(cur => {
      const option = document.createElement("option");
      option.value = cur.id;
      option.textContent = cur.nombre;
      cursoSelect.appendChild(option);
    });
  }

  // Función para renderizar la tabla de alumnos
  function renderizarAlumnos() {
    if (!tablaBody) return;
    const alumnos = getData("alumnos");
    const cursos = getData("cursos");
    tablaBody.innerHTML = "";
    alumnos.forEach(al => {
      const row = tablaBody.insertRow();
      row.insertCell(0).textContent = al.rut || "";
      row.insertCell(1).textContent = `${al.nombre || ''} ${al.apellidoPaterno || ''}`;
      row.insertCell(2).textContent = al.email || "";
      const cursoNombre = cursos.find(c => c.id == al.cursoId)?.nombre || "Sin curso";
      row.insertCell(3).textContent = cursoNombre;
      row.insertCell(4).textContent = al.estado || "activo";
      
      // Celda de acciones
      const acciones = row.insertCell(5);
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.classList.add("btn-small");
      btnEditar.style.marginRight = "5px";
      btnEditar.onclick = () => editarAlumno(al);
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btn-small");
      btnEliminar.onclick = () => eliminarAlumno(al.id);
      acciones.appendChild(btnEditar);
      acciones.appendChild(btnEliminar);
    });
  }

  // Editar alumno
  function editarAlumno(alumno) {
    modalTitulo.textContent = "Editar Alumno";
    alumnoIdInput.value = alumno.id;
    rutInput.value = alumno.rut || "";
    nombreInput.value = alumno.nombre || "";
    apellidoPInput.value = alumno.apellidoPaterno || "";
    apellidoMInput.value = alumno.apellidoMaterno || "";
    emailInput.value = alumno.email || "";
    cursoSelect.value = alumno.cursoId || "";
    estadoSelect.value = alumno.estado || "activo";
    modal.style.display = "flex";
  }

  // Eliminar alumno
  function eliminarAlumno(id) {
    if (confirm("¿Eliminar este alumno?")) {
      let alumnos = getData("alumnos");
      alumnos = alumnos.filter(a => a.id !== id);
      setData("alumnos", alumnos);
      renderizarAlumnos();
      alert("Alumno eliminado");
    }
  }

  // Limpiar modal
  function limpiarModal() {
    modalTitulo.textContent = "Nuevo Alumno";
    alumnoIdInput.value = "";
    rutInput.value = "";
    nombreInput.value = "";
    apellidoPInput.value = "";
    apellidoMInput.value = "";
    emailInput.value = "";
    cursoSelect.value = "";
    estadoSelect.value = "activo";
  }

  // Abrir modal para nuevo alumno
  if (btnNuevo) {
    btnNuevo.addEventListener("click", () => {
      limpiarModal();
      modal.style.display = "flex";
    });
  }

  // Cerrar modal con la X
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // Cerrar modal haciendo clic fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Guardar alumno (crear o editar)
  if (guardarBtn) {
    guardarBtn.addEventListener("click", () => {
      // Validaciones
      const rut = rutInput.value.trim();
      const nombre = nombreInput.value.trim();
      const apellidoP = apellidoPInput.value.trim();
      const email = emailInput.value.trim();
      if (!rut || !nombre || !apellidoP) {
        alert("RUT, Nombre y Apellido Paterno son obligatorios");
        return;
      }
      const nuevoAlumno = {
        id: alumnoIdInput.value ? parseInt(alumnoIdInput.value) : Date.now(),
        rut: rut,
        nombre: nombre,
        apellidoPaterno: apellidoP,
        apellidoMaterno: apellidoMInput.value.trim(),
        email: email,
        cursoId: cursoSelect.value ? parseInt(cursoSelect.value) : null,
        estado: estadoSelect.value
      };

      let alumnos = getData("alumnos");
      if (alumnoIdInput.value) {
        // Editar
        const index = alumnos.findIndex(a => a.id === nuevoAlumno.id);
        if (index !== -1) alumnos[index] = nuevoAlumno;
        else alumnos.push(nuevoAlumno);
      } else {
        // Crear - evitar duplicados por id (opcional)
        alumnos.push(nuevoAlumno);
      }
      setData("alumnos", alumnos);
      renderizarAlumnos();
      modal.style.display = "none";
      alert("Alumno guardado correctamente");
    });
  }

  // Inicializar
  cargarCursos();
  renderizarAlumnos();
});