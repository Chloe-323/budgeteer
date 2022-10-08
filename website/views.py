from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Index not implemented yet")

def about(request):
    return HttpResponse("About not implemented yet")

def budget(request):
    return HttpResponse("Budget not implemented yet")

def login(request):
    return HttpResponse("Login not implemented yet")

def logout(request):
    return HttpResponse("Logout not implemented yet")

def register(request):
    return HttpResponse("Register not implemented yet")

def settings(request):
    return HttpResponse("Settings not implemented yet")

def export(request):
    return HttpResponse("Export not implemented yet")
