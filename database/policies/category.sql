ALTER TABLE IF EXISTS public.category
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own categories."
    ON public.category
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own categories."
    ON public.category
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can update their own categories."
    ON public.category
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can view their own categories."
    ON public.category
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((auth.uid() = user_id));