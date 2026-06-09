let cargo = document.querySelector('#cargo');
let curso = document.querySelector('#curso');

curso.style.display = 'none';

cargo.addEventListener('change', () => {
	if(cargo.value === 'estudiante' || cargo.value === 'profesor'){
		curso.style.display = 'inline-block';
	} else {
	curso.style.display = 'none';
	}
});