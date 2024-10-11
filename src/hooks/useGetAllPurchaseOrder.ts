import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllPurchaseOrders } from '@/api/services/getPurchaseOrders';
import { PurchaseOrderResponse } from '@/types/PurchaseOrder';

export const useGetAllPurchaseOrder = () => {
  const {
    data: data,
    status: status,
    isPending,
    isError,
    isSuccess
  } = useQuery<PurchaseOrderResponse, AxiosError>({
    queryKey: ['purchaseOrdersList'],
    queryFn: () => getAllPurchaseOrders()
  });

  return { data, status, isPending, isError, isSuccess };
};
