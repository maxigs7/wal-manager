import { useRepository, UseRepositoryReturn } from './useRepository';

export type UseUowReturn = {
  account: UseRepositoryReturn<'account'>;
  category: UseRepositoryReturn<'category'>;
  creditCard: UseRepositoryReturn<'creditCard'>;
  movement: UseRepositoryReturn<'movement'>;
  movementFee: UseRepositoryReturn<'movementFee'>;
  quotation: UseRepositoryReturn<'quotation'>;
  transfer: UseRepositoryReturn<'transfer'>;
};

export const useUow = (): UseUowReturn => {
  const accountRepo = useRepository<'account'>('account');
  const categoryRepo = useRepository<'category'>('category');
  const creditCardRepo = useRepository<'creditCard'>('creditCard');
  const movementRepo = useRepository<'movement'>('movement');
  const movementFeeRepo = useRepository<'movementFee'>('movementFee');
  const quotationRepo = useRepository<'quotation'>('quotation');
  const transferRepo = useRepository<'transfer'>('transfer');

  return {
    account: accountRepo,
    category: categoryRepo,
    creditCard: creditCardRepo,
    movement: movementRepo,
    movementFee: movementFeeRepo,
    quotation: quotationRepo,
    transfer: transferRepo,
  };
};
