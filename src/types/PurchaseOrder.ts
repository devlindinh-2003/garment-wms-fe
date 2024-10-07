import { PODelivery, Supplier } from './GetPurchaseOrder';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  quarterlyProductionPlanId: string | null;
  purchasingStaffId: string | null;
  currency: string;
  totalAmount: number;
  taxAmount: number;
  orderDate: string;
  expectedFinishDate: string;
  finishDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  supplierId: string;
  supplier: Supplier;
  poDelivery: PODelivery[];
}
