## compression packages 
import zlib 
## encryption packages 
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from base64 import b64encode, b64decode
#other stuff
import os, struct, time
from .models import *
## ecc packages 
from pyfinite import file_ecc
from pyshamir import split, combine
from pathlib import Path
### time stuff 
from datetime import datetime
import time
from zoneinfo import ZoneInfo
import psycopg2
from django.http import HttpResponse, JsonResponse
################################################     splitting       ############################################################

## compressing the file first #1
def compression(file):
    start1 = time.time()
    path = os.path.realpath(__file__)
    dir = os.path.dirname(path)
    print(dir)
    dirs = dir + ('/shard_make')
    # print(dirs)
    os.chdir(dirs)
    # opening the file
    org = open(file, "rb").read()
    compr_d = zlib.compress(org)
    temptuple = os.path.splitext(file)
    # create new name
    new_name = temptuple[0]+ '.zipped'
    file = open(new_name, 'wb')
    file.write(compr_d)
    file.close()
    end1 = time.time()
    print('compression done in : ', ((end1-start1)), "sec" )
    # returns name of compressed file
    return new_name

## encrypt the file #2
def encrypt_file(file, out_filename = None, chunksize=64*1024):
    start1 = time.time() 
    # generate 128 bit pub key for AES_CBC encryption 
    pubkey = get_random_bytes(16)
    # write pubkey to file 
    keyfile = open('key.bin', 'wb')
    keyfile.write(pubkey)
    keyfile.close()
    # generate iv 
    iv = get_random_bytes(16)
    aes = AES.new(pubkey, AES.MODE_CBC, iv)
    filesize = os.path.getsize(file)
    if not out_filename:
        newname = os.path.splitext(file)
        out_filename = newname[0] + '.enc'
    with open(file, "rb") as infile:
        with open(out_filename, 'wb') as outfile:
            outfile.write(struct.pack('<Q', filesize))
            outfile.write(iv)

            while True:
                chunk = infile.read(chunksize)

                if len(chunk) ==0:
                    break
                elif len(chunk) %16 !=0:
                    chunk += b' ' * (16 - len(chunk) % 16)
                
                outfile.write(aes.encrypt(chunk))
    end1 = time.time()
    print('encryption done in : ', ((end1-start1)), "sec" )
    # remove compressed file
    os.remove(file)
    # returns name of encrypted file
    return out_filename


## split the file #3
def ecc_file (file):
    start1 = time.time() 
    split = os.path.splitext(file)
    prefix = split[0]
    # the function returns a list of files made
    parts = file_ecc.EncodeFile(file, prefix,7,4)
    # remove encrypted file 
    os.remove(file)
    end1 = time.time()
    print('File split done in : ', ((end1-start1)), "sec" )
    return parts
    
## split the key #4
def pyshmir_split():
    start1 = time.time() 
    # take in the key 
    key = open('key.bin', 'rb').read()
    # set the number of shares; i.e. the number of parts to split the secret into
    num_of_shares = 7
    # threshold is minimum number of keys required to get back the secret
    threshold = 4
    # split to get a list of bytearrays which can be combined later to get back the secret
    parts = split(key, num_of_shares, threshold)
    # output to file
    chk = 0 
    # list to store names of key shards 
    keylist = []
    for i in parts:
            name = "secret.s_"+ str(chk)
            keylist.append(name)
            with open(name, 'wb') as shards:
                shards.write(i)
                chk+=1
    end1 = time.time()
    print('Key split done in : ', ((end1-start1)), "sec" )
    # remove key.bin
    path = os.path.realpath(__file__)
    print(path)
    os.remove('key.bin') 
    return keylist

#########################################################  combining  ##################################################################

    ## combining files with ecc #1
def combine_file(fileList):
    # changing dir 
    # path = os.path.realpath(__file__)
    # dir = os.path.dirname(path)
    # dirs = dir + ('/shard_retrieve')
    # os.chdir(dirs)
    start1 = time.time()
    # name of recom file
    list = os.path.splitext(fileList[0]) 
    name = list[0] + '.cb' 
    file_ecc.DecodeFiles(fileList, name)
    #delete files with this extension
    for i in fileList:
        os.remove(i)
    end1 = time.time()
    print('file combination done in : ', ((end1-start1)), "sec" )
    return name

