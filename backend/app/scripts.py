## compression packages 
import zlib 
## encryption packages 
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from base64 import b64encode, b64decode
import os, struct, time
## ecc packages 
from pyfinite import file_ecc
from pyshamir import split, combine
from pathlib import Path
#################################################################################################################################               
################################################     splitting       ############################################################

## compressing the file first 
def compression(file):
    path = os.path.realpath(__file__)
    dir = os.path.dirname(path)
    print(dir)
    ##### here to change directory
    dir = dir.replace('beta', 'shards_make')
    print(dir)
    os.chdir(dir)
    # opening the file
    org = open(file, "rb").read()
    compr_d = zlib.compress(org, wbits=15)
    temptuple = os.path.splitext(file)
    # create new name
    new_name = temptuple[0]+ '.zipped'
    file = open(new_name, 'wb')
    file.write(compr_d)
    file.close()
    
    # returns name of compressed file
    return new_name

## encrypt the file 
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


## split the file 
def ecc_file (file):
    split = os.path.splitext(file)
    prefix = split[0]
    # the function returns a list of files made
    parts = file_ecc.EncodeFile(file, prefix,5,3)
    # remove encrypted file 
    os.remove(file)
    return parts
    
## split the key 
def pyshmir_split():
    # take in the key 
    key = open('key.bin', 'rb').read()
    # set the number of shares; i.e. the number of parts to split the secret into
    num_of_shares = 5
    # threshold is minimum number of keys required to get back the secret
    threshold = 3
    # split to get a list of bytearrays which can be combined later to get back the secret
    parts = split(key, num_of_shares, threshold)
    # output to file
    chk = 0 
    for i in parts:
            name = "secret.s_"+ str(chk)
            with open(name, 'wb') as shards:
                shards.write(i)
                chk+=1
    # remove key.bin
    path = os.path.realpath(__file__)
    print(path)
    os.remove('key.bin')

########################################################################################################################################
#########################################################  combining  ##################################################################

    ## combining files with ecc
def combine_file(fileList):
    # changing dir 
    path = os.path.realpath(__file__)
    dir = os.path.dirname(path)
    ##### here to change directory
    dir = dir.replace('app', 'shards_make')
    os.chdir(dir)
    # name of recom file
    list = os.path.splitext(fileList[0]) 
    name = list[0] + '.cb' 
    file_ecc.DecodeFiles(fileList, name)
    #delete files with this extension
    for i in fileList:
        os.remove(i)
    #iterate through curr directory
    # p = Path.cwd()
    # for d in p.iterdir():
    #     if d.name[-len()]
    return name

## combining pub key 
def pyshmir_combine(keyList):
    keyt = []
    for i in keyList:
        with open(i, "rb") as fil:
            keyt.append(fil.read())
    recom = combine(keyt)
    ## write to file 
    key = open('keyc.bin', 'wb').write(recom)
    ## remove the key shards 
    for i in keyList:
        os.remove(i)

## decrypting files 
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

## decompress decrypted file
def decompress(file, ext):
    dec = open(file, 'rb').read()
    dec_d = zlib.decompress(dec, zlib.MAX_WBITS|32)
    name = os.path.splitext(file)[0] + ext
    fie = open(name, 'wb').write(dec_d)
    # remove decrypted file 
    os.remove(file)
    return name
