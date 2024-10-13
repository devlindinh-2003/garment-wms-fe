import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllPurchaseOrders } from '@/api/services/purchaseOrder';
import { ApiResponse } from '@/types/ApiResponse';
import { SortingState, ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { PurchaseOrderListResponse } from '@/types/PurchaseOrderListResponse';

interface UseGetAllPurchaseOrderParams {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

export const useGetAllPurchaseOrder = ({
  sorting,
  columnFilters,
  pagination
}: UseGetAllPurchaseOrderParams) => {
  const {
    data,
    status,
    isLoading: isPending,
    isError,
    isSuccess
  } = useQuery<PurchaseOrderListResponse, AxiosError>({
    queryKey: ['purchaseOrdersList', sorting, columnFilters, pagination],
    queryFn: () => getAllPurchaseOrders({ sorting, columnFilters, pagination })
  });
  const purchaseOrderList = data?.data;
  const pageMeta = data?.pageMeta;
  return { data, status, isPending, isError, isSuccess, pageMeta, purchaseOrderList };
};
