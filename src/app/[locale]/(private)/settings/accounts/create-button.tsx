'use client';

import React, { useCallback } from 'react';

import { useScopedI18n } from '@/i18n/client';
import { CreateButton, CreateButtonProps } from '@/m/shared/buttons/create';
import { useModalStore } from '@/m/shared/modal-manager/modal-store';

type Props = { userId: string } & Omit<CreateButtonProps, 'onClick'>;

const CreateAccountButton: React.FC<Props> = ({ userId, ...buttonProps }) => {
  const { onOpen } = useModalStore();
  const t = useScopedI18n('settings.accounts.pages.create');

  const onClick = useCallback(() => {
    onOpen('ACCOUNT_CREATE_MODAL', { title: t('title'), size: 'lg' }, { userId });
  }, [onOpen, t, userId]);

  return <CreateButton {...buttonProps} onClick={onClick} />;
};

export default CreateAccountButton;
