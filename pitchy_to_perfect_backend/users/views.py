from .models import HighScore
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer, ScoreSerializer

# Create your views here.
class ScoreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = HighScore.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]