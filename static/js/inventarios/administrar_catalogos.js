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
    paging: false,
    bInfo: false,
	});

	// Inicializa tabla categorias
	var tablaCategorias = $('#tabla-categorias').DataTable({
		searching: false,
		ordering: false,
		pageLength: 10,
		lengthChange: false,
    bInfo: false
	});

	// Inicializa tabla alta kilatajes
	var tablaAltaKilatajes = $('#tabla-alta-kilatajes').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false,
    bInfo: false,
	});

	// Inicializa tabla categorias
	var tablaKilatajes = $('#tabla-kilatajes').DataTable({
		searching: false,
		ordering: false,
		pageLength: 10,
		lengthChange: false,
    bInfo: false
	});

	// Inicializa tabla alta kilatajes
	var tablaAltaCodigos = $('#tabla-alta-codigos').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false,
    bInfo: false,
	});

	// Inicializa tabla códigos de barras
	var tablaCodigos = $('#tabla-codigos').DataTable({
		searching: false,
		ordering: false,
		pageLength: 10,
		lengthChange: false,
    bInfo: false
	});

	// Inicializa tabla alta unidades de medida
	var tablaAltaUnidades = $('#tabla-alta-unidades').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false,
    bInfo: false,
	});

	// Inicializa tabla unidades de medida
	var tablaUnidades = $('#tabla-unidades').DataTable({
		searching: false,
		ordering: false,
		pageLength: 10,
		lengthChange: false,
    bInfo: false
	});

	// Inicializa tabla alta proveedores
	var tablaAltaProveedores = $('#tabla-alta-proveedores').DataTable({
		searching: false,
		ordering: false,
		scroller: true,
		scrollY: 250,
    paging: false,
    bInfo: false,
	});

	// Inicializa tabla proveedores
	var tablaProveedores = $('#tabla-proveedores').DataTable({
		searching: false,
		ordering: false,
		pageLength: 10,
		lengthChange: false,
    bInfo: false
	});

	// Al select de categorías y de kilataje le agregamos una clase específica para utilizarlos con ajax
	// const selectCategoria = document.getElementById('id_category');
	// selectCategoria.classList.add('combo-barcode-ajax');
	// const selectKilataje = document.getElementById('id_kilate');
	// selectKilataje.classList.add('combo-barcode-ajax');

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

	// Muestra modal para agregar código de barras
	$('#boton-agregar-codigo').on('click', () => {
		$('#agrega-codigo-modal').modal('show');
	});

	// Redimensiona el encabezado de la tabla alta códigos de barras cuando se muestra el modal
	$('#agrega-codigo-modal').on('shown.bs.modal', function () {
       tablaAltaCodigos.columns.adjust();
       document.getElementById('fila-codigo-categoria-0').focus();
   });

	// Muestra modal para agregar unidad de medida
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
			input.classList.remove('con-contenido-categoria');
		} else {
			input.classList.add('con-contenido-categoria');
		}

	});

	// Guarda categorías
	$('#guardar-categoria').on('click', (event) => {

		event.preventDefault();

		inputsConContenido = document.getElementsByClassName('con-contenido-categoria');

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
					// tablaCategorias.ajax.url('/inventarios/actualiza_tabla_categorias/').load();
					$('#agrega-categoria-modal').modal('hide');
					$('#snackbar').html('');
					$('#snackbar').html(response['mensaje']);
					var x = document.getElementById("snackbar");
			  	x.className = "show";
			  	setTimeout(function(){ 
			  		x.className = x.className.replace("show", "");
			  		window.location.reload(true);
			  	}, 1000);
			  // 	for (var i = 0; i < inputsConContenido.length; i++) {
			  // 		console.log(inputsConContenido[i].value);
			  // 		inputsConContenido[i].value = '';
			  // 		inputsConContenido[i].classList.remove('con-contenido-categoria');
					// }
				}
			},
			error: function(error) {
				console.log(error)
			}
		})

	});

	// Cambiamos la clase de kilatajes cuando se está editando
	$('#tabla-alta-kilatajes tbody').on('keyup', 'tr', function(event) {

		var numFila = tablaAltaKilatajes.row(this).index();
		var numColumna = 0;

		var idFila = 'fila-kilataje-'+numFila;

		var input = document.getElementById(idFila);
		// input.classList.remove('sin-contenido');
		// input.classList.remove('con-contenido');

		var inputContenido = input.value;
		if ( inputContenido == '') {
			input.classList.remove('con-contenido-kilataje');
		} else {
			input.classList.add('con-contenido-kilataje');
		}

	});


	// Guarda kilatajes
	$('#guardar-kilataje').on('click', (event) => {

		event.preventDefault();

		inputsConContenido = document.getElementsByClassName('con-contenido-kilataje');

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
					$('#agrega-kilataje-modal').modal('hide');
					$('#snackbar').html('');
					$('#snackbar').html(response['mensaje']);
					var x = document.getElementById("snackbar");
			  	x.className = "show";
			  	setTimeout(function(){ 
			  		x.className = x.className.replace("show", "");
			  		window.location.reload(true);
			  	}, 1000);
			  // 	for (var i = 0; i < inputsConContenido.length; i++) {
			  // 		console.log(inputsConContenido[i].value);
			  // 		inputsConContenido[i].value = '';
			  // 		inputsConContenido[i].classList.remove('con-contenido-kilataje');
					// }
				}
			},
			error: function(error) {
				console.log(error)
			}
		})

	});

	// Cambiamos la clase de códigos de barras cuando se seleccione una opción
	$('#tabla-alta-codigos tbody').on('change', 'td', function(event) {

		var numFila = tablaAltaCodigos.cell(this).index().row;

		cambia_clase_codigos_modal(numFila);

	});

	// Cambiamos la clase de códigos de barras cuando se está editando
	$('#tabla-alta-codigos tbody').on('keyup', 'tr', function(event) {

		var numFila = tablaAltaCodigos.row(this).index();

		cambia_clase_codigos_modal(numFila);

	});

	// Guarda códigos de barras
	$('#guardar-codigo').on('click', (event) => {

		event.preventDefault();

		inputsConContenido = document.getElementsByClassName('con-contenido-codigo');

		if (inputsConContenido.length <= 0) {
			alert('No ha ingresado datos para códigos de barras');
			return;
		}

		var data = [];
		for (var i = 0; i < inputsConContenido.length; i++) {
			data.push(inputsConContenido[i]);
		}

		formElements = document.getElementById('form-codigo').elements;
		data.push(formElements[0]);

		console.log(data);

		$.ajax({
			url: '/inventarios/alta_codigos/',
			type: 'POST',
			dataType: 'JSON',
			data: data,
			success: function(response) {
				if (response['bandera'] == 0) {
					alert(response['mensaje']);
				} else {
					$('#agrega-codigo-modal').modal('hide');
					$('#snackbar').html('');
					$('#snackbar').html(response['mensaje']);
					var x = document.getElementById("snackbar");
			  	x.className = "show";
			  	setTimeout(function(){ 
			  		x.className = x.className.replace("show", "");
			  		window.location.reload(true);
			  	}, 1000);
			  // 	for (var i = 0; i < inputsConContenido.length; i++) {
			  // 		console.log(inputsConContenido[i].value);
			  // 		inputsConContenido[i].value = '';
			  // 		inputsConContenido[i].classList.remove('con-contenido-codigo');
					// }
				}
			},
			error: function(error) {
				console.log(error)
			}
		});

	});

	// Cambiamos la clase de unidades de medida cuando se está editando
	$('#tabla-alta-unidades tbody').on('keyup', 'tr', function(event) {

		var numFila = tablaAltaUnidades.row(this).index();
		var numColumna = 0;

		var idFila = 'fila-unidad-'+numFila;

		var input = document.getElementById(idFila);

		var inputContenido = input.value;
		if ( inputContenido == '') {
			input.classList.remove('con-contenido-unidad');
		} else {
			input.classList.add('con-contenido-unidad');
		}

	});

	// Guarda unidades
	$('#guardar-unidad').on('click', (event) => {

		event.preventDefault();

		inputsConContenido = document.getElementsByClassName('con-contenido-unidad');

		if (inputsConContenido.length <= 0) {
			alert('No ha ingresado unidades de medida');
			return;
		}

		var data = [];
		for (var i = 0; i < inputsConContenido.length; i++) {
			data.push(inputsConContenido[i]);
		}

		formElements = document.getElementById('form-unidad').elements;
		data.push(formElements[0]);

		$.ajax({
			url: '/inventarios/alta_unidades/',
			type: 'POST',
			dataType: 'JSON',
			data: data,
			success: function(response) {
				if (response['bandera'] == 0) {
					alert(response['mensaje']);
				} else {
					$('#agrega-unidad-modal').modal('hide');
					$('#snackbar').html('');
					$('#snackbar').html(response['mensaje']);
					var x = document.getElementById("snackbar");
			  	x.className = "show";
			  	setTimeout(function(){ 
			  		x.className = x.className.replace("show", "");
			  		window.location.reload(true);
			  	}, 1000);
			  	for (var i = 0; i < inputsConContenido.length; i++) {
			  		console.log(inputsConContenido[i].value);
			  		inputsConContenido[i].value = '';
			  		inputsConContenido[i].classList.remove('con-contenido-unidad');
					}
				}
			},
			error: function(error) {
				console.log(error)
			}
		})

	});

	// Cambiamos la clase de proveedores cuando se está editando
	$('#tabla-alta-proveedores tbody').on('keyup', 'td', function(event) {

		var numFila = tablaAltaProveedores.cell(this).index().row;
		// var numColumna = tablaAltaProveedores.cell(this).index().column;

		var idNombre = 'fila-proveedor-nombre-'+numFila;
		var idTelefono = 'fila-proveedor-telefono-'+numFila;
		var idDireccion = 'fila-proveedor-direccion-'+numFila;

		var inputNombre = document.getElementById(idNombre);
		var inputTelefono = document.getElementById(idTelefono);
		var inputDireccion = document.getElementById(idDireccion);

		var contenidoInputNombre = document.getElementById(idNombre).value;
		var contenidoInputTelefono = document.getElementById(idTelefono).value;
		var contenidoInputDireccion = document.getElementById(idDireccion).value;

		console.log(contenidoInputNombre);
		console.log(contenidoInputTelefono);
		console.log(contenidoInputDireccion);
		if (contenidoInputNombre == '' && contenidoInputTelefono == '' && contenidoInputDireccion == '') {
			inputNombre.classList.remove('con-contenido-proveedor');
			inputTelefono.classList.remove('con-contenido-proveedor');
			inputDireccion.classList.remove('con-contenido-proveedor');
			document.getElementById('guardar-proveedor').disabled = false;
		} else if (contenidoInputNombre == '' || contenidoInputTelefono == '' || contenidoInputDireccion == '') {
			console.log('no entro aki?');
			inputNombre.classList.remove('con-contenido-proveedor');
			inputTelefono.classList.remove('con-contenido-proveedor');
			inputDireccion.classList.remove('con-contenido-proveedor');
			document.getElementById('guardar-proveedor').disabled = true;
		} else {
			inputNombre.classList.add('con-contenido-proveedor');
			inputTelefono.classList.add('con-contenido-proveedor');
			inputDireccion.classList.add('con-contenido-proveedor');
			document.getElementById('guardar-proveedor').disabled = false;
		}

	});

	// Guarda proveedores
	$('#guardar-proveedor').on('click', (event) => {

		event.preventDefault();

		inputsConContenido = document.getElementsByClassName('con-contenido-proveedor');

		if (inputsConContenido.length <= 0) {
			alert('No ha ingresado datos del proveedor');
			return;
		}

		var data = [];
		for (var i = 0; i < inputsConContenido.length; i++) {
			data.push(inputsConContenido[i]);
		}

		formElements = document.getElementById('form-proveedor').elements;
		data.push(formElements[0]);

		console.log(data);

		$.ajax({
			url: '/inventarios/alta_proveedores/',
			type: 'POST',
			dataType: 'JSON',
			data: data,
			success: function(response) {
				if (response['bandera'] == 0) {
					alert(response['mensaje']);
				} else {
					$('#agrega-proveedor-modal').modal('hide');
					$('#snackbar').html('');
					$('#snackbar').html(response['mensaje']);
					var x = document.getElementById("snackbar");
			  	x.className = "show";
			  	setTimeout(function(){ 
			  		x.className = x.className.replace("show", "");
			  		window.location.reload(true);
			  	}, 1000);
			  // 	for (var i = 0; i < inputsConContenido.length; i++) {
			  // 		console.log(inputsConContenido[i].value);
			  // 		inputsConContenido[i].value = '';
			  // 		inputsConContenido[i].classList.remove('con-contenido-proveedor');
					// }
				}
			},
			error: function(error) {
				console.log(error)
			}
		});

	});


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

