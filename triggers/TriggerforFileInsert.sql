-- Trigger: new_file_insert

-- DROP TRIGGER IF EXISTS new_file_insert ON public.filetab;

CREATE TRIGGER new_file_insert
    AFTER INSERT
    ON public.filetable
    FOR EACH ROW
    EXECUTE FUNCTION public.new_file_insert_combine();