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
      type = FilterOperationType.InStrings;
    } else if (value === null) {
      type = FilterOperationType.NeNull;
    } else {
      type = FilterOperationType.Eq;
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
    order
  });

  // Make the API request
  try {
    const config = get(`/purchase-order?${queryString}`);
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
