import { HStack, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import { useSignOut } from '@m/auth';
import { Icon } from '@shared';

const Actions: React.FC = () => {
  const router = useRouter();
  const { mutateAsync } = useSignOut();
  const signOutHandler = useCallback(async () => {
    await mutateAsync();
    router.push('/auth/sign-in');
  }, [mutateAsync, router]);

  return (
    <HStack>
      <Link href="/settings" passHref>
        <IconButton
          aria-label="Settings"
          colorScheme="white"
          icon={<Icon icon="gear" />}
          variant="ghost"
          w="full"
        />
      </Link>

      <IconButton
        aria-label="Sign Out"
        colorScheme="white"
        icon={<Icon icon="power-off" />}
        onClick={signOutHandler}
        variant="ghost"
        w="full"
      />
    </HStack>
  );
};

Actions.displayName = 'Actions';

export { Actions };
