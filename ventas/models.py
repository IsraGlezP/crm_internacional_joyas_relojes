from django.db import models

from clientes.models import Client
from inventarios.models import Product
from django.contrib.auth.models import User

# Create your models here.

class PaymentMethod(models.Model):
	payment_method_id = models.AutoField(primary_key=True)
	method = models.CharField(max_length=30)
	class Meta: 
		db_table = 'payment_methods'
		verbose_name = 'payment Method'

class Sale(models.Model):
	ticket_id = models.IntegerField(null=True)
	client_id = models.ForeignKey(Client, on_delete=models.CASCADE)
	product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
	product_description = models.CharField(max_length=50)
	unit_price = models.FloatField(null=True)
	quantity = models.FloatField(null=True)
	total_price = models.FloatField(null=True)
	sale_date = models.DateTimeField(auto_now_add=True)
	payment_method_id = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
	user_id = models.ForeignKey(User, on_delete=models.CASCADE)

