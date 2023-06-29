'use client';
import React, { useCallback } from 'react';

import { ButtonProps } from '@chakra-ui/react';

import { es } from '@/i18n';
import { CreateButton } from '@/m/shared/buttons';
import { useModalManager } from '@/m/shared/modal-manager/provider';
import { ModalKey } from '@/modules/shared/modal-manager/types';

type Props = { userId: string } & Omit<ButtonProps, 'onClick'>;

const CreateAccountButton: React.FC<Props> = ({ userId, ...buttonProps }) => {
  const { onOpen } = useModalManager();

  const onClick = useCallback(() => {
    onOpen(
      ModalKey.ACCOUNT_CREATE,
      { title: es.account.pages.create.title, size: '4xl' },
      { userId },
    );
  }, [onOpen, userId]);

  return (
    <CreateButton {...buttonProps} onClick={onClick}>
      {es.common.create}
    </CreateButton>
  );
};

export { CreateAccountButton };
