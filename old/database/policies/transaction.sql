
ALTER TABLE IF EXISTS public.transaction
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own transactions."
    ON public.transaction
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own transactions."
    ON public.transaction
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can update their own transactions."
    ON public.transaction
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can view their own transactions."
    ON public.transaction
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((auth.uid() = user_id));