-- FUNCTION: public.insert_usertype()

-- DROP FUNCTION IF EXISTS public.insert_usertype();

CREATE OR REPLACE FUNCTION public.insert_usertype()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN

	NEW.usertype = 'User';
	
	Return NEW;
END;
$BODY$;

