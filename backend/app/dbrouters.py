class server1Router:

    def db_for_read(self, model, **hints):
        """
        Attempts to read file models go to server1.
        """
        if model._meta.app_label == 'FileServer1':
            return 'server1'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write file models go to server1.
        """
        if model._meta.app_label == 'FileServer1':
            return 'server1'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the app is involved.
        """
        if obj1._meta.app_label == 'FileServer1' or \
           obj2._meta.app_label == 'FileServer1':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'server1'
        database.
        """
        if app_label == 'FileServer1':
            return db == 'server1'
        return None