
CREATE OR REPLACE FUNCTION public.file_update_combine()
    RETURNS trigger
    LANGUAGE 'plpgsql'

AS $BODY$
BEGIN 
	-- INSERT updated fileversion
	INSERT INTO fileversion(file_id, file_version)
	VALUES(NEW.file_id, (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id )+1);
	
	--INSERT UPDATED INTO fileparts
	INSERT INTO fileparts(part_number,server_name ,file_id,file_version_id)
	values(1, 'server1', NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))),
	(2, 'server2', NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))),
	(3, 'server3', NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))),
	(4, 'server4', NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id)));
	
	--INSERT UPDATED INTO Server 
	INSERT INTO server1(file_id,file_part_id,file_version_id)
	values(NEW.file_id,(SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=1 and file_version_id=(SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id)) ), 
		   (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))
		  );
	
	INSERT INTO server2(file_id,file_part_id,file_version_id)
	values(NEW.file_id,(SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=2 and file_version_id=(SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))), 
		   (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))
		  );
	
	INSERT INTO server3(file_id,file_part_id,file_version_id)
	values(NEW.file_id,(SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=3 and file_version_id=(SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))), 
		   (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))
		  );
	
	INSERT INTO server4(file_id,file_part_id,file_version_id)
	values(NEW.file_id,(SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=4 and file_version_id=(SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))), 
		   (SELECT file_version_id FROM fileversion where file_id=NEW.file_id and file_version = (SELECT MAX(file_version) FROM fileversion WHERE file_id=NEW.file_id))
		  );
	
	Return NEW;
END;
$BODY$;
