from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import *
from .models import *

# Create your views here.

#USERS
# Create your views here.
class ListCreateUsers(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class RetrieveEditUsers(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class userList(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer 