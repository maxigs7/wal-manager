export const initialState: IState = {
  initialized: false,
};

export interface IUser {
  createdAt?: string;
  lastLoginAt?: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  photoURL?: string;
  uid: string;
}

export interface IState {
  error?: string;
  initialized: boolean;
  redirectTo?: string;
  user?: IUser;
  userId?: string;
}
