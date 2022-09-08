from django.db import models

# Create your models here.
class FavouritePlay(models.Model):

    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    faviourite = models.ForeignKey(
      "venue.Theatre",
      related_name="favourites",
      on_delete=models.CASCADE
    )