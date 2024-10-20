import { getAllMaterialFn } from '@/api/services/materialApi';
import { MaterialResponse } from '@/types/MaterialTypes';
import { InputType } from '@/types/Shared';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';


export const useGetMaterial = ({
    sorting,
    columnFilters,
    pagination,
  }: InputType) => {
        
    const {
      data,
      isLoading,
      isFetching
    } = useQuery<MaterialResponse, AxiosError>({
      queryKey: ['Material', sorting, columnFilters, pagination],
      queryFn: () =>
        getAllMaterialFn({
          sorting,
          columnFilters,
          pagination,
        }),

    });
    let result = data
    let materialList = data?.data.data;
    const pageMeta = data?.data.pageMeta;

    // if(AxiosError.){
    //     materialList = [];

    // }

    return {pageMeta, materialList,isFetching, isLoading };
  };