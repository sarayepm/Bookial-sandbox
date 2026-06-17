let body             = document.querySelector('body');                       // Listo
let header           = document.querySelector('header');                     // listo
let logo             = document.querySelector('header a');                   // listo
let nav              = document.querySelector('nav');                        // Listo
let navHeader        = document.querySelector('nav h3');                     // Listo
let navOpt           = document.querySelectorAll('nav a');                   // Listo
let navHr            = document.querySelector('nav hr');                     // Listo
let intro            = document.querySelector('#intro');                     // Listo
let featBooks_Header = document.querySelector('#featured-books h2');         // Listo
let stats            = document.querySelector('#stats div');                 // Pendiente
let statsIcon        = document.querySelector('#stats div i');               // Pendiente
let bookCard         = document.querySelector('#featured-books .book-card'); // Pendiente
let bookIcon         = document.querySelector('.book-card .book-icon i');    // Pendiente
let bookBtn          = document.querySelector('.book-card .btn');            // Pendiente
let footer           = document.querySelector('footer');                     // Pendiente

let btnModes         = document.querySelector('.modes');
let darkModeOn       = false;

btnModes.addEventListener('click', () => {
	if(!darkModeOn){
		darkModeOn = true;
		body.style.background = 'linear-gradient(135deg, var(--bookialblack), var(--black))';
		header.style.background = 'linear-gradient(135deg, var(--bookialpurple), var(--bookialdarkviolet))';
		logo.style.color = 'var(--bookiallilac)'
		nav.style.background = 'var(--bookialpurple)';
		navHeader.style.color = 'var(--bookiallilac)';
		navHr.style.borderColor = 'var(--bookiallilac)';
		navOpt.forEach(link => {
			link.style.color = 'var(--bookiallilac)';
		});
		intro.style.color = 'var(--bookialweaknight)';
		featBooks_Header.style.color = 'var(--bookialweaknight)';
	} else {
		darkModeOn = false;
		body.style.background = 'linear-gradient(135deg, var(--bookialwhite), var(--gray))';
		header.style.background = 'linear-gradient(135deg, var(--mainorange), var(--mainpink))';
		logo.style.color = 'white';
		nav.style.background = 'var(--paleorange)'
		navHeader.style.color = '#333';
		navHr.style.borderColor = '#333';
		navOpt.forEach(link => {
			link.style.color = '#333';
		});
		intro.style.color = 'black';
		featBooks_Header.style.color = 'black';
	}
});

navOpt.forEach(link => {
	link.addEventListener('mouseover', () => {
		if(!darkModeOn){
			link.style.background = 'var(--mainpink)';
			link.style.color = 'white';
		} else {
			link.style.background = 'var(--bookialgraypurple)';
			link.style.color = 'var(--bookiallavander)';
		}
	});
	link.addEventListener('mouseleave', () => {
			link.style.background = 'none';
			if(darkModeOn){
				link.style.color = 'var(--bookiallilac)';
			} else {
				link.style.color = '#333'
			}
	});
});