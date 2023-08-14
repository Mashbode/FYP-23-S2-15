-- FUNCTION: public.folder_log_combined_insert()

-- DROP FUNCTION IF EXISTS public.folder_log_combined_insert();

CREATE OR REPLACE FUNCTION public.folder_log_combined_insert()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
	-- When deleting folder 
	-- file_version_log
	INSERT INTO folder_logs(folder_id, client_id, foldername, creation_time, last_change)
	SELECT folder_id, client_id, foldername, creation_time, last_change FROM foldertable WHERE folder_id = OLD.folder_id;
	-- folder file log 
	INSERT INTO delete_folder_file_logs(folder_files_id, file_id, folder_id, creation_time)
	SELECT folder_files_id, file_id, folder_id, time_added FROM folderfiles WHERE folder_id = OLD.folder_id;
	
	-- DELETE from folderfiles
	DELETE FROM folderfiles
	WHERE folder_id = OLD.folder_id;
	
	DELETE FROM SharedfolderAccess
	WHERE folder_id = OLD.folder_id;
	Return OLD;
END;
$BODY$;

