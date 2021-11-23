ALTER TABLE IF EXISTS public.credit_card
    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own credit cards."
    ON public.credit_card
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own credit cards."
    ON public.credit_card
    AS PERMISSIVE
    FOR DELETE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can update their own credit cards."
    ON public.credit_card
    AS PERMISSIVE
    FOR UPDATE
    TO public
    USING ((auth.uid() = user_id));

CREATE POLICY "Users can view their own credit cards."
    ON public.credit_card
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((auth.uid() = user_id));