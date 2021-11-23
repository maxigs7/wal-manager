create or replace function get_balance(end_date date)
returns table (amount DECIMAL(13,4), date timestamp with time zone)
language sql
as $$

  select
    SUM(CASE WHEN type = 'expenses' THEN amount * (-1) ELSE amount END) as amount,
    MAX(date) as date,
  from public.transaction
  where date < end_date

$$;
