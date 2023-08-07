from django import forms 

class testForm(forms.Form):  
    file = forms.FileField() # for creating file input  