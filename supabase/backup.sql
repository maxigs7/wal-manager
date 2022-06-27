--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: account_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE public.account_type AS ENUM (
    'bank',
    'wallet'
);


ALTER TYPE public.account_type OWNER TO supabase_admin;

--
-- Name: category_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE public.category_type AS ENUM (
    'expenses',
    'incomes'
);


ALTER TYPE public.category_type OWNER TO supabase_admin;

--
-- Name: credit_card_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE public.credit_card_type AS ENUM (
    'amex',
    'carrefour',
    'mastercard',
    'naranja',
    'visa'
);


ALTER TYPE public.credit_card_type OWNER TO supabase_admin;

--
-- Name: transaction_type; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE public.transaction_type AS ENUM (
    'expenses',
    'incomes',
    'transfer'
);


ALTER TYPE public.transaction_type OWNER TO supabase_admin;

--
-- Name: get_balance(timestamp without time zone); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION public.get_balance(end_date timestamp without time zone) RETURNS TABLE(amount numeric, date timestamp without time zone)
    LANGUAGE sql
    AS $$

  select
    SUM(case
          -- when t.is_paid = false then 0
          when type = 'expenses' then amount * (-1)
          when type = 'incomes' then amount
          else 0
        end) as amount,
    date_trunc('month', end_date) + interval '1 month' as date
  from public.transaction as t
    left join public.get_ocurrences(t.id) as o
      on o.id = t.id and o.date <= end_date
  where
        ( o.date is not null and o.date <= end_date )
    or  ( o.date is null and t.date <= end_date )

$$;


ALTER FUNCTION public.get_balance(end_date timestamp without time zone) OWNER TO supabase_admin;

--
-- Name: get_ocurrences(uuid); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION public.get_ocurrences(id uuid) RETURNS TABLE(id uuid, date timestamp without time zone)
    LANGUAGE sql
    AS $$

  with recursive ocurrences(n) as (
    values (1)
    union all
    select n + 1 from ocurrences where n < 1000
  )

  select
    t.id,
    t.date + o.n * interval '1 month' as date
  from ocurrences o
    full join public.transaction as t on true   
  where t.id = id and t.is_recurring = true
    and not exists(select 1
                  from transaction p
                  where
                        p.parent_transaction_id = t.id
                    and cast(p.date as date) = cast((t.date + o.n * interval '1 month') as date))

$$;


ALTER FUNCTION public.get_ocurrences(id uuid) OWNER TO supabase_admin;

--
-- Name: get_transactions(timestamp without time zone, timestamp without time zone); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION public.get_transactions(start_date timestamp without time zone, end_date timestamp without time zone) RETURNS TABLE(account character varying, amount numeric, credit_card character varying, date timestamp without time zone, description character varying, fee_number smallint, id uuid, is_paid boolean, root_category character varying, root_category_color character varying, root_category_icon character varying, sub_category character varying, type public.transaction_type)
    LANGUAGE sql
    AS $$

  select
    null as account,
    amount,
    null as credit_card,
    date,
    null as description,
    null as fee_number,
    null as id,
    null as is_paid,
    null as root_category,
    null as root_category_color,
    null as root_category_icon,
    null as sub_category,
    null as type
  from public.get_balance(start_date - interval '1 seconds')
  where amount > 0

  union all

  select
    a.name as account,
    case
      -- when t.is_paid = false then 0
      when t.type = 'expenses' then t.amount * (-1)
      when t.type = 'incomes' then t.amount
      else 0
    end as amount,
    cc.name as credit_card,
    COALESCE(t.billed_date, o.date, t.date) as date,
    t.description,
    t.fee_number,
    t.id,
    t.is_paid,
    COALESCE(parent_cat.name, cat.name) as root_category,
    COALESCE(parent_cat.color, cat.color) as root_category_color,
    COALESCE(parent_cat.icon, cat.icon) as root_category_icon,
    case when parent_cat.id is null then null else cat.name end as sub_category,
    t.type
  from transaction as t
    inner join account as a
      on t.account_id = a.id
    left join credit_card as cc
      on t.credit_card_id = cc.id

    inner join category as cat
      on t.category_id = cat.id
    left join category as parent_cat
      on cat.parent_id = parent_cat.id

    left join public.get_ocurrences(t.id) as o
      on o.id = t.id and o.date >= start_date and o.date <= end_date

  where
        COALESCE(o.date, t.date) >= start_date
    and COALESCE(o.date, t.date) <= end_date

  order by date asc


$$;


ALTER FUNCTION public.get_transactions(start_date timestamp without time zone, end_date timestamp without time zone) OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.account (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    type public.account_type NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    archived_at timestamp without time zone,
    user_id uuid NOT NULL,
    is_default boolean DEFAULT false NOT NULL
);


ALTER TABLE public.account OWNER TO supabase_admin;

--
-- Name: category; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.category (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    type public.category_type NOT NULL,
    icon character varying(50),
    color character varying(50),
    parent_id uuid,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    archived_at timestamp without time zone,
    user_id uuid NOT NULL
);


ALTER TABLE public.category OWNER TO supabase_admin;

--
-- Name: credit_card; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.credit_card (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    type public.credit_card_type NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    archived_at timestamp without time zone,
    user_id uuid NOT NULL,
    is_default boolean DEFAULT false NOT NULL
);


ALTER TABLE public.credit_card OWNER TO supabase_admin;

--
-- Name: transaction; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.transaction (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    type public.transaction_type NOT NULL,
    account_id uuid NOT NULL,
    category_id uuid NOT NULL,
    amount numeric(11,4) NOT NULL,
    date timestamp without time zone,
    description character varying(100),
    credit_card_id uuid,
    fee_number smallint,
    is_paid boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid NOT NULL,
    billed_date timestamp without time zone,
    is_recurring boolean DEFAULT false NOT NULL,
    parent_transaction_id uuid
);


ALTER TABLE public.transaction OWNER TO supabase_admin;

--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

COPY public.account (id, name, type, created_at, archived_at, user_id, is_default) FROM stdin;
1feed44a-b631-4364-8a25-8d0cc2ffda60	SANTANDER	bank	2021-11-10 12:53:44.721	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048	t
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

COPY public.category (id, name, type, icon, color, parent_id, is_active, created_at, archived_at, user_id) FROM stdin;
98d19906-e555-40fa-b8a2-e3a8548a867d	Otros	incomes	birthday-cake	cyan.400	\N	t	2021-12-27 16:13:47.132512	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
06a9f564-2ce9-4c21-886f-663277bfdb2e	Ropa	expenses	\N	\N	f5e65ce3-fdbc-47c7-a055-1c3f21524bb8	t	2022-01-26 15:01:08.812123	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
3c2cfc21-60cd-4020-b8ca-bbffce79e974	Compu	expenses	\N	\N	4ff736f8-0292-4fa0-953b-7d2cff8d73cd	t	2022-01-26 15:03:24.647347	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
ba67cd01-7348-4844-8401-bfb2b5cd9342	Rentas	expenses	\N	\N	9dd5b86d-6988-4cab-8582-1612e09edb1f	t	2022-03-11 14:04:17.247971	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	Delivery	expenses	\N	\N	f5e65ce3-fdbc-47c7-a055-1c3f21524bb8	t	2021-11-24 00:18:21.145536	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
1435e793-857f-429c-9031-c59625d1436d	Mascota	expenses	dog	orange.400	\N	t	2021-11-15 14:20:04.928407	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
d06e6604-7bf0-4307-bb01-85db96032ea2	Servicios	expenses	university	blue.400	\N	t	2021-11-12 21:29:25.336148	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	Vivienda	expenses	home	cyan.400	\N	t	2021-11-12 21:28:12.887228	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	Cablevision	expenses	university	blue.500	d06e6604-7bf0-4307-bb01-85db96032ea2	t	2021-11-12 21:36:57.11	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
308a7c8f-1966-4c55-a3b0-fa16022ab05d	Ahorros	expenses	\N	\N	5271768e-9d8b-4c21-be08-28074f4ac7d6	t	2021-12-14 15:58:15.157259	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
526d8773-b1ba-42cf-9611-da5fe86b3f6b	Intereses	incomes	\N	\N	e8c1371d-0471-4d3b-8c2f-dae393888eee	t	2021-11-24 00:13:46.319682	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
4188fed3-e17f-43d9-ae94-697538c854cb	Telefono	expenses	\N	\N	d06e6604-7bf0-4307-bb01-85db96032ea2	t	2021-11-23 23:58:31.604142	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
adfc3bcc-f59a-4634-9ab7-612f5038e1a6	Otros	expenses	\N	\N	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	t	2021-11-24 00:12:10.239933	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
e8c1371d-0471-4d3b-8c2f-dae393888eee	Salario	incomes	dollar-sign	purple.500	\N	t	2021-11-10 19:47:02.544486	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	Muebles	expenses	home	yellow.500	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	t	2021-11-12 21:28:27.731859	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
4b7a3e04-107e-444e-9048-a2f980fd2d75	Agua	expenses	university	blue.500	d06e6604-7bf0-4307-bb01-85db96032ea2	t	2021-11-12 21:29:31.187548	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
c13a8b48-f9fe-4e99-8d61-d2982d3cd403	Luz	expenses	university	blue.500	d06e6604-7bf0-4307-bb01-85db96032ea2	t	2021-11-12 21:36:51.411457	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
dc61ac80-0b0f-457f-a2f5-511b1f7d76c2	Comida	expenses	dog	yellow.500	1435e793-857f-429c-9031-c59625d1436d	t	2021-11-15 14:20:12.862141	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
055e4278-3d28-4c8a-b314-535cb90f846c	Otros	expenses	dog	yellow.500	1435e793-857f-429c-9031-c59625d1436d	t	2021-11-15 14:21:45.364989	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
3aa8d007-c7dc-47e4-87ff-b6dee93139eb	Service	expenses	\N	\N	f65899c3-1bea-4542-a635-4b6e0e1275ed	t	2021-11-24 00:14:29.377021	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
995e3315-a1c7-4c3f-a037-e502dc00d4e3	Alquiler	expenses	home	yellow.500	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	t	2021-11-12 21:28:21.032654	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
e949c507-8bb7-45ed-a16e-94ef97401e59	Nafta	expenses	\N	\N	f65899c3-1bea-4542-a635-4b6e0e1275ed	t	2021-11-24 00:14:39.031956	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
d224c36e-f029-4d86-8e68-d09a9f20dbd4	Seguro	expenses	\N	\N	f65899c3-1bea-4542-a635-4b6e0e1275ed	t	2021-11-24 00:14:53.397528	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
48cd91ff-ee32-4d40-8e05-a4ef61c31f9d	Multas	expenses	\N	\N	f65899c3-1bea-4542-a635-4b6e0e1275ed	t	2021-11-24 00:15:00.642309	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
fcc486a5-923c-49ef-ab44-863d1f07d6f4	Patente	expenses	\N	\N	f65899c3-1bea-4542-a635-4b6e0e1275ed	t	2021-11-24 00:15:07.284441	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
53abba2c-1eeb-4fc1-a784-b0b90e46fa9b	Lavadero	expenses	\N	\N	f65899c3-1bea-4542-a635-4b6e0e1275ed	t	2021-11-24 00:15:50.156663	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	Supermercado	expenses	\N	\N	f5e65ce3-fdbc-47c7-a055-1c3f21524bb8	t	2021-11-24 00:18:09.058081	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
957b4f22-4151-4b80-90c0-9b1bf338365a	Otros	expenses	\N	\N	f5e65ce3-fdbc-47c7-a055-1c3f21524bb8	t	2021-11-24 00:18:36.395597	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
4ff736f8-0292-4fa0-953b-7d2cff8d73cd	Ocio	expenses	gamepad	purple.400	\N	t	2021-11-24 00:19:26.71432	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
8b2250fe-a385-488e-be06-06b6d4689407	Juegos	expenses	\N	\N	4ff736f8-0292-4fa0-953b-7d2cff8d73cd	t	2021-11-24 00:19:38.112967	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
73db5d08-ff5b-45d8-8f8a-6ee3f4ad51b5	Deporte	expenses	\N	\N	4ff736f8-0292-4fa0-953b-7d2cff8d73cd	t	2021-11-24 00:19:51.194215	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
218f3849-f4f3-4cd3-9295-b163a004edea	Cine	expenses	\N	\N	4ff736f8-0292-4fa0-953b-7d2cff8d73cd	t	2021-11-24 00:20:14.520512	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
adc3759f-1a65-4cfa-9edf-78a6fbe613db	Restaurants	expenses	\N	\N	4ff736f8-0292-4fa0-953b-7d2cff8d73cd	t	2021-11-24 00:20:05.885364	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
cb7dd038-5533-442b-bda7-f36d0ee03181	Salidas	expenses	\N	\N	4ff736f8-0292-4fa0-953b-7d2cff8d73cd	t	2021-11-24 00:20:51.258479	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
69c24541-2f23-49a5-8b0c-72171c3997e0	Otros	expenses	\N	\N	4ff736f8-0292-4fa0-953b-7d2cff8d73cd	t	2021-11-24 00:20:58.077645	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
837094f2-e3e1-47ac-8f27-598e085b0961	Vacaciones	expenses	plane	yellow.400	\N	t	2021-11-24 00:21:56.209212	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
9bf80935-80c8-4778-8de1-766dcd6c32cf	Alojamiento	expenses	\N	\N	837094f2-e3e1-47ac-8f27-598e085b0961	t	2021-11-24 00:22:04.053948	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
884ea6c7-7011-420e-87de-6eb27d9f7ace	Vuelos	expenses	\N	\N	837094f2-e3e1-47ac-8f27-598e085b0961	t	2021-11-24 00:22:11.97606	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
c675f068-230a-4a6c-80c2-8169700bcc96	Otros	expenses	\N	\N	837094f2-e3e1-47ac-8f27-598e085b0961	t	2021-11-24 00:22:24.041828	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
f6c3cb19-f26a-426b-b043-f36cdefd7e08	Mensualidad	expenses	\N	\N	6a1a3849-4e11-4055-bfae-18847b4998ca	t	2021-11-24 00:23:06.215589	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
9a431b9b-8ca0-4709-8015-37e42fa22b48	Colegio	expenses	\N	\N	6a1a3849-4e11-4055-bfae-18847b4998ca	t	2021-11-24 00:23:12.759109	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
b94b8d3d-f7d6-45f0-94aa-e9f9b31abe23	Regalos	expenses	\N	\N	6a1a3849-4e11-4055-bfae-18847b4998ca	t	2021-11-24 00:23:19.05578	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
e0c3509b-9ffe-4aed-94ff-c03660ddb37e	Ropa	expenses	\N	\N	6a1a3849-4e11-4055-bfae-18847b4998ca	t	2021-11-24 00:23:38.825574	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
97669fb9-a007-4955-994e-01b330f31e8d	Deportes	expenses	\N	\N	6a1a3849-4e11-4055-bfae-18847b4998ca	t	2021-11-24 00:23:45.836454	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
79783afb-b95b-4e73-b83c-da6b667f0a66	Otros	expenses	\N	\N	6a1a3849-4e11-4055-bfae-18847b4998ca	t	2021-11-24 00:23:51.489732	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
609bb22d-37b6-4d98-9326-0ab1ddc205f3	Extras	incomes	\N	\N	e8c1371d-0471-4d3b-8c2f-dae393888eee	t	2021-11-24 11:30:21.233455	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
182cdf8e-b7cb-49a9-a19a-d38820639c5a	Aguinaldo	incomes	\N	\N	e8c1371d-0471-4d3b-8c2f-dae393888eee	t	2021-11-24 11:30:25.232254	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
93ec513b-8325-4b01-8458-bf82e30d64f6	Seguro	expenses	\N	\N	d06e6604-7bf0-4307-bb01-85db96032ea2	t	2021-11-24 11:35:23.471182	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
f65899c3-1bea-4542-a635-4b6e0e1275ed	Auto	expenses	car	gray.400	\N	t	2021-11-24 00:14:20.448291	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
6a1a3849-4e11-4055-bfae-18847b4998ca	Santi	expenses	baby	red.400	\N	t	2021-11-24 00:22:56.647834	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
5271768e-9d8b-4c21-be08-28074f4ac7d6	Otros	expenses	theater-masks	black	\N	t	2021-12-13 13:29:58.236151	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
bc892330-ed14-4382-8656-6343dd3884b4	Digital	expenses	\N	\N	d06e6604-7bf0-4307-bb01-85db96032ea2	t	2022-01-26 14:59:13.415937	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
f5e65ce3-fdbc-47c7-a055-1c3f21524bb8	Compras	expenses	shopping-cart	green.400	\N	t	2021-11-24 00:16:50.10827	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
aaea5798-5d9c-446b-9aca-7eacbb2d8156	Regalos	expenses	\N	\N	5271768e-9d8b-4c21-be08-28074f4ac7d6	t	2022-01-26 15:01:41.188999	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
9dd5b86d-6988-4cab-8582-1612e09edb1f	Salario	expenses	dollar-sign	orange.400	\N	t	2022-03-11 14:03:17.335805	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
07626a54-c2e9-4cb4-b9d7-6c7632009d9f	Monotributo	expenses	\N	\N	9dd5b86d-6988-4cab-8582-1612e09edb1f	t	2022-03-11 14:03:41.237448	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
e1281e08-48b4-43b0-ad46-cddea623bde9	Obra Social	expenses	\N	\N	9dd5b86d-6988-4cab-8582-1612e09edb1f	t	2022-03-11 14:03:49.651614	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048
\.


--
-- Data for Name: credit_card; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

COPY public.credit_card (id, name, type, created_at, archived_at, user_id, is_default) FROM stdin;
5062d2ee-57d8-46f1-9c78-dceca95125bf	Carrefour	carrefour	2021-11-10 12:53:18.299359	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048	f
70674ce2-6715-4a65-93b8-7b9f62f04e2a	VISA Santander	visa	2021-11-10 12:52:53.773288	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048	f
d24af5dc-abe3-4d44-9ce3-f24baf664145	AMEX Santander	amex	2021-11-10 12:53:06.703038	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048	f
b8116704-48c2-4790-9fdb-bc1a517d9151	VISA ICBC	visa	2021-12-13 13:28:03.96884	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048	f
f83e712a-277e-47c2-a666-b7564a965549	VISA Macro	visa	2021-12-13 13:28:20.04176	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048	f
1c5f906d-e05e-4ad8-87f9-432cc4c35ebb	Naranja Ceci	naranja	2021-12-13 13:14:13.296601	\N	3e97090b-ee61-40f4-be5f-3ceb280dc048	f
\.


--
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

