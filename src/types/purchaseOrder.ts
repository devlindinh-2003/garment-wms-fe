import { PODelivery } from './GetPurchaseOrder';
import { Supplier } from './Supplier';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  quarterlyProductionPlanId: string | null;
  purchasingStaffId: string | null;
  totalAmount: number;
  currency: string;
  taxAmount: number;
  orderDate: string;
  expectedFinishDate: string;
  status: string;
  finishDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  supplierId: string;
  supplier: Supplier;
  poDelivery: PODelivery[];
}

export enum PoDeliveryStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED'
}
