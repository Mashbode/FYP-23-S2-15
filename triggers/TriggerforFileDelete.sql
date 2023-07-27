-- Trigger: file_delete_logs

-- DROP TRIGGER IF EXISTS file_delete_logs ON public.filetable;

CREATE TRIGGER file_delete_logs
    BEFORE DELETE
    ON public.filetable
    FOR EACH ROW
    EXECUTE FUNCTION public.file_version_log_combined();