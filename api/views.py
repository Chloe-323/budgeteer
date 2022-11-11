from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.db import models
from .models import *
from django.contrib.auth.models import User
from .budget import *

import datetime
import json

# Create your views here.
def hello(request, name = 'World'):
    return HttpResponse(f"Hello {name}!")

def auth(request):
    return HttpResponse("Auth")

def is_username_available(request, username):
    if User.objects.filter(username=username).exists():
        return HttpResponse("false")
    return HttpResponse("true")

def is_email_available(request, email):
    if User.objects.filter(email=email).exists():
        return HttpResponse("false")
    return HttpResponse("true")

def create_budget(request):
    if request.method == 'POST':
        name = request.POST['name']
        start_amount = request.POST['start_amount']
        start_date = request.POST['start_date'] if 'start_date' in request.POST else budget.calculate_start_date()
        end_date = request.POST['end_date'] if 'end_date' in request.POST else budget.calculate_end_date()
        budget = Budget(name, start_amount, start_date, end_date)
        budget.save()
        return HttpResponse(json.dumps(budget.id))
    return HttpResponse("Create budget")

def budget(request, id):
    return HttpResponse(f"Budget {id}")

def budget_add(request, id):
    return HttpResponse(f"Budget {id} add")

def budget_export(request, id):
    return HttpResponse(f"Budget {id} export")

