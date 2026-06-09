let rutI = document.querySelector('#rut');
let	rut = rutI.value;
let passW = document.querySelector('#password');
let cofPs = document.querySelector('#confirm_password');
let btn = document.querySelector('#btn-primary');
let cargo = document.querySelector('#cargo');
let curso = document.querySelector('.form-group.curso');

curso.style.display = 'none';

function verRut(){
	dvrut = rut.charAt(-1)
	contador = 2;
	x = len(rut) - 1;
	lista = [];
	for( i in rut){
		lista.append(int(i))}
	suma = 0;
	while(x >= 0){
		suma = suma + (lista[x] * contador);
		x -= 1;
		contador += 1;
		if(contador > 7){
				contador = 2
			}
	}
	resto = suma % 11;
	dv = 11 - resto;
	if(dv == 11){
		dv = 0}
	if(dv == 10){
		digito = "K"}
	else {
		digito = str(dv)
	}
	if (digito == dvrut){
		alert("Rut verificado");
		return;
	} else {
		alert("Error: rut usuario no identificado");
		return;
	}
	console.log(digito);
}

cargo.addEventListener('change', () => {
	if(cargo.value === 'estudiante' || cargo.value === 'profesor'){
		curso.style.display = 'inline-block';
	} else {
	curso.style.display = 'none';
	}
});

rutI.addEventListener('change', () => {
	if (rutI.value.length < 10 && rutI.value.length > 13){
		return
	} else {
		if(rutI.value.length === 9){
			rut = rutI.value.slice(0, 2) + '.' + rutI.value.slice(2, 5) + '.' +rutI.value.slice(5, -1) + '-' + rutI.value.slice(-1);
		} else if(rutI.value.length == 8){
			rut = rutI.value.slice(0, 1) + '.' + rutI.value.slice(1, 4) + '.' +rutI.value.slice(4, -1) + '-' + rutI.value.slice(-1);
		}
	}
	rutI.value = rut;
});

btn.addEventListener('click', () => {
	if(passW.value =! cofPs.value){
		alert('Las contraseñas no encajan');
		return;
	};
	verRut();
})