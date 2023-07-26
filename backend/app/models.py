# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import uuid
from django.utils import timezone

class Admintab(models.Model):
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    admin_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'admintab'


class Client(models.Model):
    subscriptiontype = models.ForeignKey('Subscription', models.DO_NOTHING, db_column='subscriptiontype', blank=True, null=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    client_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'client'

class DeleteFolderFileLogs(models.Model):
    folder_files_id = models.IntegerField(primary_key = True, blank=True)
    file_id = models.UUIDField(blank=True, null=True)
    folder_id = models.IntegerField(blank=True, null=True)
    creation_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    delete_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'delete_folder_file_logs'

class Encryption(models.Model):
    encryption_type = models.CharField(primary_key=True, max_length=20)

    class Meta:
        managed = False
        db_table = 'encryption'


#fileabc_log tables are auto generated when a file is deleted
class FileLog(models.Model):
    file_id = models.UUIDField(primary_key=True)
    filename = models.CharField(max_length=50, blank=True, null=True)
    filetype = models.CharField(max_length=50, blank=True, null=True)
    numberofparts = models.IntegerField(blank=True, null=True)
    encryptiontype = models.CharField(max_length=50, blank=True, null=True)
    client_id = models.IntegerField(blank=True, null=True)
    file_version_id = models.UUIDField(blank=True, null=True)
    uploadtime = models.DateTimeField(blank=True, null=True)
    last_change = models.DateTimeField(blank=True, null=True)
    delete_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'file_log'


class FilePartsLog(models.Model):
    file_part_id = models.UUIDField(primary_key=True)
    part_number = models.IntegerField(blank=True, null=True)
    file_id = models.UUIDField(blank=True, null=True)
    file_version_id = models.UUIDField(blank=True, null=True)
    last_change = models.DateTimeField(blank=True, null=True)
    server_name = models.CharField(blank=True, null=True)
    delete_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'file_parts_log'


class FileVersionLog(models.Model):
    file_version_id = models.UUIDField(primary_key=True)
    file_id = models.UUIDField(blank=True, null=True)
    version_file = models.IntegerField(blank=True, null=True)
    last_change = models.DateTimeField(auto_now_add=True)
    delete_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'file_version_log'


class Fileparts(models.Model):
    file_part_id = models.UUIDField(primary_key=True,  default = uuid.uuid4, editable = False)
    part_number = models.IntegerField(blank=True, null=True)
    file = models.ForeignKey('Filetable', models.DO_NOTHING, blank=True, null=True)
    file_version = models.ForeignKey('Fileversion', models.DO_NOTHING, blank=True, null=True)
    last_change = models.DateTimeField(auto_now_add=True)
    server_name = models.CharField(blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'fileparts'


class Filesharehistory(models.Model):
    share = models.ForeignKey('Sharedfileaccess', models.DO_NOTHING)
    client_id = models.IntegerField()
    file_id = models.UUIDField(blank=True, null=True)
    permission_type = models.CharField(max_length=20, blank=True, null=True)
    shared_client_id = models.IntegerField(blank=True, null=True)
    create_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'filesharehistory'


class Filetable(models.Model):
    file_id = models.UUIDField(primary_key=True, default = uuid.uuid4, editable = False)
    filename = models.CharField(max_length=50, blank=True, null=True)
    filetype = models.CharField(max_length=50, blank=True, null=True)
    numberofparts = models.IntegerField(blank=True, null=True)
    encryptiontype = models.ForeignKey(Encryption, models.DO_NOTHING, db_column='encryptiontype', blank=True, null=True)
    client = models.ForeignKey(Client, models.DO_NOTHING, blank=True, null=True)
    #file_version = models.ForeignKey('Fileversion', models.DO_NOTHING, blank=True, null=True)
    last_change = models.DateTimeField(auto_now=True)
    uploadtime = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'filetable'


class Fileversion(models.Model):
    file_version_id = models.UUIDField(primary_key=True, default = uuid.uuid4, editable = False)
    file = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version = models.IntegerField(blank=True, null=True)
    last_change = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'fileversion'



class FolderLogs(models.Model):
    folder_id = models.IntegerField(primary_key=True)
    client_id = models.IntegerField(blank=True, null=True)
    foldername = models.CharField(max_length=50, blank=True, null=True)
    creation_time = models.DateTimeField(blank=True, null=True)
    last_change = models.DateTimeField(blank=True, null=True)
    delete_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'folder_logs'


class Folderfiles(models.Model):
    folder_files_id = models.AutoField(primary_key=True)
    file = models.ForeignKey('Filetable', models.DO_NOTHING, blank=True, null=True)
    folder = models.ForeignKey('Foldertable', models.DO_NOTHING, blank=True, null=True)
    time_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'folderfiles'


class Foldersharehistory(models.Model):
    share = models.ForeignKey('Sharedfolderaccess', models.DO_NOTHING)
    client_id = models.IntegerField()
    folder_id = models.IntegerField()
    permission_type = models.CharField(max_length=20, blank=True, null=True)
    shared_client_id = models.IntegerField(blank=True, null=True)
    create_time = models.DateTimeField( primary_key=True, auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'foldersharehistory'
        unique_together = (('create_time', 'share'),)


class Foldertable(models.Model):
    folder_id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, models.DO_NOTHING, blank=True, null=True)
    foldername = models.CharField(max_length=50, blank=True, null=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    last_change = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'foldertable'


class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    subscriptiontype = models.ForeignKey('Subscription', models.DO_NOTHING, db_column='subscriptiontype', blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    client = models.ForeignKey(Client, models.DO_NOTHING, blank=True, null=True)
    date = models.DateTimeField(auto_now=True)
    pay_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'invoice'

class InvoiceLog(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    subscriptiontype = models.CharField(max_length=50, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    client_id = models.IntegerField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)
    pay_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'invoice_log'

class Permission(models.Model):
    permission_type = models.CharField(primary_key=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'permission'


class Server1(models.Model):

    server1_id = models.AutoField(primary_key=True)
    file_id = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part = models.ForeignKey(Fileparts, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'server1'


class Server1Logs(models.Model):

    server1_id = models.IntegerField(primary_key=True, blank=True)
    file_id = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version_id = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part_id = models.ForeignKey(Fileparts, models.DO_NOTHING)
    delete_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'server1_logs'


class Server2(models.Model):
    server2_id = models.AutoField(primary_key=True)
    file_id = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part = models.ForeignKey(Fileparts, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'server2'


class Server2Logs(models.Model):
    server2_id = models.IntegerField(primary_key=True, blank=True)
    file_id = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version_id = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part_id = models.ForeignKey(Fileparts, models.DO_NOTHING)
    delete_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'server2_logs'


class Server3(models.Model):
    server3_id = models.AutoField(primary_key=True)
    file_id =models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part = models.ForeignKey(Fileparts, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'server3'


class Server3Logs(models.Model):
    server3_id = models.IntegerField(primary_key= True, blank=True)
    file_id = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version_id = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part_id = models.ForeignKey(Fileparts, models.DO_NOTHING)
    delete_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'server3_logs'


class Server4(models.Model):
    server4_id = models.AutoField(primary_key=True)
    file_id = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part = models.ForeignKey(Fileparts, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'server4'


class Server4Logs(models.Model):
    server4_id = models.IntegerField(primary_key=True, blank=True)
    file_id = models.ForeignKey(Filetable, models.DO_NOTHING)
    file_version_id = models.ForeignKey(Fileversion, models.DO_NOTHING)
    file_part_id = models.ForeignKey(Fileparts, models.DO_NOTHING)
    delete_time = models.DateTimeField(auto_now_add=True)


    class Meta:
        managed = False
        db_table = 'server4_logs'


class Sharedfileaccess(models.Model):
    file = models.ForeignKey(Filetable, models.DO_NOTHING)
    client = models.ForeignKey(Client, models.DO_NOTHING)
    share_id = models.AutoField(primary_key=True)
    permission_type = models.ForeignKey(Permission, models.DO_NOTHING, db_column='permission_type', blank=True, null=True)
    shared_client_id = models.IntegerField(blank=True, null=True)
    create_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'sharedfileaccess'


class Sharedfolderaccess(models.Model):
    folder = models.ForeignKey(Foldertable, models.DO_NOTHING)
    client = models.ForeignKey(Client, models.DO_NOTHING)
    share_id = models.AutoField(primary_key=True)
    permission_type = models.ForeignKey(Permission, models.DO_NOTHING, db_column='permission_type', blank=True, null=True)
    shared_client_id = models.IntegerField(blank=True, null=True)
    create_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'sharedfolderaccess'


class Subscription(models.Model):
    subscriptiontype = models.CharField(primary_key=True, max_length=20)
    price = models.IntegerField(blank=True, null=True)
    data_allocated = models.CharField(max_length=20, blank=True, null=True)
    shards = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'subscription'


class Users(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    pssword = models.CharField(max_length=50)
    f_name = models.CharField(max_length=50)
    l_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'users'




#FILESERVER1
class File(models.Model):
    file_id = models.UUIDField()
    data = models.BinaryField(blank=True, null=True)
    file_version_id = models.UUIDField()
    fileserver1_id = models.AutoField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'file'


class Secret(models.Model):
    secret = models.CharField(primary_key=True, max_length=50)
    file_id = models.UUIDField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'secret'
