# Account Manager

Idea of this project is to create yearly books splitted in months sheets, where we can add every movement in our account. Also we are able
to manage our multiple accounts and set categories for our movements.

## REST API

- Base URL: `/api/`

- Admin: `/admin/`

  - Category: `/categories/`

    - `GET /`: Get all parent categories (CategoryId == NULL)

      Response:

      ```json
      {
        "id": "number",
        "name": "string"
      }
      ```

    - `GET /:id`: Get all subcategories (Only take care of one level)

      Params: `:id == number`

      Response:

      ```json
      {
        "id": "number",
        "name": "string",
        "categories": Array<{
          "id": "number",
          "name": "string"
        }>
      }
      ```

    - `POST /`: Create category

      Body:

      ```json
      {
        "name": "string",
        "categoryId": "number"
      }
      ```

    - `PUT /:id`: Update category

      Params: `:id == number`

      Body:

      ```json
      {
        "id": "number",
        "name": "string",
        "categoryId?": "number"
      }
      ```

    - `DELETE /:id`: Delete category

      Params: `:id == number`

  - Account: `/accounts/`

    - `GET /`: Get all accounts

      Response:

      ```json
      {
        "id": "number",
        "name": "string",
        "imageKey?": "string",
        "owner?": "string",
        "isDeleted": "bool"
      }
      ```

    - `GET /:id`: Get specific account

      Params: `:id == number`

      Response:

      ```json
      {
        "id": "number",
        "name": "string",
        "imageKey?": "string",
        "owner?": "string",
        "isDeleted": "bool"
      }
      ```

    - `POST /`: Create account

      Body:

      ```json
      {
        "name": "string",
        "imageKey?": "string",
        "owner?": "string",
        "isDeleted": "bool"
      }
      ```

    - `PUT /:id`: Update account

      Params: `:id == number`

      Body:

      ```json
      {
        "id": "number",
        "name": "string",
        "imageKey?": "string",
        "owner?": "string",
        "isDeleted": "bool"
      }
      ```

    - `DELETE /:id`: Delete account

      Params: `:id == number`

- Non Admin: `/`

  - Lookups: `/lookups/`

    - Category: `GET /categories/:id?`

      Params: `:id?` optional number. If it's null we get all parent categories

      Response:

      ```json
      {
        "id": "number",
        "name": "string"
      }
      ```

    - Account: `GET /accounts` Get all available accounts

      Response:

      ```json
      {
        "id": "number",
        "name": "string"
      }
      ```

  - Book: `/books/`

    - `GET /`: Get all books

      Response:

      ```json
      {
        "id": "number",
        "name": "string",
        "year": "number"
      }
      ```

    - `GET /:id`: Get specific book

      Params: `:id == number`

      Response:

      ```json
      {
        "id": "number",
        "name": "string",
        "year": "number",
        "sheets": Array<{
          "id": "number",
          "month": "number"
        }>
      }
      ```

    - `POST /`: Create book

      Body:

      ```json
      {
        "name": "string",
        "year": "number"
      }
      ```

    - `PUT /:id`: Update book

      Params: `:id == number`

      Body:

      ```json
      {
        "id": "number",
        "name": "string",
        "year": "number"
      }
      ```

  - Sheet: `/books/:bookId/sheets/`

    Params: `:bookId == number`

    - `GET /:id`: Get sheet information

      Params: `:id == number`

      Response:

      ```json
      {
        "id": "number",
        "bookId": "number",
        "month": "number",
        "accounts": Array<{
          "id": "number",
          "name": "string",
          "amount": "number"
        }>,
        "lines": Array<{
          "id": "number",
          "parentCategoryId?": "number",
          "categoryId?": "number",
          "accountId": "number",
          "date?": "date",
          "feeNumber?": "number",
          "totalFees?": "number",
          "amount": "number",
          "isClosed": "bool"
        }>
      }
      ```

  - SheetAccount: `/books/:bookId/sheets/:sheetId/accounts`

    - `PUT /:id`: Update amount

      Body:

      ```json
      {
        "sheetId": "number",
        "accountId": "number",
        "amount": "number"
      }
      ```

    - `DELETE /:id`: Delete line

      Params: `:id == number`

  - SheetLine: `/books/:bookId/sheets/:sheetId/lines`

    - `POST /`: Create new line

      Body:

      ```json
      {
        "sheetId": "number",
        "parentCategoryId?": "number",
        "categoryId?": "number",
        "accountId": "number",
        "date?": "date",
        "feeNumber?": "number",
        "totalFees?": "number",
        "amount": "number"
      }
      ```

    - `PUT /:id`: Update line

      Body:

      ```json
      {
        "id": "number",
        "sheetId": "number",
        "parentCategoryId?": "number",
        "categoryId?": "number",
        "accountId": "number",
        "date?": "date",
        "feeNumber?": "number",
        "totalFees?": "number",
        "amount": "number"
      }
      ```

    - `DELETE /:id`: Delete line

      Params: `:id == number`
