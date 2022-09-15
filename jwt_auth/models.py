from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    email = models.CharField(max_length=100, unique=True)
    profile_image = models.CharField(max_length=500, blank=True)
    bio = models.TextField(max_length=500, default=True, blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)


    