from django.contrib import admin
from django.urls import path, include
from django.contrib import admin
from django.urls import path, include, re_path # <-- added this new import re_path
from .views import index # <-- also new

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/venue/', include('venue.urls')),
    path('api/review/', include('review.urls')),
    path('api/categories/', include('categories.urls')),
    path('api/join/', include('join.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    re_path(r'^.*$', index) # <-- have this come last using re path.
]

