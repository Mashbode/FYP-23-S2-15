-- Trigger: file_delete_logs

-- DROP TRIGGER IF EXISTS file_delete_logs ON public.filetab;

CREATE TRIGGER file_delete_logs
    BEFORE DELETE
    ON public.filetab
    FOR EACH ROW
    EXECUTE FUNCTION public.file_version_log_combined();