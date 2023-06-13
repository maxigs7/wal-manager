'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { MenuItem } from '@chakra-ui/react';

import { es } from '@/i18n';
import { useSignOut } from '@/m/auth/query';
import { routes } from '@/routes';

const SignOutMenuItem: React.FC = () => {
  const router = useRouter();
  const { mutateAsync } = useSignOut();
  const signOutHandler = async () => {
    await mutateAsync();
    router.push(routes.auth.signIn);
  };

  return <MenuItem onClick={signOutHandler}>{es.menu.navbar.user.signOut}</MenuItem>;
};

export { SignOutMenuItem };
