from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def inventarios(request):
	return HttpResponse('INVENTARIOS')