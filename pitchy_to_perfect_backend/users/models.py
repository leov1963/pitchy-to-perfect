from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class CustomUser(AbstractUser):
    # Any extra fields would go here
    def __str__(self):
        return self.email
    def __str__(self):
        return self.username

class HighScore(models.Model):
    date = models.DateField('score date')
    score = models.IntegerField()

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)