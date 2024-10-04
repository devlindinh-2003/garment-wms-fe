
import DataTableColumnHeader from '@/components/common/EditableTable/DataTableColumnHeader';
import DataTableRowActions from '@/components/common/EditableTable/DataTableRowActions';
import { ImportRequestDetails } from '@/types/ImportRequestType';
import { ColumnDef } from '@tanstack/react-table';

interface MaterialsColumnsProps {
  onEdit: (material: ImportRequestDetails) => void;
  onDelete: (material: ImportRequestDetails) => void;
}

export const getMaterialColumns = ({ onEdit, onDelete }: MaterialsColumnsProps): ColumnDef<ImportRequestDetails>[] => [
  {
    accessorKey: 'materialId',
    header: 'Material ID',
  },
  {
    accessorKey: 'materialName',
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.materialName}
      </div>
    ),
   
  },
  {
    accessorKey: 'SKU',
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="SKU" />,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.SKU}
      </div>
    ),
   
  },
  {
    accessorKey: 'UOM',
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Unit of measure" />,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.UOM}
      </div>
    ),
   
  },
  {
    accessorKey: 'actualQuantity',
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Actual Quantity" />,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.actualQuantity}
      </div>
    ),
   
  },
  {
    accessorKey: 'plannedQuantity',
    header: ({ column }) => <DataTableColumnHeader className="text-right" column={column} title="Planned Quantity" />,
    cell: ({ row }) => (
      <div className="text-right">
        {row.original.plannedQuantity}
      </div>
    ),
   
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
    size: 50,
  },
];