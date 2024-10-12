import { get, post } from './ApiCaller';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

export const getAllPurchaseOrders = async (): Promise<ApiResponse> => {
  try {
    const config = get('/purchase-order');
    const response = await axios(config);
    console.log(response);
    return response.data as ApiResponse;
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