function cambia_clase_codigos_modal(numFila){
		var idCategoria = 'fila-codigo-categoria-'+numFila;
		var idKilataje = 'fila-codigo-kilataje-'+numFila;
		var idCodigo = 'fila-codigo-'+numFila;

		var selectCategoria = document.getElementById(idCategoria);
		var selectKilataje = document.getElementById(idKilataje);
		var inputCodigo = document.getElementById(idCodigo);

		var contenidoSelectCategoria = document.getElementById(idCategoria).value;
		var contenidoSelectKilataje = document.getElementById(idKilataje).value;
		var contenidoInputCodigo = document.getElementById(idCodigo).value;

		if (contenidoSelectCategoria == '---' && contenidoSelectKilataje == '---' && contenidoInputCodigo == '') {
			selectCategoria.classList.remove('con-contenido-codigo');
			selectKilataje.classList.remove('con-contenido-codigo');
			inputCodigo.classList.remove('con-contenido-codigo');
			document.getElementById('guardar-codigo').disabled = false;
		} else if (contenidoSelectCategoria == '---' || contenidoSelectKilataje == '---' || contenidoInputCodigo == '') {
			selectCategoria.classList.remove('con-contenido-codigo');
			selectKilataje.classList.remove('con-contenido-codigo');
			inputCodigo.classList.remove('con-contenido-codigo');
			document.getElementById('guardar-codigo').disabled = true;
		} else {
			selectCategoria.classList.add('con-contenido-codigo');
			selectKilataje.classList.add('con-contenido-codigo');
			inputCodigo.classList.add('con-contenido-codigo');
			document.getElementById('guardar-codigo').disabled = false;
		}
}