
create or replace function get_transactions(start_date timestamp without time zone, end_date timestamp without time zone)
returns table (
  account character varying(100) ,
  amount decimal(13,4),
  credit_card character varying(100),
  date timestamp without time zone,
  description character varying(100),
  fee_number smallint,
  id uuid,
  is_paid boolean,
  root_category character varying(100),
  root_category_color character varying(50),
  root_category_icon character varying(50),
  sub_category character varying(100),
  type transaction_type
)
language sql
as $$

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
