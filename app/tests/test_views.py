
from rest_framework.test import APITestCase, APIRequestFactory
from django.urls import reverse
from rest_framework import status
from app.models import *
from app.views import *
from app.scripts import *
from app.serializers import *
from django.db import connection
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, RequestFactory
from rest_framework.test import force_authenticate


class ListCreateUsersTest(APITestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.url = reverse('View-All-Users')

        # Ensure that the table structure exists
        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(Users)

    def tearDown(self):
        with connection.schema_editor() as schema_editor:
            schema_editor.delete_model(Users)
    
    
    def test_list_users(self):
        # Create some sample users for testing
        user_data = [
            {'u_id': '1', 'username': 'user1', 'f_name': 'First1', 'l_name': 'Last1', 'email': 'user1@example.com', 'phone_number': '1234567890', 'usertype': 'regular'},
            {'u_id': '2', 'username': 'user2', 'f_name': 'First2', 'l_name': 'Last2', 'email': 'user2@example.com', 'phone_number': '9876543210', 'usertype': 'admin'},
        ]
        for data in user_data:
            Users.objects.create(**data)

        request = self.factory.get(self.url)

        response = ListCreateUsers.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = UsersSerializer(user_data, many=True).data
        self.assertEqual(response.data, expected_data)


    

class RetrieveEditUsersTest(APITestCase):

    def setUp(self):
        self.factory = APIRequestFactory()

        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(Users)

    def tearDown(self):
        with connection.schema_editor() as schema_editor:
            schema_editor.delete_model(Users)

    def test_retrieve_user(self):
        # Create a sample user
        user_data = {
            'u_id': 'sDvyT675LyBHJ2',
            'username': 'user1',
            'f_name': 'First1',
            'l_name': 'Last1',
            'email': 'user1@example.com',
            'phone_number': '1234567890',
            'usertype': 'regular',
        }
        user = Users.objects.create(**user_data)

        # Prepare the request
        url = reverse('Retrieve-Edit-Users', args=[user.u_id])
        request = self.factory.get(url)
        view = RetrieveEditUsers.as_view()
        response = view(request, pk=user.u_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = UsersSerializer(user).data
        self.assertEqual(response.data, expected_data)

    def test_update_user(self):
        # Create a sample user
        user_data = {
            'u_id': 'sDvyT675LyBHJ2',
            'username': 'user1',
            'f_name': 'First1',
            'l_name': 'Last1',
            'email': 'user1@example.com',
            'phone_number': '1234567890',
            'usertype': 'regular',
        }
        user = Users.objects.create(**user_data)

        # Prepare the request data for updating the user
        updated_data = {
            'f_name': 'JohnnnFirst1',
            'l_name': 'DoeeeeLast1',
            'email': 'updated_user1@example.com',
        }

        # Prepare the request
        url = reverse('Retrieve-Edit-Users', args=[user.u_id])
        request = self.factory.patch(url, data=updated_data, format='json')
        view = RetrieveEditUsers.as_view()
        response = view(request, pk=user.u_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_user = Users.objects.get(u_id=user.u_id)
        self.assertEqual(updated_user.f_name, updated_data['f_name'])
        self.assertEqual(updated_user.l_name, updated_data['l_name'])
        self.assertEqual(updated_user.email, updated_data['email'])




'''
class FileViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(Filetable)

    def tearDown(self):
        with connection.schema_editor() as schema_editor:
            schema_editor.delete_model(Filetable)

    def test_retrieve_file(self):
        # Create a sample file
        file_data = {
            'filename': 'a_file',
            'filetype': 'txt',
            'numberofparts': 5,
            'encryptiontype':'AES', 
            'client_id': 1,
            # ... other required fields ...
        }
        file_entry = Filetable.objects.create(**file_data)

        # Prepare the request
        url = reverse('file-view', args=[file_entry.file_id])
        request = self.factory.patch(url)
        view = fileview.as_view()
        response = view(request, pk = file_entry.file_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = FileSerializer(file_entry).data
        self.assertEqual(response.data, expected_data)



'''


class ListCreateFolderFileTestCase(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.url = reverse('list-create-folder-file')

        # Ensure that the table structure exists
        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(Users)
            schema_editor.create_model(Client)
            schema_editor.create_model(Filetable)
            schema_editor.create_model(Foldertable)
            schema_editor.create_model(Folderfiles)
            schema_editor.create_model(Subscription)
            schema_editor.create_model(Encryption)



    def test_list_create_folder_file(self):
        # Create a Users instance
        users = Users.objects.create(u_id='ythU76Jmn87U', username='username', f_name='First', l_name='Last', email='user@example.com', phone_number='1234567890', usertype='Client')

        subscription = Subscription.objects.create(subscriptiontype='basic', price=10, data_allocated='10GB', shards=5)

        # Create a Client instance
        client = Client.objects.create(subscriptiontype = subscription, u_id = users, client_id=1)

        encryption = Encryption.objects.create(encryption_type='AES')

        # Create a Filetable instance
        filetable = Filetable.objects.create(filename='test_file', filetype='txt', numberofparts=5, encryptiontype = encryption, client_id=client.client_id)

        # Create a Foldertable instance
        foldertable = Foldertable.objects.create(client_id=client.client_id, foldername='test_folder')

        # Create a POST request
        data = {
            'file_id': str(filetable.file_id),
            'folder_id': str(foldertable.folder_id),
        }
        request = self.factory.post(self.url, data, format='json')

        # Authenticate the request with the client instance
        force_authenticate(request, user=client)

        # Call the ListCreateFolderFile view function
        response = ListCreateFolderFile.as_view()(request)

        # Assert the response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)  # Assuming successful creation returns HTTP 201
        self.assertEqual(Folderfiles.objects.count(), 1)


'''
class UploadingFileTestCase(TestCase):
    databases = {'default', 'server1', 'server2', 'server3', 'server4', 'server5'} 

    def setUp(self):
    # Create a RequestFactory instance
        self.factory = RequestFactory()

        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(Users)
            schema_editor.create_model(Subscription)
            schema_editor.create_model(Client)
            schema_editor.create_model(Encryption)
            schema_editor.create_model(Filetable)
            schema_editor.create_model(File1)
            schema_editor.create_model(File2)
            schema_editor.create_model(File3)
            schema_editor.create_model(File4)
            schema_editor.create_model(File5)

    def test_uploading_file(self):
        # Prepare test data
        test_filename = 'test_file.txt'
        test_file_content = b'This is a Test content'

        # Create a Users instance
        users = Users.objects.create(u_id='ythU76Jmn87U', username='username', f_name='First', l_name='Last', email='user@example.com', phone_number='1234567890', usertype='Client')

        # Create a Subscription instance
        subscriptions = Subscription.objects.create(subscriptiontype='basic', price=10, data_allocated='10GB', shards=5)

        # Create a Client instance with the related Subscription instance
        clients = Client.objects.create(subscriptiontype=subscriptions, u_id=users, client_id=1)  # Adjust the fields as needed

        # Create an Encryption instance
        encryption = Encryption.objects.create(encryption_type='AES')

        # Create a Filetable instance with the associated Client and Encryption instances
        filetable = Filetable.objects.create(filename='test_file', filetype='txt', numberofparts=5, encryptiontype=encryption, client_id=clients.client_id)


        file1 = File1.objects.create(file_id = '123e4567-e89b-12d3-a456-426614174000', data=b'00101001111', file_version_id='123e4567-e89b-12d3-a456-426614174000', fileserver1_id=1, secret=b'001111110010101')
        file2 = File2.objects.create(file_id = '123e4567-e89b-12d3-a456-426614174000', data=b'001011101111', file_version_id='123e4567-e89b-12d3-a456-426614174000', fileserver2_id=1, secret=b'001111111110101')
        file3 = File3.objects.create(file_id = '123e4567-e89b-12d3-a456-426614174000', data=b'00101001111', file_version_id='123e4567-e89b-12d3-a456-426614174000', fileserver3_id=1, secret=b'001111110010101')
        file4 = File4.objects.create(file_id = '123e4567-e89b-12d3-a456-426614174000', data=b'00101001111', file_version_id='123e4567-e89b-12d3-a456-426614174000', fileserver4_id=1, secret=b'001111110010101')
        file5 = File5.objects.create(file_id = '123e4567-e89b-12d3-a456-426614174000', data=b'00101001111', file_version_id='123e4567-e89b-12d3-a456-426614174000', fileserver5_id=1, secret=b'001111110010101')



        # Create a POST request
        url = reverse('file-upload', args=[clients.client_id])  # Use your URL name
        file_data = {
            'file': SimpleUploadedFile(test_filename, test_file_content)
        }
        request = self.factory.post(url, file_data)

        # Call the uploadingFile view function
        response = uploadingFile(request, clients.client_id)

        # Assert the response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'file ok')
'''