-- FUNCTION: public.file_version_log_combined()

-- DROP FUNCTION IF EXISTS public.file_version_log_combined();

CREATE OR REPLACE FUNCTION public.file_version_log_combined()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
	--When deleting file
	--file log 
	INSERT INTO file_log(file_id, filename, filetype, numberofparts, encryptiontype, client_id, uploadtime,last_change, delete_time)
	VALUES(OLD.file_id, OLD.filename, OLD.filetype, OLD.numberofparts, OLD.encryptiontype, OLD.client_id, OLD.uploadtime, OLD.last_change, now() );
	
	--file version log
	INSERT INTO file_version_log(file_version_id, file_id, file_version, last_change)
	SELECT file_version_id, file_id, file_version, last_change FROM fileversion where file_id = OLD.file_id;
	
	--file parts log
	INSERT INTO file_parts_log(file_part_id, part_number, file_id, file_version_id, last_change, server_name)
	SELECT file_part_id, part_number, file_id, file_version_id, last_change, server_name FROM fileparts where file_id= OLD.file_id;
	
	--file server log
	INSERT INTO server1_logs(server1_id, file_id, file_version_id, file_part_id )
	SELECT server1_id, file_id, file_version_id, file_part_id  FROM server1 where file_id = OLD.file_id;
	
	INSERT INTO server2_logs(server2_id, file_id, file_version_id, file_part_id )
	SELECT server2_id, file_id, file_version_id, file_part_id  FROM server2 where file_id = OLD.file_id;
	
	INSERT INTO server3_logs(server3_id, file_id, file_version_id, file_part_id )
	SELECT server3_id, file_id, file_version_id, file_part_id FROM server3 where file_id = OLD.file_id;
	
	INSERT INTO server4_logs(server4_id, file_id, file_version_id, file_part_id)
	SELECT server3_id, file_id, file_version_id, file_part_id FROM server4 where file_id = OLD.file_id;
	
	--folder files
	INSERT INTO delete_folder_file_logs(folder_files_id, file_id, folder_id, creation_time)
	SELECT folder_files_id, file_id, folder_id, time_added FROM folderfiles WHERE file_id = OLD.file_id;
	
	--Delete from fileparts
	DELETE FROM fileparts
	WHERE file_id = OLD.file_id;
	
	--DELETE from fileversion
	DELETE FROM fileversion
	WHERE file_id = OLD.file_id;
	
	--Delete from sharedfileAccess
	DELETE FROM sharedfileaccess
	WHERE file_id = OLD.file_id;
	

	
	RETURN OLD;
END;
$BODY$;

