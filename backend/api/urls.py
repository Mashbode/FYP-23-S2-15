from django.urls import path
from .views import *

urlpatterns = [
   #Users
    path('api/Users',  ListCreateUsers.as_view(), name = "View-All-Users"),
    path('api/<int:pk>', RetrieveEditUsers.as_view()),
]