-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;

CREATE SEQUENCE admin_admin_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.admintab
(
    user_id integer,
    admin_id integer NOT NULL DEFAULT nextval('admin_admin_id_seq'::regclass),
    CONSTRAINT admin_pkey PRIMARY KEY (admin_id)
        INCLUDE(admin_id)
);

CREATE SEQUENCE client_Client_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.client
(
    subscriptiontype character varying(20) COLLATE pg_catalog."default",
    user_id integer,
    client_id integer NOT NULL DEFAULT nextval('client_Client_id_seq'::regclass),
    CONSTRAINT client_pkey PRIMARY KEY (client_id)
        INCLUDE(client_id)
);

CREATE TABLE IF NOT EXISTS public.delete_folder_file_logs
(
    folder_files_id integer,
    file_id uuid,
    folder_id integer,
    creation_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    delete_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.encryption
(
    encryption_type character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Encryption_pkey" PRIMARY KEY (encryption_type)
);

CREATE TABLE IF NOT EXISTS public.filetable
(
    file_id uuid NOT NULL DEFAULT gen_random_uuid(),
    folder_id integer,
    filename character varying(50) COLLATE pg_catalog."default",
    filetype character varying(50) COLLATE pg_catalog."default",
    numberofparts integer,
    encryptiontype character varying(20) COLLATE pg_catalog."default",
    client_id integer,
    file_version_id uuid,
    last_change timestamp with time zone,
    uploadtime timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "File_pkey" PRIMARY KEY (file_id)
);

CREATE TABLE IF NOT EXISTS public.file_log
(
    file_id uuid,
    folder_id integer,
    filename character varying(50) COLLATE pg_catalog."default",
    filetype character varying(50) COLLATE pg_catalog."default",
    numberofparts integer,
    encryptiontype character varying(50) COLLATE pg_catalog."default",
    client_id integer,
    file_version_id uuid,
    uploadtime timestamp with time zone,
    last_change timestamp with time zone,
    delete_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.file_parts_log
(
    file_part_id uuid,
    part_number integer,
    file_id uuid,
    file_version_id uuid,
    last_change timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    delete_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.file_version_log
(
    file_version_id uuid,
    file_id uuid,
    version_file integer,
    last_change timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    delete_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.fileparts
(
    file_part_id uuid NOT NULL DEFAULT gen_random_uuid(),
    part_number integer,
    file_id uuid,
    file_version_id uuid,
    last_change timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fileparts_pkey PRIMARY KEY (file_part_id)
);

CREATE TABLE IF NOT EXISTS public.filesharehistory
(
    share_id integer NOT NULL,
    client_id integer NOT NULL,
    file_id uuid,
    permission_type character varying(20) COLLATE pg_catalog."default",
    shared_client_id integer,
    create_time timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.fileversion
(
    file_version_id uuid NOT NULL DEFAULT gen_random_uuid(),
    file_id uuid,
    file_version integer,
    last_change timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fileversion_pkey PRIMARY KEY (file_version_id)
);

CREATE SEQUENCE folder_Folder_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.foldertable
(
    folder_id integer NOT NULL DEFAULT nextval('folder_Folder_id_seq'::regclass),
    client_id integer,
    file_id uuid,
    foldername character varying(50) COLLATE pg_catalog."default",
    creation_time timestamp with time zone,
    last_change timestamp with time zone,
    CONSTRAINT folder_pkey PRIMARY KEY (folder_id)
);

CREATE TABLE IF NOT EXISTS public.folder_logs
(
    folder_id integer DEFAULT nextval('folder_Folder_id_seq'::regclass),
    client_id integer,
    file_id uuid,
    foldername character varying(20) COLLATE pg_catalog."default",
    creation_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_change timestamp with time zone,
    delete_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE folderfiles_folder_files_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.folderfiles
(
    folder_files_id integer NOT NULL DEFAULT nextval('folderfiles_folder_files_id_seq'::regclass),
    file_id uuid,
    folder_id integer,
    creation_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT folderfiles_pkey PRIMARY KEY (folder_files_id)
);

CREATE SEQUENCE foldersharehistory_share_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.foldersharehistory
(
    share_id integer NOT NULL DEFAULT nextval('foldersharehistory_share_id_seq'::regclass),
    client_id integer NOT NULL,
    folder_id integer NOT NULL,
    permission_type character varying(20) COLLATE pg_catalog."default",
    shared_client_id integer,
    create_time timestamp with time zone NOT NULL,
    CONSTRAINT foldersharehistory_pkey PRIMARY KEY (create_time, share_id)
);

CREATE TABLE IF NOT EXISTS public.invoice
(
    invoice_id integer NOT NULL,
    subscriptiontype character varying(50) COLLATE pg_catalog."default",
    price integer,
    client_id integer,
    date timestamp with time zone,
    pay_date timestamp with time zone,
    CONSTRAINT "Invoice_pkey" PRIMARY KEY (invoice_id)
);

CREATE TABLE IF NOT EXISTS public.permission
(
    permission_type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT permission_pkey PRIMARY KEY (permission_type)
);

CREATE TABLE IF NOT EXISTS public.server1
(
    file_id uuid NOT NULL,
    file_part_id uuid,
    file_version_id uuid NOT NULL,
    CONSTRAINT server1_pkey PRIMARY KEY (file_version_id, file_id)
);

CREATE TABLE IF NOT EXISTS public.server1_logs
(
    file_version_id uuid,
    file_id uuid,
    file_part_id uuid,
    delete_time timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.server2
(
    file_id uuid NOT NULL,
    file_version_id uuid,
    file_part_id uuid
);

CREATE TABLE IF NOT EXISTS public.server2_logs
(
    file_version_id uuid,
    file_id uuid,
    file_part_id uuid,
    delete_time timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.server3
(
    file_id uuid NOT NULL,
    file_version_id uuid NOT NULL,
    file_part_id uuid,
    CONSTRAINT server3_pkey PRIMARY KEY (file_version_id, file_id)
);

CREATE TABLE IF NOT EXISTS public.server3_logs
(
    file_version_id uuid,
    file_id uuid,
    file_part_id uuid,
    delete_time timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.server4
(
    file_id uuid NOT NULL,
    file_version_id uuid NOT NULL,
    file_part_id uuid,
    CONSTRAINT server4_pkey PRIMARY KEY (file_id, file_version_id)
);

CREATE TABLE IF NOT EXISTS public.server4_logs
(
    file_version_id uuid,
    file_id uuid,
    file_part_id uuid,
    delete_time timestamp with time zone
);

CREATE SEQUENCE sharedfileaccess_share_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.sharedfileaccess
(
    file_id uuid NOT NULL,
    client_id integer NOT NULL,
    share_id integer NOT NULL DEFAULT nextval('sharedfileaccess_share_id_seq'::regclass),
    permission_type character varying(20) COLLATE pg_catalog."default",
    shared_client_id integer,
    create_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT sharedfileaccess_pkey PRIMARY KEY (share_id)
);

CREATE SEQUENCE sharedfolderaccess_share_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.sharedfolderaccess
(
    folder_id integer,
    client_id integer,
    share_id integer NOT NULL DEFAULT nextval('sharedfolderaccess_share_id_seq'::regclass),
    permission_type character varying COLLATE pg_catalog."default",
    shared_client_id integer,
    create_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT sharedfolderaccess_pkey PRIMARY KEY (share_id)
);

CREATE TABLE IF NOT EXISTS public.subscription
(
    subscriptiontype character varying(20) COLLATE pg_catalog."default" NOT NULL,
    price integer,
    data_allocated character varying(20) COLLATE pg_catalog."default",
    shards integer,
    CONSTRAINT "Subscription_pkey" PRIMARY KEY (subscriptiontype)
);

CREATE SEQUENCE User_User_id_seq AS integer;
CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('User_User_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    pssword character varying(50) COLLATE pg_catalog."default" NOT NULL,
    f_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    l_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (user_id)
);

ALTER TABLE IF EXISTS public.admintab
    ADD CONSTRAINT "User" FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

COMMENT ON CONSTRAINT "User" ON public.admintab
    IS 'referencing user';



ALTER TABLE IF EXISTS public.client
    ADD CONSTRAINT "Client_User_id_fkey" FOREIGN KEY (user_id)
    REFERENCES public.users (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.client
    ADD CONSTRAINT "client_SubscriptionType_fkey" FOREIGN KEY (subscriptiontype)
    REFERENCES public.subscription (subscriptiontype) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.filetable
    ADD CONSTRAINT "File_encryptionType_fkey" FOREIGN KEY (encryptiontype)
    REFERENCES public.encryption (encryption_type) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.filetable
    ADD CONSTRAINT "File_folder_id_fkey" FOREIGN KEY (folder_id)
    REFERENCES public.foldertable (folder_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.filetable
    ADD CONSTRAINT file_client_id_fkey FOREIGN KEY (client_id)
    REFERENCES public.client (client_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.filetable
    ADD CONSTRAINT file_file_version_id_fkey FOREIGN KEY (file_version_id)
    REFERENCES public.fileversion (file_version_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.fileparts
    ADD CONSTRAINT fileparts_file_id_fkey FOREIGN KEY (file_id)
    REFERENCES public.filetable (file_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.fileparts
    ADD CONSTRAINT fileparts_file_version_id_fkey FOREIGN KEY (file_version_id)
    REFERENCES public.fileversion (file_version_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.filesharehistory
    ADD CONSTRAINT filesharehistory_share_id_fkey FOREIGN KEY (share_id)
    REFERENCES public.sharedfileaccess (share_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.fileversion
    ADD CONSTRAINT fileversion_file_id_fkey FOREIGN KEY (file_version_id)
    REFERENCES public.filetable (file_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS fileversion_pkey
    ON public.fileversion(file_version_id);


ALTER TABLE IF EXISTS public.foldertable
    ADD CONSTRAINT folder_client_id_fkey FOREIGN KEY (client_id)
    REFERENCES public.client (client_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.foldertable
    ADD CONSTRAINT folder_file_id_fkey FOREIGN KEY (file_id)
    REFERENCES public.filetable (file_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.folderfiles
    ADD CONSTRAINT folderfiles_file_id_fkey FOREIGN KEY (file_id)
    REFERENCES public.filetable (file_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.folderfiles
    ADD CONSTRAINT folderfiles_folder_id_fkey FOREIGN KEY (folder_id)
    REFERENCES public.foldertable (folder_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.foldersharehistory
    ADD CONSTRAINT foldersharehistory_share_id_fkey FOREIGN KEY (share_id)
    REFERENCES public.sharedfolderaccess (share_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.invoice
    ADD CONSTRAINT "Invoice_SubscriptionType_fkey" FOREIGN KEY (subscriptiontype)
    REFERENCES public.subscription (subscriptiontype) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.invoice
    ADD CONSTRAINT invoice_client_id_fkey FOREIGN KEY (client_id)
    REFERENCES public.client (client_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.server1
    ADD CONSTRAINT server1_file_part_id_fkey FOREIGN KEY (file_part_id)
    REFERENCES public.fileparts (file_part_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.server2
    ADD CONSTRAINT server2_file_part_id_fkey FOREIGN KEY (file_part_id)
    REFERENCES public.fileparts (file_part_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.server3
    ADD CONSTRAINT server3_file_part_id_fkey FOREIGN KEY (file_part_id)
    REFERENCES public.fileparts (file_part_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.server4
    ADD CONSTRAINT server4_file_part_id_fkey FOREIGN KEY (file_part_id)
    REFERENCES public.fileparts (file_part_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sharedfileaccess
    ADD CONSTRAINT sharedfileaccess_client_id_fkey FOREIGN KEY (client_id)
    REFERENCES public.client (client_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sharedfileaccess
    ADD CONSTRAINT sharedfileaccess_file_id_fkey FOREIGN KEY (file_id)
    REFERENCES public.filetable (file_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sharedfileaccess
    ADD CONSTRAINT sharedfileaccess_permission_type_fkey FOREIGN KEY (permission_type)
    REFERENCES public.permission (permission_type) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sharedfolderaccess
    ADD CONSTRAINT sharedfolderaccess_client_id_fkey FOREIGN KEY (client_id)
    REFERENCES public.client (client_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sharedfolderaccess
    ADD CONSTRAINT sharedfolderaccess_folder_id_fkey FOREIGN KEY (folder_id)
    REFERENCES public.foldertable (folder_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.sharedfolderaccess
    ADD CONSTRAINT sharedfolderaccess_permission_type_fkey FOREIGN KEY (permission_type)
    REFERENCES public.permission (permission_type) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


END;
