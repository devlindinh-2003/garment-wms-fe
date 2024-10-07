import { Badge } from '@/components/ui/Badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebouce';
import { useGetImportRequests } from '@/hooks/useGetImportRequest';
import { CustomColumnDef } from '@/types/CompositeTable';
import { ImportRequest } from '@/types/ImportRequestType';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TanStackBasicTable from './CompositeTable';
type Props = {};

const   ImportRequestList = (props: Props) => {
  const navigate = useNavigate();  

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


const { importRequestData, isimportRequestLoading  } = useGetImportRequests({
  sorting,
  columnFilters: debouncedColumnFilters,
  pagination})
  

  const importRequestColumn: CustomColumnDef<ImportRequest>[] = [
    {
      header: 'Import request ID',
      accessorKey: 'code',
      enableColumnFilter: false
    },
    {
      header: 'Delivery ID',
      accessorKey: 'poDeliveryId',
      enableColumnFilter: false
    },
    {
      header: 'Supplier',
      accessorKey: 'from',
      enableColumnFilter: false
    },
    {
      header: 'Import Request Type',
      accessorKey: 'type',
      enableColumnFilter: true,
      filterOptions: [
        { label: 'MATERIAL_BY_PO', value: 'MATERIAL_BY_PO' },
        { label: 'MATERIAL_RETURN', value: 'MATERIAL_RETURN' },
        { label: 'MATERIAL_NOT_BY_PO', value: 'MATERIAL_NOT_BY_PO' },
        { label: 'PRODUCT_BY_MO', value: 'PRODUCT_BY_MO' },
        { label: 'PRODUCT_RETURN', value: 'PRODUCT_RETURN' },
        { label: 'PRODUCT_NOT_BY_MO', value: 'PRODUCT_NOT_BY_MO' },
      ]
    },
    {
      header: 'Create date',
      accessorKey: 'createdAt',
      enableColumnFilter: false,
      cell: ({ row }) => {
        const dateString = row.original.createdAt;
        if (!dateString) {
          return <div>N/A</div>; 
        }
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        return (
          <div>
            <div>{formattedDate}</div>
          </div>
        );
      },
      
    },
    {
      header: 'Status',
      accessorKey: 'status',
      enableColumnFilter: true,
      cell: ({ row }) => 
      (
      <Badge variant={'default'}> 
      {row.original.status}
      </Badge>),
      filterOptions: [
        { label: 'PENDING', value: 'PENDING' },
        { label: 'REJECTED', value: 'REJECTED' },
        { label: 'APPROVED', value: 'APPROVED' },
        { label: 'INSPECTING', value: 'INSPECTING' },
        { label: 'INSPECTED', value: 'INSPECTED' },
        { label: 'IMPORTING', value: 'IMPORTING' },
        { label: 'IMPORTED', value: 'IMPORTED' },
        { label: 'CANCELED', value: 'CANCELED' },
      ]
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const request = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
               onClick={() => navigate(`/purchase-staff/import-request/${request.id}`)}
              >View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  return (
    <div className="pb-4">
      <div className="mb-4 w-auto bg-white rounded-xl shadow-sm border">
        <TanStackBasicTable
          isTableDataLoading={isimportRequestLoading}
          paginatedTableData={importRequestData ?? undefined}
          columns={importRequestColumn}
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
