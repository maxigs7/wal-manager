
CREATE TABLE IF NOT EXISTS public.transaction
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type transaction_type NOT NULL,
    account_id uuid NOT NULL,
    category_id uuid NOT NULL,
    amount decimal(11,4) NOT NULL,
    date timestamp without time zone NULL,
    billed_date timestamp without time zone NULL,
    description character varying(100) COLLATE pg_catalog."default" NOT NULL,
    credit_card_id uuid NULL,
    fee_number smallint NULL,
    is_recurring boolean NOT NULL DEFAULT false,
    is_paid boolean NOT NULL DEFAULT false,
    parent_transaction_id uuid NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    user_id uuid NOT NULL,
    CONSTRAINT transaction_pkey PRIMARY KEY (id),
    CONSTRAINT fk_transaction_account FOREIGN KEY (account_id)
        REFERENCES public.account (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_transaction_category FOREIGN KEY (category_id)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_transaction_credit_card FOREIGN KEY (credit_card_id)
        REFERENCES public.credit_card (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_transaction_parent FOREIGN KEY (parent_transaction_id)
        REFERENCES public.transaction (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    CONSTRAINT fk_transaction_user FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
