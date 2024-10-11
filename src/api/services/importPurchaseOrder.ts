import { ApiResponse } from '@/types/ApiResponse';
import axios from 'axios';
import { post } from './ApiCaller';

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
