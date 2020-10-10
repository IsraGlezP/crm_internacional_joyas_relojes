from django.db import models

# Create your models here.

class Category(models.Model):
	category_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=50)
	class Meta:
		db_table = 'categories'
		verbose_name = 'categorie'

class UnitMeasurement(models.Model):
	unit_measurement_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=10)
	class Meta:
		db_table = 'units_measurements'
		verbose_name = 'units Measurement'

class Kilate(models.Model):
	kilate_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=5)

class Vendor(models.Model):
	vendor_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=50)
	phone = models.CharField(max_length=15)
	direction = models.CharField(max_length=50)

class Product(models.Model):
	product_id = models.AutoField(primary_key=True)
	category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
	quantity = models.FloatField(null=True)
	unit_measurement_id = models.ForeignKey(UnitMeasurement, on_delete=models.CASCADE)
	kilate_id = models.ForeignKey(Kilate, on_delete=models.CASCADE)
	vendor_id = models.ForeignKey(Vendor, on_delete=models.CASCADE)
	barcode = models.BigIntegerField(null=True)

