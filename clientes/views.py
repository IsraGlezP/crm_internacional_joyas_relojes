from django.shortcuts import render
from django.http import HttpResponse
from django.contrib import messages
from django.http import JsonResponse

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

def editar_cliente(request, pk):

	cliente = Client.objects.get(client_id=pk)

	if request.method == 'POST':

		form = ClientForm(request.POST, instance=cliente)

		if form.is_valid():

			try:
				cliente_encontrado = Client.objects.get(
					first_name__iexact=request.POST['first_name'],
					last_name__iexact=request.POST['last_name'],
					email=request.POST['email'],
					phone=request.POST['phone'])
				mensaje = 'El cliente '+cliente_encontrado.first_name+' ya existe, favor de ingresar un cliente distinto'
				bandera = 0
				response = JsonResponse({'mensaje': mensaje, 'bandera': bandera})
			except Client.DoesNotExist:
				form.save()
				mensaje = 'Cliente actualizado'
				bandera = 1
				response = JsonResponse({'mensaje': mensaje, 'bandera': bandera})

			return response

	response = JsonResponse({'mensaje': 'Algo salió mal no puede ser'})
	return response

def eliminar_cliente(request, pk):

	cliente = Client.objects.get(client_id=pk)

	if request.method == 'POST':

		cliente.delete()

		response = JsonResponse({'mensaje': 'Cliente eliminado'})
		return response



