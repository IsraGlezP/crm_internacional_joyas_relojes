
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
