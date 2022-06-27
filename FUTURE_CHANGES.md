- Customize breakpoints
  https://chakra-ui.com/docs/styled-system/features/responsive-styles

```
/src
  /api
    /auth
    /providers
    index.tsx
    types.tsx
  /app
  /layout
  /modules
    /account
      /components
        /form
          index.tsx
        /table
          cells.tsx
          columns.tsx
          index.tsx
      /containers
        /form
          index.tsx
        /remove
          index.tsx
        /select
          index.tsx
        /table
          index.tsx
      index.tsx
    /credit-card
      /components
        /form
          index.tsx
        /table
          cells.tsx
          columns.tsx
          index.tsx
      /containers
        /form
          index.tsx
        /remove
          index.tsx
        /select
          index.tsx
        /table
          index.tsx
      index.tsx
  /pages
    /admin
      /accounts
        [id].tsx
        create.tsx
        index.tsx
      /categories
        /[id]
          [id].tsx
          create.tsx
          index.tsx
        create.tsx
        index.tsx
      /credit-cards
        [id].tsx
        create.tsx
        index.tsx
    /auth
      sign-in.tsx
      sign-up.tsx
    /transactions
      /[id]
        clone.tsx
        index.tsx
      create.tsx
      index.tsx
    dashboard.tsx
    index.tsx
  /routes
    /[module]
      [module].routes.tsx
      use[module]Nav.tsx
    admin.tsx
    auth.tsx
    main.tsx
  /shared
    /assets
    /config
    /hooks
    /lib
    /providers
  /theme
  /types
```