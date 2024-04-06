from django.core.management.base import BaseCommand
from loldoku.models import ChampionInfo
from bs4 import BeautifulSoup

import requests


class Command(BaseCommand):
    help = "Loads champion data"
    def handle(self, *args, **options):
        # ChampionInfo.objects.all().delete()
        def getRegion(name):
            url = "https://leagueoflegends.fandom.com/wiki/"
            sanitizedName = name.replace(" ", "_")
            urlWithChamp = url + sanitizedName
            page = requests.get(urlWithChamp)
            soup = BeautifulSoup(page.text, "html.parser")
            htmlLabelList = soup.find_all('h3', class_='pi-data-label pi-secondary-font')
            for label in htmlLabelList:
                if 'Region' in label.get_text():
                    regionData = label.find_next_sibling()
                    firstRegion = regionData.find('li')
                    if firstRegion:
                        return str(firstRegion.get_text().strip())
                    elif regionData:
                        return str(regionData.get_text().strip())
                    else:
                        print("Bruh moment, can't find region for: ", name)
            
            print("OUT OF FOR LOOP, can't find region for: ", name)
            return "No region?"
        
        version = "14.6.1"
        url = "https://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/champion.json"
        response = requests.get(url)

        championData = response.json().get('data', {})

        for champKey, champData in championData.items():
            ChampionInfo.objects.update_or_create(
                name = champData.get("name"),

                defaults={  
                    'roles': champData.get("tags"),
                    'region': getRegion(champData.get("name")),
                    'releasedYear': 2009,
                    'title': champData.get("title"),
                }

                # roles = champData.get("tags"),
                # region = "Demaciaaa",
                # releasedYear = 2009,
                # title = champData.get("title")
                
            )

        