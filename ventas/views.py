from django.shortcuts import render
from django.http import HttpResponse

from inventarios.models import Barcode

# Create your views here.
def ventas(request):

	codigos_totales = Barcode.objects.all()

	codigos = ''
	categorias = ''
	kilatajes = ''
	for codigo in codigos_totales:
		codigos = codigos+','+str(codigo.barcode)
		categorias = categorias+','+str(codigo.category)
		kilatajes = kilatajes+','+str(codigo.kilate)

	print('CATEGORIAS: ', categorias)
	print('KILATAJES: ', kilatajes)
	print('CODIGOS: ', codigos)

	contexto = {'codigos': codigos, 'categorias': categorias, 'kilatajes': kilatajes}

	return render(request, 'ventas/ventas.html', contexto)