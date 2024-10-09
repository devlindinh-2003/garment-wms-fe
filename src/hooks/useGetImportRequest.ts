import { getAllImportRequestFn } from '@/api/purchase-staff/importRequestApi';
import { UseUsersInput } from '@/types/DemoUser';
import { UseImportRequestsInput, UseImportRequestsResponse } from '@/types/ImportRequestType';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';


export const useGetImportRequests = ({
    sorting,
    columnFilters,
    pagination,
  }: UseImportRequestsInput) => {
    const {
      data,
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
    const importRequestData = data?.data;
    const pageMeta = data?.pageMeta;
  
    console.log("importRequestData",  importRequestData);
    console.log("pageMeta",  pageMeta);
    return {pageMeta, importRequestData, importRequestStatus, isimportRequestLoading };
  };