from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.clientes, name='clientes'),
    path('editar_cliente/<str:pk>/', views.editar_cliente, name='editar_cliente'),
    path('eliminar_cliente/<str:pk>/', views.eliminar_cliente, name='eliminar_cliente'),
]