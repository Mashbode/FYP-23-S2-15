-- Trigger: update_file_version

-- DROP TRIGGER IF EXISTS update_file_version ON public.filetab;

CREATE TRIGGER update_file_version
    AFTER UPDATE 
    ON public.filetab
    FOR EACH ROW
    EXECUTE FUNCTION public.file_update_combine();