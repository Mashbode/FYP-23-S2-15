from django.urls import path
from .views import *

urlpatterns = [
   ############################# put a comment on urls that are being used so we can clean up ######################
        #######################################################################
        ########################## important functions ########################
    ##### file upload functions  ################
        # this url for getting file versions 
    path('api/file/versions/<uuid:file_id>', getFileversions.as_view(), name = 'get-file-versions'),

        # url for uploading file, require client_id
    path('api/fileupload/<int:client_id>', uploadingFile, name='file-upload'),

        # url for updating file, require file_id
    path('api/fileupdate/<uuid:fileId>', fileupdateWhenUpdate),

    #### file retreival functions (i.e. download)##########
        # url for retrieving file, require file_id
    path('api/retrievefile/<uuid:file_id>', obtainfile),

        # url for retrieving file of particular version
    path('api/retreiveFile/version/<uuid:file_id>/<uuid:fileVersion>',obatainfileOfVersion),
    
    ### file deletion ################
        # url for deleting file # requires fileid and client id
    path('api/fileDelete/<uuid:fileId>/<int:clientId>', deletefile),


        # url for deleting file from logs, [for deleting file from trashbin]
    path('api/filelog/delete/<uuid:file_id>', deleteHist),

    ############### file restoring ##################
        # url for restoring a deleted file 
    path('api/filerestore/<uuid:file_id>', restorefile),

    ################## Sharing files ##################
    path('aapi/fileshare/<str:email>/<uuid:fileId>/<int:clientId>', Sharefile),


    ###########################################################################

    ###### retrieving files in folder##################
        # url for retrieving files that are in a folder, require folder_id
    path('api/folderfile/filelist/<int:folderId>', getfileinfolderinfo),

    ###### retrieving list of shared files ##################

        # url for retrieve list of files that are shared to the user
    path('api/sharedfile/toclient/<int:client_id>', getfilesharedtoClient),

        # url to retrieve list of files that user shared to other users 
    path('api/sharedfile/toothers/<int:client_id>', getfilesThatClientShared), 

    ####### retrieving list of shared folders ##################
        # url to retrieve list of folder that are shared to the user 
    path('api/sharedfolder/toclient/<int:client_id>', getfolderssharedtoclient),

        # url to retrieve list of folder that user share to other users 
    path('api/sharedfolder/toothers/<int:client_id>', getfoldersThatClientShared), 

    ######### functions to view file and folder info ##########
        # url to retrieve list of files under the client
    path('api/client/file/<int:client_id>', getallClientfiles.as_view(), name='client-file'),

        # view file info -requires file_id
    path('api/client/file/info/<uuid:pk>', fileview.as_view(), name = 'file-view'),

        # url to retrieve list of folders under the client
    path('api/client/Folders/<int:client_id>', getallClientfolder.as_view()),

        # view folder info - requires folder_id
    path('api/client/folder/info/<int:pk>', folderview.as_view()),

        # url to retrieve list of deleted files under the client
    path('api/client/deleted/fileLogs/<int:client_id>', getDeletedFilelogs.as_view()),

        # url to retrieve list of deleted folders under the client 
    path('api/client/deleted/folderLogs/<int:client_id>', getDeletedFolderlogs.as_view()),


        ### add file to folder
    path('api/client/Folder/addFile',  ListCreateFolderFile.as_view(), name ='list-create-folder-file'),

        ### delete shared folder
    path('api/SharedFolderAccess/<int:pk>', DeleteSharedFolder.as_view()),
        ### delete shared file
    path('api/SharedFileAccess/<int:pk>', DeleteSharedFile.as_view()),
        #######################################################################
        #######################################################################

   
   #Users
    path('api/Users',  ListCreateUsers.as_view(), name = "View-All-Users"),
    path('api/<str:pk>', RetrieveEditUsers.as_view(), name = "Retrieve-Edit-Users"), 
    
    
    ##Admin
    path('api/Admin', ListAdmin.as_view()),
    

    #client
    path('api/Client', ListClients.as_view()),
    path('api/Client/<int:pk>', RetrieveEditClient.as_view()),


    #subscription
    path('api/SubList', ListSubscriptins.as_view(), name = "View-Subs"), 
    path('api/NewSub', CreateSubs.as_view()),
    path('api/SubList/<int:pk>', DeleteSubs.as_view()),


    #encryption
    path('api/Encrypt', ListEncryp.as_view(), name = "View-Encrypt"), 
    path('api/NewEncrypt', CreateEncrypType.as_view()),
    #path('api/Encrypt/<int:pk>', DeleteEncryp.as_view()),


    #files
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

    ### add
    path('api/FolderFile',  ListCreateFolderFile.as_view()),

    path('api/FolderFile/<int:pk>', RetrieveEditFolderFile.as_view()),
    path('api/DeletedFolderFile',  ListDeletedFolderFile.as_view()),

    path('api/Permission',  ListCreatePerm.as_view()),
    path('api/Permission/<pk>', RetrieveEditPerm.as_view()),

   ######
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
