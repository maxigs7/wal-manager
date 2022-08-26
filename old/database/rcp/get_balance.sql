create or replace function get_balance(end_date timestamp without time zone)
returns table (amount decimal(13,4), date timestamp without time zone)
language sql
as $$

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
