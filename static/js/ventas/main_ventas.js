
// Convertimos a un datatable la tabla de ventas
const tablaVentas = $('#tabla-ventas').DataTable({
	searching: false,
	ordering: false,
	scroller: true,
	scrollY: 250,
  paging: false,
  bInfo: false,
});

// Recuperamos los códigos de barras,
// las categorías y los kilatajes
const codigos = document.getElementById('codigos').value.split(',');
const categorias = document.getElementById('categorias').value.split(',');
const kilatajes = document.getElementById('kilatajes').value.split(',');

// Quitamos el primer elemento
// de cada array ya que siempre
// viene vacío
codigos.shift();
categorias.shift();
kilatajes.shift();

console.log(codigos);
console.log(categorias);
console.log(kilatajes);

// Get the input field
const barcode_input = document.getElementById("barcode-input");

var indice = 1;

// Execute a function when the user releases a key on the keyboard
barcode_input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    // event.preventDefault();

    var codigo_ingresado = barcode_input.value;

    var indice_encontrado = codigos.indexOf(codigo_ingresado);

    console.log('codigo ingresado: ' + codigo_ingresado);

    console.log('indice encontrado: ' + indice_encontrado);

    // Con el índice encontrado buscamos su categoría y su kilataje
    var categoria_encontrada = categorias[indice_encontrado];
    var kilataje_encontrado = kilatajes[indice_encontrado];

    console.log('categoria encontrada: ' + categoria_encontrada);
    console.log('kilataje encontrado: ' + kilataje_encontrado);

    tablaVentas.row.add([
    	categoria_encontrada,
    	kilataje_encontrado,
    	"<input type='text' placeholder='Ingrese una descripción del producto...' class='form-control' id='"+indice+"-desc'>",
    	"<input type='number' class='form-control' id='"+indice+"-precio' onkeyup='calculaTotal(this.id)' value='0'>",
    	"<input type='number' class='form-control' id='"+indice+"-cantidad' onkeyup='calculaTotal(this.id)' value='0'>",
    	"<input type='number' class='form-control' disabled id='"+indice+"-total' value='0.00'>",
    	"<input type='button' class='form-control eliminar btn btn-outline-danger' value='Eliminar'>"
    	]).draw();

    indice++;
  }
});

// Cuando se le de click al botón eliminar
// vamos a eliminar la fila seleccionada
$('#tabla-ventas tbody').on( 'click', 'input.eliminar', function () {
	
	tablaVentas
  .row( $(this).parents('tr') )
  .remove()
  .draw();

  indice--;

   // Con base en el indice podemos saber cuantas filas tiene actualmente la tabla
	for (var i = 1; i < indice; i++) {
		id_total = i+'-total';
		id_cantidad = i+'-cantidad';

		valor_total_pesos = document.getElementById(id_total).value;
		valor_total_piezas = document.getElementById(id_cantidad).value;

		suma_total_pesos += parseInt(valor_total_pesos);
		suma_total_piezas += parseInt(valor_total_piezas);

	}

  console.log('suma total pesos: ' + suma_total_pesos);
  console.log('suma total piezas: ' + suma_total_piezas);

  // Colocamos la suma total en las tarjetas correspondientes
  document.getElementById('total-piezas').innerHTML = suma_total_piezas;
  document.getElementById('total-pesos').innerHTML = '$'+suma_total_pesos.toFixed(2);

});

// Función que calcula el total
// y lo coloca en el input correspondiente
const calculaTotal = (id) => {

	// Recuperamos el número de fila
	var id_separado = id.split('-')

	var numero_fila = id_separado[0];

	var id_precio = numero_fila+'-precio';
	var id_cantidad = numero_fila+'-cantidad';

	// Recuperamos los valores ingresados tanto en precio unitario como en cantidad
	var precio_unitario = document.getElementById(id_precio).value;
	var cantidad = document.getElementById(id_cantidad).value;

	if (isNaN(precio_unitario) || isNaN(cantidad)) {
		return;
	}

	// Si los dos parámetros son válidos pasamos a calcular el total
	var total = precio_unitario * cantidad;

	var id_total = numero_fila+'-total';

	// Colocamos el total en el input correspondiente
	document.getElementById(id_total).value = total.toFixed(2);

	var suma_total_pesos = 0;
	var suma_total_piezas = 0;

	// Con base en el indice podemos saber cuantas filas tiene actualmente la tabla
	for (var i = 1; i < indice; i++) {
		id_total = i+'-total';
		id_cantidad = i+'-cantidad';

		valor_total_pesos = document.getElementById(id_total).value;
		valor_total_piezas = document.getElementById(id_cantidad).value;

		suma_total_pesos += parseInt(valor_total_pesos);
		suma_total_piezas += parseInt(valor_total_piezas);

	}

  console.log('suma total pesos: ' + suma_total_pesos);
  console.log('suma total piezas: ' + suma_total_piezas);

  // Colocamos la suma total en las tarjetas correspondientes
  document.getElementById('total-piezas').innerHTML = suma_total_piezas;
  document.getElementById('total-pesos').innerHTML = '$'+suma_total_pesos.toFixed(2);

}