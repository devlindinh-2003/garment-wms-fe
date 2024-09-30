import { z } from 'zod';

export const purchaseOrderSchema = z.object({
  id: z.number(), // Assuming it's an integer
  previous_id: z.number().nullable(), // Nullable if previous order isn't always set
  PO_number: z.string(), // Assuming PO number is a string
  quarterly_production_plan_id: z.number().nullable(), // Nullable if not always provided
  purchasing_staff_id: z.number(), // Assuming it's a foreign key and required
  supplier_id: z.number(), // Foreign key for supplier
  status: z.enum(['pending', 'approved', 'rejected', 'completed']), // Example statuses, adjust as needed
  currency: z.string(), // Assuming currency is stored as a string (e.g., "USD")
  total_amount: z.number(), // Total order amount as a number
  tax_rate: z.number(), // Tax rate as a percentage
  shipping_amount: z.number().nullable(), // Shipping cost, nullable if no shipping cost is involved
  other_amount: z.number().nullable(), // Any other costs, nullable if not applicable
  order_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }), // ISO string validation for dates
  note: z.string().nullable(), // Nullable note for the order
  expected_finish_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable(), // Nullable, as the finish date may not be known
  finished_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable(), // Nullable, as the order may not be finished
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }), // Created timestamp
  updated_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }), // Updated timestamp
  deleted_at: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .nullable() // Nullable in case it's not soft-deleted
});

// Example TypeScript type derived from the schema
export type PurchaseOrder = z.infer<typeof purchaseOrderSchema>;