COPY public.transaction (id, type, account_id, category_id, amount, date, description, credit_card_id, fee_number, is_paid, created_at, user_id, billed_date, is_recurring, parent_transaction_id) FROM stdin;
cc3de5c8-a22a-444a-842f-2f5aa5d87c33	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	28500.0000	2021-01-01 02:30:00	\N	\N	\N	f	2021-12-13 13:16:29.306	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e140fd80-45be-47d7-a515-dc1f384e5a7d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1097.0000	2021-01-01 02:00:00	\N	\N	\N	f	2021-12-13 13:17:00.895	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
43ab0665-9b41-4fa8-9669-3c632f11c8c6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	8720.3000	2021-01-01 03:00:00	\N	\N	\N	f	2021-12-13 13:18:41.061	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5df32213-2877-487e-b3e3-abe270cf90c0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	431.9100	2021-02-01 03:00:00	\N	\N	\N	f	2021-12-23 17:51:33.414236	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c444c4ce-0790-430a-937e-b3595cbb99db	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	22900.0000	2021-01-01 06:00:00	Auto 7/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
52e8f662-a1fa-47c4-bca2-ebe924c9945f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4345.3700	2021-01-01 02:00:00	\N	\N	\N	f	2021-12-13 13:17:30.832	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
486cc9f0-c50d-4dec-a4ca-0159ee4e5461	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	24573.1200	2021-02-01 03:00:00	Dolares Max	\N	\N	f	2021-12-27 16:11:06.462382	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5fd1ad56-78c3-439c-b3e5-bc0947221a15	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	176344.0900	2021-01-01 00:01:01	\N	\N	\N	f	2021-11-24 11:31:34.365	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
906b7c04-1346-4fd7-a70f-4bd1d7495245	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	431.9100	2021-01-01 02:00:00	\N	\N	\N	f	2021-11-24 11:38:48.244	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a40e6143-7b31-45fd-86c4-9669ab5efc47	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	fcc486a5-923c-49ef-ab44-863d1f07d6f4	15244.8600	2021-01-01 03:00:00	\N	\N	\N	f	2021-12-13 13:19:11.466976	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b16cff0b-6e96-49c1-9c67-78594f2cbbc1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3375.0000	2021-01-01 02:00:00	\N	\N	\N	f	2021-12-13 13:17:53.493	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
322a3c82-fbd3-49e9-897a-277a8c090765	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	400.0000	2021-02-01 09:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-23 18:08:18.625681	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-02-01 06:00:00	f	\N
95cd9537-cda2-466d-b6c0-1febe6b68410	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	176.0000	2021-02-01 03:00:00	Descuento tarjeta	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-27 16:14:25.000152	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-02-01 03:00:00	f	\N
efc6a6e7-2199-462f-a05b-fefe685b62de	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-01-01 03:00:00	\N	\N	\N	f	2021-12-13 13:18:18.599	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
af8d5dd4-beb9-4b14-81f3-cc5b1685cd76	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2181.7000	2021-06-05 03:00:00	Oeste Muebles 6/6	d24af5dc-abe3-4d44-9ce3-f24baf664145	6	f	2021-12-14 15:42:01.777781	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-05 03:00:00	f	\N
fdd850a6-590b-44ff-9c09-08e9d1e28563	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	400.0000	2021-01-02 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-14 15:43:59.125057	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-02 03:00:00	f	\N
8758f52c-7f65-4ef8-9933-b19239d73916	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	2080.1000	2021-01-06 03:00:00		5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-14 15:45:55.720914	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-12-06 03:00:00	f	\N
13e22d52-53e0-4bcb-8a76-1ea66b1b113c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	7136.6600	2021-01-08 03:00:00		5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-14 15:47:14.009324	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-12-08 03:00:00	f	\N
89d64577-be79-4c7c-aee3-588f2acbf624	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	12300.0000	2021-01-11 03:00:00		d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-14 15:48:40.796027	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-12-11 03:00:00	f	\N
027f0a15-61d2-4e75-9c37-847ae9a5f76f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	8500.0000	2021-01-11 03:00:00		d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-14 15:49:27.60111	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-12-11 03:00:00	f	\N
c9c9a256-af46-4930-b075-c814798c8575	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	5940.0000	2021-01-13 03:00:00		d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-14 15:50:13.910069	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-12-13 03:00:00	f	\N
5eb1b1fb-3b36-4736-beb8-62b1adf09117	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	b94b8d3d-f7d6-45f0-94aa-e9f9b31abe23	1499.0000	2021-01-07 03:00:00		70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-14 15:51:00.525483	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-12-07 03:00:00	f	\N
8c83e149-bbe3-4555-9d77-7757318fef7e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	4587.1600	2021-01-28 03:00:00		70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-14 15:51:58.733366	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-11-28 03:00:00	f	\N
4710a67b-a13e-4726-97a4-918a269e9259	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	7431.6000	2021-01-02 03:00:00	Dolares	\N	\N	f	2021-12-14 15:59:08.309471	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
17518e5f-1e5e-4356-8a36-1af68eea250e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	16531.0200	2021-01-02 03:00:00	Dolares	\N	\N	f	2021-12-14 15:59:48.283811	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
053a12fc-00f0-45bd-89cb-950c1ee9a9f9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	28150.0000	2021-01-02 03:00:00	Dolares	\N	\N	f	2021-12-14 16:00:08.740485	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f1a21da9-9a1c-40b7-a579-89f8d833bd6f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	19705.0000	2021-01-02 03:00:00	Impuestos	\N	\N	f	2021-12-14 16:00:42.262811	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e95776b5-2012-4ba2-9771-3c3cea3033a9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	2937.0000	2021-01-02 03:00:00	Impuestos	\N	\N	f	2021-12-14 16:01:08.465463	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
15a7cf6d-720b-4cde-b7dd-b7ed61cbd215	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	2191.6200	2021-01-02 03:00:00		\N	\N	f	2021-12-14 16:01:29.090927	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
eff6f560-a78c-490a-b18e-6269acb6fd24	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	6500.0000	2021-01-01 03:00:00	Reintegro Grocery	\N	\N	f	2021-12-14 16:02:22.124474	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
146dd871-abcb-444b-82b1-76a0c671b7fe	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	1188.7800	2021-01-01 06:00:00	Aire Cuota 14/18	b8116704-48c2-4790-9fdb-bc1a517d9151	14	f	2021-12-13 13:29:02.666	3e97090b-ee61-40f4-be5f-3ceb280dc048	2019-11-04 03:00:00	f	\N
bf482dd4-c47e-42e2-a7c5-f421de4cd62f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	23800.0000	2021-07-01 09:00:00	Auto 13/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7c6e35d9-1e85-40ae-9983-3a768b2f33e8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	23800.0000	2021-08-01 09:00:00	Auto 14/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a6adfa7b-6ff6-4da0-92b0-ca182827a599	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	23900.0000	2021-10-01 09:00:00	Auto 16/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b5b40f06-b378-492c-b047-ccf57dacc134	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	23800.0000	2021-09-01 09:00:00	Auto 15/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5693ed5e-d98c-4b04-9a9c-806861876db3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	23900.0000	2021-11-01 09:00:00	Auto 17/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
cfec40de-6382-4419-8303-74464cc4c0ac	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	26280.0000	2022-02-01 09:00:00	Auto 20/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9ea728de-389c-4922-a15a-9b532d0ad31f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	26280.0000	2022-01-01 12:00:00	Auto 19/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
67d2968f-039c-4cd1-b738-44a4e6e2a820	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	26280.0000	2022-03-01 09:00:00	Auto 21/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
be1faae1-226d-4b7a-b75a-ccc87954924c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	25660.0000	2022-04-01 12:00:00	Auto 22/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
509dbe87-9925-4984-a389-bf83845e4bc7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	25660.0000	2022-05-01 12:00:00	Auto 23/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7e5a6664-8820-4216-ab14-1964d61bb983	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	25622.9100	2022-06-01 12:00:00	Auto 24/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1da90db8-e866-4ae5-95aa-54a7b19f94eb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	1188.7800	2021-02-01 06:00:00	Aire Cuota 15/18	b8116704-48c2-4790-9fdb-bc1a517d9151	15	f	2021-12-13 13:29:02.666	3e97090b-ee61-40f4-be5f-3ceb280dc048	2019-11-04 03:00:00	f	\N
c8221e68-ba6e-42b2-8431-ab950336d626	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	533.1700	2021-02-16 06:00:00	Regalo Mama 4/6	5062d2ee-57d8-46f1-9c78-dceca95125bf	4	f	2021-12-14 15:40:00.254223	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-16 06:00:00	f	\N
1bbfb98a-ebb7-4dd3-8822-e92f88b52d4f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	948.4900	2021-02-01 16:26:59	SSD 7/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	7	f	2021-12-13 13:26:31.525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-07-27 06:00:00	f	\N
58f97693-b117-439f-bbc8-3226f44d0f4c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	948.4900	2021-04-01 16:26:59	SSD 9/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	9	f	2021-12-13 13:26:31.525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-07-27 06:00:00	f	\N
c2a616af-631f-4291-807c-e23e85d5814d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	948.4900	2021-05-01 16:26:59	SSD 10/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2021-12-13 13:26:31.525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-07-27 06:00:00	f	\N
9cfc3094-7be0-4234-b65a-adebca14c2b5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2181.7000	2021-01-05 03:00:00	Oeste Muebles 1/6	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-14 15:42:01.777781	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-05 03:00:00	f	\N
25e0e25e-ff0e-498f-96ee-ce702bdc1726	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2181.7000	2021-02-05 03:00:00	Oeste Muebles 2/6	d24af5dc-abe3-4d44-9ce3-f24baf664145	2	f	2021-12-14 15:42:01.777781	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-05 03:00:00	f	\N
ed922d9e-d143-43cb-83eb-105bc2a177e2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2181.7000	2021-03-05 03:00:00	Oeste Muebles 3/6	d24af5dc-abe3-4d44-9ce3-f24baf664145	3	f	2021-12-14 15:42:01.777781	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-05 03:00:00	f	\N
f1e39985-ed16-498b-bfce-dda2090f3b30	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2181.7000	2021-04-05 03:00:00	Oeste Muebles 4/6	d24af5dc-abe3-4d44-9ce3-f24baf664145	4	f	2021-12-14 15:42:01.777781	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-05 03:00:00	f	\N
c9327719-0428-467d-abae-3e0c13221d13	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2181.7000	2021-05-05 03:00:00	Oeste Muebles 5/6	d24af5dc-abe3-4d44-9ce3-f24baf664145	5	f	2021-12-14 15:42:01.777781	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-05 03:00:00	f	\N
06b25953-ee75-4f8d-a6d7-b1cd9254dfd0	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	2200.0000	2021-01-01 03:00:00	Reintegro OS	\N	\N	f	2021-12-14 16:02:41.325329	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
adba6e12-a738-4ccd-b8a7-3162d178633b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3385.3900	2021-02-01 03:00:00	\N	\N	\N	f	2021-12-23 17:52:18.413035	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
049564e7-d694-4cfa-b010-5b52471f670c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	2521.3700	2021-02-01 06:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-23 18:14:43.738082	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-05 06:00:00	f	\N
b8348b5e-34b6-4879-8b9a-c7c6cabe496b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	29150.0000	2021-02-01 03:00:00	Dolares Ceci	\N	\N	f	2021-12-27 16:11:21.986397	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8e0dbae7-2018-47ff-a892-f4451bf5a296	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	1188.7800	2021-03-01 06:00:00	Aire Cuota 16/18	b8116704-48c2-4790-9fdb-bc1a517d9151	16	f	2021-12-13 13:29:02.666	3e97090b-ee61-40f4-be5f-3ceb280dc048	2019-11-04 03:00:00	f	\N
9594eee4-2bce-488e-b3db-71ef764b458c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	27318.1100	2021-02-28 09:00:00	Ajuste Balance	\N	\N	f	2021-12-27 16:16:37.041505	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f0fb85d4-7f51-441e-acf4-acfb654436de	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	863.8500	2021-03-01 03:00:00	\N	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-29 22:40:51.292199	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-03-01 03:00:00	f	\N
03042b27-ae23-45b3-9772-2bb17eefe353	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 23:12:36.000434	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c0ab3272-f66a-4db5-a80f-ae549d9b7846	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	5801.9300	2021-03-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-29 23:15:18.257086	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-02-02 03:00:00	f	\N
25cf0be8-f1d0-49b2-9f7b-a0f48ed45bb4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-06-01 06:00:00	En Sueños 11/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
2c9b5e0b-1e14-4579-aac8-36641e844d6a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-07-01 06:00:00	En Sueños 12/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
8ac476bf-204f-4357-931c-6c4458918f13	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-08-01 06:00:00	En Sueños 13/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	13	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
f4c60295-4518-491e-bf7b-ebdfd58f9066	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-09-01 06:00:00	En Sueños 14/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	14	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
7aeda6a8-e46b-4924-acc6-c3b5e7b5b838	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-10-01 06:00:00	En Sueños 15/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	15	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
07540ca5-256f-4366-909a-70c8774f12a4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-11-01 06:00:00	En Sueños 16/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	16	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
88df6735-7b64-4588-952d-e92089f7069a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-12-01 06:00:00	En Sueños 17/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	17	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
aec65ceb-de4c-459c-9490-a4232f9af2cb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2022-01-01 06:00:00	En Sueños 18/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	18	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
98406ec0-354b-47e9-be0e-9699a4c1d983	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	948.4900	2021-03-01 16:26:59	SSD 8/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	8	f	2021-12-13 13:26:31.525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-07-27 06:00:00	f	\N
0c22a1a6-c443-47bb-932b-0e46f1bff220	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	533.1700	2021-03-16 06:00:00	Regalo Mama 5/6	5062d2ee-57d8-46f1-9c78-dceca95125bf	5	f	2021-12-14 15:40:00.254223	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-16 06:00:00	f	\N
eea6a5e0-1172-4696-a8c7-9d020a6e8853	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	533.1700	2021-04-16 06:00:00	Regalo Mama 6/6	5062d2ee-57d8-46f1-9c78-dceca95125bf	6	f	2021-12-14 15:40:00.254223	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-16 06:00:00	f	\N
f35573ac-977f-4aa8-8091-775a3b9e3dc8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	1188.7800	2021-04-01 06:00:00	Aire Cuota 17/18	b8116704-48c2-4790-9fdb-bc1a517d9151	17	f	2021-12-13 13:29:02.666	3e97090b-ee61-40f4-be5f-3ceb280dc048	2019-11-04 03:00:00	f	\N
2110659a-36b3-4e7a-b533-087300a65d5d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	1188.7800	2021-05-01 06:00:00	Aire Cuota 18/18	b8116704-48c2-4790-9fdb-bc1a517d9151	18	f	2021-12-13 13:29:02.666	3e97090b-ee61-40f4-be5f-3ceb280dc048	2019-11-04 03:00:00	f	\N
f03fb8db-f938-459d-8aa1-70a1ea6867ed	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-04-01 03:00:00	\N	\N	\N	f	2021-12-30 18:15:05.188463	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b1dde784-da7b-4d37-a8a6-ac4ac6d425de	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	926.5000	2021-04-01 06:00:00	\N	\N	\N	f	2021-12-30 18:15:16.872134	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6e9212fb-fd48-4597-a02f-21985d23062b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	73db5d08-ff5b-45d8-8f8a-6ee3f4ad51b5	2500.0000	2021-04-01 03:00:00	Gym Max	\N	\N	f	2021-12-30 18:45:30.934812	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4d41a560-2cb9-4429-9291-9645916971e8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	10000.0000	2021-04-01 03:00:00	Pao	\N	\N	f	2021-12-30 18:47:06.994918	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ab94367b-3eec-4b21-84e4-2538efb40fc4	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	198211.0300	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:40:44.995698	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ba671c6b-b290-4998-a6f4-a051a6ba26dc	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	500.0000	2021-05-01 03:00:00	\N	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-30 19:43:01.7663	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-05-01 03:00:00	f	\N
5ba54fb6-176e-4092-8eea-9cf47e0fbca5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	6300.0000	2021-05-01 03:00:00	Libros Mecenas	\N	\N	f	2021-12-30 19:45:04.397834	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9cdc542c-8316-4dd2-9be5-241c8cd5b333	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	15000.0000	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:46:58.093324	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bb366f8a-107a-4c1c-bf71-5e0fc17909f4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	449.4700	2021-05-01 03:00:00	Ajuste	\N	\N	f	2021-12-30 19:49:23.774279	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e8fecf12-8101-483f-81d7-480ddf0ab6f7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	11200.0000	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:51:43.099245	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
38bbd39c-1efb-4b0a-b090-d6e162d84ed8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	2651.2500	2021-06-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-30 19:53:58.901109	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-05-18 03:00:00	f	\N
ec8b3b6d-9848-4451-bb58-7dac267d994d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	16900.0000	2021-06-02 03:00:00	Respaldo	\N	\N	f	2021-12-30 19:56:36.779168	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
35dd9100-d666-4f26-9b3f-16ed13d81de6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	28.1900	2021-06-30 03:00:00	Ajuste	\N	\N	f	2021-12-30 19:59:00.638166	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a196b150-2164-4647-8099-0b17b9b6169f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	25086.0000	2021-08-01 03:00:00	\N	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-01 19:23:18.590845	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-14 03:00:00	f	\N
aa48debe-fce2-4b9a-8b61-14142890b227	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4345.3700	2021-02-01 06:00:00	\N	\N	\N	f	2021-12-13 13:17:30.832	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
22914521-f140-4973-be83-bb0ba30f3233	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4345.3700	2021-03-01 09:00:00	\N	\N	\N	f	2021-12-13 13:17:30.832	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e8b23eb6-d063-4b24-853f-5a32808e42da	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1033.0000	2021-02-01 09:00:00	\N	\N	\N	f	2021-12-13 13:17:00.895	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4679489b-6ad9-42d3-b982-e35db96c20ed	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-02-01 03:00:00	\N	\N	\N	f	2021-12-13 13:16:29.306	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b8a765dd-3911-4daf-bdf3-330f0ef1fbff	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	dc61ac80-0b0f-457f-a2f5-511b1f7d76c2	6453.0000	2021-08-01 03:00:00	Barry	\N	\N	f	2022-01-01 19:25:04.421952	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6b638016-b692-46bf-a8f0-72bfedb878b1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-02-01 03:00:00	\N	\N	\N	f	2021-12-23 17:52:49.592652	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9bc5d5d4-3fbe-4db1-8b8a-fcac34208567	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	5279.3500	2021-02-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-27 15:52:59.847061	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-12 03:00:00	f	\N
65cf8075-692d-4e82-bd9a-d0da5396aecd	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3800.6600	2021-02-01 03:00:00	\N	\N	\N	f	2021-12-27 16:11:36.769438	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
62fdbab8-9507-4468-9c24-10e6aa3cadeb	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	176708.2600	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 22:38:14.336685	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
12dd2b5f-bcaa-403e-b0af-5290f7e3a8a3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	453.9200	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 22:41:40.10947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
02e5dad5-5685-4f02-b340-73e6143a4f82	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	8720.3000	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 23:12:55.081561	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f0df59b0-8c89-43e8-8414-473ede36cccb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	6482.7800	2021-03-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-29 23:15:46.528868	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-02-23 03:00:00	f	\N
3453859c-8616-4fbb-9e98-a367ac0a76e3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-01-01 06:00:00	En Sueños 6/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
5cb0bdf2-e9e5-4cd5-8918-4eb72951bebc	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1097.1600	2021-08-01 06:00:00	Netflix	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-01 19:26:21.995153	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-01 06:00:00	f	\N
61c27658-68ab-4b81-9443-d03473cc44fb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	75986.5300	2021-03-31 06:00:00	Ajuste	\N	\N	f	2021-12-30 18:13:37.005286	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
218f68a7-323c-4095-9c87-ccde92ebf25c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4345.3700	2021-04-01 03:00:00	\N	\N	\N	f	2021-12-30 18:43:05.198789	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
76723e59-8541-406a-a1aa-fedefa0164b8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	73db5d08-ff5b-45d8-8f8a-6ee3f4ad51b5	2500.0000	2021-04-01 03:00:00	Gym Ceci	\N	\N	f	2021-12-30 18:45:46.657543	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
377226af-3c88-46d5-8c85-2a78032abb13	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	8b2250fe-a385-488e-be06-06b6d4689407	1249.2600	2021-04-01 03:00:00	\N	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-30 18:47:27.516422	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-04-01 03:00:00	f	\N
3cb90015-8b98-4d05-a865-e98394de47db	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	2500.0000	2021-05-01 03:00:00	Gym	\N	\N	f	2021-12-30 19:41:07.347025	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
86b8546e-158a-4f00-84a8-5fa666977d9f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	453.9200	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:41:26.158563	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
dff66135-a95c-4709-a990-97d57a03b3c0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:41:36.81904	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
84d2ab97-e97e-49b2-a42f-c94f2214acac	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1155.0000	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:41:45.872666	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
98ba826a-321f-4908-9f7d-51f2fb317a32	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	9666.0600	2021-05-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-30 19:43:38.780704	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-04-20 03:00:00	f	\N
4203b7aa-77c0-423b-8735-d909047267e8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	840.0000	2021-05-01 03:00:00	Pedidos Ya	\N	\N	f	2021-12-30 19:45:17.979696	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
defd8b1e-cf0c-43a9-8894-42aba8a4e1a3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3050.2000	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:47:15.519823	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ea3d0fa7-ca95-4cdc-83e8-84ac64ba9a72	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	196571.6200	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:49:48.505772	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f3c45a50-6822-4a9e-8078-6549e88ff2d3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:51:56.855933	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
29426906-2750-4324-a5c6-2c0ff4100d9c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	166.6000	2021-06-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-30 19:54:17.679536	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-05-18 03:00:00	f	\N
487369c5-07f5-4be2-a27a-7146fef9b377	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	1799.9900	2021-06-03 03:00:00	Nafta UP	\N	\N	f	2021-12-30 19:56:59.794309	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a4dbf467-4b54-4733-8421-da379a22ca1a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	581.0200	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:13:37.158944	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b96564f0-d7b9-4328-bced-ffe87383f191	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	2929.6800	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:15:32.557294	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ed281769-c7f1-4f5e-b676-46fe98ed64fe	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	3000.0000	2021-07-01 03:00:00	Futbol	\N	\N	f	2021-12-30 21:16:51.075376	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9e968620-0d01-41ad-82b0-a6103714507f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	10000.0000	2021-07-01 03:00:00	Paola	\N	\N	f	2021-12-30 21:17:01.247846	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
fed0fac7-a7c8-4be7-9702-d31e36b58ba6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	8b2250fe-a385-488e-be06-06b6d4689407	1330.9800	2021-07-01 03:00:00	Steam	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-30 21:20:53.773626	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-01 03:00:00	f	\N
41abb65f-008c-4a39-87ed-e8798a3a1fe5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	5200.0000	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:51:19.906213	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0e8da287-c5be-44e5-bf65-b84ee679ad16	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	137451.2900	2021-08-01 03:00:00	\N	\N	\N	f	2021-12-31 19:51:31.254566	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0e87fde6-a1eb-43de-a96c-96d28ce53a9b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1172.5000	2021-08-01 03:00:00	\N	\N	\N	f	2021-12-31 19:51:46.482789	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2cda998d-5552-42ad-97da-ca1e43fe07c5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-08-01 03:00:00	\N	\N	\N	f	2021-12-31 19:52:40.703621	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ba7946a2-d092-40a1-b4f1-a1b141993f2d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	7700.0000	2021-08-01 03:00:00	\N	\N	\N	f	2021-12-31 19:52:51.665343	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f45994df-5d6e-4d4d-a94a-ff7e576f7f98	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	6489.0000	2021-08-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-01 19:20:54.294053	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-05 03:00:00	f	\N
a2312f52-1f30-422f-8660-2bbf4c498fc4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	300.0000	2021-08-09 03:00:00	Acta	\N	\N	f	2022-01-01 19:26:43.361162	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5268da33-af51-423e-a7aa-f10fd0ddeb74	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3360.5000	2021-08-11 03:00:00	\N	\N	\N	f	2022-01-01 19:27:16.601946	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f2aa9057-ca2e-404f-984d-7d04ca194da1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	10000.0000	2021-05-01 06:00:00	Papa	\N	\N	f	2021-12-30 19:45:31.772351	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
60a6de03-ba62-4132-a364-526f6a131754	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	948.4900	2021-07-01 16:26:59	SSD 12/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2021-12-13 13:26:31.525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-07-27 06:00:00	f	\N
ae7af83d-0ea2-4dfe-a6fd-46a8de99efa5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	178.5600	2021-08-01 06:00:00	Spotify Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-01 19:26:00.727086	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-01 06:00:00	f	\N
b4042d31-8a9a-408d-b580-afbf6afce3fe	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2022-04-01 09:00:00	Notebook 10/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
0053f14c-1fcc-40b4-bcc6-ba4d6d04fad7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2022-05-01 09:00:00	Notebook 11/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
40cd07db-ff67-4e3e-9ff6-4696fb7e6565	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2022-03-01 09:00:00	Notebook 9/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	9	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
6d0c2e5a-817a-4ce2-b43a-52435c6d18cf	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	6163.4500	2021-07-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-30 21:18:29.111652	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-01 03:00:00	f	\N
b44ef2fb-9f1a-400d-90ad-f46c19ac1e17	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	4824.6000	2021-07-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-30 21:21:59.697218	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-19 03:00:00	f	\N
e9668c98-d553-4270-b8ec-cfd7fcf5d982	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	6000.0000	2021-07-01 03:00:00	Prestamo	\N	\N	f	2021-12-30 21:51:38.175695	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6068b099-5920-4a68-81a4-5e98c2179978	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	29.5200	2021-07-31 03:00:00	Ajuste	\N	\N	f	2021-12-31 19:50:17.971755	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
22980b9b-0f74-443b-8110-bed0c38f25e8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	948.4900	2021-01-01 16:26:59	SSD 6/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2021-12-13 13:26:31.525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-07-27 06:00:00	f	\N
6380847f-ba86-450d-af34-d248eb1ddde7	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	59630.0000	2021-01-01 00:00:00	Balance Inicial	\N	\N	f	2021-11-24 11:33:45.039	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5ab69c51-7507-4018-a272-b9a1913c2604	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	1266.5000	2021-03-19 03:00:00	Monitor 12/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2021-12-13 13:23:05.662	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-03-19 03:00:00	f	\N
21f15bbb-d138-4cd7-aad6-41326d12caee	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	3512.0100	2021-08-01 03:00:00	\N	\N	\N	f	2021-12-31 19:51:58.033082	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b9c89b8b-3371-4662-9368-e972647e5920	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	1831.7000	2021-08-01 06:00:00	Reloj 1/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-01 19:23:58.243658	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-22 06:00:00	f	\N
ad13c380-8541-4ce5-be28-39b592f2adc1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	22900.0000	2021-02-01 06:00:00	Auto 8/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a38a3fa6-c362-4a1b-bd7b-c2d8c7cbe8cc	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	22900.0000	2021-03-01 06:00:00	Auto 9/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
21bbed8a-250e-4a1a-9b6c-936f27b05aa7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	22900.0000	2021-04-01 06:00:00	Auto 10/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
58ef83f4-51e1-4ef3-b470-4d9e948248c1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	22900.0000	2021-05-01 06:00:00	Auto 11/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
43ff1f73-3718-4fbb-8ee6-48213efecdbf	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	22900.0000	2021-06-01 06:00:00	Auto 12/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
eeda3a71-3138-4ec9-939e-f5265589bae6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	1266.5000	2021-01-19 03:00:00	Monitor 10/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2021-12-13 13:23:05.662	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-03-19 03:00:00	f	\N
10b0119d-926f-48b8-b3db-9df7d213d98d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	8720.3000	2021-02-01 03:00:00	\N	\N	\N	f	2021-12-23 17:53:11.6642	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a193b3e6-076a-4e1f-84f4-5ceef5254987	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	3288.5200	2021-02-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-27 15:53:29.852486	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-19 03:00:00	f	\N
118f452b-1e2a-4ced-81b5-66f7bef024be	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	176344.0900	2021-02-01 03:00:00	\N	\N	\N	f	2021-12-27 16:11:59.938266	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
62470281-04f8-4400-afe0-fb5324c2cf2a	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	5000.0000	2021-03-01 03:00:00	Grocery	\N	\N	f	2021-12-29 22:39:03.382812	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ad158503-3daa-4337-8f08-cdaa3d37ba0e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 22:41:52.222662	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5ce745d3-e77e-45a4-b73f-4f7a0257b913	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	500.0000	2021-03-01 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-29 23:13:45.830688	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-03-01 03:00:00	f	\N
9507342d-cd79-4c47-b766-5386a844958e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1235.6400	2021-03-01 03:00:00	\N	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-29 23:16:19.118098	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-03-01 03:00:00	f	\N
284120c9-f182-45d3-93ec-482e02960447	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-03-01 09:00:00	En Sueños 8/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	8	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
697d7f1a-9baf-45bc-a455-619f9de180fa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-02-01 06:00:00	En Sueños 7/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	7	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
51642781-b3fc-46dc-acd6-3845dfadea02	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-04-01 06:00:00	En Sueños 9/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	9	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
244631e3-fcc8-415a-94cd-cd28aca6cb4e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	2194.4400	2021-05-01 06:00:00	En Sueños 10/18	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2021-12-13 13:24:51.408	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-06-01 03:00:00	f	\N
6d23a8df-16d6-4886-abe9-4462d476faa9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	1266.5000	2021-02-19 03:00:00	Monitor 11/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2021-12-13 13:23:05.662	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-03-19 03:00:00	f	\N
ebab6fa9-18d3-4840-ba5e-784ce39bfc96	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	5000.0000	2021-04-01 03:00:00	Grocery	\N	\N	f	2021-12-30 18:14:15.387134	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e6381d16-d564-4af1-963b-58e12c4a6afd	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	1900.0000	2021-04-01 03:00:00	Gym	\N	\N	f	2021-12-30 18:14:24.718646	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4a6cbe14-3843-49eb-afdb-864ecc417f8d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	4538.5600	2021-04-01 06:00:00	\N	\N	\N	f	2021-12-30 18:43:27.237168	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
37b7c7ac-ebc9-4c81-b5e4-08442b7332f5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	6535.8800	2021-04-01 03:00:00	\N	\N	\N	f	2021-12-30 18:46:10.415987	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d5efa41d-0be6-4d3f-a070-5a9f51e2ace8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	500.0000	2021-04-01 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-30 18:47:50.244783	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-04-01 03:00:00	f	\N
0f07cf9b-801a-410c-a8cb-c6b41bf82b3a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4345.3700	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:41:58.217801	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a8b41c09-e58f-4cf5-a045-8d990af4ba52	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	10000.0000	2021-05-01 03:00:00	Paola	\N	\N	f	2021-12-30 19:43:56.250137	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b0e43a51-729c-4b97-8f33-595afe8c528e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	910.0000	2021-05-01 03:00:00	Pedidos Ya	\N	\N	f	2021-12-30 19:45:54.922228	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f5eade13-3ccf-4bdb-8925-cabe87b8b51a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	345.0000	2021-05-01 03:00:00	YPF Serviclub	\N	\N	f	2021-12-30 19:47:37.604284	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b8fda2b8-a45d-42dd-a19e-1c5c977857ca	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	552.3000	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:50:24.013301	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8fe74931-888e-45e3-bc49-d541d0695efe	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1079.0000	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:50:43.021737	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ce330f52-6698-45c1-a110-6e7610292652	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	10000.0000	2021-06-01 03:00:00	Paola	\N	\N	f	2021-12-30 19:52:42.647732	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d77de267-d7af-436e-b8b0-7a794b08e735	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	2999.9900	2021-06-01 03:00:00	\N	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-30 19:54:56.250411	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-05-25 03:00:00	f	\N
3732a891-f425-4e54-8490-d61eb02815de	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	910.0000	2021-06-07 03:00:00	Pizza Club	\N	\N	f	2021-12-30 19:57:15.754809	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5d0e2fd7-ef61-4bf0-81c9-b35015e2438e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:14:09.998831	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1a6b9a20-6f14-490d-ae6d-0bcce21462cf	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:15:59.734462	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
22b625f3-76b6-4c2f-b066-e113a3f6fde2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2021-08-01 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-01 19:19:52.131335	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-01 03:00:00	f	\N
81c350d3-c359-4649-9ad3-1d8c8f7898fa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	927.0700	2021-08-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-01 19:21:46.94279	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-02 03:00:00	f	\N
798f3f47-fcd8-474f-8685-227596aea90e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	1831.6600	2021-11-01 09:00:00	Reloj 4/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2022-01-01 19:23:58.243658	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-22 09:00:00	f	\N
679ee9d9-ef16-4d6a-9bb4-ea8e6b18106e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f65899c3-1bea-4542-a635-4b6e0e1275ed	23900.0000	2021-12-01 18:00:00	Auto 18/24	\N	\N	f	2021-12-13 13:20:31.947	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
645aa943-d4a9-4dda-8964-3a122e37af5d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	1831.6600	2021-10-01 09:00:00	Reloj 3/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2022-01-01 19:23:58.243658	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-22 09:00:00	f	\N
3217590c-8956-4425-b498-79edcc21996b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-02-01 03:00:00	Celular 1/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
db47a62c-f0ec-4b18-b091-59501a7cfa32	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-03-01 03:00:00	Celular 2/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
d4ec7fdc-5827-4c61-b2a6-7d311e889a3c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-04-01 03:00:00	Celular 3/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
2baafe14-5998-41f6-ae95-00cf0dd950ea	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-05-01 03:00:00	Celular 4/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
8c088567-bf2a-4341-99db-841dc260a631	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-06-01 03:00:00	Celular 5/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
da456423-5e57-411f-8aac-cf8aa0af7527	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-07-01 03:00:00	Celular 6/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
09e06be6-54f4-4b49-a4a6-d228de23a33d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-08-01 03:00:00	Celular 7/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	7	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
622a6cb9-6312-49b5-87d1-ff755a403153	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-09-01 03:00:00	Celular 8/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	8	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
8d99c9d9-190f-461c-a8c8-021da7f3f544	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-10-01 03:00:00	Celular 9/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	9	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
6c5d8c37-aaf6-40de-a6ec-baf0da7555e9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-11-01 03:00:00	Celular 10/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
602c71af-0cce-4db6-a02e-be388b8d8e87	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2021-12-01 03:00:00	Celular 11/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
9b6adbaf-5ffc-4672-8447-8cee09bd7d76	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1982.5000	2022-01-01 03:00:00	Celular 12/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2021-12-23 18:04:19.904907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
2e17e873-5632-437d-987c-18dffe8ed540	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	8b2250fe-a385-488e-be06-06b6d4689407	1226.0700	2021-02-01 03:00:00	Valorant	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-27 15:54:44.960923	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-01-27 03:00:00	f	\N
255e990f-bacc-453b-9652-d2e5fa3104e2	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	5000.0000	2021-02-01 03:00:00	Grocery	\N	\N	f	2021-12-27 16:12:13.04069	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c096caaa-69d4-40cc-b3b8-52fe0eb88ab4	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	1900.0000	2021-03-01 03:00:00	Gym	\N	\N	f	2021-12-29 22:39:24.050398	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
11b5de31-0702-4c64-a9a3-00e8e21781db	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1003.0000	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 23:12:02.248323	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a4f789dd-e454-43ef-94ea-3c1281ed49b7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1420.5000	2021-03-01 03:00:00	Pedidos Ya	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-29 23:14:10.773027	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-03-01 03:00:00	f	\N
7f01c7d6-8c8f-47ab-817e-639fd85c7c5f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1400.0000	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 23:16:35.887815	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c83794f1-451b-4f7a-904a-2b1feb954ab0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-04-01 03:00:00	\N	\N	\N	f	2021-12-30 18:44:19.698353	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b2f34831-f8de-49ac-b427-3cf822ced541	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	10900.3800	2021-04-01 06:00:00	\N	\N	\N	f	2021-12-30 18:44:30.194184	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
013d7cb6-f510-43f2-8384-e49cc7476e8a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2000.0000	2021-04-01 03:00:00	Futbol	\N	\N	f	2021-12-30 18:46:32.714716	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b938bc3d-eff7-48f7-a6f9-5f0c03109d44	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	174850.0000	2021-04-01 03:00:00	\N	\N	\N	f	2021-12-30 18:49:38.44492	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8c736d2a-49da-4e6d-85eb-7590436f60fa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3971.0300	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:42:10.742752	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
83a330bd-8470-4d5f-9ba2-9da71d60e5cf	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2000.0000	2021-05-01 03:00:00	Futbol	\N	\N	f	2021-12-30 19:44:11.462388	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6110243d-07ad-4da1-8507-f7e39008080d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	910.0000	2021-05-01 03:00:00	Pedidos Ya	\N	\N	f	2021-12-30 19:46:15.381693	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
55fbd029-5f9a-47b7-b29f-6b2f80256d1e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	239.0000	2021-05-01 03:00:00	Pedidos Ya	\N	\N	f	2021-12-30 19:46:22.685924	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a3c8caac-c0e8-4c38-a859-b2a4fdb97e11	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	1063.0000	2021-05-01 03:00:00	Cable	\N	\N	f	2021-12-30 19:47:56.761105	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bdfd7fa6-9347-4707-ac37-a75e4e02a864	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:50:33.399442	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
39497e94-76f2-4a23-b4ba-4bbf0a861dd5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	3512.0000	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:50:53.134075	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d3b0aed8-ba6a-48b6-87fd-81ea19e902de	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3971.0300	2021-06-01 03:00:00	\N	\N	\N	f	2021-12-30 19:51:05.397699	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
917716b2-4b11-4b42-b95d-97b59ad06a8a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	15000.0000	2021-06-01 03:00:00	Pinturas	\N	\N	f	2021-12-30 19:55:44.630609	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6db46857-4545-4669-a552-fd8f404b0b5a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1172.5000	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:14:32.008524	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b6abcc99-d7cd-4fdd-bb97-0cf8dbb8404b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	3512.0100	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:14:43.857122	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6cdbb89c-18c5-43a5-a4ff-004d9f2dfcb3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	7700.0000	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:16:16.367258	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e223441a-5636-4b3f-8269-6f6dfd58e779	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3aa8d007-c7dc-47e4-87ff-b6dee93139eb	5667.0000	2021-07-01 06:00:00	Service 1/3	f83e712a-277e-47c2-a666-b7564a965549	1	f	2021-12-30 21:19:11.379933	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-03 06:00:00	f	\N
19105b3c-f0fe-4d77-8d95-10dbd99ac6cb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	b94b8d3d-f7d6-45f0-94aa-e9f9b31abe23	5171.0000	2021-07-03 03:00:00	Owoko	\N	\N	f	2021-12-30 21:22:52.367987	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bbe34127-9dcb-4f4b-8090-f0fb48c7c711	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3149.9900	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:52:11.576052	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
02066228-801a-4cad-99c9-38a4272fcccb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-08-01 03:00:00	\N	\N	\N	f	2021-12-31 19:51:13.518843	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7d4d0155-7083-4234-9ab3-6e3b3564f455	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	2929.6800	2021-08-01 03:00:00	\N	\N	\N	f	2021-12-31 19:52:13.258207	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
88b78139-88c9-43bd-b96c-b0a1196c3b39	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2000.0000	2021-08-01 03:00:00	Futbol	\N	\N	f	2022-01-01 19:20:16.915236	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
34198f13-d02f-4c3d-adf1-50cbf98b1c52	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	11951.0700	2021-08-01 03:00:00	\N	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-01 19:22:45.218439	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-30 03:00:00	f	\N
b496dd86-031a-4369-bc41-ce5d1024dc24	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3aa8d007-c7dc-47e4-87ff-b6dee93139eb	5667.0000	2021-08-01 06:00:00	Service 2/3	f83e712a-277e-47c2-a666-b7564a965549	2	f	2021-12-30 21:19:11.379933	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-03 06:00:00	f	\N
f82925d2-d730-4f26-976b-fc4f0565281c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	1831.6600	2021-12-01 12:00:00	Reloj 5/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2022-01-01 19:23:58.243658	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-22 12:00:00	f	\N
dd536188-5a0f-41a0-8757-defa1ceaa927	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	791.9800	2021-06-01 06:00:00	NBA League Pass	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-30 19:55:23.010812	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-05-24 06:00:00	f	\N
578e9414-b40c-4f4f-889b-4da9680ce3fa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	13199.0000	2021-06-01 06:00:00	Impresora	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-30 19:53:08.543163	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-01 06:00:00	f	\N
63555ae5-257c-4a42-869d-d700d92b7d82	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	25190.0000	2021-06-16 06:00:00	Mate	\N	\N	f	2021-12-30 19:57:43.923924	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c6569bf0-38a9-4173-9e9c-1eae568f1b99	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	279.0000	2021-08-01 06:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-01 19:25:33.326513	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-01 06:00:00	f	\N
13f1939a-0264-417d-89d8-04314a177535	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	1831.6600	2022-01-01 09:00:00	Reloj 6/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2022-01-01 19:23:58.243658	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-22 09:00:00	f	\N
42f4a0e1-4170-4986-910c-c27aaa569733	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9200	2021-07-01 06:00:00	Aire 6/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
5623aed6-6f8b-450d-864c-10e13ae4cc75	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9100	2021-02-01 03:00:00	Aire 1/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
87663ebd-d222-426d-92b1-6eb37f25d73c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9100	2021-03-01 03:00:00	Aire 2/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
07215d98-5758-4848-a42d-838f4099ece1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9100	2021-05-01 03:00:00	Aire 4/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
54ad852d-69d2-4afd-9257-c7f25a92228b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9100	2021-06-01 03:00:00	Aire 5/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 03:00:00	f	\N
af9bcb95-9cab-4416-8e03-c7057a377317	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	1900.0000	2021-02-01 03:00:00	Gym	\N	\N	f	2021-12-27 16:12:36.749704	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
45ad7e3f-79de-411e-b9bd-3b06747c1d26	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	1500.0000	2021-03-01 03:00:00	English	\N	\N	f	2021-12-29 22:40:14.292602	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
dbf968b2-7d22-4712-a5d1-f0a632792187	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	5860.4900	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 23:12:18.558774	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
53233953-330c-4b13-9a05-94cf302f48c3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	295.0000	2021-03-01 03:00:00	Pedidos Ya	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-29 23:14:26.514247	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-03-01 03:00:00	f	\N
949c8612-19f9-4313-808d-9f9c43936e42	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1459.0000	2021-03-01 03:00:00	Pedidos Ya	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-29 23:14:46.698978	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-03-01 03:00:00	f	\N
8800a95f-2bb4-4f06-b1d1-8241f982da74	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	720.0000	2021-03-01 03:00:00	\N	\N	\N	f	2021-12-29 23:16:51.810091	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4ed01732-bf6a-4a4f-8f27-89b968994584	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5000.0000	2021-06-17 06:00:00	Jack Daniels	\N	\N	f	2021-12-30 19:57:59.504746	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ad03bf73-4d05-4f6a-94cb-58499c80d431	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	453.9200	2021-04-01 03:00:00	\N	\N	\N	f	2021-12-30 18:14:54.676996	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5e0cc406-796a-493f-a21b-caa1ed3c33ad	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	900.0000	2021-04-01 03:00:00	Libros	\N	\N	f	2021-12-30 18:45:02.620437	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
3f45e1e4-2297-475e-b542-1b1ebfb24567	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	15000.0000	2021-04-01 03:00:00	Norma	\N	\N	f	2021-12-30 18:46:53.386317	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9608a89f-a711-4471-8dcd-a57ef41d09f6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9900	2021-04-01 06:00:00	Aire 3/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
8f726ea2-c380-4e04-9756-b836d30c2948	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	41061.4000	2021-04-01 03:00:00	Ajuste	\N	\N	f	2021-12-30 19:40:19.047144	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
fe4b2351-8f20-486d-90c1-fca7ebbd4abe	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	10500.0000	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:42:24.71621	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8f6f9acc-6c7e-42a4-afbd-6c7e96a018aa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-05-01 03:00:00	\N	\N	\N	f	2021-12-30 19:42:39.878955	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
14a9128a-c2bf-4c41-b495-a885c88b5e4c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	4500.0000	2021-05-01 03:00:00	Libros	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-30 19:44:42.159192	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-05-01 03:00:00	f	\N
26eb37bd-1ba2-4f19-bf25-c81457e4acfa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	840.0000	2021-05-01 03:00:00	Pedidos Ya	\N	\N	f	2021-12-30 19:46:34.574829	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bccf0c7f-ed96-4d87-8a5f-8945e32ecb04	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	879.0000	2021-05-01 03:00:00	Pedidos Ya	\N	\N	f	2021-12-30 19:46:45.895512	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
43f18145-dcd5-47d6-bdc9-d794faf17efa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	4783.9900	2021-05-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-30 19:48:35.750363	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-03-30 03:00:00	f	\N
69b39158-c7fe-4a6a-95cf-6f65fcb66e89	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2021-06-01 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2021-12-30 19:51:27.414006	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-01 03:00:00	f	\N
391f6d1e-be15-4583-9881-38dd58b8969d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	7167.0100	2021-06-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2021-12-30 19:53:33.892593	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-05-11 03:00:00	f	\N
c4fccb6e-eb91-4e2b-a8b1-6e5328dce389	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	9414.3000	2021-06-06 03:00:00	Almohadones	\N	\N	f	2021-12-30 19:56:07.585323	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1fe75746-c300-434e-a18f-6ad4fa63717e	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	194637.8700	2021-07-01 03:00:00	\N	\N	\N	f	2021-12-30 21:15:01.750082	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f68ccb33-bc90-41bf-8a92-1582c70d0c55	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2021-07-01 03:00:00	Tuenti	\N	\N	f	2021-12-30 21:16:29.472668	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
450c4f0a-02bc-4cb7-9a70-31755c9f71f6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	14097.0000	2021-07-01 03:00:00	Sabanas	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-30 21:20:23.821563	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-01 03:00:00	f	\N
7f48f5b2-c6eb-4642-8060-3a9b3e7ce39a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adc3759f-1a65-4cfa-9edf-78a6fbe613db	1730.0000	2021-07-02 03:00:00	Mc Donalds	\N	\N	f	2021-12-30 21:23:11.205429	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f1a31bc0-3982-45df-80e7-9fd162e0eae2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2021-08-01 09:00:00	Notebook 2/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
01feb3d3-9146-4d7c-8aab-e5b8f98582c0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9200	2021-08-01 06:00:00	Aire 7/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	7	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
e9271b6a-1a4b-4970-8f9a-f30ba5925699	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2021-09-01 09:00:00	Notebook 3/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
352a670e-4990-41cb-b9c8-e97049e96e26	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2021-10-01 09:00:00	Notebook 4/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
1977f021-5510-48db-a617-fbff123b8497	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9200	2021-09-01 06:00:00	Aire 8/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	8	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
49f045f6-c7f5-4190-b1cb-5663d22f2291	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9200	2021-10-01 06:00:00	Aire 9/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	9	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
a6f762fd-aa75-46dd-96f4-4ca389fbf402	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2021-11-01 09:00:00	Notebook 5/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
196ebbc0-31de-472e-bfaf-fd439acb6bf9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9200	2021-11-01 06:00:00	Aire 10/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
f95cb165-f803-40b3-a723-b34eb48dc403	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2021-12-01 09:00:00	Notebook 6/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
1e32c18b-051f-490c-ba4d-584a31eca3b4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9200	2021-12-01 06:00:00	Aire 11/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
bc0554df-4e88-466e-b785-d44db8c9c29d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2022-01-01 09:00:00	Notebook 7/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	7	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
57ca28a1-cb2a-43b8-8123-fb039f81f2f2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	3727.9200	2022-01-01 06:00:00	Aire 12/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2021-12-23 18:07:40.072645	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-23 06:00:00	f	\N
05bd7071-5ce0-4b96-9981-18d708f51ba0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	6745.0000	2021-01-28 06:00:00	Libros	\N	\N	f	2021-12-27 15:55:37.13293	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
22c257bd-abae-42bd-b0c3-532203b24667	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	948.4900	2021-06-01 16:26:59	SSD 11/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2021-12-13 13:26:31.525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-07-27 06:00:00	f	\N
a18ce36e-73d2-449e-a2ef-4c70710774d9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2021-07-01 09:00:00	Notebook 1/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
69818c1c-76c5-4977-85ec-4ea2d35dd4c7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2022-02-01 09:00:00	Notebook 8/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	8	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
e534e4b5-e07b-4e50-b3a4-43650fb96dba	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	2269.0000	2021-08-14 06:00:00	Pedidos Ya	\N	\N	f	2022-01-01 19:27:36.483705	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6bf4e99f-462e-4872-a65f-eedd1671f95f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	10000.0000	2021-08-01 03:00:00	Paola	\N	\N	f	2022-01-01 19:28:01.867272	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
22a5e1bf-a00c-4a98-b393-bb25a0a25e4d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	67000.0000	2021-08-01 03:00:00	Plazo Fijo	\N	\N	f	2022-01-01 19:28:26.352106	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
3b5d0c91-4834-4ef2-8e34-20fddca55718	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	883.0000	2021-08-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-01 19:28:37.651352	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a9d7dffd-dab3-44f8-9441-82a1a1066684	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	64836.0000	2021-08-01 03:00:00	Transaccion BNB	\N	\N	f	2022-01-01 19:29:05.475139	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4e717296-f944-4320-9846-460a908ea6e6	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	0.7900	2021-08-01 03:00:00	\N	\N	\N	f	2022-01-01 19:29:17.54016	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c125f39d-6d33-465c-ae21-85fec65c7d89	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	128224.8500	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-01 19:34:20.156077	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
228ac164-3a19-450b-abca-1009be402917	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	10000.0000	2021-09-01 03:00:00	Pao	\N	\N	f	2022-01-01 19:34:39.724801	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c73d7a2e-9e93-473c-b622-c58f146b8e06	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1218.7500	2021-09-01 03:00:00	Seguro de Vida	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 18:20:35.900798	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-09-01 03:00:00	f	\N
4db5dae3-5e1e-48b7-a3c6-c0ba524a94a9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-02 18:20:54.267699	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6a590aa5-262c-4063-af2d-1660f1f63e1d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1006.5000	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-02 18:21:13.455478	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e370edd6-4e02-41af-adda-1b70ca9730c8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4044.0000	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-02 18:21:27.857619	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
64d5826e-1f6e-4324-afca-6a3aaa9f2501	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	4113.3000	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-02 18:21:38.239333	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
652662d9-28c5-4e45-9c3e-e8ee72eed987	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-02 18:21:50.07868	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4173c972-204a-4ff5-9a12-fec2ab14b385	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	8500.0000	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-02 18:22:06.779128	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1c70ca75-4e6f-4070-a280-071ae4e36195	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2021-09-01 03:00:00	Tuenti	\N	\N	f	2022-01-02 18:22:28.29145	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6ae0ad85-bce9-496f-b04b-45397862cfc4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2000.0000	2021-09-01 03:00:00	Futbol	\N	\N	f	2022-01-02 18:22:43.730767	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
27fd404a-f27e-4704-8076-347f168cf2ab	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	7798.0000	2021-09-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-02 18:24:16.867456	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-27 03:00:00	f	\N
1489ac3d-f033-4386-9ff8-66977ec42fb3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	7153.3100	2021-09-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-02 18:24:50.302472	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-10 03:00:00	f	\N
b96cc831-46ea-48cd-896f-23bcdccad2c3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	b94b8d3d-f7d6-45f0-94aa-e9f9b31abe23	1725.0000	2021-09-01 03:00:00	Regalo 1/2	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 19:10:20.893901	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-15 03:00:00	f	\N
d38c4046-86df-4003-92e9-51775fe81d60	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	b94b8d3d-f7d6-45f0-94aa-e9f9b31abe23	1725.0000	2021-10-01 03:00:00	Regalo 2/2	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2022-01-02 19:10:20.893901	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-15 03:00:00	f	\N
75de8f02-e895-409a-a7d4-16ea19740606	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	5000.0000	2021-09-01 03:00:00	Inscripcion	\N	\N	f	2022-01-02 19:11:52.580632	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c9ddaacc-aaa9-4ade-ad82-655e9f55209c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3450.2100	2021-09-01 03:00:00	Nafta	\N	\N	f	2022-01-02 19:12:09.364888	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1936e75b-29d5-42c4-837a-32c491dafdd5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	277.0000	2021-09-01 03:00:00	Regalo Maestra	\N	\N	f	2022-01-02 19:12:35.318765	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
018d43c3-2d44-4ddd-a63d-db39b7136c2f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	360.0000	2021-09-01 03:00:00	YPF	\N	\N	f	2022-01-02 19:12:46.938079	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c00ea0f7-17f4-413e-9651-2ac47e4c9ba2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	dc61ac80-0b0f-457f-a2f5-511b1f7d76c2	1000.0000	2021-09-21 03:00:00	Barry	\N	\N	f	2022-01-02 19:13:14.468184	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
76f43459-e1db-49d4-98e0-39ec02b376d1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	616.0000	2021-09-21 03:00:00	Pedidos Ya	\N	\N	f	2022-01-02 19:13:49.217614	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8d5c0457-2f4e-4c54-b6a2-e6db735709d1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	055e4278-3d28-4c8a-b314-535cb90f846c	330.0000	2021-09-21 06:00:00	Pipeta	\N	\N	f	2022-01-02 19:13:25.490488	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
3f6506c8-bad7-43f7-b6b3-e825a8582f9c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	690.0000	2021-09-21 03:00:00	Monex	\N	\N	f	2022-01-02 19:14:22.33523	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f3448541-1469-422f-bb64-8daab7e4b7f7	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	194300.0000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-02 19:51:35.850902	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7d8f46c9-3b83-4746-a6b1-43961d1ba526	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-02 19:53:30.05751	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c4286227-7aea-4e7d-b467-5b55b8af2852	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1006.5000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-02 19:53:45.136324	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b45e7dbf-14a9-4569-a99b-b0bcc07d1396	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4044.0000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-02 19:53:56.701862	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9a505b3b-71e6-485e-8461-2c04b5d67b7d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	4113.3000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-02 19:54:08.070258	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ae1f174c-8dff-4569-b2e1-46238374cc16	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2021-12-01 09:00:00	Compragamer 4/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
a899538b-3fe3-4195-9d25-2a8fad57f320	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2022-01-01 09:00:00	Compragamer 5/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
86f34550-313e-4603-b461-92dd1a85e59f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2022-03-01 09:00:00	Compragamer 7/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	7	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
f838c29f-4e29-4751-9c53-92a8cfb57179	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7900	2021-09-01 06:00:00	Compragamer 1/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 06:00:00	f	\N
c8f8d20c-8711-45ec-996d-6f869afc30d9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	279.0000	2021-09-01 06:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 18:25:15.360125	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-09-01 06:00:00	f	\N
127d6510-8a53-4c7b-b138-b5de24242502	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	178.5600	2021-09-01 06:00:00	Spotify Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 18:25:41.329689	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-09-01 06:00:00	f	\N
eacca9df-39b5-483e-b6ce-6fa1e333ef62	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1097.1600	2021-09-01 06:00:00	Netflix	\N	\N	f	2022-01-02 19:09:28.359642	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4c15227c-e85e-4e5f-ba5e-58e2c012d3e4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2021-11-01 09:00:00	Compragamer 3/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
fa5301b4-560c-4ce6-8ef5-96c312983b6d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2022-04-01 09:00:00	Compragamer 8/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	8	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
251bbfdf-b882-4903-9afa-5c2f8c3bb9c5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2022-05-01 09:00:00	Compragamer 9/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	9	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
1be2728a-4db3-4b78-8c35-6147fa73f700	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2022-06-01 09:00:00	Compragamer 10/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
81220f7d-7a82-443c-bb94-616c9485e2c2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7900	2022-07-01 06:00:00	Compragamer 11/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 06:00:00	f	\N
cb900170-f0de-46da-8c53-099a39196912	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7900	2022-08-01 06:00:00	Compragamer 12/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 06:00:00	f	\N
0422ebfc-9272-45d7-b710-c5e23c590e43	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2022-02-01 09:00:00	Compragamer 6/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
c3aa38a4-655b-4a33-a1a6-cfa631c8e63e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-02 19:54:16.83049	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
414424a5-f123-41da-917a-4af68928ed28	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	8500.0000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-02 19:54:27.741224	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1d46fa27-1572-4fe1-95a9-e7fb15696810	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2021-10-01 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-02 19:54:46.772444	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-01 03:00:00	f	\N
2f8acacd-b50c-4f80-bf62-981e387c004f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1218.7500	2021-10-01 03:00:00	\N	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 19:55:53.279556	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-01 03:00:00	f	\N
4cfb1d73-c54b-4a82-904c-d4374a86f263	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2000.0000	2021-10-01 03:00:00	Futbol	\N	\N	f	2022-01-03 01:04:37.936934	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
786d73b4-f66b-4146-838b-e65344c088be	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	9486.6300	2021-10-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 01:05:09.15136	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-31 03:00:00	f	\N
4ced20db-0b5c-48ff-9a51-e08f793cf127	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	6784.5600	2021-10-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 01:05:33.912447	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-09-14 03:00:00	f	\N
9ef95b1a-0b53-4ec0-8726-6cea37ad44a1	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	365.6200	2021-10-01 03:00:00	Devolucion Seguro	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 01:06:34.484167	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-01 03:00:00	f	\N
650290ff-5a36-4525-9bd1-f1d9a4a853b4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1250.0000	2021-10-01 03:00:00	Ingles	\N	\N	f	2022-01-03 01:07:24.290779	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
056edb69-b2dc-425e-a490-7a431e8b0c22	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	2269.0000	2021-10-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 01:08:41.862479	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6eca0001-8c82-4ec4-808b-9d092899df80	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1621.0000	2021-10-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 01:10:30.731028	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9d54f2eb-90aa-42c6-a10f-0afef02e9fdd	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	dc61ac80-0b0f-457f-a2f5-511b1f7d76c2	3260.0000	2021-10-01 03:00:00	Barry	\N	\N	f	2022-01-03 01:46:18.331633	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b80e74ea-2ff9-4783-a0bb-4a5d973e4166	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	994.7500	2021-10-01 03:00:00	Farmacia	\N	\N	f	2022-01-03 02:33:42.797225	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
871c5551-fcbb-46f3-85b2-7b7d76184caa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	9700.0000	2021-10-01 03:00:00	Anteojos	\N	\N	f	2022-01-03 02:34:26.287771	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
15a96c6b-1556-48ec-b499-d91b010ec0c3	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	1250.0000	2021-10-01 03:00:00	Ingles	\N	\N	f	2022-01-03 02:34:42.611213	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
65d3d72e-3b16-4df3-95b8-2a30007b2eb1	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	3500.0000	2021-10-01 03:00:00	Reintegro Anteojos	\N	\N	f	2022-01-03 02:35:05.835362	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
29579054-e982-4088-a3b4-ad0138c37783	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	220.5000	2021-10-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 03:07:28.333908	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-01 03:00:00	f	\N
facb173a-de50-432e-8027-8670bf0d8301	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	650.0000	2021-10-01 03:00:00	Pizza	\N	\N	f	2022-01-03 03:07:58.727033	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
28f4ded5-f287-4d89-be2d-a3807692c2fc	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3691.3200	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-03 03:08:10.471397	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ac4a57e8-fec6-46ba-a012-708906c4c4f7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	225.0000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-03 03:08:25.033352	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1f13b8c9-9376-4e8b-8754-7a5d22fa72f6	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	0.7400	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-03 03:08:34.827236	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b8f857d2-40a4-48ab-9472-d9609f685d9d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1234.0000	2021-10-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 03:08:48.57234	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d5e6bc1d-d375-4ad3-a488-b9f3773567d6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	300.0000	2021-10-01 03:00:00	Acta	\N	\N	f	2022-01-03 03:09:01.718489	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ca4bc102-c5a9-44e7-861a-95142258e558	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	1200.0000	2021-10-01 03:00:00	Matematica	\N	\N	f	2022-01-03 03:09:20.946864	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6cdee997-aaf1-4882-94fa-1335af78a968	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	69c24541-2f23-49a5-8b0c-72171c3997e0	3000.0000	2021-10-01 03:00:00	\N	\N	\N	f	2022-01-03 03:09:35.528192	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
32e8c316-324e-4ef8-b0db-ef335d337615	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	238.0000	2021-10-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 03:09:45.678889	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e98628a9-8c64-4e22-b8af-28cac3bc89ac	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	800.0000	2021-10-01 03:00:00	Cinthia	\N	\N	f	2022-01-03 03:10:07.731124	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
40029321-b22a-481c-b59d-ac9fd5b4d543	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1680.0000	2021-10-01 03:00:00	Merienda	\N	\N	f	2022-01-03 03:10:19.851977	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
21458a97-d944-4171-8473-5c8cd78ed4b1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1150.0000	2021-10-01 03:00:00	Porthos	\N	\N	f	2022-01-03 03:10:39.244483	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9571d3ff-50e5-4a47-9f5a-e06036875b98	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1422.0000	2021-10-01 03:00:00	YPF	\N	\N	f	2022-01-03 03:11:03.561301	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
23b473ad-45a5-4e4d-99da-6a796f7c6c12	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adc3759f-1a65-4cfa-9edf-78a6fbe613db	2650.0000	2021-10-01 03:00:00	Cena	\N	\N	f	2022-01-03 03:11:19.664762	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7e652993-2691-4679-b1f4-2d44ef9a6f9d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3aa8d007-c7dc-47e4-87ff-b6dee93139eb	5667.0000	2021-09-01 06:00:00	Service 3/3	f83e712a-277e-47c2-a666-b7564a965549	3	f	2021-12-30 21:19:11.379933	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-03 06:00:00	f	\N
49ae3b4c-56aa-4110-826e-4fca4142f2a7	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	0.3200	2021-09-01 03:00:00	\N	\N	\N	f	2022-01-03 11:58:16.289866	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
20535640-2641-4661-8fdc-51dfe723ca48	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	191798.2600	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:02:06.459789	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
96b8b7c1-fcf6-47aa-a20d-e82e5ad53403	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	30000.0000	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:02:27.066981	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
93e8a0f9-acce-4704-8980-6ab59b3aec9d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1495.0000	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:02:37.995687	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6cd53aac-0f65-46f2-9717-0e0accdf0734	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4044.0000	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:02:47.35656	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
65f4007b-ec4c-4bc5-ac5b-5e940c5944d0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3977.7300	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:03:01.21504	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6ce817ce-db8b-4dbf-82fb-3b9d13c8c32a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	8500.0000	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:03:15.691988	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
99fd5f6e-75f1-4734-b3bb-ad104b9d9e8a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2021-11-01 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-03 12:03:31.335291	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-11-01 03:00:00	f	\N
f05eabea-6ad4-4996-927f-9750b9a2b74f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1218.7500	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:04:16.838428	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b1e0c771-2c07-486d-9fb3-074ae3d5294e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	12051.1300	2021-11-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 12:05:46.853199	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-05 03:00:00	f	\N
b93b75d5-be58-4b8a-ae7c-7ffcc1bc90b7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	299.9200	2021-10-01 06:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 19:56:59.614548	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-09-06 06:00:00	f	\N
35c542a3-0e8e-4a9d-a1f9-81aa014445fa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	180.3600	2021-10-01 06:00:00	Spotify Impuesto	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-02 19:58:11.200101	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-01 06:00:00	f	\N
ce6ec39a-36bf-4ada-af00-5c050851e678	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	12998.0000	2021-10-01 06:00:00	Joysticks	\N	\N	f	2022-01-03 03:07:46.450381	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
117e2164-dd8e-49ca-a2fe-9c4551f0317e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1097.1600	2021-10-01 06:00:00	Netflix	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-02 19:55:14.441633	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-01 06:00:00	f	\N
ca814942-8809-4123-8eec-9457c9d8ea3a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	180.7100	2021-11-01 06:00:00	Spotify Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:05:05.991831	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-11-01 06:00:00	f	\N
e8d6d5f1-372c-463a-858d-fb2e7823c458	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1097.1600	2021-11-01 06:00:00	Netflix	\N	\N	f	2022-01-03 12:04:04.075158	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2b20e4a1-ce4a-4a58-8a71-5d2558508cfd	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	299.2500	2021-11-01 09:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:04:38.547728	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-11-01 06:00:00	f	\N
23dd6b32-d7ff-44ab-8949-6c2e7fda6905	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2000.0000	2021-11-01 03:00:00	Futbol	\N	\N	f	2022-01-03 12:06:00.797844	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
19166f1c-33f2-4d64-ae68-c9aa304cb83f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	50000.0000	2021-11-01 03:00:00	Prestamo Papa	\N	\N	f	2022-01-03 12:06:20.265907	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2f74bc96-420a-4220-8561-5b808147be70	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	2500.0000	2021-11-01 03:00:00	Campamento	\N	\N	f	2022-01-03 12:06:39.693906	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0881d18c-d71d-43ae-b25b-20aa46fd0cd5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	500.0000	2021-11-01 03:00:00	Error	\N	\N	f	2022-01-03 12:06:54.307568	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
97463b8d-d90e-4f2c-b1ba-3d779bf9a882	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	900.0000	2021-11-01 03:00:00	Matematica	\N	\N	f	2022-01-03 12:07:21.596332	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0f79142b-e494-481c-b5eb-bf2effbffd2f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3050.6000	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:07:35.056239	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
af65e543-dd4e-4e06-8c01-92097621c005	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	200.0000	2021-11-01 03:00:00	Coca	\N	\N	f	2022-01-03 12:07:56.675505	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
74605685-8c58-47c4-95f1-0fb0cec4e94d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1776.0000	2021-11-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 12:08:09.582192	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
93169e00-4c41-4050-bf28-080e2629f40a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1799.0000	2021-11-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 12:08:17.997514	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9e3c4ee1-a86c-46f8-b72e-7848317b0301	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	32000.0000	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:08:33.505286	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6da8a9cb-0f4b-4118-ba19-9d97a483daa4	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	0.8400	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:08:54.345636	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b58c6d66-9f25-40e9-8474-7577932b82c9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	dc61ac80-0b0f-457f-a2f5-511b1f7d76c2	2680.0000	2021-11-01 03:00:00	Barry	\N	\N	f	2022-01-03 12:09:10.023669	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6a7b57e6-2cfa-4019-8daa-19c7bed3879f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	218f3849-f4f3-4cd3-9295-b163a004edea	900.0000	2021-11-01 03:00:00	Cine	\N	\N	f	2022-01-03 12:09:24.932673	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5b719903-cef9-43fb-9635-d4ae79a1a760	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adc3759f-1a65-4cfa-9edf-78a6fbe613db	800.0000	2021-11-01 03:00:00	Mc Donalds	\N	\N	f	2022-01-03 12:09:40.466507	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
635d64b7-7d82-4ae7-a80e-40ef436ec7d9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adc3759f-1a65-4cfa-9edf-78a6fbe613db	750.0000	2021-11-01 03:00:00	Sherwood	\N	\N	f	2022-01-03 12:09:52.27808	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4178276d-f6ce-4779-bb13-a7292e6b083e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	118.0000	2021-11-01 03:00:00	Fetiche	\N	\N	f	2022-01-03 12:10:06.724582	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f74ca69a-a4ec-4b38-8545-682d4792d11e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	530.0000	2021-11-01 03:00:00	Remis	\N	\N	f	2022-01-03 12:10:29.62133	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b08bc2a3-19d3-41ef-a094-a08ee546a179	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	357.8400	2021-11-01 03:00:00	Cabify	\N	\N	f	2022-01-03 12:10:45.915189	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4f8b6c4a-2fc1-4f9e-9e00-aed243f97e72	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	477.0400	2021-11-01 03:00:00	Cabify	\N	\N	f	2022-01-03 12:10:57.301839	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6a3eff30-287c-4019-8e7b-82972f4da154	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	1063.0000	2021-11-01 03:00:00	Uber Lucas	\N	\N	f	2022-01-03 12:11:17.021057	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8f15dd0c-dc1f-465a-9805-27a1964634fe	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	919.0000	2021-11-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 12:11:27.765084	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f4c76237-0744-4cce-b982-b89806d2c075	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	79783afb-b95b-4e73-b83c-da6b667f0a66	7500.0000	2021-11-01 03:00:00	Catering Cumple	\N	\N	f	2022-01-03 12:11:49.664654	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2281e560-d917-457e-b3f6-3a7433af5911	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	919.0000	2021-11-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 12:11:58.41198	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1c100ed0-f5da-4a14-a684-211b4fbd40ab	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	79783afb-b95b-4e73-b83c-da6b667f0a66	2150.6800	2021-11-01 03:00:00	Cumple Santi	\N	\N	f	2022-01-03 12:12:11.122494	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b560006a-64db-4f30-9840-bb220c2af49a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	79783afb-b95b-4e73-b83c-da6b667f0a66	420.0000	2021-11-01 03:00:00	Gaseosas	\N	\N	f	2022-01-03 12:12:28.891756	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
42213cfe-2336-4a11-886d-fd276ee85a1c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1569.0000	2021-11-01 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 12:12:37.133383	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
15989637-300a-465e-9cd4-3701dcb2243d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-11-01 03:00:00	\N	\N	\N	f	2022-01-03 12:13:04.620471	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
49fb5d45-b48d-4a6d-8028-ca4a6d37d169	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	210989.0000	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:14:43.929773	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
21c02bfe-bf66-49d4-b4af-8a2186b07982	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	45000.0000	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:15:16.702705	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2261d685-96b9-4f3b-9a2c-fbb11e746da6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1396.0000	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:15:25.032359	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
76c44e5f-01d4-4dec-b51f-856c730d01b4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4044.0000	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:15:33.569656	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b04a7017-abf2-4c70-b180-2825a49da165	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3977.7300	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:15:45.927214	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
cb884814-23df-4deb-99bd-ff3929edf9a6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	10000.0000	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:15:55.469514	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
50f5fc82-e0ab-4a03-aa60-2a15ed0f1a60	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	8000.0000	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:16:09.657936	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2b940e5b-553c-453b-998d-660794960e47	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2021-12-01 03:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-03 12:16:27.03827	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 03:00:00	f	\N
652db2fa-b05d-407b-8863-244f2494ee9c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	8087.1400	2021-12-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 12:19:00.653974	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-10-26 03:00:00	f	\N
ab1d6a6e-b308-4aa6-96e5-f9c07d397f99	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	69c24541-2f23-49a5-8b0c-72171c3997e0	11767.4500	2021-12-01 03:00:00	ML	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-03 12:19:55.889601	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 03:00:00	f	\N
463358b1-e44a-418b-839c-7681a14be9e9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	1905.0000	2021-12-01 03:00:00	Claudio	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:20:19.588485	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 03:00:00	f	\N
5e3af889-5c43-4aca-9009-e852d69391a9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	20504.5800	2021-12-01 03:00:00	Naranja Ceci	1c5f906d-e05e-4ad8-87f9-432cc4c35ebb	1	f	2022-01-03 12:20:50.315757	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 03:00:00	f	\N
064d0ca3-7fef-4289-a1a6-b5d88d8d0581	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	8371.7700	2021-12-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 12:21:13.309514	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 03:00:00	f	\N
743cd0ea-3713-456c-bd28-94629ac6a0cc	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	8b2250fe-a385-488e-be06-06b6d4689407	1126.7100	2021-12-01 06:00:00	Steam	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:21:35.933446	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-11-24 03:00:00	f	\N
d573881c-4c8b-433d-934d-01352b67cc77	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	4550.5400	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:22:29.079019	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
27cf2e93-ea20-4423-8e35-db95a1041002	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	6.4200	2021-12-01 03:00:00	Ajuste VISA	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:23:19.447512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 03:00:00	f	\N
1b3bf96a-4b7e-46e4-9bdb-9742c511ccd7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1940.0000	2021-12-06 03:00:00	Medialunas Calentitas	\N	\N	f	2022-01-03 12:23:42.025636	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d2ec1385-3607-4330-a799-e167afa20d30	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	930.0000	2021-12-06 03:00:00	Asado	\N	\N	f	2022-01-03 12:24:34.800509	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
23cec222-f34b-464d-b872-4076328f397e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	600.0000	2021-12-06 03:00:00	Cinthia Galletitas	\N	\N	f	2022-01-03 12:24:54.372786	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c84be209-7adb-4219-a7eb-2a38aa209e92	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1539.9600	2021-12-01 06:00:00	Netflix	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-03 12:16:58.287396	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 06:00:00	f	\N
ba8317bf-17ef-4af7-a32f-0522eb8066db	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	858.1700	2021-12-01 06:00:00	Impuestos dolares	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:18:14.715366	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 06:00:00	f	\N
8bc7562f-a8c7-4d8f-b493-87d345b73272	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	308.1600	2021-12-01 06:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:17:42.124896	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-01 06:00:00	f	\N
5322a579-5087-4772-81ed-b4be10cd2f9b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	4179.0000	2021-12-06 06:00:00	Regalo Sobrinos	\N	\N	f	2022-01-03 12:24:05.348633	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e9d5b132-0d5b-46dc-9855-a92d68040f34	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	1911.2700	2021-12-06 03:00:00	Ferreteria	\N	\N	f	2022-01-03 12:25:23.043055	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7900c3f2-e972-4a33-81b3-5d09c755e2f3	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	0.6200	2021-12-07 03:00:00	\N	\N	\N	f	2022-01-03 12:25:34.37657	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
30f223c8-f179-4003-934a-dd809d61b406	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	400.0000	2021-12-13 03:00:00	Kiosko	\N	\N	f	2022-01-03 12:25:58.861091	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ade4220d-1321-44de-8ea9-7afd0fdfaf98	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	6159.2500	2021-12-20 03:00:00	Asado	\N	\N	f	2022-01-03 12:27:01.402628	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a850f9ec-0fd9-47bf-84ba-ce57c074be94	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	dc61ac80-0b0f-457f-a2f5-511b1f7d76c2	2570.0000	2021-12-30 03:00:00	\N	\N	\N	f	2022-01-03 12:27:39.090056	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
49a2c83b-b079-4229-9074-43c87aee3574	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	3550.0800	2021-12-22 03:00:00	\N	\N	\N	f	2022-01-03 12:28:00.861197	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
82ca46f9-f7fd-4587-9891-5bb0ec4f1116	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1208.0000	2021-12-26 03:00:00	Pedidos Ya	\N	\N	f	2022-01-03 12:28:42.25066	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b05a84ab-06f3-4813-9ff9-17b0b7705e6b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	2592.6100	2021-12-29 03:00:00	Choris	\N	\N	f	2022-01-03 12:28:57.07098	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
997f96b3-c000-4716-a1c6-6007490378d2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	b94b8d3d-f7d6-45f0-94aa-e9f9b31abe23	600.0000	2021-12-13 06:00:00	Remera	\N	\N	f	2022-01-03 12:26:15.87986	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
cce8dccf-97fa-42f1-b93e-9a3d99da51f2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	1000.0000	2021-12-01 06:00:00	Futbol	\N	\N	f	2022-01-03 12:19:16.954194	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d814f35e-70eb-4406-a77f-dbe660e30869	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1218.7500	2021-12-01 03:00:00	\N	\N	\N	f	2022-01-03 12:35:04.010513	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
12368b59-4789-4612-9f4f-a70e9d2f8392	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	8300.0000	2022-01-01 03:00:00	Teletrabajo	\N	\N	f	2022-01-03 12:37:27.432775	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c7a05b60-fb68-4979-abaa-aa574db7ff99	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	45000.0000	2022-01-01 03:00:00	\N	\N	\N	f	2022-01-03 12:38:00.025408	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
91cfd16c-822f-45ad-8bc6-c9909c8d2e6f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1396.0000	2022-01-01 03:00:00	\N	\N	\N	f	2022-01-03 12:38:10.53127	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
33f299d0-df3c-421d-a553-5830d60e9c0d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3622.5800	2022-01-01 03:00:00	\N	\N	\N	f	2022-01-03 12:38:55.314208	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c829d3c0-e687-4318-bc02-17736980f1bb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	12000.0000	2022-01-01 03:00:00	\N	\N	\N	f	2022-01-03 12:39:09.87322	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
df799b5c-ecd3-4931-8079-efdff028dbef	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2022-01-01 06:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-03 12:39:24.69336	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-01 03:00:00	f	\N
974cd8e3-a2c1-4fa0-8c8c-360dbca56f05	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	10613.5600	2022-01-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 12:42:36.12315	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-07 03:00:00	f	\N
9248391b-651b-401e-accf-16df7297affd	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	11069.6300	2022-01-01 03:00:00	\N	1c5f906d-e05e-4ad8-87f9-432cc4c35ebb	1	f	2022-01-03 12:43:09.788807	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-28 03:00:00	f	\N
9fab92ce-4c73-47fa-94bc-53391a9ec56f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	302.7200	2022-01-01 15:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:40:50.732866	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-01 12:00:00	f	\N
c6fced53-4131-4a2d-9dbf-4bb53709c7e4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	fcc486a5-923c-49ef-ab44-863d1f07d6f4	2761.2300	2022-03-01 06:00:00	Patente 2/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2022-01-05 12:23:09.352525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 06:00:00	f	\N
706f3adc-03f7-430b-a810-6b3f869243ba	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1218.7500	2022-01-01 06:00:00	\N	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:40:32.900116	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-01 03:00:00	f	\N
36754769-d40c-489b-b809-a141b0b6d57b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1539.9600	2022-02-01 09:00:00	Netflix	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-04 12:37:06.954676	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-01 09:00:00	f	\N
3f473542-0faf-477f-bdc7-f3f5164e72ba	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4411.9800	2022-01-01 06:00:00	\N	\N	\N	f	2022-01-03 12:38:21.768137	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
53ecd3f5-829d-49b6-805b-6bb4b594b6d5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	9336.4800	2022-02-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-03 13:36:27.491611	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-28 03:00:00	f	\N
5416d0b5-ce33-4f16-bee6-38fd75dab975	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	45000.0000	2022-02-01 03:00:00	\N	\N	\N	f	2022-01-04 02:23:40.752554	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
eb8763cf-37b4-43ea-929d-6214382cc065	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	12000.0000	2022-02-01 03:00:00	\N	\N	\N	f	2022-01-04 02:24:21.789163	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
439b25ec-5940-4c4f-a601-7f88a7caf4e8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	12000.0000	2022-02-01 03:00:00	\N	\N	\N	f	2022-01-04 02:24:47.830296	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
590cad08-f522-414a-ba20-f48c20d2a5f4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1396.0000	2022-02-01 03:00:00	\N	\N	\N	f	2022-01-04 12:33:10.795485	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
639ff042-49a7-43de-9e7f-873d2cc408da	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	3622.5800	2022-02-01 03:00:00	\N	\N	\N	f	2022-01-04 12:33:23.50086	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6fefe046-a6b8-474c-bdf5-30f9cb342f24	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	884ea6c7-7011-420e-87de-6eb27d9f7ace	14852.8200	2022-02-01 03:00:00	Flybondi	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-04 12:34:15.553015	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-03 03:00:00	f	\N
531b8b26-9e4d-4a9b-abb0-0a57685c9e44	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	304.1400	2022-02-01 15:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-04 12:36:20.846833	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-01 12:00:00	f	\N
11a4a4f6-70a1-4d02-a830-5727ba945986	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	8300.0000	2022-02-01 03:00:00	\N	\N	\N	f	2022-01-04 12:40:11.414042	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
72ac95d3-8e3b-471b-b7ca-154432c4c27d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	fcc486a5-923c-49ef-ab44-863d1f07d6f4	2761.2400	2022-07-01 03:00:00	Patente 6/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2022-01-05 12:23:09.352525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 03:00:00	f	\N
308edbe9-ba22-4940-b56d-8be955f7e339	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	fcc486a5-923c-49ef-ab44-863d1f07d6f4	2761.2800	2022-02-01 06:00:00	Patente 1/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-05 12:23:09.352525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 06:00:00	f	\N
f63b992c-51a8-4e01-8729-3d869577fc19	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	16448.4900	2022-02-01 03:00:00	Divan + Focos	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-05 12:32:07.655986	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-04 03:00:00	f	\N
d57e9765-9b96-44dd-98f7-0917dd883955	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	4640.5600	2022-02-01 03:00:00	Impuesto 1/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-05 13:05:33.240657	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 03:00:00	f	\N
30ebdcfc-9885-4bc4-a257-94d3a4bd1f75	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	203187.3100	2022-02-01 06:00:00	\N	\N	\N	f	2022-01-04 12:40:02.480207	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
24aac581-1753-4fc2-a86f-b9c47a4cc834	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	181650.7000	2022-01-01 09:00:00	\N	\N	\N	f	2022-01-03 12:44:40.711113	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
020b7633-71c1-4a8b-8e39-9793875d5d27	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	1600.0000	2021-12-20 06:00:00	Regalo Agustin	\N	\N	f	2022-01-03 12:26:35.317917	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7b6a495c-9559-4cd7-9178-81df4c3dd619	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	3850.0000	2022-01-01 06:00:00	Disney +	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:48:39.326831	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-12-27 06:00:00	f	\N
d9aee916-f09d-45f1-a7d9-37993be41994	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	181.7600	2022-01-01 06:00:00	Spotify Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-03 12:47:11.556475	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-01 06:00:00	f	\N
6d2e0af4-518d-4a7c-bdb6-51f06899ef13	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1539.9600	2022-01-01 09:00:00	Netflix	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-03 12:40:08.446362	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-01 06:00:00	f	\N
8ed53c65-4ee6-4ae9-8a54-20e2df4626aa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	3243.9900	2022-02-03 06:00:00	\N	\N	\N	f	2022-01-04 12:35:17.147755	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bac2f882-a3b5-48a0-8740-2d1ea7f1791b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1374.4400	2022-02-01 15:00:00	\N	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-04 12:39:07.408783	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-25 15:00:00	f	\N
61f506b9-c7a0-4a5f-964a-6855a22dacf8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	fcc486a5-923c-49ef-ab44-863d1f07d6f4	2761.2300	2022-04-01 06:00:00	Patente 3/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2022-01-05 12:23:09.352525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 06:00:00	f	\N
7c2f49cb-fb23-461f-961c-42cddff23434	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	fcc486a5-923c-49ef-ab44-863d1f07d6f4	2761.2300	2022-05-01 06:00:00	Patente 4/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2022-01-05 12:23:09.352525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 06:00:00	f	\N
12bfe465-91a6-4a41-b6ec-dc98cf0bfc3a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	fcc486a5-923c-49ef-ab44-863d1f07d6f4	2761.2300	2022-06-01 06:00:00	Patente 5/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2022-01-05 12:23:09.352525	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 06:00:00	f	\N
9e6c620f-e506-406f-a50b-0d9484826c9d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	4640.5600	2022-03-01 03:00:00	Impuesto 2/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2022-01-05 13:05:33.240657	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 03:00:00	f	\N
25eb141a-3df8-49cf-b679-b8e09b0eb262	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	4640.5600	2022-04-01 03:00:00	Impuesto 3/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2022-01-05 13:05:33.240657	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 03:00:00	f	\N
ed79176b-1c04-4bbd-964f-662bd45d7ce0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	4640.5600	2022-05-01 03:00:00	Impuesto 4/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2022-01-05 13:05:33.240657	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 03:00:00	f	\N
ab8d8942-a804-44d6-933d-46948334dec5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	4640.5600	2022-06-01 03:00:00	Impuesto 5/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2022-01-05 13:05:33.240657	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 03:00:00	f	\N
8a921f05-e19e-4c40-8ba8-add1e356a6f0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cdcf2e94-a4d9-467f-a030-d9f7be5b15ab	4640.5600	2022-07-01 03:00:00	Impuesto 6/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2022-01-05 13:05:33.240657	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-05 03:00:00	f	\N
8bc70ed4-302d-46f6-971d-bfb8d2164f6f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	15000.0000	2022-01-05 03:00:00	Plazo Fijo	\N	\N	f	2022-01-05 13:09:12.450601	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
cf688848-02d9-4466-846b-9ad0aefe1829	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	1.1000	2022-01-07 03:00:00	\N	\N	\N	f	2022-01-11 21:06:11.153689	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
05eb292a-e16c-4bc4-b206-63ba8e4ba009	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	980.0000	2022-01-13 03:00:00	Lo de Jacinto	\N	\N	f	2022-01-14 01:52:20.031577	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f3c0d81d-393f-4676-8602-10d76db39ff2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	530.0000	2022-01-15 03:00:00	Kiosko	\N	\N	f	2022-01-15 23:31:59.409401	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bfc04a83-f8a2-4fe3-81fe-fc346c8b9134	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	789.0000	2022-01-17 03:00:00	Marta bianquetti	\N	\N	f	2022-01-18 01:05:02.404013	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d2d0ee6c-b1eb-461d-897f-8e78a9f5add5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	8735.4300	2022-02-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-01-18 12:38:02.894365	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-18 03:00:00	f	\N
0695a79a-d40c-43f5-b52a-5608064a0852	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	15000.0000	2022-02-01 03:00:00	Plazo fijo	\N	\N	f	2022-01-20 00:47:02.436049	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
232388df-4b73-41ea-9975-0e60b95e59eb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	935.0000	2022-01-20 03:00:00	\N	\N	\N	f	2022-01-21 00:22:53.100636	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4232dad9-06ee-4943-8f9b-f3efa8ead23b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	680.0000	2022-01-23 03:00:00	\N	\N	\N	f	2022-01-24 00:42:03.606356	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6fd0b36a-93e7-40d0-be74-878296426e8a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	2000.0000	2022-01-24 03:00:00	Libros	\N	\N	f	2022-01-24 14:40:39.576278	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4b819632-101b-45d8-88f8-d2277cea1ab7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1900.0000	2022-01-24 03:00:00	Estetica	\N	\N	f	2022-01-24 14:40:58.890721	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ab8a096d-7b78-414f-8cce-dd527a537443	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	680.0000	2022-01-15 06:00:00	\N	\N	\N	f	2022-01-16 00:30:36.458256	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d12efaa7-b3c6-4941-bee7-fe59c840da15	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	500.0000	2022-01-26 03:00:00	MP	\N	\N	f	2022-01-26 03:38:47.956524	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e7d2b268-fd20-435d-92dc-851c92e0248e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1966.6800	2022-02-01 03:00:00	Balbi 1/3	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-01-26 03:44:09.947672	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-19 03:00:00	f	\N
56becc9b-f2cf-45c7-af68-31461493d354	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2022-02-01 06:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-01-04 12:38:32.240657	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-25 06:00:00	f	\N
e049680e-a1ab-49c7-9dcc-0c081bad7fb1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	533.1700	2021-01-16 06:00:00	Regalo Mama 3/6	5062d2ee-57d8-46f1-9c78-dceca95125bf	3	f	2021-12-14 15:40:00.254223	3e97090b-ee61-40f4-be5f-3ceb280dc048	2020-10-16 06:00:00	f	\N
bd3217d2-2af1-4290-8bb4-6dac0b591af3	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	1831.6600	2021-09-01 09:00:00	Reloj 2/6	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2022-01-01 19:23:58.243658	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-07-22 09:00:00	f	\N
8e76ce96-bb8d-468d-9a80-c2bdcedb790f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	5549.7100	2021-10-01 09:00:00	Compragamer 2/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2022-01-02 19:11:26.270473	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-08-17 09:00:00	f	\N
33f1c565-87f7-4edd-a853-64d0cfafa4c5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	2350.0000	2022-01-19 06:00:00	Mate rosita	\N	\N	f	2022-01-20 00:06:18.41722	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ebcd585e-39d0-4724-b45a-f41ccf4ba337	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	8848.8000	2022-03-02 03:00:00	\N	\N	\N	f	2022-01-27 20:31:03.192109	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
10e1ca3e-1a72-4423-8012-1e6180a641ee	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	8848.8000	2022-04-04 03:00:00	\N	\N	\N	f	2022-01-27 20:31:19.596759	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5b72b6b7-9dce-4416-b168-5d85659c92a6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1000.0000	2022-01-27 03:00:00	MP	\N	\N	f	2022-01-27 20:36:16.814351	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0b512c02-ed0b-4fd2-9f8c-7bb576e89114	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	4390.0000	2022-01-26 06:00:00	Animal	\N	\N	f	2022-01-29 00:28:54.758749	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
913862ca-d855-4a08-bc32-d4f3821d8e3b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	680.0000	2022-01-28 03:00:00	Pedidos ya	\N	\N	f	2022-01-29 00:30:17.211748	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
60977e02-ca3a-43e5-bb60-7e3c13c5c35e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	9793.7100	2022-02-01 09:00:00	\N	1c5f906d-e05e-4ad8-87f9-432cc4c35ebb	1	f	2022-01-14 02:08:24.318528	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-27 09:00:00	f	\N
9acc5dbe-a0a5-4d1f-be92-c0aacfa1223d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	4300.6000	2022-01-29 03:00:00	\N	\N	\N	f	2022-01-29 19:24:50.612149	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
83872d44-e7cd-4d6d-ba2f-178ddcd236d5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	3050.0000	2022-01-31 03:00:00	Libros	\N	\N	f	2022-01-31 15:16:21.888609	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
84c7b349-9902-4304-836f-7563bb6f282c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	600.0000	2022-02-01 03:00:00	Cuadernillos	\N	\N	f	2022-02-01 14:14:05.75257	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0ad544b7-a858-4a4f-9c1d-aff1adb2d93c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	3243.9900	2022-03-01 03:00:00	\N	\N	\N	f	2022-02-01 15:05:16.976425	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f3218f22-c042-4b4d-9588-29f6f07f6f16	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	181.9300	2022-02-01 12:00:00	Spotify Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-01 14:17:57.117091	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-01 06:00:00	f	\N
8e8da6fb-619c-4e33-b82c-216d4b87f138	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	1539.9600	2022-03-01 06:00:00	Netflix	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-02-01 15:06:57.977577	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-21 06:00:00	f	\N
ddbb77b6-a8ca-4249-a076-069a004fcb06	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c675f068-230a-4a6c-80c2-8169700bcc96	2849.0000	2022-03-01 03:00:00	Ezeiza	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-01 15:09:09.673533	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-31 03:00:00	f	\N
7b2816f7-d47f-4ce4-a42a-78399de8695a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c675f068-230a-4a6c-80c2-8169700bcc96	4861.4600	2022-03-01 03:00:00	Despegar - Seguro	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-01 15:09:56.420055	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-27 03:00:00	f	\N
61c4684f-0205-4278-ad98-ec9c73946f9f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	312.3600	2022-03-01 09:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-01 15:08:00.17907	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-06 09:00:00	f	\N
fb37a9d2-7551-4dc1-8bc4-6ef63e0a675e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1354.0000	2022-03-01 06:00:00	\N	\N	\N	f	2022-02-01 15:12:21.884761	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
401dda64-3e19-4b0e-b106-7a34ce4f0f1d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	35000.0000	2022-03-01 06:00:00	\N	\N	\N	f	2022-01-27 20:38:07.097323	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
956bba2c-4622-469a-9c62-bdb77d8c831c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1966.6600	2022-03-01 06:00:00	Balbi 2/3	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2022-01-26 03:44:09.947672	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-19 06:00:00	f	\N
ccae6099-997d-49ff-9002-55b93485c4e0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1966.6600	2022-04-01 06:00:00	Balbi 3/3	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2022-01-26 03:44:09.947672	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-01-19 06:00:00	f	\N
b3e2ec34-8468-4463-b72a-79f22724a21f	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	10000.0000	2022-03-01 06:00:00	\N	\N	\N	f	2022-02-01 15:04:32.005938	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9c42da30-72ad-41ec-a45f-1b50b0253658	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	183983.7100	2022-03-01 15:00:00	\N	\N	\N	f	2022-02-01 15:04:44.319537	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
92222b90-30d8-4114-8c71-977f7fd71c14	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	1983.8500	2022-03-01 06:00:00	Futbol	\N	\N	f	2022-01-27 20:38:43.182026	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4617d4c6-51c7-46f7-b3d5-ac9288e05a5d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	11645.3500	2022-06-01 09:00:00	Notebook 12/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2021-12-30 21:53:41.889726	3e97090b-ee61-40f4-be5f-3ceb280dc048	2021-06-04 09:00:00	f	\N
6be31e48-e59d-4fe9-9795-f03ed3b057fa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	12000.0000	2022-03-01 03:00:00	\N	\N	\N	f	2022-02-01 15:13:48.16238	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ce94c25a-9230-4e44-8dac-b944f9d20c20	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	12000.0000	2022-03-01 03:00:00	\N	\N	\N	f	2022-02-01 15:13:57.028812	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4893c2f9-aa97-4c8a-85eb-554c7309257a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	1350.0000	2022-02-07 03:00:00	Asado	\N	\N	f	2022-02-07 13:27:06.443197	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ad912b7e-5e65-46b5-9175-890ef043a261	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	8918.4100	2022-03-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-02-08 15:27:40.639848	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-08 03:00:00	f	\N
aa4b840f-3c18-4878-9dbb-0637b6253a88	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	13c8422e-f6ef-4562-a1ee-8cafd14ecf0c	6800.0000	2022-03-01 03:00:00	Colchon	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-10 03:51:54.134614	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-09 03:00:00	f	\N
088a1543-15f4-414b-9d56-80e31ca1339d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2000.0000	2022-02-08 06:00:00	Futbol	\N	\N	f	2022-01-20 00:46:28.467296	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
cdb5614a-5b6c-41d7-991d-3d2f6e6fef2e	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	1.4400	2022-02-08 03:00:00	Intereses	\N	\N	f	2022-02-11 21:01:55.252662	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bdbd204d-5168-4da0-a741-46255b222f4a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	69c24541-2f23-49a5-8b0c-72171c3997e0	8320.0000	2022-03-01 03:00:00	Termo	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-02-11 21:04:17.776028	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-10 03:00:00	f	\N
4d86bb4d-61d6-4208-8df4-4ddd1d99c10d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	1140.0000	2022-02-12 03:00:00	\N	\N	\N	f	2022-02-13 03:36:23.672317	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d87a5bb1-148d-4fa9-908e-5f012b39dd5e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2022-03-01 03:00:00	1/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
5be93c01-84e7-48e1-8062-9c0e9d7331ae	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2022-07-01 03:00:00	5/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	5	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
9e5ff929-6a95-4d79-abb8-4145dc4976f0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2022-08-01 03:00:00	6/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	6	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
3003aba5-abab-46aa-b591-f2ddcea60635	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2022-09-01 03:00:00	7/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	7	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
2196fa40-8ae0-4ac8-ad92-7ce1c828bab7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2022-10-01 03:00:00	8/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	8	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
813232e3-7bd0-449d-8bb2-fd4c0a210a76	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2022-11-01 03:00:00	9/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	9	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
8a31781b-8912-4362-91c2-3e04fa58fe46	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2022-12-01 03:00:00	10/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	10	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
b2dfb54c-99cc-4412-a890-2522cb3b2e02	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2023-01-01 03:00:00	11/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	11	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
2f147a61-e793-4660-8479-bf2a58f3e5a0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.7400	2023-02-01 03:00:00	12/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	12	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
8e24181d-c2ec-4333-a275-103592a96693	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9bf80935-80c8-4778-8de1-766dcd6c32cf	4561.7600	2022-03-01 03:00:00	Hotel Recoleta	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-15 16:36:37.45898	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 03:00:00	f	\N
cf403120-e029-4ca0-9ae0-eb23ea88bbbb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	12000.0000	2022-04-01 03:00:00	\N	\N	\N	f	2022-02-21 13:22:40.989444	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5960f6b8-928b-4ba2-b04b-0585df698028	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	45000.0000	2022-04-01 03:00:00	\N	\N	\N	f	2022-02-21 13:23:05.66149	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0c8bea88-2915-4795-8899-6c35c97f303d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	3243.9900	2022-04-01 03:00:00	\N	\N	\N	f	2022-02-21 13:23:37.563385	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9e7157ae-4198-4042-b09c-64546d155868	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1354.0000	2022-04-01 03:00:00	\N	\N	\N	f	2022-02-21 13:38:19.99745	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
20383171-3e33-4c8f-971b-59ab5cb4e3ad	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	12000.0000	2022-04-01 03:00:00	\N	\N	\N	f	2022-02-21 13:39:15.986837	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ee7e76d7-a134-4b1c-9345-9bd1ffa65dfa	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1486.8800	2022-03-01 06:00:00	Seguro de vida	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-01 15:15:36.290688	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-25 06:00:00	f	\N
6e3f0b90-dfb3-4aac-a881-ddc70f1ea6fd	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	300.0000	2022-02-23 03:00:00	Partida nac	\N	\N	f	2022-02-23 18:57:48.520835	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9a247cff-3fcb-4366-a70d-29f2699f84d5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	3790.0000	2022-02-22 03:00:00	Zapatos	\N	\N	f	2022-02-23 18:58:04.154777	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
59bf2add-3b16-46bb-a6d3-832eb19104ca	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	5120.0000	2022-02-22 03:00:00	Uniforme	\N	\N	f	2022-02-23 18:58:25.748136	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8692fadc-f1da-4899-a2c6-7024b8af715f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	2500.0000	2022-02-22 03:00:00	Silvia Chorra	\N	\N	f	2022-02-23 18:58:59.638647	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0e005b36-7956-4340-abd6-8e3811d2b511	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	15000.0000	2022-02-20 03:00:00	Prestamo Mono	\N	\N	f	2022-02-23 18:59:32.577732	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
036287cf-a337-4104-916a-b3de60c837d4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	6016.2300	2022-03-01 03:00:00	Tinta Impresora	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-23 19:00:35.820446	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-22 03:00:00	f	\N
49867a7a-babd-43d0-a57b-7226f982d07a	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	15000.0000	2022-02-25 03:00:00	Devolucion Mono	\N	\N	f	2022-02-28 02:26:49.510987	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
cb7495c3-bd6d-4635-b384-f6ec449055d0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	3504.5000	2022-02-27 03:00:00	Carpetas	\N	\N	f	2022-02-28 02:27:41.271094	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
fcaf22dc-0c73-4727-9ac8-0354b311f884	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	650.0000	2022-03-01 06:00:00	Tuenti	d24af5dc-abe3-4d44-9ce3-f24baf664145	1	f	2022-02-01 15:12:51.438622	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-26 06:00:00	f	\N
55f309b5-0908-41a8-92b1-974d56157c16	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c675f068-230a-4a6c-80c2-8169700bcc96	6102.4200	2022-03-01 15:00:00	53.53 * 114	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-15 16:38:41.837732	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 15:00:00	f	\N
ad61c63c-15f6-40ef-86c2-318e12c263f2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1486.8800	2022-04-01 06:00:00	Seguro de Vida	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-21 13:19:14.007031	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-03-25 06:00:00	f	\N
5530687e-d31c-4335-9b34-e7d58cf68518	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	305.3700	2022-04-01 12:00:00	Spotify	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-02-21 13:16:59.586023	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-03-06 06:00:00	f	\N
7c79346c-831d-4e45-bfac-2a6c8b9ce236	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.6600	2022-04-01 06:00:00	2/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	2	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 06:00:00	f	\N
1fb1ef4f-b283-4796-a997-c48f2caf4ad0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2499.9800	2022-04-01 12:00:00	Futbol	\N	\N	f	2022-02-21 13:39:34.542875	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c248a8d5-b5c8-4968-ad79-77c301538471	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.6600	2022-05-01 06:00:00	3/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	3	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 06:00:00	f	\N
99f3697a-8357-4ab0-9652-90ce9e3a83eb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	5216.6600	2022-06-01 06:00:00	4/12	70674ce2-6715-4a65-93b8-7b9f62f04e2a	4	f	2022-02-15 16:36:04.483512	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-15 06:00:00	f	\N
5c96e20a-5ced-4fd6-905d-9a38ff7a4d06	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	3000.0000	2022-02-25 03:00:00	Ingles	\N	\N	f	2022-02-28 02:28:10.726207	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b13b5641-ee1a-4cd8-87e9-73e4b011a1f2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	8893.5300	2022-04-01 06:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-03-01 19:23:31.600968	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-03-01 06:00:00	f	\N
84720995-ecab-400c-be1c-9c23c4e1cd66	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	1036.5000	2022-03-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-03-02 17:18:13.932287	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-02-20 03:00:00	f	\N
6601304c-1a66-4099-819d-7b7d8925f30d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	4501.1500	2022-03-02 03:00:00	\N	\N	\N	f	2022-03-02 23:32:53.801369	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5d39d701-be17-42c2-b7be-58c64007ecb2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	267.0000	2022-03-04 03:00:00	\N	\N	\N	f	2022-03-05 11:32:15.880628	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0e623ddc-ada0-461f-803d-ed0e0294536b	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	609bb22d-37b6-4d98-9326-0ab1ddc205f3	5000.0000	2022-03-14 09:00:00	Ingles + Scholar Kit	\N	\N	f	2022-03-02 15:50:45.102782	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
691285fa-ea52-419a-b190-61c82ac22098	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	3931.3200	2022-03-03 09:00:00	Tarjeta Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-03-02 11:45:48.292584	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-03-03 09:00:00	f	\N
7751c51f-5a61-4efe-a674-b95a19287c35	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	0.1600	2022-03-07 03:00:00	Ajuste Tarjeta	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-03-09 13:52:44.737695	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-03-07 03:00:00	f	\N
3ca58abe-262b-411d-9ce6-9c0db67bb68b	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	0.3100	2022-03-09 06:00:00	\N	\N	\N	f	2022-03-09 13:50:20.434711	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
50acb052-512a-48aa-8456-6e332141be02	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	ba67cd01-7348-4844-8401-bfb2b5cd9342	5800.0000	2022-04-01 03:00:00	2.9	\N	\N	f	2022-03-11 14:07:53.808377	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6980bac5-6b2c-4a58-844b-488bbdf17b4e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1920.0000	2022-04-05 03:00:00	DGR Chubut	\N	\N	f	2022-04-07 13:27:42.588387	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ed6c353c-f192-41d8-824a-4820dc968972	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	394.7500	2022-03-12 03:00:00	Asado	\N	\N	f	2022-03-14 10:56:07.172746	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
5fcb8f3f-3579-4e4d-8b46-96b7711c39c0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	07626a54-c2e9-4cb4-b9d7-6c7632009d9f	6884.6000	2022-04-15 09:00:00	Categoria A	\N	\N	f	2022-03-11 14:05:24.085772	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
54d64186-3c64-4876-88b0-4106ab17e4e8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1486.8800	2022-05-01 06:00:00	Seguro de vida	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-03-22 14:00:45.762794	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-04-25 06:00:00	f	\N
ed0e0727-c38b-4693-bf81-05f0616c944a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	07626a54-c2e9-4cb4-b9d7-6c7632009d9f	6884.6000	2022-03-18 03:00:00	Monotributo	\N	\N	f	2022-03-18 12:06:23.142727	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9373c4a7-7023-4a8e-8f20-ad8f6d6b2312	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	962707.3500	2022-03-18 03:00:00	Liquidacion	\N	\N	f	2022-03-18 20:57:47.034013	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
28322070-998b-4041-975a-49ef499d5dc0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	100000.0000	2022-03-18 03:00:00	Plazo Fijo	\N	\N	f	2022-03-18 20:58:05.879308	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1b2102d9-217c-4d76-9d1d-83138b21d4a5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	600000.0000	2022-03-21 03:00:00	Dolares	\N	\N	f	2022-03-18 20:58:51.305645	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8466e9f0-7c98-40af-9194-0ec9d0a8a416	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	932.0000	2022-03-20 03:00:00	Pedidos Ya	\N	\N	f	2022-03-21 11:06:58.496916	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b62b9ce0-d66a-4801-9f1e-5bc6dd0301dc	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	1433.3700	2022-03-21 03:00:00	\N	\N	\N	f	2022-03-22 10:11:55.13368	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
329d9f21-8a07-4b9e-a8e5-89f1f431347d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	11793.1200	2022-04-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-03-22 13:57:56.853556	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-03-22 03:00:00	f	\N
58385c7b-7a81-4467-8397-d21f94fb547c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	15000.0000	2022-05-01 03:00:00	\N	\N	\N	f	2022-03-22 14:01:38.163816	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7684c289-d97d-452c-88f6-15c50da2de21	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	45000.0000	2022-05-01 03:00:00	\N	\N	\N	f	2022-03-22 14:02:05.123585	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
96d303a7-7afb-4af2-9a00-e7ea5a9d1cb9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	14000.0000	2022-05-01 03:00:00	\N	\N	\N	f	2022-03-22 14:02:16.842716	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ed22a997-2db0-405d-b8a0-e1921b3c4179	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	07626a54-c2e9-4cb4-b9d7-6c7632009d9f	6884.6000	2022-05-19 06:00:00	Categoria A	\N	\N	f	2022-03-22 14:03:02.96443	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
926ead27-6420-486c-8671-d06d77601f1d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1354.0000	2022-06-01 12:00:00	\N	\N	\N	f	2022-03-22 14:01:19.312296	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4f8a8e70-b9ab-4823-a085-2ca663f66ef7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2500.0000	2022-05-01 09:00:00	Futbol	\N	\N	f	2022-03-22 14:01:52.715043	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b50a0c4f-35c8-43f5-a784-7161bb851efe	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	1050.0000	2022-03-28 03:00:00	Tuenti	\N	\N	f	2022-03-29 13:16:22.458246	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
1c800661-12dc-4ba1-bbc2-82443fe1de55	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	200000.0000	2022-04-15 03:00:00	Salario	\N	\N	f	2022-04-07 21:06:17.122753	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
086a4d29-d624-4b14-ae5b-3df8b739b3ae	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	5301.6700	2022-03-24 03:00:00	\N	\N	\N	f	2022-03-25 11:38:31.62992	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7eb5cd40-7c89-472c-9cab-b300a270a359	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	747.0000	2022-03-24 03:00:00	\N	\N	\N	f	2022-03-25 11:38:48.439404	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0fdae2e7-53b3-4dd4-8c76-f61c13f5168e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1970.0000	2022-03-25 03:00:00	Porthos	\N	\N	f	2022-03-28 10:49:54.101186	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
762453ba-4a02-4c99-b3e8-dc32e47c1f50	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1550.0000	2022-03-26 06:00:00	Peluqueria	\N	\N	f	2022-03-28 10:50:25.550654	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0de0fe53-351f-492a-89c1-632fa0d12e84	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	1900.0000	2022-03-26 03:00:00	Estetica	\N	\N	f	2022-03-28 10:50:51.789114	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bb6cceba-7a26-4b36-9ae7-24f02254bf3b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	7117.7000	2022-05-04 03:00:00	\N	\N	\N	f	2022-03-28 10:53:30.890182	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7555e3c6-e872-43c2-bb49-9f0e9c9abf1f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	7117.7000	2022-06-03 03:00:00	\N	\N	\N	f	2022-03-28 10:53:54.200959	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
82e5f914-b6de-45ee-9d3e-8e2f6c6b73ab	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	17000.0000	2022-03-29 06:00:00	Terreno - Certificacion	\N	\N	f	2022-03-29 13:17:00.635005	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f1dc819b-ee73-4a85-b0bb-be548ebfc88a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e1281e08-48b4-43b0-ad46-cddea623bde9	17326.9400	2022-04-03 09:00:00	OSDE 210	\N	\N	f	2022-03-11 14:06:28.692524	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a9e8a7e4-d557-4ad2-8070-f39a9ea58270	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	10000.0000	2022-03-29 03:00:00	Paola	\N	\N	f	2022-03-30 14:12:25.997847	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8591cd72-3502-42c6-9dde-34a977829d8a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1159.0000	2022-03-29 03:00:00	Pedidos Ya	\N	\N	f	2022-03-30 14:12:53.767837	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e9f7f089-efe0-4a0b-a591-086e0538dbe4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	1590.6000	2022-04-01 03:00:00	Wallmart	\N	\N	f	2022-04-03 21:10:55.429295	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
501d537e-455d-4890-8923-02ee6187d8f2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	aaea5798-5d9c-446b-9aca-7eacbb2d8156	2230.0000	2022-04-01 03:00:00	\N	\N	\N	f	2022-04-03 21:11:23.65331	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
10ffbdbc-0805-4fd1-9480-7c7e3d499d34	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	3.0300	2022-04-07 03:00:00	\N	\N	\N	f	2022-04-07 13:27:59.539297	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bd3c3cd4-0b5e-4cd4-99b6-c9e8e9379fdb	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	69c24541-2f23-49a5-8b0c-72171c3997e0	3000.0000	2022-04-07 03:00:00	Ingles	\N	\N	f	2022-04-07 21:03:12.946946	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
3a275d11-56ca-4f26-bf8b-f81b49da2e29	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	bc892330-ed14-4382-8656-6343dd3884b4	183.0300	2022-04-01 12:00:00	Spotify Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-03-11 14:19:52.931337	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-03-06 12:00:00	f	\N
50b83140-be9e-4860-acca-078725df4a8b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	14204.0200	2022-05-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-04-12 12:05:19.098959	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-04-12 03:00:00	f	\N
74103e68-6f09-4fab-8567-784af2fdefe7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	cb7dd038-5533-442b-bda7-f36d0ee03181	2561.0800	2022-04-14 03:00:00	Wallmart	\N	\N	f	2022-04-15 17:25:00.637217	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
060b5f64-333c-419f-84c4-da0ad98517f8	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	3875.0000	2022-05-01 06:00:00	\N	\N	\N	f	2022-03-22 14:01:07.733223	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
60a3ddbc-fbdb-4573-ab5a-9946dd05be32	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e1281e08-48b4-43b0-ad46-cddea623bde9	35586.4200	2022-05-10 09:00:00	OSDE 210	\N	\N	f	2022-03-22 14:03:43.963131	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b6f72776-4c9e-4011-adbf-eaf91699983a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	5200.9800	2022-04-16 03:00:00	\N	\N	\N	f	2022-04-17 05:25:49.858195	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
fb193b07-4b60-43a3-b5e5-bfc333ce50ec	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	5699.0300	2022-04-17 03:00:00	Repisa	\N	\N	f	2022-04-17 20:16:40.965193	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
4551fe59-59d6-4a2e-b987-8817130da03a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1528.0000	2022-04-19 03:00:00	Pedidos Ya	\N	\N	f	2022-04-20 13:42:06.408263	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b531d235-1d00-4346-a3a1-601ff11346bd	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	103524.6600	2022-04-18 03:00:00	Plazo Fijo	\N	\N	f	2022-04-20 13:45:25.752121	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
661916bc-6e8f-4ef6-8567-a0475d6cef07	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	32911.1800	2022-04-18 03:00:00	Plazo Fijo	\N	\N	f	2022-04-20 13:45:41.753022	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
bab43859-c3c2-4f55-b512-709785480197	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	84344.2200	2022-04-18 06:00:00	Plazo Fijo	\N	\N	f	2022-04-20 13:46:04.371747	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
14a7da3e-b6de-4254-a884-7844818744f2	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	776527.0600	2022-04-18 03:00:00	PPI - Dolares	\N	\N	f	2022-04-20 13:46:49.225895	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
68a6cbaf-afe9-4abd-8969-aaea49629c04	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	4882.6400	2022-04-18 06:00:00	Retencion IIBB	\N	\N	f	2022-04-20 13:48:00.772609	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a011dea1-5b5a-4345-81de-a5d512eabb7f	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	adfc3bcc-f59a-4634-9ab7-612f5038e1a6	688273.5000	2022-04-21 03:00:00	Terreno Cancelacion	\N	\N	f	2022-04-21 13:37:07.338511	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e2d69a3d-f62b-4b9e-976d-8e1d11e7b5f2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	300000.0000	2022-04-25 03:00:00	Plazo Fijo	\N	\N	f	2022-04-25 00:29:08.454064	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
18cc27e3-32a6-40f6-93a4-35ec054eb496	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1687.0000	2022-04-25 03:00:00	YPF	\N	\N	f	2022-04-26 12:56:56.573446	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
0633610b-4d9e-4961-a3a2-875848ae73be	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1464.5000	2022-05-01 03:00:00	\N	\N	\N	f	2022-04-26 13:00:05.78594	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
6ea20389-64e9-4a16-ac66-be2d7ec9cf91	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	8b2250fe-a385-488e-be06-06b6d4689407	388.7000	2022-06-01 03:00:00	FIFA 22 Impuestos	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-05-30 12:35:47.331486	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-05-20 03:00:00	f	\N
c3470c26-bbec-4445-925b-9ee4957cb192	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1486.8800	2022-06-01 03:00:00	\N	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-04-26 13:04:12.675141	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-05-25 03:00:00	f	\N
882e6646-9a85-420a-a922-bcc0c0aa1084	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	14000.0000	2022-06-01 03:00:00	\N	\N	\N	f	2022-04-26 13:05:59.627389	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
326c929f-c33b-44de-8cde-efc9321eb2f9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	15000.0000	2022-06-01 03:00:00	\N	\N	\N	f	2022-04-26 13:06:15.789075	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c6ae79ee-df62-4cef-8f00-239afc7301fd	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2500.0000	2022-06-01 03:00:00	Futbol	\N	\N	f	2022-04-26 13:06:30.50683	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ad88c83e-58e7-4f52-82bb-0cffac328494	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	07626a54-c2e9-4cb4-b9d7-6c7632009d9f	6884.6000	2022-06-01 03:00:00	Categoria A	\N	\N	f	2022-04-26 13:07:52.890887	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
31c20eb4-94f8-45bb-ae9d-9065ff5b1b9b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	3400.0000	2022-04-27 03:00:00	Fetiche	\N	\N	f	2022-04-28 13:16:22.24114	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
05beb025-4347-4fff-9919-d7caf33f5ccf	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	3000.0000	2022-04-28 03:00:00	Contadora	\N	\N	f	2022-04-29 11:51:44.104991	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7d4729d5-f0c1-49b8-abf8-8123f33bc6b6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	364.0000	2022-04-28 06:00:00	Tuenti	\N	\N	f	2022-04-29 11:52:11.133152	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
3131e0a7-b227-49ec-b2a7-57c64452ae39	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	35.0000	2022-04-28 03:00:00	Tuenti	\N	\N	f	2022-04-29 11:56:25.155206	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
42c93072-d40b-4cae-80dd-81da56357ba7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3fbdbc4a-ff28-4a4c-aa23-f59cb01bec1e	1528.0000	2022-04-27 03:00:00	Pedidos Ya	\N	\N	f	2022-04-29 11:57:57.125489	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e97e0b81-f036-4e78-9794-5ece3b76c8a2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	3000.0000	2022-04-29 03:00:00	Ingles	\N	\N	f	2022-04-29 14:06:25.632443	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a04529ce-a127-4e9d-b98a-278d48c4b16d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	5301.6700	2022-04-30 06:00:00	\N	\N	\N	f	2022-05-02 12:32:45.080246	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
befe3cbe-8991-4b16-989f-350f134d38c9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	2100.0000	2022-04-29 03:00:00	Estetica	\N	\N	f	2022-05-02 12:33:13.491967	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
eeb95fc8-c7bf-470e-8fa3-a61c6ee71cd1	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1889.0000	2022-04-30 03:00:00	YPF	\N	\N	f	2022-05-02 12:33:39.309461	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f2576bf2-4856-4fee-8742-5dc6e7cad9ed	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	8943.9100	2022-06-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-05-03 13:52:55.989896	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-05-03 03:00:00	f	\N
b7a76b8f-43d1-403c-a618-96083c632b9b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	398.6500	2022-06-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-05-03 13:53:22.377979	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-05-03 03:00:00	f	\N
e4ad336c-7f54-4849-b83d-6f6659e296a9	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9dd5b86d-6988-4cab-8582-1612e09edb1f	4000.0000	2022-06-10 03:00:00	Contador	\N	\N	f	2022-05-30 12:47:19.277061	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b7fef32a-1a2a-4c0f-acde-82eea15510c9	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	190000.0000	2022-05-02 03:00:00	\N	\N	\N	f	2022-05-03 13:54:45.776653	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
9b510ff9-0e88-488f-90a4-61a5c51c486a	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	ba67cd01-7348-4844-8401-bfb2b5cd9342	950.0000	2022-05-03 03:00:00	Rentas Santander	\N	\N	f	2022-05-03 13:56:44.947666	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
74b64408-f287-4fb8-8bf2-825846ca7364	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1796.0000	2022-05-04 03:00:00	YPF	\N	\N	f	2022-05-05 20:04:46.02375	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
782beece-5cef-410a-8519-b91680687a00	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9dd5b86d-6988-4cab-8582-1612e09edb1f	4000.0000	2022-05-09 03:00:00	Contador	\N	\N	f	2022-05-09 21:00:01.432752	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
95548e1a-59c4-4240-b17e-72b016a0ea40	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	3.3600	2022-05-09 03:00:00	Intereses	\N	\N	f	2022-05-09 21:10:12.161384	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
97d57ec2-6953-456c-9e71-cee8d2ed0172	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1042.0000	2022-05-13 03:00:00	YPF	\N	\N	f	2022-05-15 02:06:44.351307	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2c638cde-8f6c-4554-aaed-a477e4a6a81c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	957b4f22-4151-4b80-90c0-9b1bf338365a	1245.0000	2022-05-14 03:00:00	YPF	\N	\N	f	2022-05-15 02:07:30.762631	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
7c4f6730-adff-477f-aa26-600786484555	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	9544.5000	2022-06-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-05-17 23:09:28.760546	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-05-17 03:00:00	f	\N
770acaf6-f6f2-4c90-ab8c-41c3154171b2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e949c507-8bb7-45ed-a16e-94ef97401e59	6101.4700	2022-05-19 03:00:00	\N	\N	\N	f	2022-05-19 20:15:12.502407	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
e0f48c0b-2f36-45c8-b1e8-023d143fcb09	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	400.0000	2022-05-23 03:00:00	Profe particular	\N	\N	f	2022-05-25 00:50:49.08307	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
854ab4ef-ccd2-47f7-8a33-ac197e99b8f2	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	98d19906-e555-40fa-b8a2-e3a8548a867d	311720.5500	2022-05-26 03:00:00	Plazo Fijo	\N	\N	f	2022-05-26 12:17:59.88311	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
28ca0614-122d-461d-944f-63ddec690437	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	308a7c8f-1966-4c55-a3b0-fa16022ab05d	411720.5500	2022-05-26 03:00:00	Plazo Fijo	\N	\N	f	2022-05-26 12:18:24.871063	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
f8c18c22-ac8b-47d2-8c9f-c877825094d4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4190.0000	2022-06-01 09:00:00	\N	\N	\N	f	2022-04-26 13:03:03.287956	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
76bff58d-3cff-4196-ac6c-134458d46ac4	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4188fed3-e17f-43d9-ae94-697538c854cb	850.0000	2022-05-30 03:00:00	Tuenti	\N	\N	f	2022-05-30 12:32:23.273035	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
723ac3d4-2653-4b25-9fcb-5cc75698df1b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	69c24541-2f23-49a5-8b0c-72171c3997e0	2100.0000	2022-05-27 03:00:00	Estetica	\N	\N	f	2022-05-30 12:32:44.649853	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
61415e66-c29a-4a6c-9a3e-56befc8ae20a	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	300000.0000	2022-06-01 06:00:00	\N	\N	\N	f	2022-05-19 20:17:12.215293	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
038cd49a-092d-4152-b96a-cd069b3d9cd2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e1281e08-48b4-43b0-ad46-cddea623bde9	38432.5600	2022-06-10 09:00:00	OSDE 210	\N	\N	f	2022-04-26 13:07:32.190846	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d069a2dc-c55b-4ca1-b2c4-942881cc857b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	3c2cfc21-60cd-4020-b8ca-bbffce79e974	12582.4800	2022-05-30 03:00:00	RAM Y Cooler Santi	\N	\N	f	2022-05-30 14:47:38.888503	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
da07b64d-1c99-4045-b238-763051eb0383	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4ba44b55-6e82-4dcd-a14a-8bf3f045ebf5	13522.3800	2022-07-01 03:00:00	\N	5062d2ee-57d8-46f1-9c78-dceca95125bf	1	f	2022-05-31 12:52:52.159415	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-05-31 03:00:00	f	\N
bf786944-2e30-4ac7-b2c0-7f770387cc19	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	93ec513b-8325-4b01-8458-bf82e30d64f6	1486.8800	2022-07-01 03:00:00	\N	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-05-31 12:53:33.889922	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-06-25 03:00:00	f	\N
d5eeb85d-2946-47a7-a9ea-b540bb117cf2	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	50000.0000	2022-06-01 06:00:00	\N	\N	\N	f	2022-04-26 13:04:29.913982	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
668f562f-1e97-4e9f-a790-48be1a022d4b	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9a431b9b-8ca0-4709-8015-37e42fa22b48	14000.0000	2022-07-01 03:00:00	\N	\N	\N	f	2022-05-31 12:53:59.832653	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2ddc0dbb-b6f4-4697-a933-0912ea663038	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	f6c3cb19-f26a-426b-b043-f36cdefd7e08	20000.0000	2022-07-01 03:00:00	\N	\N	\N	f	2022-05-31 12:54:17.93714	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b745c40e-338d-4b65-aeaa-6670f973099d	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	97669fb9-a007-4955-994e-01b330f31e8d	2500.0000	2022-07-01 03:00:00	Futbol	\N	\N	f	2022-05-31 12:54:36.735622	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
893957c2-4781-406c-abeb-724de6c8838e	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	07626a54-c2e9-4cb4-b9d7-6c7632009d9f	6884.6000	2022-07-01 03:00:00	Categoria A	\N	\N	f	2022-05-31 12:55:23.651836	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
3511768f-a210-42b0-aacf-692d4e6251b0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	7e33ef6c-c8a4-4ba9-ae37-e790e7e05237	4190.0000	2022-07-01 03:00:00	\N	\N	\N	f	2022-05-31 12:55:36.70025	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
c9a67ad6-087f-441d-a750-b015eae11cb7	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	4b7a3e04-107e-444e-9048-a2f980fd2d75	1464.5000	2022-07-01 03:00:00	\N	\N	\N	f	2022-05-31 12:55:50.02709	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
8d102df3-a26e-4d69-994f-714558e04967	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	9dd5b86d-6988-4cab-8582-1612e09edb1f	4000.0000	2022-07-01 03:00:00	Contador	\N	\N	f	2022-05-31 12:56:13.300978	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
d7c400d3-fdb9-43e4-8974-0923891fb7ca	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	e1281e08-48b4-43b0-ad46-cddea623bde9	38432.5600	2022-07-01 03:00:00	OSDE 210	\N	\N	f	2022-05-31 12:56:38.161881	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
2a157ba9-6642-4530-8d97-e05bddc4d2ef	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	e8c1371d-0471-4d3b-8c2f-dae393888eee	200000.0000	2022-07-01 03:00:00	\N	\N	\N	f	2022-05-31 12:57:12.238638	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
a1fb8171-7419-47d4-aa51-1704d80df9c6	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	c13a8b48-f9fe-4e99-8d61-d2982d3cd403	5337.6600	2022-07-01 06:00:00	\N	\N	\N	f	2022-05-31 12:55:59.86275	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
ee771a5f-2258-4908-a135-88d28726e140	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	8b2250fe-a385-488e-be06-06b6d4689407	643.8200	2022-06-01 12:00:00	FIFA 22	70674ce2-6715-4a65-93b8-7b9f62f04e2a	1	f	2022-05-26 12:26:52.626178	3e97090b-ee61-40f4-be5f-3ceb280dc048	2022-05-20 12:00:00	f	\N
f99e27ad-a107-47b6-a027-a823de237bc0	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	ba67cd01-7348-4844-8401-bfb2b5cd9342	1500.0000	2022-06-01 03:00:00	Santander	\N	\N	f	2022-06-02 10:03:08.709634	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
17e9c1f0-cc1d-4344-8da3-757e136e3dc5	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	995e3315-a1c7-4c3f-a037-e502dc00d4e3	50000.0000	2022-07-01 06:00:00	\N	\N	\N	f	2022-05-31 12:54:47.769041	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b2720edd-4895-484f-ba39-cc3b7950372c	expenses	1feed44a-b631-4364-8a25-8d0cc2ffda60	5271768e-9d8b-4c21-be08-28074f4ac7d6	3000.0000	2022-06-06 03:00:00	Ingles	\N	\N	f	2022-06-07 11:57:12.53713	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
b5af2edc-c371-469b-aa5d-3bbdb8dbdfaf	incomes	1feed44a-b631-4364-8a25-8d0cc2ffda60	526d8773-b1ba-42cf-9611-da5fe86b3f6b	2.1700	2022-06-07 03:00:00	\N	\N	\N	f	2022-06-07 11:58:00.482724	3e97090b-ee61-40f4-be5f-3ceb280dc048	\N	f	\N
\.


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: credit_card credit_card_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.credit_card
    ADD CONSTRAINT credit_card_pkey PRIMARY KEY (id);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- Name: account fk_account_user; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT fk_account_user FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: category fk_category_user; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fk_category_user FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: credit_card fk_credit_card_user; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.credit_card
    ADD CONSTRAINT fk_credit_card_user FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: category fk_parent_category; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fk_parent_category FOREIGN KEY (parent_id) REFERENCES public.category(id);


