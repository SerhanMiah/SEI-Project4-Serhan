from django.db import models

# Create your models here.
class Attend(models.Model):

    name = models.CharField(max_length=100, default=None, blank=True)

    person_key = models.ForeignKey('jwt_auth.User', on_delete=models.CASCADE, related_name='join', blank=True)
    event_key = models.ForeignKey('venue.Theatre', on_delete=models.CASCADE, related_name='join', blank=True, default=True)
    attended = models.BooleanField(blank=True)

    def __str__(self):
        return "%s - %s" % (self.event_key, self.person_key)

    