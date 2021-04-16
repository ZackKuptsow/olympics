from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, UpdateRoom, CreateTeam, GetTeamNames, CreateEvent, GetRoundOne

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view()),
    path('create-team', CreateTeam.as_view()),
    path('get-teams', GetTeamNames.as_view()),
    path('create-event', CreateEvent.as_view()),
    path('get-round-one', GetRoundOne.as_view())
]
