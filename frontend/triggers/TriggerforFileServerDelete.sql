-- Trigger: delete_when_insert_log

-- DROP TRIGGER IF EXISTS delete_when_insert_log ON public.server1_logs;
--replicate this for all the server logs
CREATE TRIGGER delete_when_insert_log
    AFTER INSERT
    ON public.server1_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.fileserver1_delete();