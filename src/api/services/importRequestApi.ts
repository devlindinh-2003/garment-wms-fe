import { ApiResponse } from '@/types/ApiResponse';
import { post } from './ApiCaller';
import axios from 'axios';

export const importRequestApi = {
  create: async (
    poDeliveryId: string,
    description: string,
    importRequestDetails: any[],
    type: string
  ): Promise<any> => {
    // Example API call
    return axios(
      post('/import-request', {
        poDeliveryId,
        description,
        importRequestDetails,
        type
      })
    );
  }
};
