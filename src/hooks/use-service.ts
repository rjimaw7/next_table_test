/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from '@tanstack/react-query';

import type { GetOrdersPayload, GetOrdersResponsePayload, UpdatePatientDataPayload } from '@/lib/interfaces';

import { useDao } from './use-dao';

export const useService = () => {
  const { getOrders: getOrdersDao, updateSingleOrder: updateSingleOrderDao } = useDao();

  const getOrders = (payload: GetOrdersPayload, showExactMatchesOnly: boolean) => {
    return useQuery<GetOrdersResponsePayload, Error>({
      queryKey: ['orders', payload.page, payload.limit, payload.searchQuery, showExactMatchesOnly, payload.sort],
      queryFn: () => getOrdersDao(payload, showExactMatchesOnly)
    });
  };

  const updateSingleOrder = useMutation({
    mutationFn: (data: { id: string; payload: UpdatePatientDataPayload }) => updateSingleOrderDao(data.id, data.payload)
  });
  const updateSingleOrderMutation = () => {
    return {
      updateSingleOrder
    };
  };

  return { getOrders, updateSingleOrderMutation };
};
