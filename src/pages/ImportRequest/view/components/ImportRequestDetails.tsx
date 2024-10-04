import TanStackBasicTable from '@/components/common/CompositeTable';
import { useDebounce } from '@/hooks/useDebouce';
import { CustomColumnDef } from '@/types/CompositeTable';
import { ImportRequestDetails as type  } from '@/types/ImportRequestType';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import React, { useState } from 'react'
import { details, detailsForTable } from '../../create/components/data';

type Props = {}

const ImportRequestDetails = (props: Props) => {
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

  const DetailsColumn: CustomColumnDef<type>[] = [

  {
    header: 'Material ID',
    accessorKey: 'materialId',
    enableColumnFilter: false
  },
  {
    header: 'Material Name',
    accessorKey: 'materialName',
    enableColumnFilter: false
  },
  {
    header: 'SKU',
    accessorKey: 'SKU',
    enableColumnFilter: false
  },
  {
    header: 'Unit of measure',
    accessorKey: 'UOM',
    enableColumnFilter: false
  },
  {
    header: 'Planned quantity',
    accessorKey: 'plannedQuantity',
    enableColumnFilter: false
  },
  {
    header: 'Actual quantity',
    accessorKey: 'actualQuantity',
    enableColumnFilter: false
  },
  
];
  return (
    <div className='flex flex-col gap-4'>
        <div className='font-primary text-xl font-bold my-2'>
            Import Request Details
        </div>
        <div className="pb-4">
      <div className="mb-4 w-auto bg-white rounded-xl shadow-sm border">
        <TanStackBasicTable
          isTableDataLoading={false}
          paginatedTableData={detailsForTable}
          columns={DetailsColumn}
          pagination={pagination}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      </div>
    </div>

    </div>
  )
}

export default ImportRequestDetails