-- FUNCTION: public.new_file_insert_combine()

-- DROP FUNCTION IF EXISTS public.new_file_insert_combine();

CREATE OR REPLACE FUNCTION public.new_file_insert_combine()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
	-- INSERT new fileversion
	INSERT INTO fileversion(file_id, file_version)
	VALUES(NEW.file_id, 1);
	
	--INSERT INTO fileparts
	INSERT INTO fileparts(part_number,file_id,file_version_id, server_name)
	values(1, NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), 'server1'),
	(2, NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), 'server2'),
	(3, NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), 'server3'),
	(4, NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), 'server4');
	
	--INSERT INTO Server 
	INSERT INTO server1(file_id,file_version_id,file_part_id)
	values(NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), (SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=1));
	
	INSERT INTO server2(file_id,file_version_id,file_part_id)
	values(NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), (SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=2));
	
	INSERT INTO server3(file_id,file_version_id,file_part_id)
	values(NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), (SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=3));
	
	INSERT INTO server4(file_id,file_version_id,file_part_id)
	values(NEW.file_id, (SELECT file_version_id FROM fileversion where file_id=NEW.file_id), (SELECT file_part_id FROM fileparts WHERE file_id=NEW.file_id and part_number=4));
	
	Return NEW;
END;
$BODY$;
