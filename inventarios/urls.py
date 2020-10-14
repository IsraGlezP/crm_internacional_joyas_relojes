from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.inventarios, name='inventarios'),
    path('agrega_producto/', views.agrega_producto, name='agrega_producto'),
    path('actualiza_producto/<str:pk>/', views.actualiza_producto, name='actualiza_producto'),
    path('elimina_producto/<str:pk>/', views.elimina_producto, name='elimina_producto')
]