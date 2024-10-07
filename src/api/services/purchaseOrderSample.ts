import { PurchaseOrderResponse } from '@/types/GetPurchaseOrder';
import axios from 'axios';

const backend_url = 'https://garment-wms-be.onrender.com';

export const getAllPurchaseOrders: {
  (): Promise<PurchaseOrderResponse>;
} = async () => {
  const res = await axios.get(`http://localhost:8000/purchase-order`);
  return res.data;
};
