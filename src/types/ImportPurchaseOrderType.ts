export interface ImportPurchaseOrder {
  id: number;
  previousId?: number | null;
  poNumber: string;
  quarterlyProductionPlanId?: number | string | null;
  purchasingStaffId: number;
  supplierId: number;
  status: 'completed' | 'incompleted';
  currency: string;
  totalAmount: number;
  taxRate: number;
  shippingAmount?: number | null;
  otherAmount?: number | null;
  orderDate: string;
  note?: string | null;
  expectedFinishDate?: string | null;
  finishedDate?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
