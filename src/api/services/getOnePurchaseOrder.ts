import axios from 'axios';
import { PurchaseOrderSingleResponse } from '@/types/PurchaseOrder';
const BACKEND_HOST = 'http://localhost:8000';

export const getPurchaseOrderById: (id: string) => Promise<PurchaseOrderSingleResponse> = async (
  id
) => {
  try {
    const res = await axios.get(`${BACKEND_HOST}/purchase-order/${id}`);
    return res.data;
  } catch (error: any) {
    console.error('Failed to fetch purchase order by ID:', error);
    throw new Error('Failed to fetch purchase order');
  }
};
