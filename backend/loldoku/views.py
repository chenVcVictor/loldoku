from django.shortcuts import render
from rest_framework import generics, status
from .models import Game, ChampionInfo
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse


# Create your views here.
class GameView(APIView):

    def generateLabels():
        return None

    # Handle sending data to frontend regarding:
    # Regions/Role labels for boxes in the 0th row and 0th column
    def get(self, request):
        champions = ChampionInfo.objects.all()
        champNames = [champ.name for champ in champions]
        labels = {
            "0-1":"Tank", 
            "0-2":"Mage", 
            "0-3":"Assassin", 
            "1-0":"Demacia", 
            "2-0":"Demacia", 
            "3-0":"Demacia", 
        }

        gameData = {}
        gameData['championNames'] = champNames
        gameData['labels'] = labels
        return JsonResponse(gameData)


    # Validate whether puzzle is complete and returns respective response
    def post(self, request):
        pass
