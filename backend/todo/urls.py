from django.urls import path, include
from rest_framework import routers
from .views import TodoViewSet



router = routers.DefaultRouter()
router.register('todos', TodoViewSet, 'todo')


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
]