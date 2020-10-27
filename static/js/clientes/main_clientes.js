
$('#tablaClientes').DataTable({
	searching: false,
	lengthChange: false,
  bInfo: false,
  pageLength: 10,
	language: {
  	zeroRecords: 'Sin resultados',
  	search: 'Buscar:',
  	paginate: {
  		next: 'Siguiente',
  		previous: 'Anterior'
  	}
  }
});

// Le agregamos la clase form-control a todos los elementos del form de filtros
const formElements = document.getElementById('alta-cliente-form').elements;
for (var i = 0; i < formElements.length - 2; i++) {
	formElements[i].classList.add('form-control')
}


$(document).ready(function() {

	// Cuando le da click al botón de alta clientes
	// mostramos el modal correspondiente con el formulario
	$('#input-alta-cliente').on('click', () => {
		$('#alta-cliente-modal').modal('show');
	})

	// Al momento de mostrar el modal colocamos el cursor
	// en automático en el primer input del formulario
	$('#alta-cliente-modal').on('shown.bs.modal', function () {
	     document.getElementById('id_first_name').focus();
	 });

	// Función que envía el texto ingresado en el nombre del cliente
	// para convertir la primer letra de cada palabra en mayúscula
	$('#id_first_name').on('keyup', () => {

		var texto = $('#id_first_name').val();

		var texto_convertido = capital_letter(texto);

		$('#id_first_name').val(texto_convertido);

	});

	// Función que envía el texto ingresado en el apellido del cliente
	// para convertir la primer letra de cada palabra en mayúscula
	$('#id_last_name').on('keyup', () => {

		var texto = $('#id_last_name').val();

		var texto_convertido = capital_letter(texto);

		$('#id_last_name').val(texto_convertido);

	});

});

// Función que muestra el modal para editar cliente
const editarClienteModal = (cliente_id) => {

	console.log(cliente_id);

	var cliente_separado = cliente_id.split('-');

	var id = cliente_separado[0];
	var nombre_cliente = cliente_separado[1];
	var apellido_cliente = cliente_separado[2];
	var correo = cliente_separado[3];
	var telefono = cliente_separado[4];

	console.log(id);
	console.log(nombre_cliente);

	$('#input-editar-cliente-nombre').val(nombre_cliente);
	$('#input-editar-cliente-apellido').val(apellido_cliente);
	$('#input-editar-cliente-correo').val(correo);
	$('#input-editar-cliente-telefono').val(telefono);

	$('#form-edita-cliente').attr('action', '/clientes/editar_cliente/'+id+'/');

	$('#editar-cliente-modal').modal('show');

}

// Colocamos el cursor en el input para editar categoría cada que se muestre el modal
$('#editar-cliente-modal').on('shown.bs.modal', function () {

	document.getElementById('input-editar-cliente-nombre').focus();
	
});

// Función que detecta cuando se escribe en el input de nombre del cliente del modo edición.
// Al momento de escribir se llama a la función que convierte
// la primer letra de cada palabra en mayúscula.
$('#input-editar-cliente-nombre').on('keyup', () => {

	var texto = $('#input-editar-cliente-nombre').val();

	var texto_convertido = capital_letter(texto);

	$('#input-editar-cliente-nombre').val(texto_convertido);

});

// Función que detecta cuando se escribe en el input de apellido del cliente del modo edición.
// Al momento de escribir se llama a la función que convierte
// la primer letra de cada palabra en mayúscula.
$('#input-editar-cliente-apellido').on('keyup', () => {

	var texto = $('#input-editar-cliente-apellido').val();

	var texto_convertido = capital_letter(texto);

	$('#input-editar-cliente-apellido').val(texto_convertido);

});

$('#guardar-editar-cliente').on('click', (event) => {

	event.preventDefault();

	$.ajax({
			url: $('#form-edita-cliente').attr('action'),
			type: $('#form-edita-cliente').attr('method'),
			dataType: 'JSON',
			data: $('#form-edita-cliente').serialize(),
			success: function(response) {

				if (response['bandera'] == 0) {
					alert(response['mensaje']);
					return;
				}

				$('#editar-cliente-modal').modal('hide');
				$('#snackbar').html('');
				$('#snackbar').html(response['mensaje']);

				var x = document.getElementById("snackbar");
		  	x.className = "show";

		  	setTimeout(function(){ 
		  		x.className = x.className.replace("show", "");
		  		window.location.reload(true);
		  	}, 1500);

			},
			error: function(error) {
				console.log(error)
			}
		});

});

// Función que muestra el modal para eliminar cliente
const eliminarClienteModal = (cliente_id) => {

	console.log(cliente_id);

	var cliente_separado = cliente_id.split('-');

	var id = cliente_separado[0];
	var nombre_cliente = cliente_separado[1];
	var apellido_cliente = cliente_separado[2];
	var correo = cliente_separado[3];
	var telefono = cliente_separado[3];

	var modalBody = "<p class='h5 text-center'>¿Estás seguro de eliminar <span class='font-weight-bold'>" + nombre_cliente + "</span> permanentemente?</p>"+
									"<p class='h6 text-center'>Esta acción no se puede revertir</p>";

	$('#eliminar-cliente-modal .modal-body').html(modalBody);

	$('#form-eliminar-cliente').attr('action', '/clientes/eliminar_cliente/'+id+'/');

	$('#eliminar-cliente-modal').modal('show');

}

$('#guardar-eliminar-cliente').on('click', (event) => {

	event.preventDefault();

	$.ajax({
			url: $('#form-eliminar-cliente').attr('action'),
			type: $('#form-eliminar-cliente').attr('method'),
			dataType: 'JSON',
			data: $('#form-eliminar-cliente').serialize(),
			success: function(response) {

				$('#eliminar-cliente-modal').modal('hide');
				$('#snackbar').html('');
				$('#snackbar').html(response['mensaje']);

				var x = document.getElementById("snackbar");
		  	x.className = "show";
		  	
		  	setTimeout(function(){ 
		  		x.className = x.className.replace("show", "");
		  		window.location.reload(true);
		  	}, 1500);

			},
			error: function(error) {
				console.log(error)
			}
		});

});

// Función que permite convertir en mayúscula
// la primer letra de cada palabra ingresada.
// Recibe como parámetro la cadena de texto a convertir.
// Regresa la cadena ya convertida.
const capital_letter = (str) => {

  str = str.split(" ");

  for (var i = 0, x = str.length; i < x; i++) {

  	if (str[i] != '') {

      str[i] = str[i][0].toUpperCase() + str[i].substr(1);

  	}
  	
  }

  return str.join(" ");
}
