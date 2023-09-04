create table "public"."mutualFund" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying(100) not null,
    "key" character varying(100) not null,
    "createdAt" timestamp with time zone default now(),
    CONSTRAINT "mutualFund_pkey" PRIMARY KEY (id)
);


alter table "public"."investment" add column "mutualFundId" uuid;

alter table "public"."investment" add constraint "investment_mutualFundId_fkey" FOREIGN KEY ("mutualFundId") REFERENCES "mutualFund"(id) not valid;

alter table "public"."investment" validate constraint "investment_mutualFundId_fkey";


