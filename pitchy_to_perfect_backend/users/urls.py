from django.urls import include, path
from rest_framework import routers
from users import views

router = routers.DefaultRouter()
router.register(r'scores', views.ScoreViewSet)

urlpatterns = [
    path('scores/get', views.scores_list),
    path('', include(router.urls)),
    path('auth/', include('rest_auth.urls')),    
    path('auth/register/', include('rest_auth.registration.urls'))
]