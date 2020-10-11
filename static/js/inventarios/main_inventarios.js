window.onload = () => {

	$('#tablaInventarios').DataTable();

	const formElements = document.getElementById('filtros').elements;
	console.log(formElements)
	for (var i = 0; i < formElements.length; i++) {
		console.log(formElements[i].nodeName)
		formElements[i].classList.add('form-control')
		// if (formElements[i].nodeName === 'SELECT') formElements[i].classList.add('form-control')
	}
   
};