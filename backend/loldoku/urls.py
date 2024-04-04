from django.contrib import admin
from django.urls import path

from .views import GameInitView, ValidateAnswerView

urlpatterns = [
    path('gameInit/', GameInitView.as_view(), name = 'gameInit'),
    path('validateAnswer/', ValidateAnswerView.as_view(), name = 'validateAnswer')
]