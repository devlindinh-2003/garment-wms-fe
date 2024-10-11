import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { PurchaseOrderSingleResponse } from '@/types/PurchaseOrder';
import { getPurchaseOrderById } from '@/api/services/getOnePurchaseOrder';

export const useGetPurchaseOrderById = (id: string) => {
  return useQuery<PurchaseOrderSingleResponse, AxiosError>({
    queryKey: ['purchaseOrder', id],
    queryFn: () => getPurchaseOrderById(id),
    enabled: !!id
  });
};
