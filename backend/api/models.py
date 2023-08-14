from django.db import models

# Create your models here.
class Users(models.Model):
    # `user_id = models.AutoField(primary_key=True)` is creating a field named `user_id` in the
    # `Users` model. This field is an AutoField, which means that it automatically generates a unique
    # integer value for each new record that is inserted into the database. The `primary_key=True`
    # argument specifies that this field is the primary key for the model, which means it uniquely
    # identifies each record in the table.
    user_id = models.AutoField(primary_key=True)
    uid = models.CharField(max_length=50, blank=True, null=True)
    username = models.CharField(max_length=50)
    f_name = models.CharField(max_length=50, blank=True, null=True)
    l_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=50)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    usertype = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'users'