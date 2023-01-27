set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."insertMovement"("pAccountId" uuid, "pAmount" numeric, "pCategoryId" uuid, "pDate" timestamp without time zone, "pMonth" smallint, "pType" "movementType", "pUserId" uuid, "pYear" smallint, "pCreateAll" boolean DEFAULT false, "pCreditCardId" uuid DEFAULT NULL::uuid, "pDescription" character varying DEFAULT NULL::character varying, "pDestinationAccountId" uuid DEFAULT NULL::uuid, "pFeeNumber" smallint DEFAULT NULL::smallint, "pIsPaid" boolean DEFAULT false, "pQuotationAmount" numeric DEFAULT NULL::numeric)
 RETURNS SETOF movement
 LANGUAGE plpgsql
AS $function$
DECLARE
  "_bucketId" uuid = uuid_generate_v4();
BEGIN

  CREATE TEMP TABLE "insertedMovements" ON COMMIT drop AS
  (
    with recursive "movementsCte"(n) as (
      values (CASE WHEN "pFeeNumber" IS NOT NULL AND "pCreateAll" = false THEN "pFeeNumber" ELSE 1 END)
      union all
      select n + 1 from "movementsCte" where ("pFeeNumber" IS NOT NULL AND n < "pFeeNumber" and "pCreateAll" = true) OR ("pType" = 'transfer' and n < 2)
    ),
    "insertedMovementsCte" as (
      insert into public.movement(type, description, amount, "accountId", "categoryId", "creditCardId", month, year, date, "isPaid", "userId")
      select
        "pType",
        "pDescription",
        CASE
          WHEN "pDestinationAccountId" IS NOT NULL and m.n = 1 THEN "pAmount" * "pQuotationAmount"
          WHEN "pDestinationAccountId" IS NOT NULL and m.n > 1 THEN "pAmount" * -1
          ELSE "pAmount"
        END,
        CASE WHEN "pDestinationAccountId" IS NOT NULL and m.n = 1 THEN "pDestinationAccountId" ELSE "pAccountId" END,
        "pCategoryId",
        "pCreditCardId",
        CASE
          WHEN ("pCreateAll" = true AND m.n > 1 AND ("pMonth" + m.n - 1) < 12) THEN ("pMonth" + m.n - 1)
          WHEN ("pCreateAll" = true AND m.n > 1 AND ("pMonth" + m.n - 1) >= 12) THEN ("pMonth" + m.n - 13)
          ELSE "pMonth"
        END,
        CASE
          WHEN ("pCreateAll" = true AND m.n > 1 AND ("pMonth" + m.n - 1) >= 12) THEN ("pYear" + 1)
          ELSE "pYear"
        END,
        "pDate",
        "pIsPaid",
        "pUserId"
      from "movementsCte" as m
      returning *
    )
    select * from "insertedMovementsCte"
  );

  insert into public."movementFee"(id, "bucketId", "feeNumber", "totalFees")
  select
    im.id,
    "_bucketId",
    CASE WHEN "pCreateAll" = true THEN ROW_NUMBER() OVER () ELSE "pFeeNumber" END,
    "pFeeNumber"
  from "insertedMovements" as im
  where "pFeeNumber" IS NOT NULL;

  insert into public."transfer"("sourceMovementId", "destinationMovementId", "quotationAmount", "userId")
  select
    (select id from "insertedMovements" where "accountId" = "pAccountId"),
    (select id from "insertedMovements" where "accountId" = "pDestinationAccountId"),
    "pQuotationAmount",
    "pUserId"
  where "pDestinationAccountId" IS NOT NULL;

  return query (
    select *
    from "insertedMovements"
  );

END;
$function$
;


