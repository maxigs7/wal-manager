# Account Manager

Idea of this project is to create yearly books splitted in months sheets, where we can add every movement in our account. Also we are able
to manage our multiple accounts and set categories for our movements.

## Components

App

```html
<Layout>
  <!-- Component -->
  <Toolbar />
  <!-- Component -->
  <Sidebar />
  <!-- Component -->
  <content />
  <!-- Containers -->
</Layout>
```

Containers:

```html
<AdminCategories />
<AdminCategoryForm />
<AdminAccounts />
<AdminAccountForm />
<Books />
<BookForm />
<BookDetail />
```

AdminCategories:

```html
<CreateButton />
<CategoriesList>
  <CategoryItem>
    <DetailButton />
    <EditButton />
    <DeleteButton />
  </CategoryItem>
</CategoriesList>
```

AdminCategoryForm:

```html
<form />
<CreateButton />
<CategoriesList categoryId>
  <CategoryItem>
    <DetailButton />
    <EditButton />
    <DeleteButton />
  </CategoryItem>
</CategoriesList>
```

AdminAccounts:

```html
<CreateButton />
<AccountsList>
  <AccountsItem>
    <DetailButton />
    <EditButton />
    <DeleteButton />
  </AccountsItem>
</AccountsList>
```
