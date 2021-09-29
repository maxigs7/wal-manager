import { GoogleAuthProvider, signInWithPopup, signOut, UserCredential } from '@firebase/auth';
import { Auth, User } from 'firebase/auth';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from './actions';
import { IUser } from './state';

const provider = new GoogleAuthProvider();

const mapToIUser = (user: User): IUser => {
  return {
    displayName: user.displayName as string,
    email: user.email as string,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber ? (user.phoneNumber as string) : undefined,
    photoURL: user.photoURL ? (user.photoURL as string) : undefined,
    uid: user.uid,
  };
};

function* loginSaga(auth: Auth, action: any) {
  try {
    const response: UserCredential = yield call(signInWithPopup, auth, provider);
    const user = mapToIUser(response.user);
    yield put(LOGIN_SUCCESS({ user, redirectTo: action.payload }));
  } catch (error) {
    yield put(LOGIN_FAIL(JSON.stringify(error)));
  }
}

function* logoutSaga(auth: Auth) {
  try {
    yield call(signOut, auth);
    yield put(LOGOUT_SUCCESS());
  } catch (error) {
    yield put(LOGOUT_FAIL(JSON.stringify(error)));
  }
}

export default (auth: Auth): any[] => [
  takeEvery(LOGIN_REQUEST, loginSaga, auth),
  takeEvery(LOGOUT_REQUEST, logoutSaga, auth),
];
