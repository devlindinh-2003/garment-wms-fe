import { PurchaseOrder } from '@/types/purchase_order';

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 1,
    previous_id: null,
    PO_number: 'PO987654',
    quarterly_production_plan_id: 201,
    purchasing_staff_id: 2,
    supplier_id: 4,
    status: 'pending',
    currency: 'USD',
    total_amount: 15250.75,
    tax_rate: 7.5, // 7.5% tax
    shipping_amount: 250.0,
    other_amount: null,
    order_date: '2024-09-29T10:00:00Z', // ISO date string
    note: 'Requesting urgent processing for Q4 supplies.',
    expected_finish_date: '2024-10-10T00:00:00Z',
    finished_date: null,
    created_at: '2024-09-29T09:00:00Z',
    updated_at: '2024-09-29T09:15:00Z',
    deleted_at: null
  },
  {
    id: 2,
    previous_id: null,
    PO_number: 'PO654321',
    quarterly_production_plan_id: null,
    purchasing_staff_id: 3,
    supplier_id: 7,
    status: 'approved',
    currency: 'EUR',
    total_amount: 9800.0,
    tax_rate: 15.0, // 15% tax
    shipping_amount: 150.0,
    other_amount: 200.0,
    order_date: '2024-08-28T12:00:00Z',
    note: 'Order approved, scheduled for shipping next week.',
    expected_finish_date: '2024-09-05T00:00:00Z',
    finished_date: '2024-09-04T10:00:00Z',
    created_at: '2024-08-28T11:00:00Z',
    updated_at: '2024-08-28T11:30:00Z',
    deleted_at: null
  }
];
