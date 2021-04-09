from django.db import models
import string
import random


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


# Create your models here.
class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    player_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)


class Team(models.Model):
    name = models.CharField(max_length=50, default='', unique=True)
    # TODO: Function that makes list/appends to list of games played
    # games_played =


class Game(models.Model):
    table = models.CharField(max_length=12, default='', unique=True)
    teams = Team.objects.all()
    # TODO: Make function to create dictionary of scores --> {Team1: score1, Team2: score2}
    # score =


class Bracket(models.Model):
    event = models.CharField(max_length=24, default='', unique=True)
    # TODO: {rounds: [match_id]} i.e. {Round1: [ABC123, 123ABC, etc.]}
