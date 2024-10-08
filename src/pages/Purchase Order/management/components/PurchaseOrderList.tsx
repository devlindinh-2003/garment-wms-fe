import TanStackBasicTable from '@/components/common/CompositeTable';
import { Badge } from '@/components/ui/Badge';
import { useDebounce } from '@/hooks/useDebouce';
import { CustomColumnDef, UseGetTableResponseType } from '@/types/CompositeTable';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import UploadExcel from './UploadExcel';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '@/helpers/convertDate';
import { PurchaseOrderStatus, PurchaseOrderStatusLabels } from '@/types/PurchaseOrderStatus';
import { PurchaseOrder } from '@/types/PurchaseOrder';

type SheetData = Record<string, (string | number | null | undefined)[][]>;

interface PurchaseOrderListProps {
  purchaseOrders: PurchaseOrder[];
}

const PurchaseOrderList: React.FC<PurchaseOrderListProps> = ({ purchaseOrders }) => {
  const [sheetsData, setSheetsData] = useState<SheetData>({});
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  });
  const purchaseOrdersList: UseGetTableResponseType<PurchaseOrder> = {
    limit: 10,
    page: 1,
    total: 20,
    total_filtered: 10,
    data: purchaseOrders
  };

  const handleUploadComplete = (data: SheetData) => {
    setSheetsData(data);
    console.log('Uploaded sheets data:', data);
  };

  const handleContinue = () => {
    if (Object.keys(sheetsData).length > 0) {
      console.log('Proceeding with uploaded sheets:', sheetsData);
      navigate('/purchase-staff/purchase-order/detail', { state: { sheetsData } });
    } else {
      console.log('No data available. Cannot proceed.');
    }
  };

  const purchaseOrderColumns: CustomColumnDef<PurchaseOrder>[] = [
    {
      header: 'PO Number',
      accessorKey: 'poNumber',
      cell: ({ getValue }) => <div className="ml-2 font-semibold">{getValue<string>()}</div>,
      enableColumnFilter: false
    },
    {
      header: 'Production Plan ID',
      accessorKey: 'quarterlyProductionPlanId',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return <div className="ml-5 font-semibold ">{value ? value : 'PL123'}</div>;
      },
      enableColumnFilter: false
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier.supplierName',
      cell: ({ getValue }) => (
        <div className="font-semibold text-primaryLight ">{getValue<string>()}</div>
      ),
      enableColumnFilter: false
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
      cell: ({ row }) => {
        const totalAmount = row.original.totalAmount;
        const currency = row.original.currency;

        return (
          <div className="ml-1 flex items-center gap-2">
            <span>{totalAmount.toLocaleString()}</span>
            <span className="text-slate-500">{currency}</span>
          </div>
        );
      },
      enableColumnFilter: false
    },

    {
      header: 'Order Date',
      accessorKey: 'orderDate',
      cell: ({ getValue }) => {
        const isoDate = getValue<string>();
        return <div className="ml-2">{convertDate(isoDate)}</div>;
      },
      enableColumnFilter: false
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status as PurchaseOrderStatus;
        const statusLabel = PurchaseOrderStatusLabels[status];
        let colorVariant;
        switch (status) {
          case PurchaseOrderStatus.IN_PROGESS:
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
        <UploadExcel
          fileName="purchase order"
          onUploadComplete={handleUploadComplete}
          continueButtonLabel="Proceed to Review"
          onContinue={() =>
            navigate('/purchase-staff/purchase-order/detail', { state: { sheetsData } })
          }
          triggerButtonLabel="Import a purchase order"
        />
      </div>
      <TanStackBasicTable
        isTableDataLoading={false}
        paginatedTableData={purchaseOrdersList}
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
