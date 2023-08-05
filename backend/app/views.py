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
from django.http import HttpResponse

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



## my stufff 
# Create your views here.
#view all users 
class userList(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer 
#view individual user to edit   
class EdituserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
class addUser(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
# view Admin
class adminList(generics.ListAPIView):
    queryset = Admintab.objects.all()
    serializer_class = AdminSerializer

# view admin to edit 
class EditAdminDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Admintab.objects.all()
    serializer_class = AdminSerializer

#view clients
class clientList(generics.ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

# view client to edit 
class EditClientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class deleteclient(generics.RetrieveDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
#view all file info 
class fileList(generics.ListAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer
#view single file
class fileview(generics.RetrieveAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer
#update file info 
class fileEdit(generics.RetrieveUpdateAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer
#creating file 
class fileAdd(generics.ListCreateAPIView):
    queryset = Filetable.objects.all()
    serializer_class = FileSerializer

#deletingfile
class fileDelete(generics.RetrieveDestroyAPIView):
    serializer_class = FileSerializer
    queryset = Filetable.objects.all()

#view file version
class fileversionview(generics.ListAPIView):
    queryset = Fileversion.objects.all()
    serializer_class = FileVersionSerializer
#add fil version 
class fileVersionAdd(generics.CreateAPIView):
    queryset = Fileversion.objects.all()
    serializer_class = FileVersionSerializer

#update file version
class fileVersionUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fileversion.objects.all()
    serializer_class= FileVersionSerializer

class splitFilesIntoServer(generics.CreateAPIView):
    queryset = Server1.objects.all()

########


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
##########################################################################
 ## standard queries ##
def file():
            # Connect to the PostgreSQL database
    conn = psycopg2.connect(database="MainDB", user="postgres",
						password="Mashed99", host="localhost", port="5432")
    
    cur = conn.cursor()
    # smt = "SELECT file_id FROM filetab WHERE client_id =%s and uploadtime = "
    smt = "SELECT file_id from filetab order by uploadtime DESC NULLs LAST LIMIT 1;"
    # cur.execute(smt,(1,))
    cur.execute(smt)
    data = cur.fetchone()
    # for row in data:
        # print(row)
    print(data[0])
    
    cur.close()
    conn.close()
    #gets file_id of the latest uploaded file 
    return data[0]

## function to get the fileversionID for the newly inserted file
def fileversionOnInsert(file_id):
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(database="MainDB", user="postgres",
						password="Mashed99", host="localhost", port="5432")
    # query = Fileversion.objects.get(file_id= file_id)
    # serialize = fileversiontest(query)
    # print(serialize)
    cur = conn.cursor()
    smt = "SELECT file_version_id FROM fileversion WHERE file_id ="+ str(file_id) 
    cur.execute(smt)
    data = cur.fetchone()
    print(data[0])
    cur.close()
    conn.close()
    return data[0]
#########################################################################
##########################################################################

## when inserting file
class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES['file']
        # Here you can add code to modify the file
        # ...
        return Response(status=204)


@api_view(['POST'])
# insert file ## the parameters that is needed is client_id
def fileUploadTotal(request, client_id):
    file = request.FILES['file']
    # Here you can add code to handle the uploaded file
    # For example, you could save the file to a specific folder on your server
    with open('/shard_make' + file.name, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    ### first compress the file 
    compres_file_name = compression(file.name)
    ### then encrypt 
    encrypt_file_name = encrypt_file(compres_file_name)
    ## then split the file
    split_file_list = ecc_file(encrypt_file_name)
    ## then split the pub key
    split_key_list = pyshmir_split()
    fileinfo = os.path.splitext(file.name)
    filename = fileinfo[0]
    fileext =  fileinfo[1]
    ### insert into file table first to generate file_id (uuid)
    files = File()
    return HttpResponse('File uploaded successfully')


@api_view(['POST'])
def fileInsert(request):
    #this part will only work with html so need to test with frontend
    # file info to insert
    # filename = request.POST.get['filename']
    # filetype = request.POST.get['filetype']
    # encryption = request.POST.get['encryptiontype']
    # client = request.POST.get['client']
    # filess = Filetab(filename, filetype,encryption,client)
    # serializer= FileSerializer(data=request.data)
    ##
    ## this is to insert new file entry
    serializer= FileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    ## after saving we will pull the file_id of the latest added file
    latest = file()
    version = fileversionOnInsert(latest)


    return Response(serializer.data)

@api_view()
def test(request,pk,name):
    # dd = file()
    print(str(pk))
    print(str(name))
    return  Response({"message": "Hello, world!"})

@api_view(['POST'])
def fileupdate(request, pk):
    file = Filetable.objects.get(id=pk)
    serializer = FileSerializer(instance = file, data = request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

##########################################################################
##########################################################################