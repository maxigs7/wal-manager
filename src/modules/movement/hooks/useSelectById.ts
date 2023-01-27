import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { Movement, MovementFee } from '@models';

import { MOVEMENTS_KEY } from '../constants';

const useSelectMovementById = (
  id?: string,
): UseQueryResult<[Movement, Partial<MovementFee> | undefined]> => {
  const { movement } = useUow();
  return useQuery(
    [MOVEMENTS_KEY, id],
    () =>
      movement
        .selectById(id as string, { columns: '*, movementFee(feeNumber)' })
        .then(({ movementFee, ...mov }: any) => {
          return [mov as Movement, movementFee];
        }),
    {
      enabled: !!id,
    },
  );
};

export default useSelectMovementById;
