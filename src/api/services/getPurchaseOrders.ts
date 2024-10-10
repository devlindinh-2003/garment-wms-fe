import { PurchaseOrderResponse } from '@/types/purchaseOrder';
import axios from 'axios';

const backend_url = 'https://garment-wms-be.onrender.com';

export const getAllPurchaseOrders: {
  (): Promise<PurchaseOrderResponse>;
} = async () => {
  const res = await axios.get(`${backend_url}/purchase-order`);

  return res.data;
};
