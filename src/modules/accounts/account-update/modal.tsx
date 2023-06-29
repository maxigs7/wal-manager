'use client';
import { useCallback } from 'react';

import { ModalBody, ModalFooter } from '@chakra-ui/react';

import { useQuotationSelectAll } from '@/m/quotations/query';
import { CancelButton } from '@/m/shared/buttons';
import { ContentLoader } from '@/m/shared/loaders/content-loader';
import { useModalManager } from '@/m/shared/modal-manager/provider';

import { AccountFormProvider } from '../account-form/form-provider';
import { AccountUseFormProvider } from '../account-form/use-form-provider';
import { useAccountSelectAllRefresh, useAccountSelectById } from '../query';
import { UpdateAccountButton } from './button';
import { AccountFormContainer } from './form';

export type AccountUpdateModalProps = {
  accountId: string;
};

const AccountUpdateModal: React.FC<AccountUpdateModalProps> = ({ accountId }) => {
  const { onClose } = useModalManager();
  const { data: quotations } = useQuotationSelectAll();
  const { data: account } = useAccountSelectById(accountId);

  const refresh = useAccountSelectAllRefresh();

  const onSuccess = useCallback(() => {
    refresh();
    onClose();
  }, [onClose, refresh]);

  if (!account || !quotations) return <ContentLoader />;

  return (
    <AccountUseFormProvider accountId={account.id} userId={account?.userId}>
      <ModalBody as="form" noValidate>
        <AccountFormProvider quotations={quotations || []}>
          <AccountFormContainer account={account} />
        </AccountFormProvider>
      </ModalBody>
      <ModalFooter>
        <UpdateAccountButton mr="2" onSuccess={onSuccess} />
        <CancelButton onClick={onClose} />
      </ModalFooter>
    </AccountUseFormProvider>
  );
};

export default AccountUpdateModal;
