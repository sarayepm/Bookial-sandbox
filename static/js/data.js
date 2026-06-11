const defaultData = {
  alumnos: [
    { id: 1, rut: "12345678-5", nombre: "Juan", apellidoPaterno: "Pérez", email: "juan@colegio.cl", cursoId: 1, estado: "activo" },
    { id: 2, rut: "23456789-6", nombre: "María", apellidoPaterno: "López", email: "maria@colegio.cl", cursoId: 1, estado: "activo" }
  ],

  profesores: [
    { id: 1, rut: "11111111-1", nombre: "Roberto", apellidoPaterno: "Fernández", apellidoMaterno: "González", email: "rfernandez@colegio.cl", asignaturas: [1] },
    { id: 2, rut: "22222222-2", nombre: "Claudia", apellidoPaterno: "Muñoz", apellidoMaterno: "López", email: "c.munoz@colegio.cl", asignaturas: [2, 3] }
  ],

  cursos: [
    { id: 1, nombre: "3° Medio A", especialidad: "Electrónica", periodo: 2025 }
  ],

  asignaturas: [
    { id: 1, nombre: "Matemática", horas: 4 },
    { id: 2, nombre: "Lenguaje", horas: 4 },
    { id: 3, nombre: "Electrónica Digital", horas: 6, tp: true }
  ],

  leccionario: [],
  calificaciones: [],
  bolsaPuntos: [],
  eventos: []
};

function loadData() {
  for (let key in defaultData) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(defaultData[key]));
    }
  }
}

function getData(key) { return JSON.parse(localStorage.getItem(key)) || []; }
function setData(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

loadData();