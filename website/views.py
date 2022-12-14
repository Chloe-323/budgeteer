from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
import hashlib
import datetime
from django.db import models
from .models import *
from django.contrib.auth.models import User

# Create your views here.
def index(request):
    #if not logged in, redirect to login page
    if 'session_id' not in request.session:
        return redirect('login')
    #if session is expired, redirect to login page
    if (datetime.datetime.now().timestamp() - request.session['create_time']) > 3600:
        return redirect('login')
    #ensure that session_id is valid
    user = User.objects.get(username=request.session['username'])
    if request.session['session_id'] != hashlib.sha256(str(user.id).encode('utf-8')).hexdigest():
        return redirect('login')
    #update session time
    request.session['create_time'] = datetime.datetime.now().timestamp()
    #render page
    template = loader.get_template('website/index.html')
    context = {'title': 'Home'}
    return HttpResponse(template.render(context, request))

    return HttpResponse("Index not implemented yet")

def about(request):
    return HttpResponse("About not implemented yet")

def budget(request):
    return HttpResponse("Budget not implemented yet")

def login(request):
    if request.method == 'POST':
        #verify all fields are valid
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            request.session['session_id'] = hashlib.sha256(str(user.id).encode('utf-8')).hexdigest() #TODO: make this more secure
            request.session['create_time'] = datetime.datetime.now().timestamp()
            request.session['username'] = username
            return redirect('index')
    template = loader.get_template('website/login.html')
    context = {}
    return HttpResponse(template.render(context, request))

def logout(request):
    request.session.flush()
    return redirect('login')

def register(request):
    if request.method == 'POST':
        #verify all fields are valid
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        if User.objects.filter(username=username).exists():
            return HttpResponse("Username already exists")
        if User.objects.filter(email=email).exists():
            return HttpResponse("Email already exists")
        if len(password) < 8:
            return HttpResponse("Password must be at least 8 characters")
        user = User.objects.create_user(username, email, password)
        user.save()
        return redirect('login')
    template = loader.get_template('website/register.html')
    context = {}
    return HttpResponse(template.render(context, request))
    return HttpResponse("Register not implemented yet")

def settings(request):
    return HttpResponse("Settings not implemented yet")

def export(request):
    return HttpResponse("Export not implemented yet")
