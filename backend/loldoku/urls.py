from django.contrib import admin
from django.urls import path

from .views import GameView

urlpatterns = [
    path('gameData/', GameView.as_view(), name='gameData'),
]