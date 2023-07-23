from django.urls import path
from .views import *

urlpatterns = [
    path('api/Users',  ListCreateUsers.as_view(), name = "View-All-Users"),
    path('api/<int:pk>', RetrieveEditUsers.as_view()),

    path('api/Admin', ListAdmin.as_view()),
    path('api/Client', ListClients.as_view()),
    path('api/Client/<int:pk>', RetrieveEditClient.as_view()),

    path('api/SubList', ListSubscriptins.as_view(), name = "View-Subs"), 
    path('api/NewSub', CreateSubs.as_view()),
    path('api/SubList/<int:pk>', DeleteSubs.as_view()),

    path('api/Encrypt', ListEncryp.as_view(), name = "View-Encrypt"), 
    path('api/NewEncrypt', CreateEncrypType.as_view()),
    #path('api/Encrypt/<int:pk>', DeleteEncryp.as_view()),

    path('api/InvoiceList', ListInvoice.as_view()), 
    path('api/NewInvoice', CreateInvoice.as_view()),
    path('api/InvoiceList/<int:pk>', DeleteInvoice.as_view()),

    path('api/Filelist',  ListCreateFile.as_view()),
    path('api/Filelist/<uuid:pk>', RetrieveEditFile.as_view()),

    path('api/Filepartlist',  ListCreateFilePart.as_view()),
    path('api/Filepartlist/<uuid:pk>', RetrieveEditFilePart.as_view()),

    path('api/Fileverlist',  ListCreateFileVer.as_view()),
    path('api/Fileverlist/<uuid:pk>', RetrieveEditFileVer.as_view()),

    path('api/DeletedFiles',  ListDeletedFile.as_view()),
    path('api/DeletedFilesPart',  ListDeletedFileParts.as_view()),
    path('api/DeletedFilesVer',  ListDeletedFileVer.as_view()),

    path('api/Folder',  ListCreateFolder.as_view()),
    path('api/Folder/<int:pk>', RetrieveEditFolder.as_view()),
    path('api/DeletedFolder',  ListDeletedFile.as_view()),

    path('api/FolderFile',  ListCreateFolderFile.as_view()),
    path('api/FolderFile/<int:pk>', RetrieveEditFolderFile.as_view()),
    path('api/DeletedFolderFile',  ListDeletedFolderFile.as_view()),

    path('api/Permission',  ListCreatePerm.as_view()),
    path('api/Permission/<pk>', RetrieveEditPerm.as_view()),

    path('api/SharedFolderAccess', CreateSharedFolder.as_view()), 
    path('api/ViewSharedFolderAccess', ListSharedFolder.as_view()),
    path('api/SharedFolderAccess/<int:pk>', DeleteSharedFolder.as_view()),

    path('api/SharedFileAccess', CreateSharedFile.as_view()), 
    path('api/ViewSharedFileAccess', ListSharedFile.as_view()),
    path('api/SharedFileAccess/<int:pk>', DeleteSharedFile.as_view()),

    path('api/Server1',  Server1CreateList.as_view()),
    path('api/Server1/<int:pk>',  RetrieveServer1.as_view()),
    path('api/DeletedServer1',  ListDeletedServer1.as_view()),

    path('api/Server2',  Server1CreateList.as_view()),
    path('api/Server2/<int:pk>',  RetrieveServer1.as_view()),
    path('api/DeletedServer2',  ListDeletedServer1.as_view()),

    path('api/Server3',  Server1CreateList.as_view()),
    path('api/Server3/<int:pk>',  RetrieveServer1.as_view()),
    path('api/DeletedServer3',  ListDeletedServer1.as_view()),

    path('api/Server4',  Server1CreateList.as_view()),
    path('api/Server4/<int:pk>',  RetrieveServer1.as_view()),
    path('api/DeletedServer4',  ListDeletedServer1.as_view()),

]
