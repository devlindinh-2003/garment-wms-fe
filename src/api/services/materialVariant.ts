import { MaterialVariantResponse } from '@/types/MaterialTypes';
import { PurchaseOrderResponse } from '@/types/purchaseOrder';
import axios from 'axios';

const backend_url = 'https://garment-wms-be.onrender.com';

export const getallMaterialVariant: {
  (): Promise<MaterialVariantResponse>;
} = async () => {
  const res = await axios.get(`${backend_url}/material-variant`);

  return res.data;
};
