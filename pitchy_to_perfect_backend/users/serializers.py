from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import CustomUser
class UserSerializer(ModelSerializer):
    highest_score = ReadOnlyField()
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'highest_score')