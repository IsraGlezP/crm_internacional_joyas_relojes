from django.shortcuts import render
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

	contexto = {'products': products, 'gramos_totales': gramos_totales, 'piezas_totales': piezas_totales, 'filtros': filtros}
	return render(request, 'inventarios/inventarios.html', contexto)

def agrega_producto(request):
	form = ProductForm()

	if request.method == 'POST':
		form = ProductForm(request.POST)
		if form.is_valid():
			form.save()
			messages.success(request, 'Producto agregado')

	contexto = {'form': form}
	return render(request, 'inventarios/agrega_producto.html', contexto)