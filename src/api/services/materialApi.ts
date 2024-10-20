import { MaterialReceiptResponse, MaterialResponse, UseMaterialsInput } from '@/types/MaterialTypes';
import { get } from '../ApiCaller';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { FilterBuilder, FilterOperationType } from '@chax-at/prisma-filter-common';

let material = '/material';
let materialType ='/material-type';
export const materialApi = {
  getOne: (id: string) => get(`${material}/${id}`),
  getAll: (queryString: string) => get(`${material}${queryString}`),
  getOneReceipt: (id: string) => get(`${material}/${id}/receipt`),
};
export const materialTypeApi = {
  getAll: () => get(`${materialType}`),
}
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
    const filters = columnFilters.map(filter => {
      // Replace dots with underscores only if there are any dots in the id
      const fieldKey = filter.id.includes('_') ? filter.id.replace('_', '.') : filter.id;

      return {
          id: fieldKey,
          value: filter.value,
      };
  });
  const sorts = sorting.map(sort => {
    // Replace dots with underscores only if there are any dots in the id
    const fieldKey = sort.id.includes('_') ? sort.id.replace('_', '.') : sort.id;

    return {
        id: fieldKey,
        desc: sort.desc,
    };
});
  
    // Build filter array from columnFilters
    filters.forEach((filterItem) => {
      const { id, value } = filterItem;
    
      let type: FilterOperationType;
      if (id === 'name' || id === 'code') {
        type = FilterOperationType.Ilike;
      } else {
        type = FilterOperationType.Eq;
      }
      if (Array.isArray(value)) {
        value.forEach((val) => {
          filter.push({ field: id, type, value: val });
        });
      } else {
        filter.push({ field: id, type, value });
      }
    });
    sorts.forEach((sort) => {
      const direction = sort.desc ? 'desc' : 'asc';
      order.push({ field: sort.id, dir: direction });
    });
    // Construct the query string
    let queryString = FilterBuilder.buildFilterQueryString({
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
export const getOneMaterialReceipt = async (id: string): Promise<MaterialReceiptResponse> => {
  const res = await axios(materialApi.getOneReceipt(id));
  return res.data.data;
}
