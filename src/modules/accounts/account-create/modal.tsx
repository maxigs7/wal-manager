'use client';
// import { useCallback } from 'react';

// import { ModalBody, ModalFooter } from '@chakra-ui/react';

// import { useQuotationSelectAll } from '@/m/quotations/query';
// import { CancelButton } from '@/m/shared/buttons';
// import { useModalManager } from '@/m/shared/modal-manager/provider';

// import { AccountFormProvider } from '../account-form/form-provider';
// import { AccountUseFormProvider } from '../account-form/use-form-provider';
// import { useAccountSelectAllRefresh } from '../query';
// import { CreateAccountButton } from './button';
// import { AccountFormContainer } from './form';

export type AccountCreateModalProps = {
  userId: string;
};

const AccountCreateModal: React.FC<AccountCreateModalProps> = ({ userId }) => {
  //   const { onClose } = useModalManager();
  //   const { data: quotations } = useQuotationSelectAll();
  //   const refresh = useAccountSelectAllRefresh();

  //   const onSuccess = useCallback(() => {
  //     refresh();
  //     onClose();
  //   }, [onClose, refresh]);

  return (
    <>TEST</>
    //     <AccountUseFormProvider userId={userId}>
    //       <ModalBody as="form" noValidate>
    //         <AccountFormProvider quotations={quotations || []}>
    //           <AccountFormContainer />
    //         </AccountFormProvider>
    //       </ModalBody>
    //       <ModalFooter>
    //         <CreateAccountButton mr="2" onSuccess={onSuccess} />
    //         <CancelButton onClick={onClose} />
    //       </ModalFooter>
    //     </AccountUseFormProvider>
  );
};

export default AccountCreateModal;