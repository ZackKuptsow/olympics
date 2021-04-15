# translates python code from models.py into a json object
from rest_framework import serializers
from .models import Room


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
