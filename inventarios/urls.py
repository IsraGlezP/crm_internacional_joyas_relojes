from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.inventarios, name='inventarios'),
    path('agrega_producto/', views.agrega_producto, name='agrega_producto'),
    path('actualiza_producto/<str:pk>/', views.actualiza_producto, name='actualiza_producto'),
    path('elimina_producto/<str:pk>/', views.elimina_producto, name='elimina_producto'),
    path('busca_codigo_barras/<str:category>/<str:kilate>/', views.busca_codigo_barras, name='busca_codigo_barras'),
    path('administrar_catalogos/', views.administrar_catalogos, name='administrar_catalogos'),
    path('alta_categorias/', views.alta_categorias, name='alta_categorias'),
    path('alta_kilatajes/', views.alta_kilatajes, name='alta_kilatajes'),
    path('alta_unidades/', views.alta_unidades, name='alta_unidades'),
    path('alta_proveedores/', views.alta_proveedores, name='alta_proveedores'),
    path('alta_codigos/', views.alta_codigos, name='alta_codigos')
]