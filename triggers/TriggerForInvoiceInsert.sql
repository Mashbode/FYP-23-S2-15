CREATE TRIGGER insert_invoice
    AFTER INSERT
    ON public.client
    FOR EACH ROW
    EXECUTE FUNCTION public.insert_invoice();