from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.db.models import Sum
from django.contrib import messages
from django.http import JsonResponse

from .models import *
from .filters import ProductFilter
from .forms import *

# Create your views here.
def inventarios(request):
	products = Product.objects.all()

	filtros = ProductFilter(request.GET, queryset=products)
	products = filtros.qs
	
	gramos_totales = products.filter(unit_measurement__name='Gramos').aggregate(resultado_suma=Sum('quantity'))
	if gramos_totales['resultado_suma'] == None:
		gramos_totales['resultado_suma'] = 0
	gramos_totales['resultado_suma'] = round(gramos_totales['resultado_suma'], 2)

	piezas_totales = products.filter(unit_measurement__name='Piezas').aggregate(resultado_suma=Sum('quantity'))
	if piezas_totales['resultado_suma'] == None:
		piezas_totales['resultado_suma'] = 0
	piezas_totales['resultado_suma'] = round(piezas_totales['resultado_suma'])

	contexto = {'products': products, 'gramos_totales': gramos_totales, 'piezas_totales': piezas_totales, 'filtros': filtros}
	return render(request, 'inventarios/inventarios.html', contexto)

def agrega_producto(request):
	form = ProductForm()

	if request.method == 'POST':
		form = ProductForm(request.POST)
		if form.is_valid():
			id_categoria = request.POST['category']
			nombre_categoria = Category.objects.get(category_id=id_categoria)
			cantidad = request.POST['quantity']
			id_unidad_medida = request.POST['unit_measurement']
			unidad_medida = UnitMeasurement.objects.get(unit_measurement_id=id_unidad_medida)
			id_kilataje = request.POST['kilate']
			kilataje = Kilate.objects.get(kilate_id=id_kilataje)
			id_proveedor = request.POST['vendor']
			proveedor = Vendor.objects.get(vendor_id=id_proveedor)
			codigo_barras = request.POST['barcode']

			producto, creado = Product.objects.update_or_create(
				category=id_categoria, 
				unit_measurement=id_unidad_medida, 
				kilate=id_kilataje, 
				vendor=id_proveedor,
				defaults = {
					'category': nombre_categoria,
					'quantity': cantidad,
					'unit_measurement': unidad_medida,
					'kilate': kilataje,
					'vendor': proveedor, 
					'barcode': codigo_barras
				}
			)

			if creado:
				messages.success(request, 'Producto Agregado')
			else:
				messages.success(request, 'Producto Actualizado')

	contexto = {'form': form}
	return render(request, 'inventarios/producto_form.html', contexto)

def actualiza_producto(request, pk):
	producto = Product.objects.get(product_id=pk)
	form = ProductForm(instance=producto)

	if request.method == 'POST':
		form = ProductForm(request.POST, instance=producto)
		if form.is_valid():
			form.save()
			return redirect('inventarios')

	contexto = {'form': form}
	return render(request, 'inventarios/producto_form.html', contexto)

def elimina_producto(request, pk):
	print('llave: ', pk)
	producto = Product.objects.get(product_id=pk)
	print('producto: ', producto)
	if request.method == 'GET':
		producto.delete()
		messages.success(request, 'Producto Eliminado')
		return redirect('inventarios')

def busca_codigo_barras(request, category, kilate):
	if request.method == 'GET':
		id_categoria = category
		id_kilataje = kilate

		try:
			codigo_barras = Barcode.objects.get(
				category=id_categoria,
				kilate=id_kilataje
			)
			print('codigo barras: ', codigo_barras)
			data = {'barcode': codigo_barras.barcode}
		except Barcode.DoesNotExist:
			data = {'barcode': None}
		
		return JsonResponse(data)

def administrar_catalogos(request):
	categorias = Category.objects.all()
	kilatajes = Kilate.objects.all()
	unidades = UnitMeasurement.objects.all()
	proveedores = Vendor.objects.all()
	codigos = Barcode.objects.all()
	product_form = ProductForm()
	cantidad_filas = range(10)
	cantidad_columnas = range(6)
	contexto = {
		'cantidad_filas': cantidad_filas, 
		'cantidad_columnas': cantidad_columnas, 
		'product_form': product_form, 
		'categorias': categorias,
		'kilatajes': kilatajes,
		'unidades': unidades,
		'proveedores': proveedores,
		'codigos': codigos}
	return render(request, 'inventarios/administrar_catalogos.html', contexto)

