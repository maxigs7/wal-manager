# WalManager

NEED INSTALL SUPABASE CLI

## Development

This project runs using Firebase Firestore and Firestore Authentication. We're gonna need to install the CLI to run locally.

`cp .env.example .env.local`

### Configure Firebase

#### Get the CLI

The Emulator Suite is part of the Firebase CLI (command-line interface) which can be installed on your machine with the following command:

```bash
yarn global add firebase-tools
```

### Connect to your Firebase project

If you don't have a Firebase project, in the [Firebase console](https://console.firebase.google.com/), create a new Firebase project. Make a note of the Project ID you choose, you will need it later.

Now we need to connect this code to your Firebase project. First run the following command to log in to the Firebase CLI:

```bash
firebase login
```

Next run the following command to create a project alias. Replace `$YOUR_PROJECT_ID` with the ID of your Firebase project.

```bash
firebase use $YOUR_PROJECT_ID
```

Create `.firebaserc` with the following format. Replace `$YOUR_PROJECT_ID` with the ID of your Firebase project.

```json
{
  "projects": {
    "default": $YOUR_PROJECT_ID
  }
}
```

### Start the emulators

From inside the source directory, run the following command to start the emulators:

```bash
yarn firebase:start
```

### Application

Once firebase emulator is running, run the app in the development mode.
The page will reload if you make edits.\
_You will also see any lint errors in the console._

```bash
yarn start
```

### Run Production Mode

Builds the app for production and test it locally.

```bash
yarn build && npx serve -s build
```

## Deploying Your App

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

```bash
yarn build
```

Now that everything is set up, you can go ahead and deploy your app! All you need to do now is run:

```bash
firebase deploy
```

## Testing

TODO

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