## combining pub key #2
def pyshmir_combine(keyList):
    start1 = time.time() 
    keyt = []
    for i in keyList:
        with open(i, "rb") as fil:
            keyt.append(fil.read())
    recom = combine(keyt)
    ## write to file 
    key = open('keyc.bin', 'wb').write(recom)
    end1 = time.time()
    print('Key reconstion done in : ', ((end1-start1)), "sec" )
    ## remove the key shards 
    for i in keyList:
        os.remove(i)

## decrypting files  #3
def decrypt(file, out_filename = None, chunksize=64*1024):
    start1 = time.time() 
    if not out_filename:
        out_filename = os.path.splitext(file)[0] + '.de'
    
    ## for now ##
    key = open('keyc.bin', 'rb').read()
    ##
    with open(file, 'rb') as infile:
        origsize = struct.unpack('<Q', infile.read(struct.calcsize('Q')))[0]
        iv = infile.read(16)
        decryptor = AES.new(key, AES.MODE_CBC, iv)
    ## write decrypted file into new file    
        with open(out_filename, 'wb') as outfile:
            while True:
                chunk = infile.read(chunksize)
                if len(chunk) == 0:
                    break
                outfile.write(decryptor.decrypt(chunk))

            outfile.truncate(origsize)
    
    end1 = time.time()
    print('decryption done in : ', ((end1-start1)), "sec" )
    #remove the recombined file
    os.remove(file)
    #remove keyc_bin file 
    os.remove('keyc.bin')
    return out_filename

## decompress decrypted file #4
def decompress(file, ext, filename):
    start1 = time.time() 
    dec = open(file, 'rb').read()
    dec_d = zlib.decompress(dec, zlib.MAX_WBITS|32)
    name = filename + ext
    fie = open(name, 'wb').write(dec_d)
    end1 = time.time()
    print('decompression done in : ', ((end1-start1)), "sec" )
    # remove decrypted file 
    os.remove(file)
    return name

###############################################################################################################################################

########################################################################
###################### Other scripts ###################################
## to get time stamp 
def timezzzz():
    sgtime = datetime.now(tz=ZoneInfo("Asia/Singapore"))
    return sgtime

##########################################################################################
                            ## standard queries ##
