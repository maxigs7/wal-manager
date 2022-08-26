create or replace function get_ocurrences(id uuid)
returns table (id uuid, date timestamp without time zone)
language sql
as $$

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