'use client';
import React from 'react';

import { Avatar, Flex, Text } from '@chakra-ui/react';

import { useUser } from '@/m/auth';

const User: React.FC = () => {
  const { user } = useUser();

  const userPhotoUrl = user?.user_metadata?.photoURL;

  return (
    <Flex align="center" justify="center" py="3">
      <Avatar mr="3" size="sm" src={userPhotoUrl} />
      <Text as="span" display="inline">
        {user?.email || ''}
      </Text>
    </Flex>
  );
};

export { User };
