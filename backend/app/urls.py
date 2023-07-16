from django.urls import path
from .views import *

urlpatterns = [
    path('api/Users',  ListCreateUsers.as_view(), name = "View-All-Users"),
    path('api/<int:pk>', RetrieveEditUsers.as_view()),

    path('api/Admin', ListAdmin.as_view()),
    path('api/Client', ListClients.as_view()),
    path('api/Client/<int:pk>', RetrieveEditClient.as_view()),

    path('api/Subs', ListSubscriptins.as_view(), name = "View-Subs"), 
    path('api/NewSubs', CreateSubs.as_view()),
    path('api/Subs/<int:pk>', DeleteSubs.as_view()),

    path('api/Encrypt', ListEncryp.as_view(), name = "View-Encrypt"), 
    path('api/NewEncrypt', CreateEncrypType.as_view()),
    #path('api/Encrypt/<int:pk>', DeleteEncryp.as_view()),

    path('api/Filelist',  ListCreateFile.as_view()),
    path('api/Filelist/<uuid:pk>', RetrieveEditFile.as_view()),

    path('api/Folder',  ListCreateFolder.as_view()),
    path('api/Folder/<int:pk>', RetrieveEditFolder.as_view()),
]
