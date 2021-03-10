# Account Manager

Idea of this project is to create yearly books splitted in months sheets, where we can add every movement in our account. Also we are able
to manage our multiple accounts and set categories for our movements.

## MODEL

### Admin

- #### Category
  ```
  Id          NOT NULL  TINYINT
  Name        NOT NULL  STRING
  CategoryId  NULL      TINYINT --> CategoryParent
  IsDeleted   NOT NULL  BOOL
  ```
- #### Account
  ```
  Id          NOT NULL TINYINT
  Name        NOT NULL STRING
  ImageKey    NOT NULL STRING
  Owner       NOT NULL STRING
  IsDeleted   NOT NULL BOOL
  ```

### User

- #### Book

  ```
  Id   NOT NULL INT
  Name NOT NULL STRING
  Year NOT NULL TINYINT
  ```

- #### Sheet

  ```
  Id                  NOT NULL  BIGINT
  BookId              NOT NULL  INT
  Month               NOT NULL  TINYINT
  ModifiedDate        NULL      DATETIME
  ```

- #### SheetAccount

  ```
  SheetId   NOT NULL BIGINT
  AccountId NOT NULL TINYINT
  Amount    NOT NULL DECIMAL
  ```

- #### SheetLine
  ```
  Id          NOT NULL  BIGINT
  SheetId     NOT NULL  BIGINT
  CategoryId  NULL      TINYINT
  AccountId   NOT NULL  TINYINT
  Description NULL      STRING
  Date        NULL      DATE
  Amount      NOT NULL  DECIMAL
  FeeNumber   NULL      TINYINT --> To know if line should be repeated on next sheets
  TotalFees   NULL      TINYINT --> To validate the end
  IsClosed    NOT NULL  BOOL
  ```