def alta_categorias(request):
	if request.is_ajax():
		form = request.POST

		categorias = []
		for key in request.POST:
			if key == 'name':
				valuelist = request.POST.getlist(key)
				categorias.extend(['%s' % (val) for val in valuelist])

		ninguna_categoria_encontrada = 0
		categorias_para_agregar = []
		for categoria in categorias:
			try:
				categoria_encontrada = Category.objects.get(name__iexact=categoria)
				mensaje = {'mensaje': 'La categoría '+categoria_encontrada.name+' ya existe, favor de omitirla', 'bandera': 0}
				response = JsonResponse(mensaje)
				categorias_para_agregar = []
				return response
			except Category.DoesNotExist:
				ninguna_categoria_encontrada = 1
				categoria_nueva = Category(name=categoria)
				categorias_para_agregar.append(categoria_nueva)

		if ninguna_categoria_encontrada == 1:
			Category.objects.bulk_create(categorias_para_agregar)
			mensaje = {'mensaje': 'Categorias agregadas exitosamente', 'bandera': 1}
			response = JsonResponse(mensaje)
			return response

		response = JsonResponse({'mensaje': 'Algo tronó no puede ser'})
		return response

def alta_kilatajes(request):
	if request.is_ajax():
		form = request.POST

	kilatajes = []
	for key in request.POST:
		if key == 'name':
			valuelist = request.POST.getlist(key)
			kilatajes.extend(['%s' % (val) for val in valuelist])

	ningun_kilataje_encontrado = 0
	kilatajes_para_agregar = []
	for kilataje in kilatajes:
		try:
			kilataje_encontrado = Kilate.objects.get(name__iexact=kilataje)
			mensaje = {'mensaje': 'El kilataje '+kilataje_encontrado.name+' ya existe, favor de omitirlo', 'bandera': 0}
			response = JsonResponse(mensaje)
			kilatajes_para_agregar = []
			return response
		except Kilate.DoesNotExist:
			ningun_kilataje_encontrado = 1
			kilataje_nuevo = Kilate(name=kilataje)
			kilatajes_para_agregar.append(kilataje_nuevo)

	if ningun_kilataje_encontrado == 1:
		Kilate.objects.bulk_create(kilatajes_para_agregar)
		mensaje = {'mensaje': 'Kilatajes agregados exitosamente', 'bandera': 1}
		response = JsonResponse(mensaje)
		return response

	response = JsonResponse({'mensaje': 'Algo tronó no puede ser'})
	return response

def alta_unidades(request):
	if request.is_ajax():
		form = request.POST

	unidades = []
	for key in request.POST:
		if key == 'name':
			valuelist = request.POST.getlist(key)
			unidades.extend(['%s' % (val) for val in valuelist])

	ninguna_unidad_encontrada = 0
	unidades_para_agregar = []
	for unidad in unidades:
		try:
			unidad_encontrada = UnitMeasurement.objects.get(name__iexact=unidad)
			mensaje = {'mensaje': 'La unidad de medida '+unidad_encontrada.name+' ya existe, favor de omitirla', 'bandera': 0}
			response = JsonResponse(mensaje)
			unidades_para_agregar = []
			return response
		except UnitMeasurement.DoesNotExist:
			ninguna_unidad_encontrada = 1
			unidad_nueva = UnitMeasurement(name=unidad)
			unidades_para_agregar.append(unidad_nueva)

	if ninguna_unidad_encontrada == 1:
		UnitMeasurement.objects.bulk_create(unidades_para_agregar)
		mensaje = {'mensaje': 'Unidades de medida agregadas exitosamente', 'bandera': 1}
		response = JsonResponse(mensaje)
		return response

	response = JsonResponse({'mensaje': 'Algo tronó no puede ser'})
	return response

