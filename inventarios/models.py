from django.db import models

# Create your models here.

class Category(models.Model):
	category_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=50)

	class Meta:
		db_table = 'categories'
		verbose_name_plural = 'categories'

	def __str__(self):
		return self.name

class UnitMeasurement(models.Model):
	unit_measurement_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=10)

	class Meta:
		db_table = 'units_measurements'
		verbose_name = 'unit Measurement'
		verbose_name_plural = 'units Measurements'

	def __str__(self):
		return self.name

class Kilate(models.Model):
	kilate_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=5)

	def __str__(self):
		return self.name

class Vendor(models.Model):
	vendor_id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=50)
	phone = models.CharField(max_length=15)
	address = models.CharField(max_length=50)

	def __str__(self):
		return self.name

class Barcode(models.Model):
	barcode_id = models.AutoField(primary_key=True)
	barcode = models.IntegerField()
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	kilate = models.ForeignKey(Kilate, on_delete=models.CASCADE)

	def __str__(self):
		category_kilate_barcode = self.category.name + '_' + self.kilate.name + '_' + str(self.barcode)
		str_barcode = str(self.barcode)
		return str_barcode

class Product(models.Model):
	product_id = models.AutoField(primary_key=True)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	kilate = models.ForeignKey(Kilate, on_delete=models.CASCADE)
	barcode = models.ForeignKey(Barcode, on_delete=models.CASCADE, null=True)
	quantity = models.FloatField(null=True)
	unit_measurement = models.ForeignKey(UnitMeasurement, on_delete=models.CASCADE)
	vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, null=True)

	def __str__(self):
		category_kilate = self.category.name + '_' + self.kilate.name
		return category_kilate

