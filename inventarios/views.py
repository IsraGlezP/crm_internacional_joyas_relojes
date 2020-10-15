from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.db.models import Sum
from django.contrib import messages

from .models import *
from .filters import ProductFilter
from .forms import ProductForm

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




