
ALTER TABLE IF EXISTS public.account
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own accounts."
    ON public.account
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own accounts."
    ON public.account
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can update their own accounts."
    ON public.account
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can view their own accounts."
    ON public.account
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((auth.uid() = user_id));