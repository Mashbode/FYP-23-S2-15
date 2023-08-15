# file for db 
class server1Router:
    model_type = {'File1', 'Secret', 'File1_log'}
    def db_for_read(self, model, **hints):
        """
        Attempts to read file models go to server1.
        """
        if model._meta.app_label in self.model_type:
            return 'server1'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write file models go to server1.
        """
        if model._meta.app_label in self.model_type:
            return 'server1'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the app is involved.
        """
        if obj1._meta.app_label  in self.model_type or \
           obj2._meta.app_label in self.model_type:
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'server1'
        database.
        """
        if app_label  in self.model_type:
            return db == 'server1'
        return None

class server2Router:
    model_type ={'File2', 'Secret2', 'File2_log'}
    def db_for_read(self, model, **hints):
        """
        Attempts to read file models go to server2.
        """
        if model._meta.app_label in self.model_type:
            return 'server2'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write file models go to server2.
        """
        if model._meta.app_label in self.model_type:
            return 'server2'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the app is involved.
        """
        if obj1._meta.app_label in self.model_type or \
           obj2._meta.app_label in self.model_type:
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'server2'
        database.
        """
        if app_label in self.model_type:
            return db == 'server2'
        return None
    
class server3Router:
    model_type ={'File3', 'File3_log'}
    def db_for_read(self, model, **hints):
        """
        Attempts to read file models go to server3.
        """
        if model._meta.app_label == 'FileServer3':
            return 'server3'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write file models go to server3.
        """
        if model._meta.app_label in self.model_type:
            return 'server3'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the app is involved.
        """
        if obj1._meta.app_label in self.model_type or \
           obj2._meta.app_label in self.model_type:
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'server3'
        database.
        """
        if app_label in self.model_type:
            return db == 'server3'
        return None
    
class server4Router:
    model_type ={'File4', 'File4_log'}
    def db_for_read(self, model, **hints):
        """
        Attempts to read file models go to server4.
        """
        if model._meta.app_label in self.model_type:
            return 'server4'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write file models go to server4.
        """
        if model._meta.app_label  in self.model_type:
            return 'server4'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the app is involved.
        """
        if obj1._meta.app_label  in self.model_type or \
           obj2._meta.app_label  in self.model_type:
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'server4'
        database.
        """
        if app_label in self.model_type:
            return db == 'server4'
        return None

class server5Router:
    model_type ={'File5', 'File5_log'}
    def db_for_read(self, model, **hints):
        """
        Attempts to read file models go to server5.
        """
        if model._meta.app_label in self.model_type:
            return 'server5'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write file models go to server5.
        """
        if model._meta.app_label  in self.model_type:
            return 'server5'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the app is involved.
        """
        if obj1._meta.app_label  in self.model_type or \
           obj2._meta.app_label  in self.model_type:
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'server5'
        database.
        """
        if app_label in self.model_type:
            return db == 'server5'
        return None
        