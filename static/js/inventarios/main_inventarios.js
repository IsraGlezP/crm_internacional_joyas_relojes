window.onload = () => {

	$('#tablaInventarios').DataTable();

	// Le agregamos la clase form-control a todos los elementos del form de filtros
	const formElements = document.getElementById('filtros').elements;
	for (var i = 0; i < formElements.length; i++) {
		formElements[i].classList.add('form-control')
	}
   
};