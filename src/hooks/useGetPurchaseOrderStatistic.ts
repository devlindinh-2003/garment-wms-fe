import { getPurchaseOrderStatistic } from '@/api/services/purchaseOrder';
import { ApiResponse } from '@/types/ApiResponse';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetPurchaseOrderStatistic = () => {
  const {
    data: data,
    status: status,
    isPending,
    isError,
    isSuccess
  } = useQuery<ApiResponse, AxiosError>({
    queryKey: ['purchaseOrderStatistic'],
    queryFn: () => getPurchaseOrderStatistic()
  });
  return { data, status, isPending, isError, isSuccess };
};