def alta_proveedores(request):
	if request.is_ajax():
		form = request.POST

	nombres = []
	telefonos = []
	direcciones = []
	for key in request.POST:
		if key == 'name':
			valuelist = request.POST.getlist(key)
			nombres.extend(['%s' % (val) for val in valuelist])
		elif key == 'phone':
			valuelist = request.POST.getlist(key)
			telefonos.extend(['%s' % (val) for val in valuelist])
		elif key == 'address':
			valuelist = request.POST.getlist(key)
			direcciones.extend(['%s' % (val) for val in valuelist])

	ningun_proveedor_encontrado = 0
	proveedores_para_agregar = []
	indice = 0
	for nombre in nombres:
		print('NOMBRE: ', nombre)
		print('TELEFONO: ', telefonos[indice])
		print('DIRECCION: ', direcciones[indice])
		try:
			proveedor_encontrado = Vendor.objects.get(name__iexact=nombre)
			mensaje = {'mensaje': 'El proveedor '+proveedor_encontrado.name+' ya existe, favor de omitirlo', 'bandera': 0}
			response = JsonResponse(mensaje)
			proveedores_para_agregar = []
			return response
		except Vendor.DoesNotExist:
			ningun_proveedor_encontrado = 1
			proveedor_nuevo = Vendor(name=nombre, phone=telefonos[indice], address=direcciones[indice])
			proveedores_para_agregar.append(proveedor_nuevo)
		indice += 1

	if ningun_proveedor_encontrado == 1:
		Vendor.objects.bulk_create(proveedores_para_agregar)
		mensaje = {'mensaje': 'Proveedores agregados exitosamente', 'bandera': 1}
		response = JsonResponse(mensaje)
		return response

	response = JsonResponse({'mensaje': 'Algo tronó no puede ser'})
	return response

def alta_codigos(request):
	if request.is_ajax():
		form = request.POST

	categorias = []
	kilatajes = []
	codigos = []
	for key in request.POST:
		if key == 'category':
			valuelist = request.POST.getlist(key)
			categorias.extend(['%s' % (val) for val in valuelist])
		elif key == 'kilate':
			valuelist = request.POST.getlist(key)
			kilatajes.extend(['%s' % (val) for val in valuelist])
		elif key == 'barcode':
			valuelist = request.POST.getlist(key)
			codigos.extend(['%s' % (val) for val in valuelist])

	ningun_codigo_encontrado = 0
	codigos_para_agregar = []
	indice = 0
	for codigo in codigos:
		# print('CATEGORIA: ', categorias[indice])
		# print('KILATAJE: ', kilatajes[indice])
		# print('CÓDIGO: ', codigo)
		try:
			codigo_encontrado = Barcode.objects.get(category=categorias[indice], kilate=kilatajes[indice])
			# print('KE ENCONTRÓ: ', codigo_encontrado)
			mensaje = {
			'mensaje': 'Ya existe código de barras para '
			+str(codigo_encontrado.category)+' - '
			+str(codigo_encontrado.kilate)+
			', favor de omitirlo', 'bandera': 0}
			response = JsonResponse(mensaje)
			codigos_para_agregar = []
			return response
		except Barcode.DoesNotExist as e:
			try:
				codigo_encontrado = Barcode.objects.get(category=categorias[indice],  kilate=kilatajes[indice], barcode=codigo)
				mensaje = {'mensaje': 'El código de barras '+str(codigo_encontrado.barcode)+' ya existe, favor de omitirlo', 'bandera': 0}
				response = JsonResponse(mensaje)
				codigos_para_agregar = []
				return response
			except Barcode.DoesNotExist:
				ningun_codigo_encontrado = 1
				nombre_categoria = Category.objects.get(category_id=categorias[indice])
				nombre_kilataje = Kilate.objects.get(kilate_id=kilatajes[indice])
				codigo_nuevo = Barcode(category=nombre_categoria, kilate=nombre_kilataje, barcode=codigo)
				codigos_para_agregar.append(codigo_nuevo)
		indice += 1

	if ningun_codigo_encontrado == 1:
		Barcode.objects.bulk_create(codigos_para_agregar)
		mensaje = {'mensaje': 'Códigos de Barras agregados exitosamente', 'bandera': 1}
		response = JsonResponse(mensaje)
		return response

	response = JsonResponse({'mensaje': 'Algo tronó no puede ser'})
	return response






