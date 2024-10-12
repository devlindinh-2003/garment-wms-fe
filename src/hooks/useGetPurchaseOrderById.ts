import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getPurchaseOrderById } from '@/api/services/purchaseOrder';
import { ApiResponse } from '@/types/ApiResponse';

export const useGetPurchaseOrderById = (id: string) => {
  const {
    data: data,
    status: status,
    isPending,
    isError,
    isSuccess
  } = useQuery<ApiResponse, AxiosError>({
    queryKey: ['purchaseOrder', id],
    queryFn: () => getPurchaseOrderById(id),
    enabled: !!id
  });
  return { data, status, isPending, isError, isSuccess };
};
