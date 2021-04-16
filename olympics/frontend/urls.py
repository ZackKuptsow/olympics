from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index),
    path('room/<str:roomCode>/settings', index),
    path('room/<str:roomCode>/teams', index),
    path('room/<str:roomCode>/brackets', index),

]
