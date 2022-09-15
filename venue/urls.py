from django.urls import path 
from .views import TheatreView, TheatreDetail, LikesView, FavouriteList, FavouriteDetailList


urlpatterns = [
    path('', TheatreView.as_view()),
    path('<int:pk>/', TheatreDetail.as_view()),
    path('favourites/', FavouriteList.as_view()),
    path('favourites/<int:pk>/', FavouriteDetailList.as_view()),
    # path('favourites/', FavouritesView.as_view(), name='product_favourite_list')
]

