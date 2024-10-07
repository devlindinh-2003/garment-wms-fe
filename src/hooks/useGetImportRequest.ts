import { getAllImportRequestFn } from '@/api/purchase-staff/importRequestApi';
import { UseUsersInput } from '@/types/DemoUser';
import { UseImportRequestsResponse } from '@/types/ImportRequestType';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';


export const useGetImportRequests = ({
    sorting,
    columnFilters,
    pagination,
  }: UseUsersInput) => {
    const {
      data: importRequestData,
      status: importRequestStatus,
      isLoading: isimportRequestLoading,
    } = useQuery<UseImportRequestsResponse, AxiosError>({
      queryKey: ['Import Request', sorting, columnFilters, pagination],
      queryFn: () =>
        getAllImportRequestFn({
          sorting,
          columnFilters,
          pagination,
        }),
    });
  
    return { importRequestData, importRequestStatus, isimportRequestLoading };
  };