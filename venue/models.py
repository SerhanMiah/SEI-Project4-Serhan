from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Theatre(models.Model):
    # add age groups in the main model.
    name = models.CharField('Title', max_length=140, default=None)
    location = models.CharField('location', max_length=150, default=None)
    description = models.TextField(default=None)

    venue = models.CharField('Venue', max_length=100, default=None)

    cast = models.TextField(default=None)

    opening_date = models.CharField('Opening date', max_length=100, default=None)

    registration_limit = models.IntegerField('Guest limit', default=0,
    choices=[(0, u"No limit")] + list(zip(range(1,100), range(1,100))))
    # images in array format
    images = ArrayField(models.TextField(max_length=600, default=True))

    trailer = models.CharField(max_length=300, default=None)

    genres = models.ManyToManyField(
        "categories.Category", 
        related_name="venue"
    )

    attend = models.ManyToManyField(
        "join.Attend",
        related_name="venue",
        blank=True
    )

    # fav likes
    favourites = models.ManyToManyField('jwt_auth.User', related_name='favourites', blank=True)

    # like
    likes = models.ManyToManyField('jwt_auth.User', blank=True,related_name='theater_like')

    dislikes = models.ManyToManyField('jwt_auth.User', blank=True,related_name='theater_dislike')

    
    

    # likes = models.ManyToManyField(User, related_name="review")

    def __str__(self):
        return f"{self.name}"

    def likes_total(self):
        return self.likes.count()





