from django.shortcuts import render

from rest_framework import viewsets
from .serializers import MovieSerializer
from .models import Movie
from rest_framework.views import APIView
from rest_framework.response import Response
from .omdb.client import OMDBClient
import json
class MovieView(viewsets.ModelViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()


class TitlesView(APIView):
    def get(self, request, title, *args, **kwargs):
        data = OMDBClient.search_title(title)
        # TODO: check, if such request was made and store response
        return Response(json.loads(data))

class PatternView(APIView):
    def get(self, request, title, *args, **kwargs):
        data = OMDBClient.search_pattern(title)
        # TODO: check, if such request was made and store response
        return Response(json.loads(data))