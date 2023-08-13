from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import *
from .models import *
#####################
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
import psycopg2
from app.scripts import*
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse, JsonResponse
from django.core.files import File
from .forms import  testForm
from .response import filenotUrsResponse

#USERS
# Create your views here.
class ListCreateUsers(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

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

class RetrieveEditClient(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


#SUBCRIPTIONS
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

    

#ENCRYPTION
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


#INVOICE
#List -> for all users
class ListInvoice(generics.ListAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

#create -> we create
class CreateInvoice(generics.CreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

#delete
class DeleteInvoice(generics.RetrieveDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


#FILETABLE
#list
class ListCreateFile(generics.ListCreateAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer


#retrieveeditdelete
class RetrieveEditFile(generics.RetrieveUpdateDestroyAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer


#FILE VERSION
class ListCreateFileVer(generics.ListCreateAPIView):
    queryset = Fileversion.objects.all()
    serializer_class = FileVersionSerializer

#retrive to delete
class RetrieveEditFileVer(generics.RetrieveDestroyAPIView):
    queryset = Fileversion.objects.all()
    serializer_class = FileVersionSerializer

#list deletedfileversion
class ListDeletedFileVer(generics.ListAPIView):
    queryset = FileVersionLog.objects.all()
    serializer_class = FileVersionLogSerializer


#FILE PART
class ListCreateFilePart(generics.ListCreateAPIView):
    queryset = Fileparts.objects.all()
    serializer_class = FilePartsSerializer

#retrieveeditdelete
class RetrieveEditFilePart(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fileparts.objects.all()
    serializer_class = FilePartsSerializer


#FILE LOG - deleted files
class ListDeletedFile(generics.ListAPIView):
    queryset = FileLog.objects.all()
    serializer_class = FileLogSerializer

#FILE PART LOG - deleted file parts
class ListDeletedFileParts(generics.ListAPIView):
    queryset = FilePartsLog.objects.all()
    serializer_class = FilePartsLogSerializer

#FILE VERSION LOG - deleted file version
class ListDeletedFileVer(generics.ListAPIView):
    queryset = FileVersionLog.objects.all()
    serializer_class = FileVersionLogSerializer



#FOLDER
#list and create folders
class ListCreateFolder(generics.ListCreateAPIView):
    queryset = Foldertable.objects.all()
    serializer_class = FolderSerializer


#retrieve edit
class RetrieveEditFolder(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foldertable.objects.all()
    serializer_class = FolderSerializer

#FOLDER LOG - deleted folders
class ListDeletedFolder(generics.ListAPIView):
    queryset = FolderLogs.objects.all()
    serializer_class = FolderLogSerializer


#FOLDER FILES
class ListCreateFolderFile(generics.ListCreateAPIView):
    queryset = Folderfiles.objects.all()
    serializer_class = FolderFilesSerializer

class RetrieveEditFolderFile(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folderfiles.objects.all()
    serializer_class = FolderFilesSerializer


#deletedfolderfileslog
class ListDeletedFolderFile(generics.ListAPIView):
    queryset = DeleteFolderFileLogs.objects.all()
    serializer_class = DelFolderFileLogsSerializer


#SERVER 1
class Server1CreateList(generics.ListCreateAPIView):
    queryset = Server1.objects.all()
    serializer_class = Server1Serializer

class RetrieveServer1(generics.RetrieveUpdateDestroyAPIView):
    queryset = Server1.objects.all()
    serializer_class = Server1Serializer

#SERVER1 LOG - deleted files in server1
class ListDeletedServer1(generics.ListAPIView):
    queryset = Server1Logs.objects.all()
    serializer_class = Server1LogSerializer


#SERVER 2
class Server2CreateList(generics.ListCreateAPIView):
    queryset = Server2.objects.all()
    serializer_class = Server2Serializer

class RetrieveServer2(generics.RetrieveUpdateDestroyAPIView):
    queryset = Server2.objects.all()
    serializer_class = Server2Serializer

#SERVER2 LOG - deleted files in server2
class ListDeletedServer2(generics.ListAPIView):
    queryset = Server2Logs.objects.all()
    serializer_class = Server2LogSerializer



#SERVER 3
class Server3CreateList(generics.ListCreateAPIView):
    queryset = Server3.objects.all()
    serializer_class = Server3Serializer

class RetrieveServer3(generics.RetrieveUpdateDestroyAPIView):
    queryset = Server3.objects.all()
    serializer_class = Server3Serializer

#SERVER3 LOG - deleted files in server3
class ListDeletedServer3(generics.ListAPIView):
    queryset = Server3Logs.objects.all()
    serializer_class = Server3LogSerializer



#SERVER 4
class Server4CreateList(generics.ListCreateAPIView):
    queryset = Server4.objects.all()
    serializer_class = Server4Serializer

class RetrieveServer4(generics.RetrieveUpdateDestroyAPIView):
    queryset = Server4.objects.all()
    serializer_class = Server4Serializer

#SERVER4 LOG - deleted files in server4
class ListDeletedServer4(generics.ListAPIView):
    queryset = Server4Logs.objects.all()
    serializer_class = Server4LogSerializer



#PERMISSIONS
#create, view
class ListCreatePerm(generics.ListCreateAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

#edit, delete
class RetrieveEditPerm(generics.RetrieveUpdateDestroyAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer


#view folders 
class folderview(generics.ListAPIView):
    queryset = Foldertable.objects.all()
    serializer_class = FolderSerializer
#folder create 
class folderCreate(generics.ListCreateAPIView):
    queryset = Foldertable.objects.all()
    serializer_class = FolderSerializer
#folder delete 
class folderDelete(generics.RetrieveDestroyAPIView):
    queryset = Foldertable.objects.all()
    serializer_class = FolderSerializer

#view folderfiles 
class folderfilesview(generics.ListAPIView):
    queryset = Folderfiles.objects.all()
    serializer_class = FolderFilesSerializer
#create 
class folderfileCreate(generics.ListCreateAPIView):
    queryset = Folderfiles.objects.all()
    serializer_class = FolderFilesSerializer
#delete 
class folderfileDelete(generics.RetrieveDestroyAPIView):
    queryset= Folderfiles.objects.all()
    serializer_class = FolderFilesSerializer

class folderfilelogs(generics.ListAPIView):
    queryset = DeleteFolderFileLogs.objects.all()
    serializer_class = DeleteFolderFileLogs

#SHAREDFOLDERACCESS
#view the access
class ListSharedFolder(generics.ListAPIView):
    queryset = Sharedfolderaccess.objects.all()
    serializer_class = ShareFolderAccessSerializer

#delete access
class DeleteSharedFolder(generics.RetrieveDestroyAPIView):
    queryset = Sharedfolderaccess.objects.all()
    serializer_class = ShareFolderAccessSerializer

#temporary create
class CreateSharedFolder(generics.CreateAPIView):
    queryset = Sharedfolderaccess.objects.all()
    serializer_class = ShareFolderAccessSerializer


#SHAREDFILEACESS
class ListSharedFile(generics.ListAPIView):
    queryset = Sharedfileaccess.objects.all()
    serializer_class = ShareFileAccessSerializer

#delete access
class DeleteSharedFile(generics.RetrieveDestroyAPIView):
    queryset = Sharedfileaccess.objects.all()
    serializer_class = ShareFileAccessSerializer

#temporary create
class CreateSharedFile(generics.CreateAPIView):
    queryset = Sharedfileaccess.objects.all()
    serializer_class = ShareFileAccessSerializer


#### view file 
#view single file
class fileview(generics.RetrieveAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer



########################################################################################################################################################################################################################################################################################################
            ## these are the key functions  ##
####################################################################################################################################################
### this for getting all versions of a particular file
class getFileversions(generics.ListAPIView):
    # queryset = Fileversion.objects.all()
    serializer_class = FileVersionSerializer
    # lookup_field = 'file_id'
    def get_queryset(self):
        return Fileversion.objects.filter(file_id=self.kwargs['file_id'])
###  getting all the files that are under the user
class getallClientfiles(generics.ListAPIView):
    serializer_class =FileSerializer
    def get_queryset(self):
        return Filetable.objects.filter(client_id=self.kwargs['client_id'])
##########################################################################    

### getting all the folders of a user 
class getallClientfolder(generics.ListAPIView):
    serializer_class=FolderSerializer
    def get_queryset(self):
        return Foldertable.objects.filter(client_id=self.kwargs['client_id'])
    
########################################################################## 
## view deleted files 
class getDeletedFilelogs(generics.ListAPIView):
    serializer_class = FileLogSerializer
    def get_queryset(self):
        return FileLog.objects.filter(client_id=self.kwargs['client_id'])
########################################################################## 
## view deleted folders 
class getDeletedFolderlogs(generics.ListAPIView):
    serializer_class=FolderLogSerializer
    def get_queryset(self):
        return FolderLogs.objects.filter(client_id=self.kwargs['client_id'])
       
## view to retreive files that are in a folder ## when opening a folder 
def getfileinfolderinfo(request, folderId):
    test = Folderfiles.objects.filter(folder_files_id= folderId).values('file','folder','file__filename', 'file__filetype')
    data = {'results': list(test)}
    return JsonResponse(data)

## view to retrieve list of files that are shared to the user ## when only files are shared
# ## client_id in the parameters is the one who recieves the shared file
# ## shared_client_id in sharedfileaccess table is the client who receives the shared file
# ## client in the table is the one who shared the file 
def getfilesharedtoClient(request, client_id):
    test = Sharedfileaccess.objects.filter(shared_client_id = client_id).values('file',  'create_time', 'client', 'permission_type', 'file__filename', 'file__filetype')
    data ={'results': list(test)}
    return JsonResponse(data)

## view to retrieve list of files that client has shared 
# ## client_id in parameters is client that shared the file
# ## shared_client_id in sharedfileaccess table is the client who receives the shared file
def getfilesThatClientShared(request, client_id):
    test = Sharedfileaccess.objects.filter(client=client_id).values('file',  'create_time','shared_client_id', 'permission_type', 'file__filename', 'file__filetype')
    data = {'results' : list(test)}
    return JsonResponse(data)

## view to retrieve list of folders shared to user 
# ## client_id in parameters is the one that receives the shared folder 
# ## shared_client_id in the sharedfolderaccess table is the client who receives the shared folder
def getfolderssharedtoclient(request, client_id):
    test = Sharedfolderaccess.objects.filter(shared_client_id = client_id).values('folder', 'client', 'create_time', 'permission_type', 'folder__foldername' )
    data = {'results' : list(test)}
    return JsonResponse(data)


## view to retreive list of folder that the user shared 
# ## client_id in parameters is the client that shared the folder 
# ## shared_client_id in the sharedfolderaccess table is the client who receives the shared folder
def getfoldersThatClientShared(request, client_id):
    test = Sharedfolderaccess.objects.filter(client=client_id).values('folder', 'shared_client_id', 'create_time', 'permission_type', 'folder__foldername')
    data = {'results' : list(test)}
    return JsonResponse(data)

## view to retrieve client_id when email is entered to share file
# email of receiver 
# fileId of file being shared
# clientId of the user sharing
def Sharefile(request, email, fileId, clientId):
    if Users.objects.filter(email=email).exists():
        ## get u_id
        # getti = Userstab.objects.filter(email=email).values('u_id')
        getti = Users.objects.filter(email=email).values('u_id')
        ## get client_id
        gettor = Client.objects.filter(user=getti[0]['u_id']).values('client_id')
        ## add into sharedFileAccess 
        create = Sharedfileaccess(file_id=fileId,client_id= clientId, shared_client_id = gettor[0]['client_id'])
        create.save()
        return HttpResponse('yes')
    else:
        return HttpResponse('no')

class sharefileView(APIView):
    def post(self,request, email, fileId, clientId):
        if Users.objects.filter(email=email).exists():
            ## get u_id
            # getti = Userstab.objects.filter(email=email).values('u_id')
            getti = Users.objects.filter(email=email).values('u_id')
            ## get client_id
            gettor = Client.objects.filter(user=getti[0]['u_id']).values('client_id')
            ## add into sharedFileAccess 
            create = Sharedfileaccess(file_id=fileId,client_id= clientId, shared_client_id = gettor[0]['client_id'])
            create.save()
            return HttpResponse('yes')
        else:
            return HttpResponse('no')
##########################################################################

#####################################################################################
## this works for some reason #########keeep this ################## works
## need to provide client_id # not user_id 
def uploadingFile(request, client_id):
    if request.method == 'POST':
        # test = testForm(request.POST, request.FILES)
        # if test.is_valid():
            file = request.FILES['file']
            path = os.path.realpath(__file__)
            dir = os.path.dirname(path)
            dirs = dir + '/shard_make/' 
            with open(dirs+ file.name, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            fileinfo = os.path.splitext(file.name)
            filename = fileinfo[0]
            fileext =  fileinfo[1]
            c_id = client_id
            ###
            print('insert into file tab')
            ### insert into file table first to generate file_id (uuid)
            files = Filetable.objects.create(filename = filename, filetype = fileext, client_id = c_id, filesize=file.size)
            ## dun have to use serializer to save data
            serializers = FileSerializer(data = files)
            if serializers.is_valid():
                    serializers.save()
            ### first compress the file 
            compres_file_name = compression(file.name)
            print('file compressed')
            ### then encrypt 
            encrypt_file_name = encrypt_file(compres_file_name)
            print('file encrypted')
            ## then split the file, it returns the list of split files
            split_file_list = ecc_file(encrypt_file_name)
            print('file split')
            ## then split the pub key, it returns a list of file names for split
            split_key_list = pyshmir_split()
            print('pub key split')
            ## once file is inserted, the tables will be generated
            ## need to retrieve the file_id 
            file_id = filegetting()
            print('retrieve fileid')
            ## retrieve the file_version_id from fileversion_table 
            file_version_id = fileversionOnInsert(file_id)
            print('retrieve file version')
            ## function to upload the split file parts to the db 
            upload = filepartsupload(split_file_list, split_key_list, file_id, file_version_id)
            ## remove files in folder 
            path = os.path.realpath(__file__)
            dir = os.path.dirname(path)
            dirs = dir + ('/shard_make')
            for f in os.listdir(dirs):
                os.remove(os.path.join(dirs, f))
            return HttpResponse('file ok')
    # else:
    #     test = testForm()
    #     ## the html.html need to replace with the frontend stuff i think
    #     return render(request,"html.html", {'form':test})
    return HttpResponse('waiting')


### file update ################## works 
#### need to provide fileID ####
def fileupdateWhenUpdate(request,fileId):
    if request.method == 'POST':
        test = testForm(request.POST, request.FILES)
        if test.is_valid():
            file = request.FILES['file']
            path = os.path.realpath(__file__)
            dir = os.path.dirname(path)
            dirs = dir + '/shard_make/' 
            with open(dirs+ file.name, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            fileinfo = os.path.splitext(file.name)
            filename = fileinfo[0]
            fileext =  fileinfo[1]
            ### get current time
            newtime = timezzzz()
            ### update new file insert 
            files = Filetable.objects.filter(file_id = fileId).update(last_change = newtime, filesize=file.size)
            ## dun have to use serializer to save data
            ### first compress the file 
            compres_file_name = compression(file.name)
            print('file compressed')
            ### then encrypt 
            encrypt_file_name = encrypt_file(compres_file_name)
            print('file encrypted')
            ## then split the file, it returns the list of split files
            split_file_list = ecc_file(encrypt_file_name)
            print('file split')
            ## then split the pub key, it returns a list of file names for split
            split_key_list = pyshmir_split()
            print('pub key split')
            ## once file is inserted, the tables will be generated
            ## retrieve the file_version_id from fileversion_table 
            file_version_id = fileversionOnUpdate(fileId)
            print('retrieve file version')
            ## function to upload the split file parts to the db 
            upload = filepartsupload(split_file_list, split_key_list, fileId, file_version_id)
            ## remove all files in folder 
            path = os.path.realpath(__file__)
            dir = os.path.dirname(path)
            dirs = dir + ('/shard_make')
            for f in os.listdir(dirs):
                os.remove(os.path.join(dirs, f))
            return HttpResponse('file ok')
    else:
        test = testForm()
        ## the html.html need to replace with the frontend stuff i think
        return render(request,"html.html", {'form':test})
    

### retrieve current file ### will be downloaded ##
### requires file_id 
def obtainfile(request, file_id):
    ## taking info of the file 
    filename, fileExt = getfileinfo(file_id)
    ## getting current version of file 
    fileVer = getCurrentFileversion(file_id)
    ## getting all the shards from db - returns list of file and key shards 
    keyname_list, filename_list = getAllfileAndSecretparts(file_id, fileVer)
    ## combine the file with ecc - returns list of names of recombined file
    filename_c = combine_file(filename_list)
    ## combining pub key with sss - returns name of key file
    key = pyshmir_combine(keyname_list)
    ## decrypting file - returns name of decryped file
    filename_d = decrypt(filename_c)
    ## decompress file -returns name of complete file 
    decom = decompress(filename_d, fileExt, filename)
    c_name = filename+fileExt
    print(c_name)
    ## uploading file to the frontend
    with open(decom, 'rb') as f:
        response = HttpResponse(f.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = 'attachment; filename="'+ c_name +'"'
    ## remove all files in folder 
    path = os.path.realpath(__file__)
    dir = os.path.dirname(path)
    dirs = dir + ('/shard_retrieve')
    for f in os.listdir(dirs):
        os.remove(os.path.join(dirs, f))
    return response

### retrieve file of a particular version that is chosen
### requires file_id and file_Version_id
def obatainfileOfVersion(request, file_id, fileVersion):
    ## taking info of the file 
    filename, fileExt = getfileinfo(file_id)
    ## getting all the shards from db - returns list of file and key shards 
    keyname_list, filename_list = getAllfileAndSecretparts(file_id, fileVersion)
     ## combine the file with ecc - returns list of names of recombined file
    filename_c = combine_file(filename_list)
    ## combining pub key with sss - returns name of key file
    key = pyshmir_combine(keyname_list)
    ## decrypting file - returns name of decryped file
    filename_d = decrypt(filename_c)
    ## decompress file -returns name of complete file 
    decom = decompress(filename_d, fileExt, filename)
    c_name = filename+fileExt
    print(c_name)
    ## uploading file to the frontend
    with open(decom, 'rb') as f:
        response = HttpResponse(f.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = 'attachment; filename="'+ c_name +'"'
    ## remove all files in folder 
    path = os.path.realpath(__file__)
    dir = os.path.dirname(path)
    dirs = dir + ('/shard_retrieve')
    for f in os.listdir(dirs):
        os.remove(os.path.join(dirs, f))
    return response


## function to delete 
def deletefile(request, fileId, clientId):
    print('e')
    # checking if the file exists but does not belong to the current client.
    if Filetable.objects.filter(file_id = fileId, client = clientId).count() == 0 and Filetable.objects.filter(file_id = fileId).exists():
        ## response taken from response.py file
        print('here')
        return filenotUrsResponse()
    try:
        ## delete from file table 
        print('herte')
        death = Filetable.objects.filter(file_id =fileId, client= clientId )
        print(death)
        death.delete()
        print('a')
        ## delete from file servers 
        File1.objects.filter(file_id =fileId).using('server1').delete() 
        print('b')
        File2.objects.filter(file_id=fileId).using('server2').delete()
        print('c')
        File3.objects.filter(file_id=fileId).using('server3').delete()
        print('d')
        File4.objects.filter(file_id=fileId).using('server4').delete()
        print('e')
        File5.objects.filter(file_id=fileId).using('server5').delete()
        print('f')
        detail = {'status':'success',
                'message': 'file deleted'}
    except:
        detail ={'status': 'fail',
                 'message': 'error occured'}
    return JsonResponse(detail)
        # print('herte')
        # death = Filetable.objects.filter(file_id =fileId, client= clientId )
        # print(death)
        # death.delete()
        # print('a')
        # ## delete from file servers 
        # File1.objects.filter(file_id =fileId).using('server1').delete() 
        # print('b')
        # File2.objects.filter(file_id=fileId).using('server2').delete()
        # print('c')
        # File3.objects.filter(file_id=fileId).using('server3').delete()
        # print('d')
        # File4.objects.filter(file_id=fileId).using('server4').delete()
        # print('e')
        # File5.objects.filter(file_id=fileId).using('server5').delete()
        # print('f')
        # detail = {'status':'success',
        #         'message': 'file deleted'}
        # return JsonResponse(detail)


def restorefile(request,file_id):
    chk = FileLog.objects.filter(file_id=file_id).exists()
    print(chk)
    ## get file from filelog
    log = FileLog.objects.filter(file_id=file_id).values('file_id','filename', 'filetype', 'client_id', 'last_change','uploadtime', 'filesize')
    print(log[0]['file_id'])
    print(log[0]['uploadtime'])
    ## re-insert to file table 
    filei= Filetable(file_id=log[0]['file_id'],filename=log[0]['filename'], filetype= log[0]['filetype'], 
                   client_id=log[0]['client_id'], last_change=log[0]['last_change'], uploadtime=log[0]['uploadtime'], filesize=log[0]['filesize'])
    filei.save()
    ## need to remove new auto created fileversion, fileparts, fileserver entries
    
    # get the new fileversion 
    fiver = Fileversion.objects.filter(file_id=file_id).values('file_version_id')
    fed = fiver[0]['file_version_id']
    # remove from fileserver first
    Server1.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server2.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server3.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server4.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server5.objects.filter(file_id=file_id, file_version_id=fed).delete()
    ##delete from logs 
    Server1Logs.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server2Logs.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server3Logs.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server4Logs.objects.filter(file_id=file_id, file_version_id=fed).delete()
    Server5Logs.objects.filter(file_id=file_id, file_version_id=fed).delete()
    ##delete from fileparts
    Fileparts.objects.filter(file_id=file_id, file_version_id=fed).delete()
    ##delete from filepartslog
    FilePartsLog.objects.filter(file_id=file_id, file_version_id=fed).delete()
    ##delete from fileversion
    Fileversion.objects.filter(file_id=file_id).delete()
    ##delete from fileversionlog 
    FileVersionLog.objects.filter(file_id=file_id, file_version_id=fed).delete()

    ## re-insert the original fileversions, fileparts, and fileserver entries 
    ### add back into fileversion
    fvlist = FileVersionLog.objects.filter(file_id=file_id).values('file_version_id','file_id','file_version','last_change')
    for i in range(len(fvlist)):
        less = Fileversion(file_version_id=fvlist[i]['file_version_id'], file_id=fvlist[i]['file_id'], file_version=fvlist[i]['file_version'], last_change=fvlist[i]['last_change'])
        less.save()
    ## delete from fileversion log 
    FileVersionLog.objects.filter(file_id=file_id).delete()
    ### add back to fileparts
    fplist= FilePartsLog.objects.filter(file_id=file_id).values('file_part_id','part_number','server_name','file_id','file_version_id', 'last_change')
    for i in range(len(fplist)):
        ah = Fileparts(file_part_id=fplist[i]['file_part_id'], part_number=fplist[i]['part_number'], server_name=fplist[i]['server_name'], 
                       file_id=fplist[i]['file_id'], file_version_id=fplist[i]['file_version_id'], last_change=fplist[i]['last_change'])
        ah.save()
    ## then delete from filepart log
    FilePartsLog.objects.filter(file_id=file_id).delete()

    ### add back to fileserver
    f1 = Server1Logs.objects.filter(file_id=file_id).values('file_id','file_version_id','file_part_id', 'server1_id')
    f2 = Server2Logs.objects.filter(file_id=file_id).values('file_id','file_version_id', 'file_part_id', 'server2_id')
    f3 = Server3Logs.objects.filter(file_id=file_id).values('file_id','file_version_id', 'file_part_id', 'server3_id')
    f4 = Server4Logs.objects.filter(file_id=file_id).values('file_id','file_version_id', 'file_part_id', 'server4_id')
    f5 = Server5Logs.objects.filter(file_id=file_id).values('file_id','file_version_id', 'file_part_id', 'server5_id')
    for i in range(len(f1)):
        ff1 = Server1(file_id=f1[i]['file_id'], file_version_id=f1[i]['file_version_id'], file_part_id=f1[i]['file_part_id'], server1_id=f1[i]['server1_id'])
        ff1.save()
    for i in range(len(f2)):    
        ff2 = Server2(file_id=f2[i]['file_id'], file_version_id=f2[i]['file_version_id'], file_part_id=f2[i]['file_part_id'], server2_id=f2[i]['server2_id'])
        ff2.save()
    for i in range(len(f3)):
        ff3 = Server3(file_id=f3[i]['file_id'], file_version_id=f3[i]['file_version_id'], file_part_id=f3[i]['file_part_id'], server3_id=f3[i]['server3_id'])
        ff3.save()
    for i in range(len(f4)):
        ff4 = Server4(file_id=f4[i]['file_id'], file_version_id=f4[i]['file_version_id'], file_part_id=f4[i]['file_part_id'], server4_id=f4[i]['server4_id'])
        ff4.save()
    for i in range(len(f5)):
        ff5 = Server5(file_id=f5[i]['file_id'], file_version_id=f5[i]['file_version_id'], file_part_id=f5[i]['file_part_id'], server5_id=f5[i]['server5_id'])
        ff5.save()
    ## then delete from server logs 
    Server1Logs.objects.filter(file_id=file_id).delete()
    Server2Logs.objects.filter(file_id=file_id).delete()
    Server3Logs.objects.filter(file_id=file_id).delete()
    Server4Logs.objects.filter(file_id=file_id).delete()
    Server5Logs.objects.filter(file_id=file_id).delete()

    # delete from file log 
    FileLog.objects.filter(file_id=file_id).delete()

    ## reinsert from file servers 
    # take info from file logs
    fs1 = File1_log.objects.filter(file_id=file_id).values('file_id', 'file_version_id', 'data', 'fileserver1_id', 'secret').using('server1')
    fs2 = File2_log.objects.filter(file_id=file_id).values('file_id', 'file_version_id', 'data', 'fileserver2_id', 'secret').using('server2')
    fs3 = File3_log.objects.filter(file_id=file_id).values('file_id', 'file_version_id', 'data', 'fileserver3_id', 'secret').using('server3')
    fs4 = File4_log.objects.filter(file_id=file_id).values('file_id', 'file_version_id', 'data', 'fileserver4_id', 'secret').using('server4')
    fs5 = File5_log.objects.filter(file_id=file_id).values('file_id', 'file_version_id', 'data', 'fileserver5_id', 'secret').using('server5')

    # insert into file
    for i in range(len(fs1)):
        ffs1 = File1(file_id=fs1[i]['file_id'], data=fs1[i]['data'], file_version_id=fs1[i]['file_version_id'], fileserver1_id=fs1[i]['fileserver1_id'], secret=fs1[i]['secret'])
        ffs1.save(using='server1')
    for i in range(len(fs2)):
        ffs2 = File2(file_id=fs2[i]['file_id'], data=fs2[i]['data'], file_version_id=fs2[i]['file_version_id'], fileserver2_id=fs2[i]['fileserver2_id'], secret=fs2[i]['secret'])
        ffs2.save(using='server2')
    for i in range(len(fs3)):
        ffs3 = File3(file_id=fs3[i]['file_id'], data=fs3[i]['data'], file_version_id=fs3[i]['file_version_id'], fileserver3_id=fs3[i]['fileserver3_id'], secret=fs3[i]['secret'])
        ffs3.save(using='server3')    
    for i in range(len(fs4)):
        ffs4 = File4(file_id=fs4[i]['file_id'], data=fs4[i]['data'], file_version_id=fs4[i]['file_version_id'], fileserver4_id=fs4[i]['fileserver4_id'], secret=fs4[i]['secret'])
        ffs4.save(using='server4')
    for i in range(len(fs5)):
        ffs5 = File5(file_id=fs5[i]['file_id'], data=fs5[i]['data'], file_version_id=fs5[i]['file_version_id'], fileserver5_id=fs5[i]['fileserver5_id'], secret=fs5[i]['secret'])
        ffs5.save(using='server5')
    # delete from logs 
    File1_log.objects.filter(file_id=file_id).using('server1').delete()
    File2_log.objects.filter(file_id=file_id).using('server2').delete()
    File3_log.objects.filter(file_id=file_id).using('server3').delete()
    File4_log.objects.filter(file_id=file_id).using('server4').delete()
    File5_log.objects.filter(file_id=file_id).using('server5').delete()
    return HttpResponse('restored')


def queryclientId(request, u_id):
    set = Client.objects.filter(u_id=u_id).values('client_id')
    return JsonResponse(set[0], safe = False)



## for insert
class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request,client_id):
        file = request.FILES['file']
        path = os.path.realpath(__file__)
        dir = os.path.dirname(path)
        dirs = dir + '/shard_make/' 
        with open(dirs+ file.name, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        fileinfo = os.path.splitext(file.name)
        filename = fileinfo[0]
        fileext =  fileinfo[1]
            ## temp (if can get it through the hidden post field from react side it would be great)
            # c_id = request.POST['client_id']
        c_id = client_id
            # c_id = 2
            ###
        print('insert into file tab')
            ### insert into file table first to generate file_id (uuid)
        files = Filetable.objects.create(filename = filename, filetype = fileext, client_id = c_id, filesize=file.size)
            ## dun have to use serializer to save data
        serializers = FileSerializer(data = files)
        if serializers.is_valid():
                serializers.save()
            ### first compress the file 
        compres_file_name= compression(file.name)
        print('file compressed')
            ### then encrypt 
        encrypt_file_name = encrypt_file(compres_file_name)
        print('file encrypted')
            ## then split the file, it returns the list of split files
        split_file_list = ecc_file(encrypt_file_name)
        print('file split')
            ## then split the pub key, it returns a list of file names for split
        split_key_list = pyshmir_split()
        print('pub key split')
            ## once file is inserted, the tables will be generated
            ## need to retrieve the file_id 
        file_id = filegetting()
        print('retrieve fileid')
            ## retrieve the file_version_id from fileversion_table 
        file_version_id = fileversionOnInsert(file_id)
        print('retrieve file version')
            ## function to upload the split file parts to the db 
        upload = filepartsupload(split_file_list, split_key_list, file_id, file_version_id)
            ## remove files in folder 
        path = os.path.realpath(__file__)
        dir = os.path.dirname(path)
        dirs = dir + ('/shard_make')
        for f in os.listdir(dirs):
            os.remove(os.path.join(dirs, f))
        return HttpResponse('file ok')

## for update
class fileupdateWhenUpdateView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request,fileId):
        file = request.FILES['file']
        path = os.path.realpath(__file__)
        dir = os.path.dirname(path)
        dirs = dir + '/shard_make/' 
        with open(dirs+ file.name, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        fileinfo = os.path.splitext(file.name)
        filename = fileinfo[0]
        fileext =  fileinfo[1]
            ### get current time
        newtime = timezzzz()
            ### update new file insert 
        files = Filetable.objects.filter(file_id = fileId).update(last_change = newtime, filesize=file.size, filename=filename, filetype=fileext)
            ## dun have to use serializer to save data
            ### first compress the file 
        compres_file_name = compression(file.name)
        print('file compressed')
            ### then encrypt 
        encrypt_file_name = encrypt_file(compres_file_name)
        print('file encrypted')
            ## then split the file, it returns the list of split files
        split_file_list = ecc_file(encrypt_file_name)
        print('file split')
            ## then split the pub key, it returns a list of file names for split
        split_key_list = pyshmir_split()
        print('pub key split')
            ## once file is inserted, the tables will be generated
            ## retrieve the file_version_id from fileversion_table 
        file_version_id = fileversionOnUpdate(fileId)
        print('retrieve file version')
            ## function to upload the split file parts to the db 
        upload = filepartsupload(split_file_list, split_key_list, fileId, file_version_id)
            ## remove all files in folder 
        path = os.path.realpath(__file__)
        dir = os.path.dirname(path)
        dirs = dir + ('/shard_make')
        for f in os.listdir(dirs):
            os.remove(os.path.join(dirs, f))
        return HttpResponse('file ok')
    

## view to delete from file log or Trash bin in ui
def deleteHist(request, file_id):
        # to permamently delete 
    # delete from file log 
    print('a')
    FileLog.objects.filter(file_id= file_id).delete()
    # delete from file version
    print('b')
    FileVersionLog.objects.filter(file_id=file_id).delete()
    # delete from file partslog 
    print('c')
    FilePartsLog.objects.filter(file_id=file_id).delete()
    # delete from fileserver1
    print('d')
    Server1Logs.objects.filter(file_id=file_id).delete()
    # delete from fileserver2
    print('e')
    Server2Logs.objects.filter(file_id=file_id).delete()
    # delete from fileserver3
    print('f')
    Server3Logs.objects.filter(file_id=file_id).delete()
    # delete from fileserver4
    print('g')
    Server4Logs.objects.filter(file_id=file_id).delete()
    # delete from fileserver5
    print('huh')
    Server5Logs.objects.filter(file_id=file_id).delete()
    # delete from File1
    print('f')
    File1_log.objects.filter(file_id=file_id).using('server1').delete()
    print('ff')
    File2_log.objects.filter(file_id=file_id).using('server2').delete()
    print('ff')
    File3_log.objects.filter(file_id=file_id).using('server3').delete()
    print('fff')
    File4_log.objects.filter(file_id=file_id).using('server4').delete()
    print('ffff')
    File5_log.objects.filter(file_id=file_id).using('server5').delete()
    data = {'result':'All gone'}
    return JsonResponse(data)


