from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/venue/', include('venue.urls')),
    path('api/review/', include('review.urls')),
    path('api/categories/', include('categories.urls')),
    path('api/join/', include('join.urls')),
    path('api/auth/', include('jwt_auth.urls'))
]
