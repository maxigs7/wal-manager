set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."updateMovement"("pAmount" numeric, "pCategoryId" uuid, "pDate" timestamp without time zone, "pId" uuid, "pMonth" smallint, "pYear" smallint, "pCreditCardId" uuid DEFAULT NULL::uuid, "pDescription" character varying DEFAULT NULL::character varying, "pFeeNumber" smallint DEFAULT NULL::smallint, "pIsPaid" boolean DEFAULT false)
 RETURNS SETOF movement
 LANGUAGE plpgsql
AS $function$
BEGIN

  update "movementFee" as mf
  set "feeNumber" = "pFeeNumber"
  where mf."id" = "pId";
  
  return query (
    with "movementUpdated" as (
      update "movement" as m
      set 
        amount = "pAmount",
        "categoryId" = "pCategoryId",
        date = "pDate",
        month = "pMonth",
        year = "pYear",
        "creditCardId" = "pCreditCardId",
        description = "pDescription",
        "isPaid" = "pIsPaid"
      where m.id = "pId"
      returning *
    )
    select *
    from "movementUpdated"
  );
  

END;
$function$
;


