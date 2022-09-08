from django.urls import path 
from .views import TheatreView, TheatreDetail 


urlpatterns = [
    path('', TheatreView.as_view()),
    path('<int:pk>', TheatreDetail.as_view())
]