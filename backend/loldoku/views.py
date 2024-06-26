from django.shortcuts import render
from rest_framework import generics, status
from .models import Game, ChampionInfo
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse




labels = {
    "0-1":"Tank", 
    "0-2":"Mage", 
    "0-3":"Assassin", 
    "1-0":"Demacia", 
    "2-0":"Noxus", 
    "3-0":"Void", 
}

# Create your views here.
class GameInitView(APIView):

    def generateLabels():
        return None

    # Handle sending data to frontend regarding:
    # Regions/Role labels for boxes in the 0th row and 0th column
    def get(self, request):
        champions = ChampionInfo.objects.all()
        champNames = [champ.name for champ in champions]

        gameData = {}
        gameData['championNames'] = champNames
        gameData['labels'] = labels
        return JsonResponse(gameData)


class ValidateAnswerView(APIView):
    
    # Validate whether puzzle is complete and returns respective response
    def post(self, request):
        labelMap = request.data.get('labelMap')
        res = []
        champRegions = []


        for i in range(1, len(labelMap)):
            curRow = []
            regionsRow = []
            for j in range(1, len(labelMap[i])):
                if labelMap[i][j] == '':
                    curRow.append(False)
                    regionsRow.append('')
                    continue

                champ = ChampionInfo.objects.get(name = labelMap[i][j])

                correctRegion = labels[str(i) + '-' + str(0)]
                correctRoles = labels[str(0) + '-' + str(j)]
                if champ.region == correctRegion and correctRoles in champ.roles:
                    curRow.append(True)
                else:
                    curRow.append(False)
                regionsRow.append(champ.name + ": " + champ.region + " " + correctRegion)
            
            champRegions.append(regionsRow)
            res.append(curRow)
        
        
        
        # Example response
        return JsonResponse({'correctedMatrix': res, 'champRegions: ': champRegions})
