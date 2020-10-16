window.onload = () => {

	// Le agregamos la clase form-control a todos los elementos del form para agregar nuevo producto
	const formElements = document.getElementById('agrega-producto').elements;
	for (var i = 0; i < formElements.length; i++) {
		formElements[i].classList.add('form-control')
	}

	// Al select de categorías y de kilataje le agregamos una clase específica para utilizarlos con ajax
	const selectCategoria = document.getElementById('id_category');
	selectCategoria.classList.add('combo-barcode-ajax');
	const selectKilataje = document.getElementById('id_kilate');
	selectKilataje.classList.add('combo-barcode-ajax');

	// Función para validar si los dos select de categoría y de kilataje ya tienen valores para poder hacer uso de función ajax
	$('.combo-barcode-ajax').on('change', () => {
		if (selectCategoria.value != '' && selectKilataje.value != '') {
			$.ajax({
				url: '/inventarios/busca_codigo_barras/'+selectCategoria.value+'/'+selectKilataje.value,
				type: 'GET',
				dataType: 'JSON',
				success: function(response) {
					if (response['barcode'] == null) {
						var parrafo = document.createElement('p');
						parrafo.classList.add('h5');
						parrafo.classList.add('text-center');

						var categoria = selectCategoria.options[selectCategoria.selectedIndex].text;
						var kilataje = selectKilataje.options[selectKilataje.selectedIndex].text;
						var node = document.createTextNode('No existe código de barras para '+categoria+' - '+kilataje);

						parrafo.textContent = '';
						parrafo.appendChild(node);

						var elemento = document.getElementById('mensaje-codigo-barras');
						elemento.textContent = '';
						elemento.appendChild(parrafo);

						$('#agregaCodigoModal').modal({
							show: true,
							backdrop: 'static',
    					keyboard: false
						});
						
						return;
					}
					document.getElementById('barcode-input').value = response['barcode'];
				},
				error: function(response) {
					console.log('ALGO TRONO NO PUEDE SER:')
					console.log(response)
				}
			});
		}

	});

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