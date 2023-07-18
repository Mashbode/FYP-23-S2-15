from rest_framework import serializers
from .models import *

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admintab
        fields = ('__all__')

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('__all__')

class DelFolderFileLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeleteFolderFileLogs
        fields = ('__all__')


class EncryptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encryption
        fields = ('__all__')

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filetable
        fields = ('__all__')
        #fields = ('folder_id',)


class FileLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileLog
        fields = ('__all__')

class FilePartsLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilePartsLog
        fields = ('__all__')

class FileVersionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileVersionLog
        fields = ('__all__')

class FilePartsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fileparts
        fields = ('__all__')

class FileShareHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Filesharehistory
        fields = ('__all__')

class FileVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fileversion
        fields = ('__all__')



class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foldertable
        fields = ('__all__')

class FolderLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderLogs
        fields = ('__all__')

class FolderFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folderfiles
        fields = ('__all__')


class FolderShareHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Foldersharehistory
        fields = ('__all__')

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ('__all__')

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('__all__')

class Server1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Server1
        fields = ('__all__')

class Server1LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server1Logs
        fields = ('__all__')


class Server2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Server2
        fields = ('__all__')

class Server2LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server2Logs
        fields = ('__all__')


class Server3Serializer(serializers.ModelSerializer):
    class Meta:
        model = Server3
        fields = ('__all__')

class Server3LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server3Logs
        fields = ('__all__')



class Server4Serializer(serializers.ModelSerializer):
    class Meta:
        model = Server4
        fields = ('__all__')

class Server4LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server4Logs
        fields = ('__all__')


class ShareFileAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sharedfileaccess
        fields = ('__all__')

class ShareFolderAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sharedfolderaccess
        fields = ('__all__')

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('__all__')

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('__all__')

