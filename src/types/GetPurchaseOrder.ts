import { MaterialVariant } from './MaterialVariant';
import { PurchaseOrder } from './PurchaseOrder';

export interface Supplier {
  id: string;
  supplier_name: string;
  address: string;
  email: string;
  phone: string;
  fax: string | null;
  tax_number: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}
// PO Delivery Detail
export interface PODeliveryDetail {
  id: string;
  poDeliveryId: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  quantityByPack: number;
  materialVariantId: string;
  expiredDate: string | null;
  totalAmount: number;
  materialVariant: MaterialVariant;
}

// PO Delivery
export interface PODelivery {
  id: string;
  purchaseOrderId: string;
  totalAmount: number | null;
  taxAmount: number | null;
  orderDate: string | null;
  expectedDeliverDate: string;
  deliverDate: string | null;
  status: string;
  isExtra: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  poDeliveryDetail: PODeliveryDetail[];
}

// Purchase Order

// Pagination Meta
interface PageMeta {
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Purchase Order Response
export interface PurchaseOrderResponse {
  statusCode: number;
  data: {
    data: PurchaseOrder[];
    pageMeta: PageMeta;
  };
  message: string;
  errors: any;
}
