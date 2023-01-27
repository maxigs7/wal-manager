set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."deleteMovement"(id uuid)
 RETURNS SETOF movement
 LANGUAGE plpgsql
AS $function$
DECLARE
  _id uuid = id;
begin

  delete 
  from "movementFee" as mf
  where mf."id" = _id;

  return query (
    with "transferDeleted" as (
      delete 
      from transfer as t
      where t."sourceMovementId" = _id
      returning *
    ),
    "movementDeleted" as (
      delete
      from "movement" as m
      where m."id" = _id or (m.id in (select td."destinationMovementId" from "transferDeleted" as td))
      returning *
    )
    select *
    from "movementDeleted"
  );

end;
$function$
;


