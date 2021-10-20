from django.urls import path 
from . import views

app_name = 'ecomm'


urlpatterns = [
    path('', views.home, name='home'),
]