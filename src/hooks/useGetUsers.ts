import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseUsersInput, UseUsersResponse } from '@/types/DemoUser';
import { getAllUsersFn } from '@/api/getUsers';

export const useGetUsers = ({
  sorting,
  columnFilters,
  pagination,
}: UseUsersInput) => {
  const {
    data: allUsersData,
    status: allUsersDataStatus,
    isLoading: isAllUsersDataLoading,
  } = useQuery<UseUsersResponse, AxiosError>({
    queryKey: ['users', sorting, columnFilters, pagination],
    queryFn: () =>
      getAllUsersFn({
        sorting,
        columnFilters,
        pagination,
      }),
  });

  return { allUsersData, allUsersDataStatus, isAllUsersDataLoading };
};
