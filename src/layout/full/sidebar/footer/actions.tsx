'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { HStack, Icon, IconButton } from '@chakra-ui/react';

import { Power, Tune } from '@/lib/svg';
import { useSignOut } from '@/m/auth';

const Actions: React.FC = () => {
  const router = useRouter();
  const { mutateAsync } = useSignOut();
  const signOutHandler = async () => {
    await mutateAsync();
    router.push('/auth/sign-in');
  };

  return (
    <HStack>
      <IconButton
        aria-label="Settings"
        as={Link}
        colorScheme="white"
        href="/dashboard"
        icon={<Icon as={Tune} boxSize="6" fill="current" />}
        variant="ghost"
        w="full"
      />

      <IconButton
        aria-label="Sign Out"
        colorScheme="white"
        icon={<Icon as={Power} boxSize="6" fill="current" />}
        onClick={signOutHandler}
        variant="ghost"
        w="full"
      />
    </HStack>
  );
};

export { Actions };
