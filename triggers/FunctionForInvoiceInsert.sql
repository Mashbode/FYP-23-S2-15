CREATE OR REPLACE FUNCTION public.insert_invoice()
    RETURNS trigger
    LANGUAGE 'plpgsql'
AS $BODY$
BEGIN 
	INSERT INTO Invoice(subscriptiontype, price,client_id)
	values((SELECT subscriptiontype FROM client WHERE client_id = NEW.client_id), (SELECT price FROM subscription WHERE subscriptiontype =(SELECT subscriptiontype FROM client WHERE client_id = NEW.client_id)), new.client_id);
	
	RETURN NEW;
END;
$BODY$;
