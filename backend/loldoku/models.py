from django.db import models

# Create your models here.

class Game(models.Model):
    labelMap = models.JSONField(default=dict, help_text="Dictionary of inputted champions & Role/Region labels")


class ChampionInfo(models.Model):
    name = models.CharField(max_length=100)
    # title = models.CharField()
    roles = models.JSONField()
    region = models.CharField(max_length=100)
    releasedYear = models.IntegerField()

