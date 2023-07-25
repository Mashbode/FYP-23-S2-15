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
	INSERT INTO file_version_log(file_version_id, last_change, file_id, file_version)
	SELECT file_version_id, last_change, file_id, file_version FROM fileversion where file_id = OLD.file_id;
	
	--file parts log
	INSERT INTO file_parts_log(file_part_id, part_number,file_version_id,last_change,file_id)
	SELECT file_part_id, part_number, file_version_id, last_change, file_id FROM fileparts where file_id= OLD.file_id;
	
	--file server log
	INSERT INTO server1_logs(file_version_id, file_id, file_part_id, server1_id)
	SELECT file_version_id, file_id, file_part_id, server1_id FROM server1 where file_id = OLD.file_id;
	
	INSERT INTO server2_logs(file_version_id, file_id, file_part_id, server2_id)
	SELECT file_version_id, file_id, file_part_id, server2_id FROM server2 where file_id = OLD.file_id;
	
	INSERT INTO server3_logs(file_version_id, file_id, file_part_id, server3_id)
	SELECT file_version_id, file_id, file_part_id, server3_id FROM server3 where file_id = OLD.file_id;
	
	INSERT INTO server4_logs(file_version_id, file_id, file_part_id, server4_id)
	SELECT file_version_id, file_id, file_part_id, server4_id FROM server4 where file_id = OLD.file_id;
	
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

