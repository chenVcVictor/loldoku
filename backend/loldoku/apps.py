from django.apps import AppConfig

import requests


class LoldokuConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'loldoku'

    def ready(self):

        from .models import ChampionInfo
        # ChampionInfo.objects.all().delete()
        version = "14.6.1"
        url = "https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/champion.json"
        response = requests.get(url)

        championData = response.json().get('data', {})


        for champKey, champData in championData.items():
            ChampionInfo.objects.update_or_create(
                name = champData.get("name"),
                roles = champData.get("tags"),
                region = "Demacia",
                releasedYear = 2009,
                title = champData.get("title")
            )

        
