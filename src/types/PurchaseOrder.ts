import { z } from 'zod';

export const purchaseOrderSchema = z.object({
  id: z.number(),
  previous_id: z.number().nullable(),
  PO_number: z.string(),
  quarterly_production_plan_id: z.number().nullable(),
  purchasing_staff_id: z.number(),
  supplier_id: z.number(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed']),
  currency: z.string(),
  total_amount: z.number(),
  tax_rate: z.number(),
  shipping_amount: z.number().nullable(),
  other_amount: z.number().nullable(),
  order_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  note: z.string().nullable(),
  expected_finish_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable(),
  finished_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable(),
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  deleted_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable()
});

export type PurchaseOrder = z.infer<typeof purchaseOrderSchema>;
