CREATE TABLE IF NOT EXISTS public.account
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    type account_type NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    archived_at timestamp with time zone,
    user_id uuid NOT NULL,
    is_default boolean NOT NULL default false,
    CONSTRAINT account_pkey PRIMARY KEY (id),
    CONSTRAINT fk_account_user FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
