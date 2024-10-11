import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllPurchaseOrders } from '@/api/services/purchaseOrder';
import { ApiResponse } from '@/types/ApiResponse';

export const useGetAllPurchaseOrder = () => {
  const {
    data: data,
    status: status,
    isPending,
    isError,
    isSuccess
  } = useQuery<ApiResponse, AxiosError>({
    queryKey: ['purchaseOrdersList'],
    queryFn: () => getAllPurchaseOrders()
  });

  return { data, status, isPending, isError, isSuccess };
};
