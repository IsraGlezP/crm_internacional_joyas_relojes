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
			form.save()
			messages.success(request, 'Producto Agregado')

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




