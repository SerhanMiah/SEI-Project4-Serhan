from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Theatre(models.Model):
    # add age groups in the main model.

    name = models.CharField(max_length=150, default=None, blank=True, null=True)
    description = models.TextField(max_length=500, blank=True, null=True)
    location = models.CharField(max_length=200, default=None, blank=True, null=True)
    price = models.PositiveIntegerField(default=None, blank=True, null=True)
    images = ArrayField(models.TextField(max_length=600, default=True))

    genres = models.ManyToManyField(
        "categories.Category", 
        related_name="venue"
    )

    likes = models.ManyToManyField('jwt_auth.User', blank=True,related_name='location_like')

    dislikes = models.ManyToManyField('jwt_auth.User', blank=True,related_name='location_dislike')


    # likes = models.ManyToManyField(User, related_name="review")

    def __str__(self):
        return f"{self.name}"

    def likes_total(self):
        return self.likes.count()





