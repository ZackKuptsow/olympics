# translates python code from models.py into a json object
from rest_framework import serializers
from .models import Room, Team, Event


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'player_can_pause',
                  'votes_to_skip', 'created_at')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('player_can_pause', 'votes_to_skip')


class UpdateRoomSerializer(serializers.ModelSerializer):
    # used because code field in model is set to unique
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('player_can_pause', 'votes_to_skip', 'code')


class CreateTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('room_code', 'team_name')


class GetTeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'room_code', 'team_name')


class CreateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('room_code', 'event_name',
                  'team_a', 'team_b', 'team_c', 'team_d')


class GetRoundOneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'room_code', 'event_name',
                  'team_a', 'team_b', 'team_c', 'team_d')
