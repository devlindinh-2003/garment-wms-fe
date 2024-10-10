import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllPurchaseOrders } from '@/api/services/getPurchaseOrders';
import { PurchaseOrderResponse } from '@/types/PurchaseOrder';

export const useGetAllPurchaseOrder = () => {
  const { data: data, status: status } = useQuery<PurchaseOrderResponse, AxiosError>({
    queryKey: ['users'],
    queryFn: () => getAllPurchaseOrders()
  });

  return { data, status };
};
