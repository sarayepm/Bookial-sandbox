
function loadNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    // Si no hay usuario, redirigir al login
    link = "login.html";
    return;
  }

  const rolesMenu = {
    admin: [
      { nombre: "Dashboard", link: "dashboard.html", icon: "bi-grid" },
      { nombre: "Alumnos", link: "alumnos.html", icon: "bi-people" },
      { nombre: "Profesores", link: "profesores.html", icon: "bi-person-badge" },
      { nombre: "Leccionario", link: "lectionary.html", icon: "bi-journal-bookmark" },
      { nombre: "Calificaciones", link: "califications.html", icon: "bi-star" },
      { nombre: "Gamificación", link: "gamification.html", icon: "bi-trophy" },
      { nombre: "Calendario", link: "calendar.html", icon: "bi-calendar" }
    ],
    profesor: [
      { nombre: "Dashboard", link: "dashboard.html", icon: "bi-grid" },
      { nombre: "Leccionario", link: "lectionary.html", icon: "bi-journal-bookmark" },
      { nombre: "Calificaciones", link: "califications.html", icon: "bi-star" },
      { nombre: "Puntos", link: "gamification.html", icon: "bi-trophy" },
      { nombre: "Calendario", link: "calendar.html", icon: "bi-calendar" }
    ],
    apoderado: [
      { nombre: "Dashboard", link: "dashboard.html", icon: "bi-grid" },
      { nombre: "Notas", link: "califications.html", icon: "bi-star" },
      { nombre: "Asistencia", link: "lectionary.html", icon: "bi-check-circle" },
      { nombre: "Puntos", link: "gamification.html", icon: "bi-trophy" },
      { nombre: "Calendario", link: "calendar.html", icon: "bi-calendar" }
    ],
    alumno: [
      { nombre: "Dashboard", link: "dashboard.html", icon: "bi-grid" },
      { nombre: "Mis Notas", link: "califications.html", icon: "bi-star" },
      { nombre: "Mi Asistencia", link: "lectionary.html", icon: "bi-check-circle" },
      { nombre: "Mis Puntos", link: "gamification.html", icon: "bi-trophy" },
      { nombre: "Calendario", link: "calendar.html", icon: "bi-calendar" }
    ]
  };

  const menuItems = rolesMenu[user.rol] || [];
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  // Construir el HTML del menú
  let html = `<h3><i class="bi bi-menu-button-wide"></i> Menú</h3>`;
  menuItems.forEach(item => {
    html += `<a href="${item.link}"><i class="bi ${item.icon}"></i> ${item.nombre}</a>`;
  });
  html += `<hr><a href="#" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> Cerrar Sesión</a>`;
  nav.innerHTML = html;

  // Asignar evento al botón de cerrar sesión
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadNav);