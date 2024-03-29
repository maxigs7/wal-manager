-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public."getMovements"(
	"pAccountId" uuid,
	"pMonth" smallint,
	"pYear" smallint)
    RETURNS TABLE(account character varying, amount numeric, "creditCardId" uuid, "creditCard" character varying, "creditCardType" "creditCardType", date timestamp without time zone, description character varying, "feeNumber" smallint, id uuid, "investmentId" uuid, "isPaid" boolean, month smallint, "rootCategoryId" uuid, "rootCategory" character varying, "rootCategoryColor" character varying, "rootCategoryIcon" character varying, "subCategoryId" uuid, "subCategory" character varying, "totalFees" smallint, "transferAccount" character varying, "transferQuotationAmount" numeric, type "movementType", year smallint)
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$

    select
      a.name as account,
      m.amount as amount,
      cc.id as "creditCardId",
      cc.name as "creditCard",
      cc.type as "creditCardType",
      m.date as date,
      m.description as description,
      mf."feeNumber" as "feeNumber",
      m.id as id,
      m."investmentId" as "investmentId",
      m."isPaid" as "isPaid",
      m.month as month,
      COALESCE("parentCat".id, cat.id) as "rootCategoryId",
      COALESCE("parentCat".name, cat.name) as "rootCategory",
      COALESCE("parentCat".color, cat.color) as "rootCategoryColor",
      COALESCE("parentCat".icon, cat.icon) as "rootCategoryIcon",
      case when "parentCat".id is null then null else cat.id end as "subCategoryId",
      case when "parentCat".id is null then null else cat.name end as "subCategory",
      mf."totalFees" as "totalFees",
      da.name as "transferAccount",
      t."quotationAmount" as "transferQuotationAmount",
      m.type as type,
      m.year as year

    from public.movement as m
      inner join account as a
        on m."accountId" = a.id

      left join "creditCard" as cc
        on m."creditCardId" = cc.id
      left join "movementFee" as mf
        on m.id = mf.id

      left join "transfer" t
        on m.id = t."sourceMovementId"
        or m.id = t."destinationMovementId"
      left join "movement" dm
        on (m.id != t."sourceMovementId" and dm.id = t."sourceMovementId")
        or (m.id != t."destinationMovementId" and dm.id = t."destinationMovementId")
      left join account as da
        on dm."accountId" = da.id

      inner join category as cat
        on m."categoryId" = cat.id
      left join category as "parentCat"
        on cat."parentId" = "parentCat".id

    where m.month = "pMonth" and m.year = "pYear" and m."accountId" = "pAccountId"

    order by date asc

$BODY$;

ALTER FUNCTION public."getMovements"(uuid, smallint, smallint)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public."getMovements"(uuid, smallint, smallint) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public."getMovements"(uuid, smallint, smallint) TO anon;

GRANT EXECUTE ON FUNCTION public."getMovements"(uuid, smallint, smallint) TO authenticated;

GRANT EXECUTE ON FUNCTION public."getMovements"(uuid, smallint, smallint) TO postgres;

GRANT EXECUTE ON FUNCTION public."getMovements"(uuid, smallint, smallint) TO service_role;
