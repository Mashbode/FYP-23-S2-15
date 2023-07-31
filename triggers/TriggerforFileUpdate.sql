-- Trigger: update_file_version

-- DROP TRIGGER IF EXISTS update_file_version ON public.filetable;

CREATE TRIGGER update_file_version
    AFTER UPDATE 
    ON public.filetable
    FOR EACH ROW
    EXECUTE FUNCTION public.file_update_combine();