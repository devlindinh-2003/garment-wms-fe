import { UseGetTableResponseType } from './CompositeTable';

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

export const importPurchaseOrderData: UseGetTableResponseType<ImportPurchaseOrder> = {
  limit: 10,
  page: 1,
  total: 20,
  total_filtered: 10,
  data: [
    {
      id: 1,
      previousId: null,
      poNumber: 'PO45345',
      quarterlyProductionPlanId: 'PPL023',
      purchasingStaffId: 2,
      supplierId: 4,
      status: 'incompleted',
      currency: 'USD',
      totalAmount: 15250.75,
      taxRate: 7.5,
      shippingAmount: 250.0,
      otherAmount: null,
      orderDate: '29/09/2024',
      note: 'Requesting urgent processing for Q4 supplies.',
      expectedFinishDate: '10/10/2024',
      finishedDate: null,
      createdAt: '29/09/2024',
      updatedAt: '29/09/2024',
      deletedAt: null
    },
    {
      id: 2,
      previousId: null,
      poNumber: 'PO45345',
      quarterlyProductionPlanId: 'PPL023',
      purchasingStaffId: 354,
      supplierId: 7,
      status: 'incompleted',
      currency: 'EUR',
      totalAmount: 9800.0,
      taxRate: 15.0,
      shippingAmount: 150.0,
      otherAmount: 200.0,
      orderDate: '28/08/2024',
      note: 'Order approved, scheduled for shipping next week.',
      expectedFinishDate: '05/09/2024',
      finishedDate: '04/09/2024',
      createdAt: '28/08/2024',
      updatedAt: '28/08/2024',
      deletedAt: null
    },
    {
      id: 3,
      previousId: 2,
      poNumber: 'PO45345',
      quarterlyProductionPlanId: 'PPL023',
      purchasingStaffId: 101,
      supplierId: 15,
      status: 'incompleted',
      currency: 'JPY',
      totalAmount: 750000.0,
      taxRate: 10.0,
      shippingAmount: 500.0,
      otherAmount: 300.0,
      orderDate: '15/07/2024',
      note: 'Supplier unable to meet delivery requirements.',
      expectedFinishDate: '20/07/2024',
      finishedDate: null,
      createdAt: '15/07/2024',
      updatedAt: '18/07/2024',
      deletedAt: null
    },
    {
      id: 4,
      previousId: null,
      poNumber: 'PO45345',
      quarterlyProductionPlanId: 'PPL023',
      purchasingStaffId: 207,
      supplierId: 18,
      status: 'completed',
      currency: 'GBP',
      totalAmount: 5020.0,
      taxRate: 20.0,
      shippingAmount: null,
      otherAmount: 150.0,
      orderDate: '03/05/2024',
      note: 'Order completed successfully and on time.',
      expectedFinishDate: '10/05/2024',
      finishedDate: '09/05/2024',
      createdAt: '03/05/2024',
      updatedAt: '09/05/2024',
      deletedAt: null
    },
    {
      id: 5,
      previousId: null,
      poNumber: 'PO45345',
      quarterlyProductionPlanId: 'PPL023',
      purchasingStaffId: 98,
      supplierId: 21,
      status: 'completed',
      currency: 'AUD',
      totalAmount: 12000.5,
      taxRate: 8.0,
      shippingAmount: 100.0,
      otherAmount: 50.0,
      orderDate: '15/04/2024',
      note: 'Supplier approved for delivery next month.',
      expectedFinishDate: '20/04/2024',
      finishedDate: '19/04/2024',
      createdAt: '15/04/2024',
      updatedAt: '19/04/2024',
      deletedAt: null
    },
    {
      id: 6,
      previousId: 5,
      poNumber: 'PO45345',
      quarterlyProductionPlanId: 'PPL023',
      purchasingStaffId: 204,
      supplierId: 30,
      status: 'incompleted',
      currency: 'CAD',
      totalAmount: 18350.0,
      taxRate: 12.5,
      shippingAmount: 200.0,
      otherAmount: null,
      orderDate: '02/10/2024',
      note: 'Pending approval from purchasing manager.',
      expectedFinishDate: '10/10/2024',
      finishedDate: null,
      createdAt: '02/10/2024',
      updatedAt: '02/10/2024',
      deletedAt: null
    },
    // Additional 5 entries:
    {
      id: 7,
      previousId: null,
      poNumber: 'PO45346',
      quarterlyProductionPlanId: 'PPL024',
      purchasingStaffId: 109,
      supplierId: 35,
      status: 'incompleted',
      currency: 'USD',
      totalAmount: 20200.0,
      taxRate: 5.0,
      shippingAmount: 300.0,
      otherAmount: null,
      orderDate: '01/11/2024',
      note: 'Supplier delayed, awaiting confirmation.',
      expectedFinishDate: '20/11/2024',
      finishedDate: null,
      createdAt: '01/11/2024',
      updatedAt: '01/11/2024',
      deletedAt: null
    },
    {
      id: 8,
      previousId: null,
      poNumber: 'PO45347',
      quarterlyProductionPlanId: 'PPL025',
      purchasingStaffId: 110,
      supplierId: 36,
      status: 'completed',
      currency: 'EUR',
      totalAmount: 18450.75,
      taxRate: 7.0,
      shippingAmount: 150.0,
      otherAmount: 100.0,
      orderDate: '15/10/2024',
      note: 'Order delivered successfully.',
      expectedFinishDate: '25/10/2024',
      finishedDate: '24/10/2024',
      createdAt: '15/10/2024',
      updatedAt: '24/10/2024',
      deletedAt: null
    },
    {
      id: 9,
      previousId: null,
      poNumber: 'PO45348',
      quarterlyProductionPlanId: 'PPL026',
      purchasingStaffId: 112,
      supplierId: 37,
      status: 'completed',
      currency: 'JPY',
      totalAmount: 36500.0,
      taxRate: 12.5,
      shippingAmount: 500.0,
      otherAmount: 200.0,
      orderDate: '10/09/2024',
      note: 'Delivered ahead of schedule.',
      expectedFinishDate: '20/09/2024',
      finishedDate: '18/09/2024',
      createdAt: '10/09/2024',
      updatedAt: '18/09/2024',
      deletedAt: null
    },
    {
      id: 10,
      previousId: null,
      poNumber: 'PO45349',
      quarterlyProductionPlanId: 'PPL027',
      purchasingStaffId: 115,
      supplierId: 40,
      status: 'incompleted',
      currency: 'GBP',
      totalAmount: 7800.0,
      taxRate: 10.0,
      shippingAmount: 250.0,
      otherAmount: 75.0,
      orderDate: '02/12/2024',
      note: 'Shipment delayed due to weather conditions.',
      expectedFinishDate: '15/12/2024',
      finishedDate: null,
      createdAt: '02/12/2024',
      updatedAt: '02/12/2024',
      deletedAt: null
    },
    {
      id: 11,
      previousId: 10,
      poNumber: 'PO45350',
      quarterlyProductionPlanId: 'PPL028',
      purchasingStaffId: 118,
      supplierId: 45,
      status: 'completed',
      currency: 'USD',
      totalAmount: 10000.0,
      taxRate: 8.0,
      shippingAmount: 400.0,
      otherAmount: 150.0,
      orderDate: '05/11/2024',
      note: 'Delivered on time, payment pending.',
      expectedFinishDate: '20/11/2024',
      finishedDate: '19/11/2024',
      createdAt: '05/11/2024',
      updatedAt: '19/11/2024',
      deletedAt: null
    }
  ]
};
