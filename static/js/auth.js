let popup = document.querySelector('#popup');
let pHea = document.querySelector('#popup h2');
let msg = document.querySelector('#popup h3');
let rutI = document.querySelector('#rut');
let	rut = rutI.value;
let passW = document.querySelector('#password');
let cofPs = document.querySelector('#confirm_password');
let btn = document.querySelector('.btn-primary');
let cargo = document.querySelector('#cargo');
let curso = document.querySelector('.curso');
let cursoSel = document.querySelector('.form-group.curso #curso');
let noJefatura = document.querySelector('#noCur');
let nombre = document.querySelector('#nombre');
let apellido = document.querySelector('#apellido')

function popupShow(header, p, time){
	pHea.innerHTML = `<span class="material-symbols-outlined">person_alert</span>  ${header}`;
	msg.innerHTML = `${p}`;
	popup.showModal();
	setTimeout(() => {
		popup.close();
	}, time);
};

curso.style.display = 'none';

nombre.addEventListener('change', () => {
	let noSpecChar = nombre.value.replace(/[^\p{L}]/gu, '');
	nombre.value = noSpecChar;
});

apellido.addEventListener('change', () => {
	let noSpecChar = apellido.value.replace(/[^\p{L}]/gu, '');
	apellido.value = noSpecChar;
});

function verRut(){
	console.log(rut);
	
	let rutLimpio = rut.replace(/-/g, '');
	let cuerpo = rutLimpio.slice(0, -1);
	let dvIngresado = rutLimpio.slice(-1);
	let contador = 2;
	let suma = 0;
	for(let i = cuerpo.length - 1; i >= 0; i--){
			let digito = parseInt(cuerpo[i]);
			suma += digito * contador;
			contador++;
			if(contador > 7){
					contador = 2;
			}
	}
	let resto = suma % 11;
	let dvCalculado = 11 - resto;
	let digito;
	if(dvCalculado == 11){
			digito = '0';
	} else if(dvCalculado == 10){
			digito = 'K';
	} else {
			digito = dvCalculado.toString();
	}
	// Deshabilitado por el momento. Razones: Esteban
	if(digito.toUpperCase() === dvIngresado.toUpperCase()){
			popupShow('¡Éxito!', 'Rut válido.', 300);
			return true;
	} else {
			popupShow('Aviso', 'Rut no existente.', 300);
			return false;
	}
	console.log(digito);
};

cargo.addEventListener('change', () => {
	if(cargo.value == 2 || cargo.value == 4){
		curso.style.display = 'grid';
		curso.required = true;
		if(cargo.value == 2){
			noJefatura.style.display = 'flex';
		} else {
			noJefatura.style.display = 'none'
		}
	} else {
	curso.style.display = 'none';
	}
});

rutI.addEventListener('change', () => {
	rut = rutI.value;
	console.log(rut + ' | ' + rutI.value);
	verRut();
});

btn.addEventListener('click', () => {
	console.log(passW.value + ' | ' + cofPs.value);
	if(passW.value !== cofPs.value){
		popupShow('¡Alerta!', 'Las contraseñas no encajan.', 1000);
	};
});

const usuarios = [
  { email: "admin@bookial.cl", password: "admin", rol: "admin", nombre: "Director" },
  { email: "profesor@bookial.cl", password: "prof", rol: "profesor", nombre: "Roberto Fernández" },
  { email: "apoderado@bookial.cl", password: "apoderado", rol: "apoderado", nombre: "María López" },
  { email: "alumno@bookial.cl", password: "alumno", rol: "alumno", nombre: "Carlos Alumno" }
];

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("password").value;
  const user = usuarios.find(u => u.email === email && u.password === pwd);
  if (user) {
    localStorage.setItem("user", JSON.stringify({ email: user.email, rol: user.rol, nombre: user.nombre }));
    window.location.href = "dashboard.html";
  } else {
    alert("Credenciales inválidas");
  }
});
