import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';


import { useUow } from '@/api';
import { es } from '@/i18n';
import { ApiError, useToast } from '@/lib';
import { GetMovementItem, Movement } from '@/models';

import { MOVEMENTS_GRID_KEY, MOVEMENTS_KEY } from '../constants';
import useSelectSummaryRefresh from './useSelectSummaryRefresh';

type UpdateIsPaidForm = { id: string; value: boolean };
type UseUpdateIsPaidArgs = { accountId: string; month: number; year: number };
const useUpdateIsPaid = (
  args: UseUpdateIsPaidArgs,
  showToast = true,
): UseMutationResult<Movement, ApiError, UpdateIsPaidForm> => {
  const { movement } = useUow();
  const queryClient = useQueryClient();
  const refreshSummary = useSelectSummaryRefresh();
  const toast = useToast();

  return useMutation<Movement, ApiError, UpdateIsPaidForm>(
    ({ id, value }: UpdateIsPaidForm) => movement.update({ id, isPaid: value }),
    {
      onMutate: async ({ id, value }) => {
        // Cancel current queries for the list
        await queryClient.cancelQueries({
          queryKey: [MOVEMENTS_KEY, MOVEMENTS_GRID_KEY, args.accountId, args.month, args.year],
        });

        const previousData = queryClient.getQueryData<GetMovementItem[]>([
          MOVEMENTS_KEY,
          MOVEMENTS_GRID_KEY,
          args.accountId,
          args.month,
          args.year,
        ]);

        //update query data
        let temp = [...(previousData || [])];
        const target = temp.find((movement) => movement.id === id);
        if (target) {
          const targetIx = temp.indexOf(target);
          temp[targetIx] = { ...target, isPaid: value };
        }

        queryClient.setQueryData(
          [MOVEMENTS_KEY, MOVEMENTS_GRID_KEY, args.accountId, args.month, args.year],
          () => temp,
        );

        return temp;
      },
      onSuccess: () => {
        showToast &&
          toast.success({
            title: es.common.toast.success,
            description: es.movement.toast.saveSuccess,
          });

        refreshSummary(args.accountId, args.month, args.year);
      },
      onError: (error: Error) => {
        showToast && toast.error({ title: es.common.toast.error, description: error.message });
      },
    },
  );
};

export default useUpdateIsPaid;
