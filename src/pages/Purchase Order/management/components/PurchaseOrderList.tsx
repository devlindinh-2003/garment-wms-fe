import TanStackBasicTable from '@/components/common/CompositeTable';
import { Badge } from '@/components/ui/Badge';
import { useDebounce } from '@/hooks/useDebouce';
import { CustomColumnDef } from '@/types/CompositeTable';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import UploadExcel from './UploadExcel';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '@/helpers/convertDate';
import { PurchaseOrder } from '@/types/purchaseOrder';
import { PurchaseOrderStatus, PurchaseOrderStatusLabels } from '@/enums/purchaseOrderStatus';
import { useGetAllPurchaseOrder } from '@/hooks/useGetAllPurchaseOrder';

const PurchaseOrderList: React.FC = () => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
  const debouncedSorting: SortingState = useDebounce(sorting, 1000);

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, // Initially starts on the first page
    pageSize: 10 // Define the number of rows per page
  });

  // Fetch purchase orders using the custom hook with sorting, filtering, and pagination
  const { isFetching, purchaseOrderList, pageMeta } = useGetAllPurchaseOrder({
    sorting: debouncedSorting,
    columnFilters: debouncedColumnFilters,
    pagination
  });

  // Sync pagination state with the backend `pageMeta`
  useEffect(() => {
    if (pageMeta) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: pageMeta.page - 1, // Adjusting to zero-based index
        pageSize: pageMeta.limit
      }));
    }
  }, [pageMeta]);

  const paginatedTableData =
    purchaseOrderList && pageMeta
      ? {
          data: purchaseOrderList,
          limit: pageMeta.limit,
          page: pageMeta.page,
          total: pageMeta.totalItems,
          totalFiltered: pageMeta.totalItems
        }
      : undefined;

  // Table columns definition
  const purchaseOrderColumns: CustomColumnDef<PurchaseOrder>[] = [
    {
      header: 'PO Number',
      accessorKey: 'poNumber',
      cell: ({ row }) => (
        <div
          className="ml-2 font-semibold cursor-pointer text-primary underline hover:opacity-50"
          onClick={() => navigate(`/purchase-staff/purchase-order/detail/${row.original.id}`)}>
          {row.original.poNumber}
        </div>
      ),
      enableColumnFilter: false
    },
    {
      header: 'Production Plan ID',
      accessorKey: 'quarterlyProductionPlanId',
      enableColumnFilter: false,
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return <div className="ml-9 font-semibold">{value ? value : 'PL123'}</div>;
      }
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier.supplierName',
      enableColumnFilter: false,
      cell: ({ getValue }) => <div className="mr-5">{getValue<string>()}</div>
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
      enableColumnFilter: false,
      cell: ({ row }) => {
        const totalAmount = row.original.subTotalAmount;
        const currency = row.original.currency;
        return (
          <div className="ml-1 flex items-center gap-2">
            <span>{totalAmount.toLocaleString()}</span>
            <span className="text-slate-500">{currency}</span>
          </div>
        );
      }
    },
    {
      header: 'Order Date',
      accessorKey: 'orderDate',
      enableColumnFilter: false,
      cell: ({ getValue }) => {
        const isoDate = getValue<string>();
        return <div className="ml-2">{convertDate(isoDate)}</div>;
      }
    },
    {
      header: 'Finished Date',
      accessorKey: 'finishDate',
      enableColumnFilter: false,
      cell: ({ getValue }) => {
        const isoDate = getValue<string>();
        return (
          <div>
            {isoDate ? (
              <div className="ml-5">{convertDate(isoDate)}</div>
            ) : (
              <div className="ml-9 text-xl font-semibold">-</div>
            )}
          </div>
        );
      }
    },
    {
      header: 'Status',
      accessorKey: 'status',
      enableColumnFilter: true,
      filterOptions: Object.keys(PurchaseOrderStatus).map((key) => ({
        label:
          PurchaseOrderStatusLabels[PurchaseOrderStatus[key as keyof typeof PurchaseOrderStatus]],
        value: PurchaseOrderStatus[key as keyof typeof PurchaseOrderStatus]
      })),
      cell: ({ row }) => {
        const status = row.original.status as PurchaseOrderStatus;
        const statusLabel = PurchaseOrderStatusLabels[status];
        let colorVariant;
        switch (status) {
          case PurchaseOrderStatus.IN_PROGRESS:
            colorVariant = 'bg-yellow-500 text-white';
            break;
          case PurchaseOrderStatus.CANCELLED:
            colorVariant = 'bg-red-500 text-white';
            break;
          case PurchaseOrderStatus.FINISHED:
            colorVariant = 'bg-green-500 text-white';
            break;
          default:
            colorVariant = 'bg-gray-200 text-black';
        }
        return <Badge className={colorVariant}>{statusLabel}</Badge>;
      }
    }
  ];

  return (
    <div className="flex flex-col px-3 pt-3 pb-4 w-auto bg-white rounded-xl shadow-sm border">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primaryLight">Purchase Order Lists</h1>
        <UploadExcel fileName="purchase order" triggerButtonLabel="Import" />
      </div>
      <TanStackBasicTable
        isTableDataLoading={isFetching}
        paginatedTableData={paginatedTableData}
        columns={purchaseOrderColumns}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
};

export default PurchaseOrderList;