--
-- Name: transaction fk_transaction_account; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fk_transaction_account FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- Name: transaction fk_transaction_category; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fk_transaction_category FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: transaction fk_transaction_credit_card; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fk_transaction_credit_card FOREIGN KEY (credit_card_id) REFERENCES public.credit_card(id);


--
-- Name: transaction fk_transaction_parent; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fk_transaction_parent FOREIGN KEY (parent_transaction_id) REFERENCES public.transaction(id);


--
-- Name: transaction fk_transaction_user; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT fk_transaction_user FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: account Users can delete their own accounts.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can delete their own accounts." ON public.account FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: category Users can delete their own categories.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can delete their own categories." ON public.category FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: credit_card Users can delete their own credit cards.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can delete their own credit cards." ON public.credit_card FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: transaction Users can delete their own transactions.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can delete their own transactions." ON public.transaction FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: account Users can insert their own accounts.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can insert their own accounts." ON public.account FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: category Users can insert their own categories.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can insert their own categories." ON public.category FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: credit_card Users can insert their own credit cards.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can insert their own credit cards." ON public.credit_card FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: transaction Users can insert their own transactions.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can insert their own transactions." ON public.transaction FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: account Users can update their own accounts.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can update their own accounts." ON public.account FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: category Users can update their own categories.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can update their own categories." ON public.category FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: credit_card Users can update their own credit cards.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can update their own credit cards." ON public.credit_card FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: transaction Users can update their own transactions.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can update their own transactions." ON public.transaction FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: account Users can view their own accounts.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can view their own accounts." ON public.account FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: category Users can view their own categories.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can view their own categories." ON public.category FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: credit_card Users can view their own credit cards.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can view their own credit cards." ON public.credit_card FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: transaction Users can view their own transactions.; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Users can view their own transactions." ON public.transaction FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: account; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.account ENABLE ROW LEVEL SECURITY;

