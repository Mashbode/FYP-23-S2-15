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

##########################################################################
            ## these are the key functions  ##
##########################################################################
### this for getting all versions of a particular file
class getFileversions(generics.ListAPIView):
    # queryset = Fileversion.objects.all()
    serializer_class = FileVersionSerializer
    # lookup_field = 'file_id'
    def get_queryset(self):
        return Fileversion.objects.filter(file_id=self.kwargs['file_id'])
##########################################################################
#####################################################################################
## this works for some reason #########keeep this ################## works
## need to provide client_id # not user_id 
def uploadingFile(request, client_id):
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
            c_id = client_id
            ###
            print('insert into file tab')
            ### insert into file table first to generate file_id (uuid)
            files = Filetable.objects.create(filename = filename, filetype = fileext, client_id = c_id)
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
    else:
        test = testForm()
        ## the html.html need to replace with the frontend stuff i think
        return render(request,"html.html", {'form':test})
    


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
            files = Filetable.objects.filter(file_id = fileId).update(last_change = newtime)
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
    # print('e')
    ## checking if the file exists but does not belong to the current client.
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
        d1 = File1.objects.filter(file_id =fileId).using('server1').delete() 
        print('b')
        d2 = File2.objects.filter(file_id=fileId).using('server2').delete()
        print('c')
        d3 = File3.objects.filter(file_id=fileId).using('server3').delete()
        print('d')
        d4 = File4.objects.filter(file_id=fileId).using('server4').delete()
        print('e')
        d5 = File5.objects.filter(file_id=fileId).using('server5').delete()
        detail = {'status':'success',
                'message': 'file deleted'}
    except:
        detail ={'status': 'fail',
                 'message': 'error occured'}
    return JsonResponse(detail)