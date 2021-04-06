from .models import HighScore, CustomUser
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer, ScoreSerializer
import requests
from django.http import JsonResponse

# Create your views here.
class ScoreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = HighScore.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

def scores_list(request):

    high_scores = HighScore.objects.order_by('-score')[:25]
    res = {'high_scores': []}
    for score in high_scores:
        serialized_score = {
            'date': score.date,
            'score': score.score,
            'username': score.user.username
        }
        res['high_scores'].append(serialized_score)
    return JsonResponse(res)