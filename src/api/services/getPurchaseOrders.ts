import { PurchaseOrderResponse } from '@/types/PurchaseOrder';
import axios from 'axios';
import { get } from './ApiCaller';

export const getAllPurchaseOrders = async (): Promise<PurchaseOrderResponse> => {
  try {
    const config = get('/purchase-order');
    const response = await axios(config);
    return response.data as PurchaseOrderResponse;
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    throw new Error('Failed to fetch purchase orders');
  }
};
