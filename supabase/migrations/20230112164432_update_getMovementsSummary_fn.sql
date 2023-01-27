drop function if exists "public"."getMovementsSummary"("pAccountId" uuid, "pCurrentMonth" smallint, "pCurrentYear" smallint, "pPriorMonth" smallint, "pPriorYear" smallint);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."getMovementsSummary"("pAccountId" uuid, "pCurrentMonth" smallint, "pCurrentYear" smallint, "pPreviousMonth" smallint, "pPreviousYear" smallint)
 RETURNS TABLE("previousBalance" numeric, "previousBalancePaid" numeric, "previousExpenses" numeric, "previousIncomes" numeric, "previousInvestment" numeric, "currentBalance" numeric, "currentBalancePaid" numeric, "currentExpenses" numeric, "currentIncomes" numeric, "currentInvestment" numeric)
 LANGUAGE sql
AS $function$
  select
    sum(case when (m.year = "pCurrentYear" and m.month < "pCurrentMonth") or (m.year < "pCurrentYear") then m.amount else 0 end) as "previousBalance",
    sum(case when ((m.year = "pCurrentYear" and m.month < "pCurrentMonth") or (m.year < "pCurrentYear")) and m."isPaid" = true then m.amount else 0 end) as "previousBalancePaid",
    sum(case when m.month = "pPreviousMonth" and m.year = "pPreviousYear" and m.type = 'expenses' then abs(m.amount) else 0 end) as "previousExpenses",
    sum(case when m.month = "pPreviousMonth" and m.year = "pPreviousYear" and m.type = 'incomes' then abs(m.amount) else 0 end) as "previousIncomes",
    sum(case when m.month = "pPreviousMonth" and m.year = "pPreviousYear" and m.type = 'investment' then m.amount * -1 else 0 end) as "previousInvestment",

    sum(case when m.month = "pCurrentMonth" and m.year = "pCurrentYear" then m.amount else 0 end) as "currentBalance",
    sum(case when m.month = "pCurrentMonth" and m.year = "pCurrentYear" and m."isPaid" = true then m.amount else 0 end) as "currentBalancePaid",
    sum(case when m.month = "pCurrentMonth" and m.year = "pCurrentYear" and m.type = 'expenses' then abs(m.amount) else 0 end) as "currentExpenses",
    sum(case when m.month = "pCurrentMonth" and m.year = "pCurrentYear" and m.type = 'incomes' then abs(m.amount) else 0 end) as "currentIncomes",
    sum(case when m.month = "pCurrentMonth" and m.year = "pCurrentYear" and m.type = 'investment' then m.amount * -1 else 0 end) as "currentInvestment"
    
  from movement as m
  where m."accountId" = "pAccountId";

$function$
;


