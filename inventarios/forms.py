from django.forms import ModelForm

from .models import Product, Category

class ProductForm(ModelForm):
	class Meta:
		model = Product
		fields = '__all__'
		exclude = ['barcode']

# class CategoryForm(ModelForm):
# 	class Meta:
# 		model = Category
# 		fields = ['name']
# 		labels = {
# 			'name': 'Nombre Categoría'
# 		}