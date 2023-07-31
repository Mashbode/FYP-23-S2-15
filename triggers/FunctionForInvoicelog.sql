CREATE OR REPLACE FUNCTION insert_invoice_log()
	RETURNS TRIGGER 
	LANGUAGE PLPGSQL
	AS 
$$
BEGIN 
	INSERT INTO invoice_log(invoice_id, subscriptiontype, price, client_id, date, pay_date)
	VALUES(OLD.invoice_id, OLD.subscriptiontype, OLD.price, OLD.client_id, OLD.date, OLD.pay_date);
	Return NEW;
END;
$$