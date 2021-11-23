CREATE TABLE IF NOT EXISTS public.category
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying(100) NOT NULL,
    type category_type NOT NULL,
    icon character varying(50),
    color character varying(50),
    parent_id uuid,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    archived_at timestamp with time zone,
    user_id uuid NOT NULL,
    CONSTRAINT category_pkey PRIMARY KEY (id),
    CONSTRAINT fk_category_user FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_parent_category FOREIGN KEY (parent_id)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

