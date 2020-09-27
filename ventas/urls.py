from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.ventas),
    path('ventas/', views.ventas, name='ventas')
]