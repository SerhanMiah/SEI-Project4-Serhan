from django.db import models

# Create your models here.
class Category(models.Model):

  MY_CHOICES = (
        ('Comedy', 'Comedy' ),
        ('Drama', 'Drama'),
        ('Epic', 'Epic'),
        ('Adult', 'Adult'),
        ('Nonsense', 'Nonsense'),
        ('Family&Kids', 'Family&Kids'),
        ('Mythopoeia', 'Mythopoeia'),
        ('Romance', 'Romance'),
        ('Satire', 'Satire'),
        ('Tragedy', 'Tragedy'),
        ('Tragicomedy', 'Tragicomedy')
    )

  name = models.CharField(max_length=100, default=None, choices=MY_CHOICES)

  def __str__(self):
      return self.name