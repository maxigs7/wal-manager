'use client';
import React, { useCallback } from 'react';

import { ButtonProps } from '@chakra-ui/react';

import { es } from '@/i18n';
import { CreateButton } from '@/m/shared/buttons';
import { useModalManager } from '@/m/shared/modal-manager/provider';
import { ModalKey } from '@/m/shared/modal-manager/types';

type Props = { userId: string } & Omit<ButtonProps, 'onClick'>;

const CreateCreditCardButton: React.FC<Props> = ({ userId, ...buttonProps }) => {
  const { onOpen } = useModalManager();

  const onClick = useCallback(() => {
    onOpen(
      ModalKey.CREDIT_CARD_CREATE,
      { title: es.creditCard.pages.create.title, size: '4xl' },
      { userId },
    );
  }, [onOpen, userId]);

  return (
    <CreateButton {...buttonProps} onClick={onClick}>
      {es.common.create}
    </CreateButton>
  );
};

export { CreateCreditCardButton };