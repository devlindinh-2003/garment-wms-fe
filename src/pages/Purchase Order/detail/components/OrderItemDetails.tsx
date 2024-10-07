import TanStackBasicTable from '@/components/common/CompositeTable';
import { Badge } from '@/components/ui/Badge';
import { CustomColumnDef } from '@/types/CompositeTable';
import { MaterialVariant, purchaseOrderDeliveryData } from '@/types/PurchaseOrderDelivery';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import ExpandableSectionCustom from './ExpandableSectionCustom';

const OrderItemDetails = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  });

  const purchaseOrderDeliveryDetailsColumns: CustomColumnDef<MaterialVariant>[] = [
    {
      header: 'Material Code',
      accessorKey: 'material.code',
      cell: ({ getValue }) => <div className="pl-2 font-semibold">{getValue<string>()}</div>,
      enableColumnFilter: false
    },
    {
      header: 'Material Name',
      accessorKey: 'material.name',
      enableColumnFilter: false
    },
    {
      header: 'Material Type',
      accessorKey: 'material.materialType.name',
      cell: ({ getValue }) => <div className="ml-4">{getValue<string>()}</div>,
      enableColumnFilter: false
    },
    {
      header: 'Width',
      accessorKey: 'packedWidth',
      cell: ({ row }) => {
        const packedWidth = row.original.packedWidth;
        const uomName = row.original.material.uom.name;
        return (
          <div className="ml-1">
            {packedWidth} {uomName}
          </div>
        );
      },
      enableColumnFilter: false
    },
    {
      header: 'Length',
      accessorKey: 'packedLength',
      cell: ({ row }) => {
        const packedLength = row.original.packedLength;
        const uomName = row.original.material.uom.name;
        return (
          <div className="ml-1">
            {packedLength} {uomName}
          </div>
        );
      },
      enableColumnFilter: false
    },
    {
      header: 'Height',
      accessorKey: 'packedHeight',
      cell: ({ row }) => {
        const packedHeight = row.original.packedHeight;
        const uomName = row.original.material.uom.name;
        return (
          <div className="ml-1">
            {packedHeight} {uomName}
          </div>
        );
      },
      enableColumnFilter: false
    },
    {
      header: ' Weight',
      accessorKey: 'packedWeight',
      cell: ({ getValue }) => {
        const weight = getValue<number>();
        return <div className="text-center">{weight} kg</div>;
      },
      enableColumnFilter: false
    },
    {
      header: 'Quantity',
      accessorKey: 'packedHeight',
      cell: ({ row }) => {
        const uomPerPack = row.original.uomPerPack;
        const packUnit = row.original.packUnit;
        const pluralizedPackUnit = uomPerPack > 1 ? `${packUnit}s` : packUnit;
        return (
          <div className="ml-4">
            <span>{uomPerPack}</span>{' '}
            <span className="lowercase text-slate-800">{pluralizedPackUnit}</span>
          </div>
        );
      },
      enableColumnFilter: false
    }
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-primaryDark">Purchase Delivery </h1>
      <div className="mt-5 flex flex-col gap-7">
        <ExpandableSectionCustom
          title="24/05/2024"
          status={<Badge className="bg-green-500 text-lg w-[8rem]text-center">Finished</Badge>}
          defaultOpen={false}>
          <div className="flex items-center justify-between mt-5 gap-3">
            <h1 className="text-xl font-semibold text-primaryDark">Delivery Details</h1>
            <div className="flex items-center gap-3">
              <span>Total amount: </span> <span className="font-semibold">4</span>
            </div>
          </div>
          <TanStackBasicTable
            isTableDataLoading={false}
            paginatedTableData={purchaseOrderDeliveryData}
            columns={purchaseOrderDeliveryDetailsColumns}
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </ExpandableSectionCustom>

        <ExpandableSectionCustom
          title="04/09/2024"
          status={<Badge className="bg-yellow-500 text-lg w-[8rem]text-center ">Pending</Badge>}
          defaultOpen={false}>
          <div className="flex items-center justify-between mt-5 gap-3">
            <h1 className="text-xl font-semibold text-primaryDark">Delivery Details</h1>
            <div className="flex items-center gap-3">
              <span>Total amount: </span> <span className="font-semibold">4</span>
            </div>
          </div>
          <TanStackBasicTable
            isTableDataLoading={false}
            paginatedTableData={purchaseOrderDeliveryData}
            columns={purchaseOrderDeliveryDetailsColumns}
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        </ExpandableSectionCustom>
      </div>
    </div>
  );
};

export default OrderItemDetails;
