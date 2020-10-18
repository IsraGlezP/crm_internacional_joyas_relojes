window.onload = () => {

	// Inicializa tabla alta productos
	var tablaAltaProductos = $('#tabla-alta-productos').DataTable({
		searching: false,
		ordering: false
	});

	// Inicializa tabla alta categorias
	var tablaAltaCategorias = $('#tabla-alta-categorias').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false
	});

	// Inicializa tabla alta kilatajes
	var tablaAltaKilatajes = $('#tabla-alta-kilatajes').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false
	});

	// Inicializa tabla alta kilatajes
	var tablaAltaUnidades = $('#tabla-alta-unidades').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false
	});

	// Inicializa tabla alta proveedores
	var tablaAltaProveedores = $('#tabla-alta-proveedores').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false
	});

	// Al select de categorías y de kilataje le agregamos una clase específica para utilizarlos con ajax
	const selectCategoria = document.getElementById('id_category');
	selectCategoria.classList.add('combo-barcode-ajax');
	const selectKilataje = document.getElementById('id_kilate');
	selectKilataje.classList.add('combo-barcode-ajax');

	// Muestra modal para agregar categoría
	$('#boton-agregar-categoria').on('click', () => {
		$('#agrega-categoria-modal').modal('show');
	});

	// Redimensiona el encabezado de la tabla alta categorías cuando se muestra el modal
	$('#agrega-categoria-modal').on('shown.bs.modal', function () {
       tablaAltaCategorias.columns.adjust();
       document.getElementById('fila-categoria-0').focus();
   });

	// Muestra modal para agregar kilataje
	$('#boton-agregar-kilataje').on('click', () => {
		$('#agrega-kilataje-modal').modal('show');
	});

	// Redimensiona el encabezado de la tabla alta kilatajes cuando se muestra el modal
	$('#agrega-kilataje-modal').on('shown.bs.modal', function () {
       tablaAltaKilatajes.columns.adjust();
       document.getElementById('fila-kilataje-0').focus();
   });

	// Muestra modal para agregar kilataje
	$('#boton-agregar-unidad').on('click', () => {
		$('#agrega-unidad-modal').modal('show');
	});

	// Redimensiona el encabezado de la tabla alta unidades cuando se muestra el modal
	$('#agrega-unidad-modal').on('shown.bs.modal', function () {
       tablaAltaUnidades.columns.adjust();
       document.getElementById('fila-unidad-0').focus();
   });

	// Muestra modal para agregar proveedor
	$('#boton-agregar-proveedor').on('click', () => {
		$('#agrega-proveedor-modal').modal('show');
	});

	// Redimensiona el encabezado de la tabla alta proveedores cuando se muestra el modal
	$('#agrega-proveedor-modal').on('shown.bs.modal', function () {
       tablaAltaProveedores.columns.adjust();
       document.getElementById('fila-proveedor-nombre-0').focus();
   });

	// Cambiamos la clase de categorías cuando se está editando
	$('#tabla-alta-categorias tbody').on('keyup', 'tr', function(event) {

		var numFila = tablaAltaCategorias.row(this).index();
		var numColumna = 0;

		var idFila = 'fila-categoria-'+numFila;

		var input = document.getElementById(idFila);
		// input.classList.remove('sin-contenido');
		// input.classList.remove('con-contenido');

		var inputContenido = input.value;
		if ( inputContenido == '') {
			input.classList.add('sin-contenido');
			input.classList.remove('con-contenido');
		} else {
			input.classList.add('con-contenido');
			input.classList.remove('sin-contenido');
		}

	});

	// Cambiamos la clase de categorías cuando se está editando
	$('#tabla-alta-kilatajes tbody').on('keyup', 'tr', function(event) {

		var numFila = tablaAltaCategorias.row(this).index();
		var numColumna = 0;

		var idFila = 'fila-kilataje-'+numFila;

		var input = document.getElementById(idFila);
		// input.classList.remove('sin-contenido');
		// input.classList.remove('con-contenido');

		var inputContenido = input.value;
		if ( inputContenido == '') {
			input.classList.add('sin-contenido');
			input.classList.remove('con-contenido');
		} else {
			input.classList.add('con-contenido');
			input.classList.remove('sin-contenido');
		}

	});

	// Guarda categoría
	$('#guardar-categoria').on('click', (event) => {

		event.preventDefault();

		inputsConContenido = document.getElementsByClassName('con-contenido');

		if (inputsConContenido.length <= 0) {
			alert('No ha ingresado categorías');
			return;
		}

		var data = [];
		for (var i = 0; i < inputsConContenido.length; i++) {
			data.push(inputsConContenido[i]);
		}

		formElements = document.getElementById('form-categoria').elements;
		data.push(formElements[0]);

		$.ajax({
			url: '/inventarios/alta_categorias/',
			type: 'POST',
			dataType: 'JSON',
			data: data,
			success: function(response) {
				if (response['bandera'] == 0) {
					alert(response['mensaje']);
				} else {
					$('#agrega-categoria-modal').modal('hide');
					$('#snackbar').html('');
					$('#snackbar').html(response['mensaje']);
					var x = document.getElementById("snackbar");
			  	x.className = "show";
			  	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			  	for (var i = 0; i < inputsConContenido.length; i++) {
			  		console.log(inputsConContenido[i].value);
			  		inputsConContenido[i].value = '';
			  		inputsConContenido[i].classList.add('sin-contenido');
			  		inputsConContenido[i].classList.remove('con-contenido');
					}
				}
			},
			error: function(error) {
				console.log(error)
			}
		})

	});

	// Guarda kilataje
	$('#guardar-kilataje').on('click', (event) => {

		event.preventDefault();

		inputsConContenido = document.getElementsByClassName('con-contenido');

		if (inputsConContenido.length <= 0) {
			alert('No ha ingresado kilatajes');
			return;
		}

		var data = [];
		for (var i = 0; i < inputsConContenido.length; i++) {
			data.push(inputsConContenido[i]);
		}

		formElements = document.getElementById('form-kilataje').elements;
		data.push(formElements[0]);

		$.ajax({
			url: '/inventarios/alta_kilatajes/',
			type: 'POST',
			dataType: 'JSON',
			data: data,
			success: function(response) {
				if (response['bandera'] == 0) {
					alert(response['mensaje']);
				} else {
					$('#agrega-categoria-modal').modal('hide');
					$('#snackbar').html('');
					$('#snackbar').html(response['mensaje']);
					var x = document.getElementById("snackbar");
			  	x.className = "show";
			  	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			  	for (var i = 0; i < inputsConContenido.length; i++) {
			  		console.log(inputsConContenido[i].value);
			  		inputsConContenido[i].value = '';
			  		inputsConContenido[i].classList.add('sin-contenido');
			  		inputsConContenido[i].classList.remove('con-contenido');
					}
				}
			},
			error: function(error) {
				console.log(error)
			}
		})

	})


	// Función para validar si los dos select de categoría y de kilataje ya tienen valores para poder hacer uso de función ajax
	// $('.combo-barcode-ajax').on('change', () => {
	// 	if (selectCategoria.value != '' && selectKilataje.value != '') {
	// 		$.ajax({
	// 			url: '/inventarios/busca_codigo_barras/'+selectCategoria.value+'/'+selectKilataje.value,
	// 			type: 'GET',
	// 			dataType: 'JSON',
	// 			success: function(response) {
	// 				if (response['barcode'] == null) {
	// 					var parrafo = document.createElement('p');
	// 					parrafo.classList.add('h5');
	// 					parrafo.classList.add('text-center');

	// 					var categoria = selectCategoria.options[selectCategoria.selectedIndex].text;
	// 					var kilataje = selectKilataje.options[selectKilataje.selectedIndex].text;
	// 					var node = document.createTextNode('No existe código de barras para '+categoria+' - '+kilataje);

	// 					parrafo.textContent = '';
	// 					parrafo.appendChild(node);

	// 					var elemento = document.getElementById('mensaje-codigo-barras');
	// 					elemento.textContent = '';
	// 					elemento.appendChild(parrafo);

	// 					$('#agregaCodigoModal').modal({
	// 						show: true,
	// 						backdrop: 'static',
 //    					keyboard: false
	// 					});
						
	// 					return;
	// 				}
	// 				document.getElementById('barcode-input').value = response['barcode'];
	// 			},
	// 			error: function(response) {
	// 				console.log('ALGO TRONO NO PUEDE SER:')
	// 				console.log(response)
	// 			}
	// 		});
	// 	}

	// });

	// // Verificamos si existen mensajes que nos envía el servidor
	// const mensajes = document.getElementById("mensajes").children;
	// for (var i = 0; i < mensajes.length; i++) {
	// 	// Get the snackbar DIV
 //  	var x = document.getElementById("snackbar");
 //  	// Add the "show" class to DIV
 //  	x.className = "show";
 //  	// After 3 seconds, remove the show class from DIV
 //  	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	// }

}