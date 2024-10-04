import { ZodSchema, z } from 'zod';

// Function to dynamically create the Zod schema
export const createZodSchema = (columns: any[]): ZodSchema => {
  const schemaObject = columns.reduce((acc, column) => {
    if (column.isEditable && column.validation) {
      acc[column.accessorKey] = column.validation;
    }
    return acc;
  }, {} as any);

  return z.object(schemaObject);
};
