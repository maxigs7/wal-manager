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
  from public.transaction as t
    inner join occurrences as o
  where t.id = id and t.is_recurring

$$;
