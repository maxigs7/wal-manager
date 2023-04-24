-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public."getMovementsSummary"(
	"pAccountId" uuid,
	"pCurrentMonth" smallint,
	"pCurrentYear" smallint,
	"pPriorMonth" smallint,
	"pPriorYear" smallint)
    RETURNS TABLE("isPrior" boolean, month smallint, year smallint, "expensesAmount" numeric, "incomesAmount" numeric, "investmentAmount" numeric, "balanceAmount" numeric, "balancePaidAmount" numeric, "priorAmount" numeric, "priorInvestmentAmount" numeric)
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
    with "movementsCTE" as (
      select
        * ,
        true as "isPrior"
      from public."getMovements"("pAccountId", "pPriorMonth", "pPriorYear")
      union all
      select
        * ,
        false as "isPrior"
      from public."getMovements"("pAccountId", "pCurrentMonth", "pCurrentYear")
    ),
    "movementsSummaryCTE" as(
      select
        m."isPrior",
        m.month,
        m.year,
        abs(sum(case when m.amount < 0 and m."investmentId" is null then m.amount else 0 end)) as "expensesAmount",
        sum(case when m.amount > 0 and m."investmentId" is null then m.amount else 0 end) as "incomesAmount",
        sum(m.amount) as "balanceAmount",
        sum(case when m."isPaid" = true then m.amount else 0 end) as "balancePaidAmount",
        sum(case when m."investmentId" is not null then m.amount * -1 else 0 end) as "investmentAmount"
      from "movementsCTE" as m
      group by m.month, m.year, "isPrior"
    )
    select
      m."isPrior",
      m.month,
      m.year,
      m."expensesAmount",
      m."incomesAmount",
      m."investmentAmount",
      m."balanceAmount",
      m."balancePaidAmount",
      case when m."isPrior" = false then pb.amount else 0 end as "priorAmount",
      case when m."isPrior" = false then pb."investmentAmount" else 0 end as "priorInvestmentAmount"
    from "movementsSummaryCTE" as m
      inner join lateral public."getPriorBalance"("pAccountId", "pCurrentMonth", "pCurrentYear") as pb
        on true

$BODY$;

ALTER FUNCTION public."getMovementsSummary"(uuid, smallint, smallint, smallint, smallint)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public."getMovementsSummary"(uuid, smallint, smallint, smallint, smallint) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public."getMovementsSummary"(uuid, smallint, smallint, smallint, smallint) TO anon;

GRANT EXECUTE ON FUNCTION public."getMovementsSummary"(uuid, smallint, smallint, smallint, smallint) TO authenticated;

GRANT EXECUTE ON FUNCTION public."getMovementsSummary"(uuid, smallint, smallint, smallint, smallint) TO postgres;

GRANT EXECUTE ON FUNCTION public."getMovementsSummary"(uuid, smallint, smallint, smallint, smallint) TO service_role;