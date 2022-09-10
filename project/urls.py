from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('venue/', include('venue.urls')),
    path('review/', include('review.urls')),
    path('categories/', include('categories.urls')),
    path('join/', include('join.urls')),
    path('auth/', include('jwt_auth.urls'))
]
