from django.db import models

# Create your models here.
class Category(models.Model):
  MY_CHOICES = (
        ('a', 'Comedy'),
        ('b', 'Drama'),
        ('c', 'Epic'),
        ('d', 'Adult'),
        ('e', 'Nonsense'),
        ('f', 'Family&Kids'),
        ('g', 'Mythopoeia'),
        ('h', 'Romance'),
        ('i', 'Satire'),
        ('j', 'Tragedy'),
        ('k', 'Tragicomedy'),
    )

  name = models.CharField(max_length=50, default=None, choices=MY_CHOICES)

  def __str__(self):
      return f"{self.name}"