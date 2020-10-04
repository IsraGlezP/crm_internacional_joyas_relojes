from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [
    path('', views.inventarios, name='inventarios'),
    # path('inventarios/', views.inventarios, name='inventarios')
]