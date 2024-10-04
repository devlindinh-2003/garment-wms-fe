import React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebouce';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { CustomColumnDef } from '@/types/CompositeTable';
import { importRequestsData, ImportRequest } from '@/types/ImportRequestType';
import TanStackBasicTable from './CompositeTable';

type Props = {};

const ImportRequestList = (props: Props) => {
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10 //default page size
  });

  const filterOptions = {
    country: ['USA', 'Canada', 'UK', 'Australia'],
    city: ['New York', 'Los Angeles', 'Toronto', 'London'],
    favorite_color: ['Red', 'Blue', 'Green', 'Yellow'],
    gender: ['Male', 'Female', 'Other']
    // Add more filter options for other columns
  };
  const userColumns: CustomColumnDef<ImportRequest>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },

    {
      header: 'Delivery ID',
      accessorKey: 'id',
      enableColumnFilter: false
    },
    {
      header: 'Created by',
      accessorKey: 'warehouseStaffName',
      enableColumnFilter: false
    },
    {
      header: 'Purchase Order ID',
      accessorKey: 'poReceiptId',
      enableColumnFilter: false
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier',
      enableColumnFilter: false
    },
    {
      header: 'Delivery type',
      accessorKey: 'deliveryType',
      enableColumnFilter: false
    },
    {
      header: 'Delivery date',
      accessorKey: 'deliveryDate',
      enableColumnFilter: false
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => <Badge variant={'default'}> {row.original.status}</Badge>,
      filterOptions: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Complicated', value: 'Complicated' }
      ]
    }
  ];

  return (
    <div className="pb-4">
      <div className="mb-4 w-auto bg-white rounded-xl shadow-sm border">
        <TanStackBasicTable
          isTableDataLoading={false}
          paginatedTableData={importRequestsData}
          columns={userColumns}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
    </div>
  );
};

export default ImportRequestList;
