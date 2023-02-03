import { useMemo } from 'react';

import { useAuthRepository, UseAuthRepositoryReturn } from './useAuthRepository';
import { useRepository, UseRepositoryReturn } from './useRepository';

export type UseUowReturn = {
  account: UseRepositoryReturn<'account'>;
  auth: UseAuthRepositoryReturn;
  category: UseRepositoryReturn<'category'>;
  creditCard: UseRepositoryReturn<'creditCard'>;
  movement: UseRepositoryReturn<'movement'>;
  movementFee: UseRepositoryReturn<'movementFee'>;
  quotation: UseRepositoryReturn<'quotation'>;
  transfer: UseRepositoryReturn<'transfer'>;
};

export const useUow = (): UseUowReturn => {
  const accountRepo = useRepository<'account'>('account');
  const authRepo = useAuthRepository();
  const categoryRepo = useRepository<'category'>('category');
  const creditCardRepo = useRepository<'creditCard'>('creditCard');
  const movementRepo = useRepository<'movement'>('movement');
  const movementFeeRepo = useRepository<'movementFee'>('movementFee');
  const quotationRepo = useRepository<'quotation'>('quotation');
  const transferRepo = useRepository<'transfer'>('transfer');

  return useMemo(
    () => ({
      account: accountRepo,
      auth: authRepo,
      category: categoryRepo,
      creditCard: creditCardRepo,
      movement: movementRepo,
      movementFee: movementFeeRepo,
      quotation: quotationRepo,
      transfer: transferRepo,
    }),
    [
      accountRepo,
      authRepo,
      categoryRepo,
      creditCardRepo,
      movementFeeRepo,
      movementRepo,
      quotationRepo,
      transferRepo,
    ],
  );
};
