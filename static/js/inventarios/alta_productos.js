
var tablaAltaProductos = $('#tabla-alta-productos').DataTable({
	searching: false,
	ordering: false,
	scroller: true,
	scrollY: 420,
  paging: false,
  bInfo: false,
});

// Función para validar si los dos select de categoría y de kilataje ya tienen valores para poder hacer uso de función ajax
$('.combo-barcode-ajax').change(function(){

	var numFila = $(this).parent().attr('class');

	var divs = document.getElementsByClassName(numFila);

	var selectCategoria = divs[0].firstElementChild;

	var selectKilataje = divs[1].firstElementChild;

	var selectCodigo = divs[2].firstElementChild;

	console.log(selectKilataje.value);

	if (selectCategoria.value != '' && selectKilataje.value != '') {
		$.ajax({
			url: '/inventarios/busca_codigo_barras/'+selectCategoria.value+'/'+selectKilataje.value,
			type: 'GET',
			dataType: 'JSON',
			success: function(response) {
				console.log('respuesta: ' + response['barcode']);
				if (response['barcode'] == null) {
					alert('chale chale chalekito');
					selectCodigo.value = '';
					// var parrafo = document.createElement('p');
					// parrafo.classList.add('h5');
					// parrafo.classList.add('text-center');

					// var categoria = selectCategoria.options[selectCategoria.selectedIndex].text;
					// var kilataje = selectKilataje.options[selectKilataje.selectedIndex].text;
					// var node = document.createTextNode('No existe código de barras para '+categoria+' - '+kilataje);

					// parrafo.textContent = '';
					// parrafo.appendChild(node);

					// var elemento = document.getElementById('mensaje-codigo-barras');
					// elemento.textContent = '';
					// elemento.appendChild(parrafo);

					// $('#agregaCodigoModal').modal({
					// 	show: true,
					// 	backdrop: 'static',
  			// 		keyboard: false
					// });
					
					return;
				}
				selectCodigo.value = response['barcode'];
				// document.getElementById('barcode-input').value = response['barcode'];
			},
			error: function(response) {
				console.log('ALGO TRONO NO PUEDE SER:')
				console.log(response)
			}
		});
	}

});

// Cambiamos la clase de productos cuando se está editando
$('#tabla-alta-productos tbody').on('change', 'td', function() {

	var numFila = tablaAltaProductos.cell(this).index().row;

	cambiaClases(numFila);

});

// Cambiamos la clase de productos cuando se está editando
$('#tabla-alta-productos tbody').on('keyup', 'td', function() {

	var numFila = tablaAltaProductos.cell(this).index().row;

	cambiaClases(numFila);

});

// Guarda proveedores
$('#guardar-productos').on('click', (event) => {

	event.preventDefault();

	inputsConContenido = document.getElementsByClassName('con-contenido-producto');

	if (inputsConContenido.length <= 0) {
		alert('No ha ingresado datos del producto');
		return;
	}

	var data = [];
	for (var i = 0; i < inputsConContenido.length; i++) {
		data.push(inputsConContenido[i]);
	}

	formElements = document.getElementById('form-producto').elements;
	data.push(formElements[0]);

	console.log(data);

	$.ajax({
		url: '/inventarios/alta_productos/',
		type: 'POST',
		dataType: 'JSON',
		data: data,
		success: function(response) {
			if (response['bandera'] == 0) {
				alert(response['mensaje']);
			} else {
				$('#agrega-producto-modal').modal('hide');
				$('#snackbar').html('');
				$('#snackbar').html(response['mensaje']);
				var x = document.getElementById("snackbar");
		  	x.className = "show";
		  	setTimeout(function(){ 
		  		x.className = x.className.replace("show", "");
		  		window.location.reload(true);
		  	}, 2000);
			}
		},
		error: function(error) {
			console.log(error)
		}
	});

});

const cambiaClases = (numFila) => {
	var divs = document.getElementsByClassName(numFila);

	// Validamos que los demás campos tengan info
	var selectCategoria = divs[0].firstElementChild;
	var selectKilataje = divs[1].firstElementChild;
	var selectCodigo = divs[2].firstElementChild;
	var inputCantidad = divs[3].firstElementChild;
	var selectUnidad = divs[4].firstElementChild;
	var selectProveedor = divs[5].firstElementChild;

	var selectCategoriaValue = selectCategoria.value;
	var selectKilatajeValue = selectKilataje.value;
	var selectCodigoValue = selectCodigo.value;
	var inputCantidadValue = inputCantidad.value;
	var selectUnidadValue = selectUnidad.value;
	var selectProveedorValue = selectProveedor.value;

	if (selectCategoriaValue == '' && selectKilatajeValue == '' 
		&& selectCodigoValue == '' && inputCantidadValue == '' 
		&& selectUnidadValue == '' && selectProveedorValue == '') {
		document.getElementById('guardar-productos').disabled = false;
		selectCategoria.classList.remove('con-contenido-producto');
		selectKilataje.classList.remove('con-contenido-producto');
		selectCodigo.classList.remove('con-contenido-producto');
		inputCantidad.classList.remove('con-contenido-producto');
		selectUnidad.classList.remove('con-contenido-producto');
		selectProveedor.classList.remove('con-contenido-producto');
		return;
	}

	if (selectCategoriaValue == '' || selectKilatajeValue == '' 
		|| selectCodigoValue == '' || inputCantidadValue == '' 
		|| selectUnidadValue == '' || selectProveedorValue == '') {
		document.getElementById('guardar-productos').disabled = true;
		selectCategoria.classList.remove('con-contenido-producto');
		selectKilataje.classList.remove('con-contenido-producto');
		selectCodigo.classList.remove('con-contenido-producto');
		inputCantidad.classList.remove('con-contenido-producto');
		selectUnidad.classList.remove('con-contenido-producto');
		selectProveedor.classList.remove('con-contenido-producto');
		return;
	}

	document.getElementById('guardar-productos').disabled = false;
	selectCategoria.classList.add('con-contenido-producto');
	selectKilataje.classList.add('con-contenido-producto');
	selectCodigo.classList.add('con-contenido-producto');
	inputCantidad.classList.add('con-contenido-producto');
	selectUnidad.classList.add('con-contenido-producto');
	selectProveedor.classList.add('con-contenido-producto');
}

// Verificamos si existen mensajes que nos envía el servidor
// const mensajes = document.getElementById("mensajes").children;
// for (var i = 0; i < mensajes.length; i++) {
// 	// Get the snackbar DIV
// 	var x = document.getElementById("snackbar");
// 	// Add the "show" class to DIV
// 	x.className = "show";
// 	// After 3 seconds, remove the show class from DIV
// 	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
// }
