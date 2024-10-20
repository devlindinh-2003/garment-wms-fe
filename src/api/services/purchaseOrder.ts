import { get, post } from './ApiCaller';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { FilterBuilder, FilterOperationType } from '@chax-at/prisma-filter-common';
import { PurchaseOrderListResponse } from '@/types/PurchaseOrderListResponse';

interface GetAllPurchaseOrdersInput {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

export const getAllPurchaseOrders = async ({
  sorting,
  columnFilters,
  pagination
}: GetAllPurchaseOrdersInput): Promise<PurchaseOrderListResponse> => {
  const limit = pagination.pageSize;
  const page = pagination.pageIndex + 1;
  const offset = page === 1 ? 0 : (page - 1) * limit - 1;
  const filters: string[] = [];
  const orders: string[] = [];

  // Manually build the filter query
  columnFilters.forEach((filterItem, index) => {
    const { id, value } = filterItem;
    let type: string;

    if (Array.isArray(value)) {
      type = '=';
    } else if (value === null) {
      type = 'ne_null';
    } else {
      type = '=';
    }

    filters.push(`filter[${index}][field]=${id}`);
    filters.push(`filter[${index}][type]=${type}`);
    filters.push(`filter[${index}][value]=${value}`);
  });

  // Manually build the order query
  sorting.forEach((sort, index) => {
    const direction = sort.desc ? 'desc' : 'asc';
    orders.push(`order[${index}][field]=${sort.id}`);
    orders.push(`order[${index}][dir]=${direction}`);
  });

  // Build the complete query string
  const queryString = `?offset=${offset}&limit=${limit}&${filters.join('&')}&${orders.join('&')}`;

  const fullUrl = `/purchase-order${queryString}`;

  try {
    // Make the API request using Axios
    const config = get(fullUrl);
    const response = await axios(config);
    return response.data.data as PurchaseOrderListResponse;
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    throw new Error('Failed to fetch purchase orders');
  }
};

export const getPurchaseOrderById = async (id: string): Promise<ApiResponse> => {
  try {
    const config = get(`/purchase-order/${id}`);
    const response = await axios(config);
    return response.data as ApiResponse;
  } catch (error: any) {
    console.error('Failed to fetch purchase order by ID:', error);
    throw new Error('Failed to fetch purchase order');
  }
};

export const importPurchaseOrder = async (file: File): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const config = post('/purchase-order', formData, {}, { 'Content-Type': 'multipart/form-data' });
  try {
    const response = await axios(config);
    return response.data as ApiResponse;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        statusCode: error.response.status,
        data: null,
        message: error.response.data.message || 'An error occurred during file upload.',
        errors: error.response.data.errors || null
      } as ApiResponse;
    }
    throw new Error('An unexpected error occurred during file upload.');
  }
};

export const getPurchaseOrderStatistic = async (): Promise<ApiResponse> => {
  try {
    const config = get(`/purchase-order/statistic`);
    const response = await axios(config);
    return response.data as ApiResponse;
  } catch (error: any) {
    console.error('Failed to fetch purchase order by ID:', error);
    throw new Error('Failed to fetch purchase order');
  }
};
