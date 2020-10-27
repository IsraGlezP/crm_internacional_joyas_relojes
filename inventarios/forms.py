from django.forms import ModelForm

from .models import *

class ProductForm(ModelForm):
	class Meta:
		model = Product
		fields = '__all__'
		# exclude = ['barcode']

class CategoryForm(ModelForm):
	class Meta:
		model = Category
		fields = ['name']

class KilateForm(ModelForm):
	class Meta:
		model = Kilate
		fields = ['name']

class BarcodeForm(ModelForm):
	class Meta:
		model = Barcode
		# fields = ['barcode']
		fields = '__all__'

class UnitMeasurementForm(ModelForm):
	class Meta:
		model = UnitMeasurement
		fields = ['name']

class VendorForm(ModelForm):
	class Meta:
		model = Vendor
		fields = '__all__'