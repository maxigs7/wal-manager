-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

-- Type: categoryType

-- DROP TYPE IF EXISTS public."categoryType";

CREATE TYPE public."categoryType" AS ENUM
    ('expenses', 'incomes');

ALTER TYPE public."categoryType"
    OWNER TO postgres;

-- Type: creditCardType

-- DROP TYPE IF EXISTS public."creditCardType";

CREATE TYPE public."creditCardType" AS ENUM
    ('amex', 'carrefour', 'mastercard', 'naranja', 'visa');

ALTER TYPE public."creditCardType"
    OWNER TO postgres;

-- Type: accountType

-- DROP TYPE IF EXISTS public."accountType";

CREATE TYPE public."accountType" AS ENUM
    ('bank', 'cash');

ALTER TYPE public."accountType"
    OWNER TO postgres;
