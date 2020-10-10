from django.contrib import admin

from .models import PaymentMethod, Sale

# Register your models here.

admin.site.register(PaymentMethod)
admin.site.register(Sale)
