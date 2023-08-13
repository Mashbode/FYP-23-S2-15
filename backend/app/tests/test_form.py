from django.test import TestCase
from django.core.files.uploadedfile import InMemoryUploadedFile
import PIL
from PIL import Image
from app.forms import testForm
from app.models import *
from app.serializers import *
import io


#test the file upload form
class TestFileForm(TestCase):

    def test_file_upload_form(self):

        img = Image.new(mode='RGB', size=(200, 200)) # create a new image using PIL
        animage = io.BytesIO() # a BytesIO object for saving image
        img.save(animage, 'JPEG') # save the image to im_io
        animage.seek(0) # seek to the beginning

        image = InMemoryUploadedFile(
            animage, None, 'random-name.jpg', 'image/jpeg', len(animage.getvalue()), None
        )

        file_dict = {'file': image}

        form = testForm(files=file_dict)
        self.assertTrue(form.is_valid())


    def test_file_upload_form2(self):

        im = Image.new(mode='RGB', size=(200, 200), color=(256, 0, 0))
        pdffile = io.BytesIO() # a BytesIO object for saving pdf
        im.save(pdffile, 'pdf') 
        pdffile.seek(0) # seek to the beginning

        pdf = InMemoryUploadedFile(
            pdffile, None, 'random-name.pdf', 'file/pdf', len(pdffile.getvalue()), None
        )

        file_dict = {'file': pdf}

        form = testForm(files=file_dict)
        self.assertTrue(form.is_valid())

