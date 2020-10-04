from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.clientes, name='clientes'),
    # path('clientes/', views.clientes, name='clientes')
]