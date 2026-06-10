let popup = document.querySelector('#popup');
let pHea = document.querySelector('#popup h2');
let msg = document.querySelector('#popup h3');
let rutI = document.querySelector('#rut');
let	rut = rutI.value;
let passW = document.querySelector('#password');
let cofPs = document.querySelector('#confirm_password');
let btn = document.querySelector('.btn-primary');
let cargo = document.querySelector('#cargo');
let curso = document.querySelector('.form-group.curso');
let cursoSel = document.querySelector('.form-group.curso #curso');
let noJefatura = document.querySelector('#noCur');

function popupShow(header, p, time){
	pHea.innerHTML = `<span class="material-symbols-outlined">person_alert</span>  ${header}`;
	msg.innerHTML = `${p}`;
	popup.showModal();
	setTimeout(() => {
		popup.close();
	}, time);
};

curso.style.display = 'none';

function verRut(){
	console.log(rut);
	
	let rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');
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
	if(digito.toUpperCase() === dvIngresado.toUpperCase()){
			popupShow('¡Éxito!', 'Rut válido.', 1000);
			return true;
	} else {
			popupShow('Aviso', 'Rut no existente.', 1000);
			return false;
	}
	console.log(digito);
};

cargo.addEventListener('change', () => {
	if(cargo.value === 'estudiante' || cargo.value === 'profesor'){
		curso.style.display = 'inline-block';
		curso.required = true;
		if(cargo.value === "profesor"){
			noJefatura.style.display = 'inline-block';
		} else {
			noJefatura.style.display = 'none'
		}
	} else {
	curso.style.display = 'none';
	}
});

rutI.addEventListener('change', () => {
	if (rutI.value.length < 10 && rutI.value.length > 13){
		rut = rutI.value;
	} else {
		if(rutI.value.length === 9){
			rut = rutI.value.slice(0, 2) + '.' + rutI.value.slice(2, 5) + '.' +rutI.value.slice(5, -1) + '-' + rutI.value.slice(-1);
			rutI.value = rut;
		} else if(rutI.value.length == 8){
			rut = rutI.value.slice(0, 1) + '.' + rutI.value.slice(1, 4) + '.' +rutI.value.slice(4, -1) + '-' + rutI.value.slice(-1);
			rutI.value = rut;
		}
	}
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
