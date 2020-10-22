from django.shortcuts import render
from django.http import HttpResponse

from .models import *
from .forms import *

# Create your views here.
def clientes(request):
	form = ClientForm()
	clientes = Client.objects.all()
	clientes_totales = Client.objects.count()
	contexto = {
		'form': form, 
		'clientes': clientes, 
		'clientes_totales': clientes_totales}

	if request.method == 'POST':
		form = ClientForm(request.POST)
		if form.is_valid():
			nombre = request.POST['first_name']
			apellido = request.POST['last_name']
			email = request.POST['email']
			phone = request.POST['phone']

			cliente, creado = Client.objects.update_or_create(
				first_name=nombre, 
				last_name=apellido, 
				email=email, 
				phone=phone,
				defaults = {
					'first_name': nombre,
					'last_name': apellido,
					'email': email,
					'phone': phone
				}
			)

	return render(request, 'clientes/clientes.html', contexto)