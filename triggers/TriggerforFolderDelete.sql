-- Trigger: folder_delete_logs

-- DROP TRIGGER IF EXISTS folder_delete_logs ON public.foldertab;

CREATE TRIGGER folder_delete_logs
    BEFORE DELETE
    ON public.foldertab
    FOR EACH ROW
    EXECUTE FUNCTION public.folder_log_combined_insert();