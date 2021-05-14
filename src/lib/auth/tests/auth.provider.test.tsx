import React, { useContext } from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { AuthContext } from '../context';
import { AuthProvider } from '../provider';

const authMock = jest.fn(() => {
  return {
    onAuthStateChanged: jest.fn(),
  };
});

jest.mock('../useFirebase', () => ({
  auth: authMock,
}));

const TestComponent: React.FC = () => {
  const { user } = useContext(AuthContext);
  return <div data-testid="userName">{user?.userName.toString()}</div>;
};

describe('AuthProvider', () => {
  it('user is null by default', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByTestId('userName').textContent).toBeNull();
  });
});
