from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import *
from .models import *

#USERS
# Create your views here.
class ListCreateUsers(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

#class ListUsers(generics.ListAPIView):
#    queryset = Users.objects.all()
#    serializer_class = UsersSerializer

class RetrieveEditUsers(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


#ADMIN
class ListAdmin(generics.ListCreateAPIView):
    queryset = Admintab.objects.all()
    serializer_class = AdminSerializer


#CLIENT
class ListClients(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    #def get_queryset(self):
    #    queryset = Client.objects.all()
    #    auser = self.request.query_params.get('auser')
    #    if auser is not None:
    #        queryset = queryset.filter(user=auser)



class RetrieveEditClient(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


#Subscription

#List -> for all users
class ListSubscriptins(generics.ListAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

#create -> we create
class CreateSubs(generics.CreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

#delete -> we delete (maybe)
class DeleteSubs(generics.RetrieveDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    

#Encryption
#list ->  for all users
class ListEncryp(generics.ListAPIView):
    queryset = Encryption.objects.all()
    serializer_class = EncryptionSerializer

#create -> we create
class CreateEncrypType(generics.CreateAPIView):
    queryset = Encryption.objects.all()
    serializer_class = EncryptionSerializer

#delete -> we delete
class DeleteEncryp(generics.RetrieveDestroyAPIView):
    queryset = Encryption.objects.all()
    serializer_class = EncryptionSerializer


#File
#list
class ListCreateFile(generics.ListCreateAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer


#retrieveeditdelete
class RetrieveEditFile(generics.RetrieveUpdateDestroyAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer


#FileVersion -> got error!
class ListCreateFileVer(generics.ListCreateAPIView):
    queryset = Fileversion.objects.all()
    serializer_class = FileVersionSerializer


#File_parts -> not sure
class ListCreateFilePart(generics.ListCreateAPIView):
    queryset = Fileparts.objects.all()
    serializer_class = FilePartsSerializer
#retrieveeditdelete
class RetrieveEditFilePart(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fileparts.objects.all()
    serializer_class = FilePartsSerializer


#Deletedfilelog
class ListDeletedFile(generics.ListAPIView):
    queryset = FileLog.objects.all()
    serializer_class = FileLogSerializer

#Deletefilepartlog
class ListDeletedFileParts(generics.ListAPIView):
    queryset = FilePartsLog.objects.all()
    serializer_class = FilePartsLogSerializer



#Folder
#list and create folders
class ListCreateFolder(generics.ListCreateAPIView):
    queryset = Foldertable.objects.all()
    serializer_class = FolderSerializer


#retrieve edit
class RetrieveEditFolder(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foldertable.objects.all()
    serializer_class = FolderSerializer

#deletedfolderlog
class ListDeletedFolder(generics.ListAPIView):
    queryset = FolderLogs.objects.all()
    serializer_class = FolderLogSerializer


#FolderFiles
class ListCreateFolderFile(generics.ListCreateAPIView):
    queryset = Folderfiles.objects.all()
    serializer_class = FolderFilesSerializer

class RetrieveEditFolderFile(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folderfiles.objects.all()
    serializer_class = FolderFilesSerializer


#deletedfolderfiles
class ListDeletedFolderFile(generics.ListAPIView):
    queryset = DeleteFolderFileLogs.objects.all()
    serializer_class = DelFolderFileLogsSerializer


#Permissions - create, edit, view, 
#create, view
class ListCreatePerm(generics.ListCreateAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

#edit, delete
class RetrieveEditPerm(generics.RetrieveUpdateDestroyAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer