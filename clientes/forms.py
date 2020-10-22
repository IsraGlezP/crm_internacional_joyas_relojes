from django.forms import ModelForm

from .models import *

class ClientForm(ModelForm):
	class Meta:
		model = Client
		fields = '__all__'
		labels = {
        "first_name": "Nombre",
        "last_name": "Apellido",
        "email": "Correo",
        "phone": "Teléfono",
    }