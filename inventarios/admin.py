from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Category)
admin.site.register(UnitMeasurement)
admin.site.register(Kilate)
admin.site.register(Vendor)
admin.site.register(Product)

