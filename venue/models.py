from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Theatre(models.Model):
    # add age groups in the main model.

    name = models.CharField(max_length=150, default=None, blank=True, null=True)
    description = models.TextField(max_length=500, blank=True, null=True)
    location = models.CharField(max_length=200, default=None, blank=True, null=True)
    price = models.PositiveIntegerField(default=None, blank=True, null=True)
    images = ArrayField(models.TextField(max_length=600, default=True))


    catergory = models.ManyToManyField(
        "categories.Category", 
        related_name="venue"
    )


    # favourites = models.ManyToManyField(User, elated_name='favourites', blank=True)



    def __str__(self):
        return f"{self.name}"

# class TheatreWishList(models.Model):
#     ## this can be depend on your choice eg (user_id, guest_id etc)
#     user_id = models.IntegerField(('user_id'))
#     ## relation to Music
#     plays = models.ForeignKey(Theatre, on_delete=models.DO_NOTHING)


