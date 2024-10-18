import { MaterialResponse, UseMaterialsInput } from '@/types/MaterialTypes';
import { get } from '../ApiCaller';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { FilterBuilder, FilterOperationType } from '@chax-at/prisma-filter-common';

let material = '/material';

export const materialApi = {
  getOne: (id: string) => get(`${material}/${id}`),
  getAll: (queryString: string) => get(`${material}${queryString}`),
};
export const getAllMaterialFn = async ({
    sorting,
    columnFilters,
    pagination,
  }: UseMaterialsInput): Promise<MaterialResponse> => {
    const limit = pagination.pageSize;
    const offset = pagination.pageIndex * pagination.pageSize;
  
    // Initialize filter and order arrays
    const filter: any[] = [];
    const order: any[] = [];
  
    // Build filter array from columnFilters
    columnFilters.forEach((filterItem) => {
      const { id, value } = filterItem;
  
      // Check the type of operation based on your requirement
      let type: FilterOperationType;
      if (Array.isArray(value)) {
        type = FilterOperationType.InStrings; // Example operation type
      } else if (value === null) {
        type = FilterOperationType.NeNull; // Example operation type
      } else {
        type = FilterOperationType.Eq; // Default operation type
      }
  
      filter.push({ field: id, type, value });
    });
  
    // Build order array from sorting
    sorting.forEach((sort) => {
      const direction = sort.desc ? 'desc' : 'asc';
      order.push({ field: sort.id, dir: direction });
    });
  
    // Construct the query string
    const queryString = FilterBuilder.buildFilterQueryString({
      limit,
      offset,
      filter,
      order,
    });
  
    // Make the API request
    const res = await axios(materialApi.getAll(queryString));
    return res.data;
  };
  
export const getOneMaterial = async (id: string): Promise<MaterialResponse> => {
  const res = await axios(materialApi.getOne(id));
  return res.data.data;
};