## this retrieves the file_id of the latest file uploaded to the db
def filegetting():
            # Connect to the PostgreSQL database
    conn = psycopg2.connect(database="metadatadb", user="postgres",
						password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
    
    cur = conn.cursor()
    # smt = "SELECT file_id FROM filetab WHERE client_id =%s and uploadtime = "
    smt = "SELECT file_id from filetable order by uploadtime DESC NULLs LAST LIMIT 1;"
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
    # conn = psycopg2.connect(database="metadatadb", user="postgres",
	# 					password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
    # cur = conn.cursor()
    # smt = "SELECT file_version_id FROM fileversion WHERE file_id = '"+ str(file_id) +"'"
    # cur.execute(smt)
    # data = cur.fetchone()
    # print(data[0])
    # cur.close()
    # conn.close()
    # return data[0]
    version = Fileversion.objects.filter(file_id=file_id).values('file_version_id')
    data = version[0]['file_version_id']
    return data

## function to get fileversionID for newly updated file 
def fileversionOnUpdate(file_id):
    # connect to db 
    conn = psycopg2.connect(database="metadatadb", user="postgres",
						password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
    cur = conn.cursor()
    # smt = "SELECT file_version_id FROM fileversion WHERE file_id='" + str(file_id) + "' and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id='" +str(file_id) +"' )"
    cur.execute("SELECT file_version_id FROM fileversion WHERE file_id= '%s' and file_version=(SELECT MAX(file_version) FROM fileversion WHERE file_id='%s')", (file_id,file_id))
    data = cur.fetchone()
    print(data[0])
    cur.close()
    conn.close()
    return data[0]

## uploading the file parts to the file servers
def filepartsupload(filelist, keylist, fileid, fileversion):
    file_list = filelist
    key_list = keylist 
    ## insert 1st file shard 
    file1= open(file_list[0], 'rb').read()
    key1 = open(key_list[0],'rb').read()
    fileshard1 = File1(file_id = fileid, data = file1, file_version_id =fileversion, secret=key1)
    fileshard1.save(using='server1')
    ## insert 2nd file shard
    file2 = open(file_list[1],'rb').read()
    key2 = open(key_list[1],'rb').read()
    fileshard2 = File2(file_id = fileid, data= file2, file_version_id = fileversion, secret=key2)
    fileshard2.save(using='server2')
    ## insert 3rd file shard 
    file3 = open(file_list[2], 'rb').read()
    key3 = open(key_list[2],'rb').read()
    fileshard3 = File3(file_id = fileid, data= file3, file_version_id = fileversion, secret=key3)
    fileshard3.save(using='server3')
    ## insert 4th file shard 
    file4 = open(file_list[3],'rb').read()
    key4= open(key_list[3],'rb').read()
    fileshard4= File4(file_id = fileid, data= file4, file_version_id = fileversion, secret=key4)
    fileshard4.save(using='server4')
    ## insert 5th file shard 
    file5 = open(file_list[4],'rb').read()
    key5= open(key_list[4],'rb').read()
    fileshard5= File5(file_id = fileid, data= file5, file_version_id = fileversion, secret=key5)
    fileshard5.save(using='server5')
    ## inserting into azure db 
    ## server 6
    file6 = open(file_list[5],'rb').read()
    key6= open(key_list[5],'rb').read()
    fileshard6= File6(file_id = fileid, data= file6, file_version_id = fileversion, secret=key6)
    fileshard6.save(using='server6')
    ## server 7
    file7 = open(file_list[6],'rb').read()
    key7= open(key_list[6],'rb').read()
    fileshard7= File7(file_id = fileid, data= file7, file_version_id = fileversion, secret=key7)
    fileshard7.save(using='server7')
    return True
################################################################################################################################################

############################    for retrieving current file ###############################
## to get current file version
def getCurrentFileversion(file_id):
     # connect to db 
    # conn = psycopg2.connect(database="metadatadb", user="postgres",
	# 					password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
    # cur = conn.cursor()
    # smt = "SELECT file_version_id FROM fileversion WHERE file_id='" + str(file_id) + "' and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id='" +str(file_id) +"' )"
    # cur.execute(smt)
    # data = cur.fetchone()
    # print(data[0])
    # cur.close()
    # conn.close()
    # return data[0]
    file = Fileversion.objects.filter(file_id=file_id).values('file_version_id')
    data = file[0]['file_version_id']
    return data

## get file info 
def getfileinfo(file_id):
     # connect to db 
    # conn = psycopg2.connect(database="metadatadb", user="postgres",
	# 					password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
    # cur = conn.cursor()
    # smt = "SELECT filename, filetype FROM filetable WHERE file_id='" + str(file_id) + "'"
    # cur.execute(smt)
    # data = cur.fetchone()
    # # print(data[0])
    # cur.close()
    # conn.close()
    # return data[0], data[1]
    file = Filetable.objects.filter(file_id=file_id).values('filename', 'filetype')
    name = file[0]['filename']
    type = file[0]['filetype']
    return name, type

def getAllfileAndSecretparts(fileID, fileVersion):
    file_list = []
    key_list = []
    ## take from fileserver1
    count = 0
    try:
        # conn = psycopg2.connect(database="FileServer1", user="postgres",
		# 				password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
        # cur = conn.cursor()
        # smt = "SELECT data, secret FROM file1 WHERE file_id='" + str(fileID) + "' and file_version_id='" + str(fileVersion) +"'"
        # cur.execute(smt)
        # data = cur.fetchone()
        # key_list.append(data[1])
        # file_list.append(data[0])
        take = File1.objects.filter(file_id=fileID, file_version_id=fileVersion).values('data','secret').using('server1')
        key_list.append(take[0]['secret'])
        file_list.append(take[0]['data'])
    except:
        print('fileserver1 down')
        count+=1
    
    ## take from fileserver2
    try:
        # conn = psycopg2.connect(database="FileServer2", user="postgres",
		# 				password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
        # cur = conn.cursor()
        # smt = "SELECT data, secret FROM file2 WHERE file_id='" + str(fileID) + "' and file_version_id='" + str(fileVersion) +"'"
        # cur.execute(smt)
        # data = cur.fetchone()
        # key_list.append(data[1])
        # file_list.append(data[0])
        take = File2.objects.filter(file_id=fileID, file_version_id=fileVersion).values('data','secret').using('server2')
        key_list.append(take[0]['secret'])
        file_list.append(take[0]['data'])
    except:
        print('fileserver2 down')
        count+=1

    ## take from fileserver3
    try:
        # conn = psycopg2.connect(database="FileServer3", user="postgres",
		# 				password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
        # cur = conn.cursor()
        # smt = "SELECT data, secret FROM file3 WHERE file_id='" + str(fileID) + "' and file_version_id='" + str(fileVersion) +"'"
        # cur.execute(smt)
        # data = cur.fetchone()
        # key_list.append(data[1])
        # file_list.append(data[0])
        take = File3.objects.filter(file_id=fileID, file_version_id=fileVersion).values('data','secret').using('server3')
        key_list.append(take[0]['secret'])
        file_list.append(take[0]['data'])
    except:
        print('fileserver3 down')
        count+=1

    ## take from fileserver4
    try:
        # conn = psycopg2.connect(database="FileServer4", user="postgres",
		# 				password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
        # cur = conn.cursor()
        # smt = "SELECT data, secret FROM file4 WHERE file_id='" + str(fileID) + "' and file_version_id='" + str(fileVersion) +"'"
        # cur.execute(smt)
        # data = cur.fetchone()
        # key_list.append(data[1])
        # file_list.append(data[0])
        take = File4.objects.filter(file_id=fileID, file_version_id=fileVersion).values('data','secret').using('server4')
        key_list.append(take[0]['secret'])
        file_list.append(take[0]['data'])
    except:
        print('fileserver4  down')
        count+=1
       
    ## take from fileserver5
    try:
        # conn = psycopg2.connect(database="FileServer5", user="postgres",
		# 				password="passcanliao", host="testdb.c9ybbr2jzshu.ap-southeast-1.rds.amazonaws.com", port="5432")
        # cur = conn.cursor()
        # smt = "SELECT data, secret FROM file5 WHERE file_id='" + str(fileID) + "' and file_version_id='" + str(fileVersion) +"'"
        # cur.execute(smt)
        # data = cur.fetchone()
        # key_list.append(data[1])
        # file_list.append(data[0])
        take = File5.objects.filter(file_id=fileID, file_version_id=fileVersion).values('data','secret').using('server5')
        key_list.append(take[0]['secret'])
        file_list.append(take[0]['data'])
    except:
        print('fileserver5  down')
        count+=1
    
     ## take from fileserver6 AZURE
    try:
        take = File6.objects.filter(file_id=fileID, file_version_id=fileVersion).values('data','secret').using('server6')
        key_list.append(take[0]['secret'])
        file_list.append(take[0]['data'])
    except:
        print('fileserver6  down')
        count+=1
    
    ## take from fileserver7 AZURE
    try:
        take = File7.objects.filter(file_id=fileID, file_version_id=fileVersion).values('data','secret').using('server7')
        key_list.append(take[0]['secret'])
        file_list.append(take[0]['data'])
    except:
        print('fileserver7  down')
        count+=1

    if count == 5 :
        data = 'file data not in file server'
        return  0, 0, data
    
    # changing the directory
    path = os.path.realpath(__file__)
    print(path)
    dir = os.path.dirname(path)
    print(dir)
    dirs = dir+'/shard_retrieve'
    os.chdir(dirs)

    # write secret file 
    chk =0
    namelist = []
    for i in key_list:
        name = "secret.s_"+ str(chk)
        namelist.append(name)
        with open(name, 'wb') as shards:
            shards.write(i)
            chk+=1

    # write fileshards 
    dsh = 0
    filename=[]
    for i in file_list:
        name = "shard.p_" + str(dsh)
        filename.append(name)
        with open(name, 'wb') as shards:
            shards.write(i)
            dsh +=1

    return namelist, filename, 'ok'
#######################################################################################################################################################