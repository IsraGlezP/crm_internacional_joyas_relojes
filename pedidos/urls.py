from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.pedidos, name='pedidos'),
    # path('pedidos/', views.pedidos, name='pedidos')
]