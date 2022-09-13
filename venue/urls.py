from django.urls import path 
from .views import TheatreView, TheatreDetail, LikesView


urlpatterns = [
    path('', TheatreView.as_view()),
    path('<int:pk>/', TheatreDetail.as_view()),
    path('venue_theatre_likes/', LikesView.as_view())
    # path('favourites/', FavouritesView.as_view(), name='product_favourite_list')
]

