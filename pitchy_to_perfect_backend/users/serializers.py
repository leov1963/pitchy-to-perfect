from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import CustomUser, HighScore
class UserSerializer(ModelSerializer):
    highest_score = ReadOnlyField()
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'highest_score')

class ScoreSerializer(ModelSerializer):

    class Meta:
        model = HighScore
        fields = ('score', 'date', 'user')