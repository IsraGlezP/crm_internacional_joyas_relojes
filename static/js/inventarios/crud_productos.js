window.onload = () => {

	// Le agregamos la clase form-control a todos los elementos del form para agregar nuevo producto
	const formElements = document.getElementById('agrega-producto').elements;
	for (var i = 0; i < formElements.length; i++) {
		formElements[i].classList.add('form-control')
	}

	// Verificamos si existen mensajes que nos envía el servidor
	const mensajes = document.getElementById("mensajes").children;
	for (var i = 0; i < mensajes.length; i++) {
		// Get the snackbar DIV
  	var x = document.getElementById("snackbar");

  	// Add the "show" class to DIV
  	x.className = "show";

  	// After 3 seconds, remove the show class from DIV
  	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	}

}