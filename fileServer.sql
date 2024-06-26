-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.file
(
    file_id uuid NOT NULL,
    data bytea,
    file_version_id uuid NOT NULL,
    CONSTRAINT file_pkey PRIMARY KEY (file_id, file_version_id)
);

CREATE TABLE IF NOT EXISTS public.secret
(
    secret character varying(50) COLLATE pg_catalog."default" NOT NULL,
    file_id uuid,
    CONSTRAINT secret_pkey PRIMARY KEY (secret)
);
END;