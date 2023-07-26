CREATE TRIGGER insert_invoice_log
    BEFORE DELETE ON invoice
    FOR EACH ROW
    EXECUTE FUNCTION insert_invoice_log();