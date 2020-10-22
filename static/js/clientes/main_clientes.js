
$('#tablaClientes').DataTable();

// Le agregamos la clase form-control a todos los elementos del form de filtros
const formElements = document.getElementById('alta-cliente-form').elements;
for (var i = 0; i < formElements.length - 2; i++) {
	formElements[i].classList.add('form-control')
}

$('#input-alta-cliente').on('click', () => {
	$('#alta-cliente-modal').modal('show');
	document.getElementById('id_first_name').focus();
})
