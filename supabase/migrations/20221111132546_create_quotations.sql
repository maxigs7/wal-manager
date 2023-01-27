-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.quotation
(
    id "quotationType" NOT NULL,
    currency currency NOT NULL DEFAULT 'ars'::currency,
    "dolarsiKey" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT quotation_pkey PRIMARY KEY (id),
    CONSTRAINT "uq_quotation_dolarsiKey" UNIQUE ("dolarsiKey")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.quotation
    OWNER to postgres;

GRANT ALL ON TABLE public.quotation TO anon;

GRANT ALL ON TABLE public.quotation TO authenticated;

GRANT ALL ON TABLE public.quotation TO postgres;

GRANT ALL ON TABLE public.quotation TO service_role;
