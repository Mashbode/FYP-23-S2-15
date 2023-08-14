-- Trigger: insert_usertype

-- DROP TRIGGER IF EXISTS insert_usertype ON public.users;

CREATE TRIGGER insert_usertype
    BEFORE INSERT
    ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.insert_usertype();