--
-- Name: category; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.category ENABLE ROW LEVEL SECURITY;

--
-- Name: credit_card; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.credit_card ENABLE ROW LEVEL SECURITY;

--
-- Name: transaction; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.transaction ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION get_balance(end_date timestamp without time zone); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.get_balance(end_date timestamp without time zone) TO postgres;
GRANT ALL ON FUNCTION public.get_balance(end_date timestamp without time zone) TO anon;
GRANT ALL ON FUNCTION public.get_balance(end_date timestamp without time zone) TO authenticated;
GRANT ALL ON FUNCTION public.get_balance(end_date timestamp without time zone) TO service_role;


--
-- Name: FUNCTION get_ocurrences(id uuid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.get_ocurrences(id uuid) TO postgres;
GRANT ALL ON FUNCTION public.get_ocurrences(id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_ocurrences(id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_ocurrences(id uuid) TO service_role;


--
-- Name: FUNCTION get_transactions(start_date timestamp without time zone, end_date timestamp without time zone); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.get_transactions(start_date timestamp without time zone, end_date timestamp without time zone) TO postgres;
GRANT ALL ON FUNCTION public.get_transactions(start_date timestamp without time zone, end_date timestamp without time zone) TO anon;
GRANT ALL ON FUNCTION public.get_transactions(start_date timestamp without time zone, end_date timestamp without time zone) TO authenticated;
GRANT ALL ON FUNCTION public.get_transactions(start_date timestamp without time zone, end_date timestamp without time zone) TO service_role;


--
-- Name: TABLE account; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.account TO postgres;
GRANT ALL ON TABLE public.account TO anon;
GRANT ALL ON TABLE public.account TO authenticated;
GRANT ALL ON TABLE public.account TO service_role;


--
-- Name: TABLE category; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.category TO postgres;
GRANT ALL ON TABLE public.category TO anon;
GRANT ALL ON TABLE public.category TO authenticated;
GRANT ALL ON TABLE public.category TO service_role;


--
-- Name: TABLE credit_card; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.credit_card TO postgres;
GRANT ALL ON TABLE public.credit_card TO anon;
GRANT ALL ON TABLE public.credit_card TO authenticated;
GRANT ALL ON TABLE public.credit_card TO service_role;


--
-- Name: TABLE transaction; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.transaction TO postgres;
GRANT ALL ON TABLE public.transaction TO anon;
GRANT ALL ON TABLE public.transaction TO authenticated;
GRANT ALL ON TABLE public.transaction TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- PostgreSQL database dump complete
--

