alter table "public"."investment" drop constraint "fk_investment_account";

alter table "public"."investment" drop constraint "fk_investment_user";

alter table "public"."investment" drop column "accountId";

alter table "public"."investment" add column "mutualFundShare" numeric;

alter table "public"."investment" add column "uvaIndexed" boolean not null default false;

alter table "public"."investment" add constraint "investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) not valid;

alter table "public"."investment" validate constraint "investment_userId_fkey";


