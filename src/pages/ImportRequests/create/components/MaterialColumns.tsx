import DataTableColumnHeader from '@/components/common/EditableTable/DataTableColumnHeader';
import DataTableRowActions from '@/components/common/EditableTable/DataTableRowActions';
import { CustomColumnDef } from '@/types/CompositeTable';
import { ImportRequestDetails } from '@/types/ImportRequestType';
import { z, ZodSchema } from 'zod';
interface MaterialsColumnsProps {
  onEdit: (material: ImportRequestDetails) => void;
  onDelete: (material: ImportRequestDetails) => void;
}

export const getMaterialColumns = ({
  onEdit,
  onDelete
}: MaterialsColumnsProps): CustomColumnDef<ImportRequestDetails>[] => [
  {
    accessorKey: 'materialId',
    header: 'Material ID'
  },
  {
    accessorKey: 'materialName',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-center" column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.materialName}</div>,
    isEditable: true,
    isPopover: true
  },
  {
    accessorKey: 'SKU',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-center" column={column} title="SKU" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.SKU}</div>
  },
  {
    accessorKey: 'UOM',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-center" column={column} title="Unit of measure" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.UOM}</div>
  },
  {
    accessorKey: 'plannedQuantity',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-center" column={column} title="Planned Quantity" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.plannedQuantity}</div>,
    isEditable: true,
    validation: z.number().nonnegative('Planned Quantity must be equal or  greater than 0')
  },
  {
    accessorKey: 'actualQuantity',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-center" column={column} title="Actual Quantity" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.actualQuantity}</div>,
    isEditable: true,
    validation: z.number().positive('Actual Quantity have to be at least 1')
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50
  }
];
