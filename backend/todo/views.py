from django.shortcuts import render
from .models import Todo
from .serializers import TodoSerializers
from .permission import CustomPermission
from rest_framework import filters, viewsets
from .pagination import MyLimitOffsetPagination

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet): 
    queryset = Todo.objects.all()
    serializer_class = TodoSerializers
    permission_classes = [CustomPermission]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description']
    pagination_class = MyLimitOffsetPagination
