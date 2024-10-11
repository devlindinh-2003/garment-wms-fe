import { PurchaseOrderResponse } from '@/types/PurchaseOrder';
import axios from 'axios';

const backend_url = 'https://garment-wms-be.onrender.com';
const local_backend_url = 'http://localhost:8000';

export const getAllPurchaseOrders: {
  (): Promise<PurchaseOrderResponse>;
} = async () => {
  const res = await axios.get(`${local_backend_url}/purchase-order`);
  return res.data;
};
