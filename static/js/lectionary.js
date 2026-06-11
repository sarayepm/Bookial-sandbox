// ==================== FUNCIONES DE DATOS (si data.js no existe, las creamos localmente) ====================
    if (typeof getData !== 'function') {
      window.getData = function(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
      };
      window.setData = function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      };
      // Inicializar datos por defecto si no existen
      const defaultData = {
        cursos: [
          { id: 1, nombre: "3° Medio A" },
          { id: 2, nombre: "4° Medio B" }
        ],
        asignaturas: [
          { id: 1, nombre: "Matemática" },
          { id: 2, nombre: "Lenguaje" },
          { id: 3, nombre: "Electrónica" }
        ],
        alumnos: [
          { id: 1, nombre: "Juan", apellidoPaterno: "Pérez", cursoId: 1 },
          { id: 2, nombre: "María", apellidoPaterno: "López", cursoId: 1 }
        ],
        leccionario: []
      };
      for (let key in defaultData) {
        if (!localStorage.getItem(key)) setData(key, defaultData[key]);
      }
    }

    // ==================== MENÚ DINÁMICO (opcional, si no existe nav.js) ====================
    if (typeof loadNav !== 'function') {
      const user = JSON.parse(localStorage.getItem("user")) || { rol: "admin" };
      const rolesMenu = {
        admin: [
          { nombre: "Dashboard", link: "dashboard.html", icon: "bi-grid" },
          { nombre: "Alumnos", link: "alumnos.html", icon: "bi-people" },
          { nombre: "Profesores", link: "profesores.html", icon: "bi-person-badge" },
          { nombre: "Leccionario", link: "lectionary.html", icon: "bi-journal-bookmark" },
          { nombre: "Calificaciones", link: "califications.html", icon: "bi-star" }
        ]
      };
      const menu = rolesMenu[user.rol] || rolesMenu.admin;
      const nav = document.getElementById("mainNav");
      if (nav) {
        nav.innerHTML = `<h3>Menú</h3>` + menu.map(item => `<a href="${item.link}"><i class="bi ${item.icon}"></i> ${item.nombre}</a>`).join('') +
          `<hr><a href="#" id="logoutBtn">Cerrar Sesión</a>`;
        document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("user");
          window.location.href = "login.html";
        });
      }
    } else {
      // Si existe nav.js, lo llamamos
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadNav);
      else loadNav();
    }

    // ==================== LÓGICA DEL LECCIONARIO ====================
    document.addEventListener("DOMContentLoaded", function() {
      const popup = document.getElementById("popup-curso");
      const difuminate = document.getElementById("difuminate");
      const btnAceptar = document.getElementById("btnAceptarPopup");
      const selectCurso = document.getElementById("selectCursoPopup");
      const selectAsignatura = document.getElementById("selectAsignaturaPopup");
      const contenidoLeccionario = document.getElementById("contenidoLeccionario");
      const tablaBody = document.querySelector("#tablaAsistencia tbody");
      const guardarBtn = document.getElementById("guardarClase");
      const contenidoText = document.getElementById("contenido");
      const objetivoText = document.getElementById("objetivo");
      const fechaInput = document.getElementById("fecha");

      let cursoSeleccionado = null;
      let asignaturaSeleccionada = null;

      function cargarCursos() {
        const cursos = getData("cursos");
        selectCurso.innerHTML = '<option value="">Seleccione curso</option>';
        cursos.forEach(c => {
          const opt = document.createElement("option");
          opt.value = c.id;
          opt.textContent = c.nombre;
          selectCurso.appendChild(opt);
        });
      }

      function cargarAsignaturas() {
        const asignaturas = getData("asignaturas");
        selectAsignatura.innerHTML = '<option value="">Seleccione asignatura</option>';
        asignaturas.forEach(a => {
          const opt = document.createElement("option");
          opt.value = a.id;
          opt.textContent = a.nombre;
          selectAsignatura.appendChild(opt);
        });
      }

      function cargarAlumnos() {
        const alumnos = getData("alumnos");
        const alumnosCurso = alumnos.filter(a => a.cursoId == cursoSeleccionado);
        tablaBody.innerHTML = "";
        alumnosCurso.forEach(alumno => {
          const row = tablaBody.insertRow();
          row.dataset.alumnoId = alumno.id;
          row.insertCell(0).textContent = `${alumno.nombre} ${alumno.apellidoPaterno}`;
          const chkCell = row.insertCell(1);
          const chk = document.createElement("input");
          chk.type = "checkbox";
          chkCell.appendChild(chk);
          const justCell = row.insertCell(2);
          const justInput = document.createElement("input");
          justInput.type = "text";
          justInput.placeholder = "Justificación";
          justInput.disabled = true;
          justCell.appendChild(justInput);
          chk.addEventListener("change", () => {
            justInput.disabled = chk.checked;
            if (chk.checked) justInput.value = "";
          });
        });
      }

      btnAceptar.addEventListener("click", () => {
        cursoSeleccionado = parseInt(selectCurso.value);
        asignaturaSeleccionada = parseInt(selectAsignatura.value);
        if (!cursoSeleccionado || !asignaturaSeleccionada) {
          alert("Debe seleccionar curso y asignatura");
          return;
        }
        // Ocultar popup
        popup.style.display = "none";
        difuminate.style.display = "none";
        // Mostrar contenido
        contenidoLeccionario.style.display = "block";
        cargarAlumnos();
      });

      guardarBtn.addEventListener("click", () => {
        const contenido = contenidoText.value.trim();
        if (!contenido) {
          alert("El contenido dictado es obligatorio");
          return;
        }
        const asistencia = [];
        const rows = tablaBody.querySelectorAll("tr");
        rows.forEach(row => {
          const alumnoId = parseInt(row.dataset.alumnoId);
          const chk = row.cells[1].querySelector("input");
          const justInput = row.cells[2].querySelector("input");
          asistencia.push({
            alumnoId: alumnoId,
            presente: chk.checked,
            justificacion: justInput.value
          });
        });
        const nuevaClase = {
          id: Date.now(),
          cursoId: cursoSeleccionado,
          asignaturaId: asignaturaSeleccionada,
          fecha: fechaInput.value,
          contenido: contenido,
          objetivo: objetivoText.value,
          asistencia: asistencia
        };
        let leccionario = getData("leccionario");
        leccionario.push(nuevaClase);
        setData("leccionario", leccionario);
        alert("Clase guardada correctamente");
        // Limpiar campos
        contenidoText.value = "";
        objetivoText.value = "";
        rows.forEach(row => {
          const chk = row.cells[1].querySelector("input");
          const just = row.cells[2].querySelector("input");
          chk.checked = false;
          just.value = "";
          just.disabled = true;
        });
      });

      // Inicialización
      cargarCursos();
      cargarAsignaturas();
      contenidoLeccionario.style.display = "none";
      popup.style.display = "block";
      difuminate.style.display = "block";
    });