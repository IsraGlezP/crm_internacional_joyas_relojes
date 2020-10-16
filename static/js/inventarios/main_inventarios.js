var tablaInventarios = $('#tablaInventarios').DataTable();

// Le agregamos la clase form-control a todos los elementos del form de filtros
const formElements = document.getElementById('filtros').elements;
for (var i = 0; i < formElements.length; i++) {
	formElements[i].classList.add('form-control')
}

const eliminarProductoModal = (product_id) => {
	var data_array = tablaInventarios.row(product_id-1).data();

	var columnasOmitir = 2;
	var encabezados = ['Categoría:', 'Cantidad:', 'Unidad de Medida:', 'Kilataje:', 'Proveedor:', 'Código de Barras:']
	var modalBody = "<table class='table table-striped text-left'>";
	for (var i = 0; i < data_array.length - columnasOmitir; i++) {
		modalBody = modalBody + '<tr><th>'+encabezados[i]+'</th><td>'+data_array[i]+'</td></tr>';
	}
	modalBody = modalBody + '</table>';

	$('#eliminaModal .modal-body').html(modalBody);

	$('#elimina_producto_form').attr('action', "elimina_producto/"+product_id);
}