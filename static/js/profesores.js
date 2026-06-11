document.addEventListener("DOMContentLoaded", function () {
    const tablaBody = document.querySelector("#tablaProfesores tbody");
    const modal = document.getElementById("modalProfesor");
    const btnNuevo = document.getElementById("btnNuevoProfesor");
    const btnCerrar = document.querySelector(".btn-cerrar");
    const guardarBtn = document.getElementById("guardarProfesor");
    const modalTitulo = document.getElementById("modalTitulo");
    const profesorIdInput = document.getElementById("profesorId");
    const rutInput = document.getElementById("rut");
    const nombreInput = document.getElementById("nombre");
    const apellidoPInput = document.getElementById("apellidoPaterno");
    const apellidoMInput = document.getElementById("apellidoMaterno");
    const emailInput = document.getElementById("email");
    const asignaturasDiv = document.getElementById("asignaturasCheckbox");

    function cargarAsignaturasCheckbox(asignaturasSeleccionadas = []) {
        const asignaturas = getData("asignaturas");
        if (!asignaturasDiv) return;
        asignaturasDiv.innerHTML = "";
        if (asignaturas.length === 0) {
            asignaturasDiv.innerHTML = "<p style='color:gray;'>No hay asignaturas registradas</p>";
            return;
        }
        asignaturas.forEach(asig => {
            const label = document.createElement("label");
            label.style.display = "block";
            label.style.margin = "5px 0";
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.value = asig.id;
            cb.checked = asignaturasSeleccionadas.includes(asig.id);
            label.appendChild(cb);
            label.appendChild(document.createTextNode(` ${asig.nombre}`));
            asignaturasDiv.appendChild(label);
        });
    }

    function getAsignaturasSeleccionadas() {
        if (!asignaturasDiv) return [];
        const checkboxes = asignaturasDiv.querySelectorAll("input[type='checkbox']:checked");
        return Array.from(checkboxes).map(cb => parseInt(cb.value));
    }

    function renderizarProfesores() {
        if (!tablaBody) return;
        const profesores = getData("profesores");
        const asignaturas = getData("asignaturas");
        tablaBody.innerHTML = "";
        profesores.forEach(prof => {
            const row = tablaBody.insertRow();
            row.insertCell(0).textContent = prof.rut || "";
            const nombreCompleto = `${prof.nombre || ''} ${prof.apellidoPaterno || ''} ${prof.apellidoMaterno || ''}`;
            row.insertCell(1).textContent = nombreCompleto.trim();
            row.insertCell(2).textContent = prof.email || "";

            const asigCell = row.insertCell(3);
            const asignaturasIds = prof.asignaturas || [];
            asignaturasIds.forEach(id => {
                const asig = asignaturas.find(a => a.id === id);
                if (asig) {
                    const badge = document.createElement("span");
                    badge.className = "badge";
                    badge.textContent = asig.nombre;
                    asigCell.appendChild(badge);
                }
            });
            if (asignaturasIds.length === 0) asigCell.textContent = "—";

            const acciones = row.insertCell(4);
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "✏️";
            btnEditar.classList.add("btn-small");
            btnEditar.style.marginRight = "5px";
            btnEditar.onclick = () => editarProfesor(prof);
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "🗑️";
            btnEliminar.classList.add("btn-small");
            btnEliminar.onclick = () => eliminarProfesor(prof.id);
            acciones.appendChild(btnEditar);
            acciones.appendChild(btnEliminar);
        });
    }

    function editarProfesor(profesor) {
        modalTitulo.textContent = "Editar Profesor";
        profesorIdInput.value = profesor.id;
        rutInput.value = profesor.rut || "";
        nombreInput.value = profesor.nombre || "";
        apellidoPInput.value = profesor.apellidoPaterno || "";
        apellidoMInput.value = profesor.apellidoMaterno || "";
        emailInput.value = profesor.email || "";
        cargarAsignaturasCheckbox(profesor.asignaturas || []);
        modal.style.display = "flex";
    }

    function eliminarProfesor(id) {
        if (confirm("¿Eliminar este profesor?")) {
            let profesores = getData("profesores");
            profesores = profesores.filter(p => p.id !== id);
            setData("profesores", profesores);
            renderizarProfesores();
            alert("Profesor eliminado");
        }
    }

    // Limpiar modal
    function limpiarModal() {
        modalTitulo.textContent = "Nuevo Profesor";
        profesorIdInput.value = "";
        rutInput.value = "";
        nombreInput.value = "";
        apellidoPInput.value = "";
        apellidoMInput.value = "";
        emailInput.value = "";
        cargarAsignaturasCheckbox([]);
    }

    // Eventos
    if (btnNuevo) {
        btnNuevo.addEventListener("click", () => {
            limpiarModal();
            modal.style.display = "flex";
        });
    }
    if (btnCerrar) {
        btnCerrar.addEventListener("click", () => modal.style.display = "none");
    }
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Guardar profesor
    if (guardarBtn) {
        guardarBtn.addEventListener("click", () => {
            const rut = rutInput.value.trim();
            const nombre = nombreInput.value.trim();
            const apellidoP = apellidoPInput.value.trim();
            const email = emailInput.value.trim();
            if (!rut || !nombre || !apellidoP || !email) {
                alert("RUT, Nombre, Apellido Paterno y Email son obligatorios");
                return;
            }
            const nuevoProfesor = {
                id: profesorIdInput.value ? parseInt(profesorIdInput.value) : Date.now(),
                rut: rut,
                nombre: nombre,
                apellidoPaterno: apellidoP,
                apellidoMaterno: apellidoMInput.value.trim(),
                email: email,
                asignaturas: getAsignaturasSeleccionadas()
            };
            let profesores = getData("profesores");
            if (profesorIdInput.value) {
                const index = profesores.findIndex(p => p.id === nuevoProfesor.id);
                if (index !== -1) profesores[index] = nuevoProfesor;
                else profesores.push(nuevoProfesor);
            } else {
                profesores.push(nuevoProfesor);
            }
            setData("profesores", profesores);
            renderizarProfesores();
            modal.style.display = "none";
            alert("Profesor guardado correctamente");
        });
    }

    // Inicialización
    function inicializar() {
        cargarAsignaturasCheckbox([]);
        renderizarProfesores();
    }
    inicializar();
});