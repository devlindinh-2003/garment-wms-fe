import { z } from 'zod';

export const purchaseOrderSchema = z.object({
  id: z.number(),
  previousId: z.number().nullable(),
  poNumber: z.string(),
  quarterlyProductionPlanId: z.number().nullable(),
  purchasingStaffId: z.number(),
  supplierId: z.number(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed']),
  currency: z.string(),
  totalAmount: z.number(),
  taxRate: z.number(),
  shippingAmount: z.number().nullable(),
  otherAmount: z.number().nullable(),
  orderDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  note: z.string().nullable(),
  expectedFinishDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable(),
  finishedDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  deletedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable()
});

export type PurchaseOrder = z.infer<typeof purchaseOrderSchema>;
