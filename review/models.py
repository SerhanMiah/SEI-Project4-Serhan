from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound


# Create your models here.
class Review(models.Model): 
    text = models.TextField(max_length=300) 
    created_at = models.DateTimeField(auto_now_add=True) 
    theatre = models.ForeignKey(
        "venue.Theatre", 
        related_name="review",
        on_delete = models.CASCADE 
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name="review",
        on_delete = models.CASCADE
    )







