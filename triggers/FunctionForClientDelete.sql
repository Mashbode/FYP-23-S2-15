CREATE OR REPLACE FUNCTION client_delete()
	RETURNS TRIGGER 
	LANGUAGE PLPGSQL
	AS
$$
BEGIN 
	-- when client deletes account
	-- start deletion from server tables
	DELETE FROM server1
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	DELETE FROM server2
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	DELETE FROM server3
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	DELETE FROM server4
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	--delete from server logs 
	DELETE FROM server1_logs
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	DELETE FROM server2_logs
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	DELETE FROM server3_logs
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	DELETE FROM server4_logs
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	-- then file parts 
	DELETE FROM fileparts
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	-- delete from file parts log 
	DELETE FROM file_parts_log
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	-- then file version
	DELETE FROM fileversion
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	-- delete from file version log
	DELETE FROM file_version_log
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	-- then folderfiles if any 
	DELETE FROM folderfiles
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	-- delete from delete_folder_file_logs 
	DELETE FROM delete_folder_file_logs 
	WHERE file_id = (SELECT file_id FROM filetable WHERE client_id = OLD.client_id);
	
	--then shared file access 
	DELETE FROM sharedfileaccess
	WHERE client_id = OLD.client_id;
	
	--Then shared folder access 
	DELETE FROM sharedfolderaccess
	WHERE client_id = OLD.client_id;
	
	-- then filetable 
	DELETE FROM filetable 
	WHERE client_id = OLD.client_id;
	-- Then file logs
	DELETE FROM file_log
	WHERE client_id = OLD.client_id;
	
	-- then folder 
	DELETE FROM foldertable 
	WHERE client_id = OLD.client_id;
	-- then folder_logs
	DELETE FROM folder_logs
	WHERE client_id = OLD.client_id;
	
	-- then invoice 
	DELETE FROM invoice
	WHERE client_id = OLD.client_id;
	
	RETURN OLD;
END;
$$