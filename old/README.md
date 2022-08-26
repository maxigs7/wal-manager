# WalManager

This web application was built to manage your expenses and incomes, being able of tagging, create accounts, associate transactions to credit cards, etc.

## Development

This project runs using [Supabase](https://supabase.io/). We're gonna need to create the project and set the env variables:

- Copy env file: `cp .env.example .env.local`
- Replace variables with the supabase project

  ```
  REACT_APP_SUPABASE_API_URL='insert url'
  REACT_APP_SUPABASE_ANON_KEY='insert api key'
  ```

### Database

You need [`supabase cli`](https://supabase.com/docs/reference/cli/installing-and-updating) to run a local instance of supabase. Then you have to login:

```
supabase login
```

Initialize the instance:

```
supabase start
```

If you have modified your database schema you can get the migrations using the next command:

```
supabase db commit name-of-migration
```

### Application

Once you have supabase configured, run the app in the development mode.
The page will reload if you make edits.\
_You will also see any lint errors in the console._

```bash
yarn start:dev
```

### Run Production Mode

Builds the app for production and test it locally.

```bash
yarn start:prod
```

## Deploying Your App

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

```bash
yarn build
```

## Testing

TODO

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
