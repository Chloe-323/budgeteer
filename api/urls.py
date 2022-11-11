from django.urls import path
from . import views

urlpatterns = [
    path('hello', views.hello, name='hello'),
    path('hello/<str:name>', views.hello, name='hello'),

    path('auth', views.auth, name='auth'),
    path('is_username_available/<str:username>', views.is_username_available, name='is_username_available'),
    path('is_email_available/<str:email>', views.is_email_available, name='is_email_available'),

    path('create_budget', views.create_budget, name='create_budget'),

    path('budget/<int:id>', views.budget, name='budget'),
    path('budget/<int:id>/add_tx', views.budget_add, name='budget_edit'),
    path('budget/<int:id>/export', views.budget_export, name='budget_export'),
]
