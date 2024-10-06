import TanStackBasicTable from '@/components/common/CompositeTable';
import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';
import { useDebounce } from '@/hooks/useDebouce';
import { CustomColumnDef } from '@/types/CompositeTable';
import { ImportPurchaseOrder, importPurchaseOrderData } from '@/types/ImportPurchaseOrderType';
import { PurchaseOrder } from '@/types/PurchaseOrder';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import UploadExcel from './UploadExcel';
import { useNavigate } from 'react-router-dom';

type SheetData = Record<string, (string | number | null | undefined)[][]>;

const PurchaseOrderList = () => {
  const [sheetsData, setSheetsData] = useState<SheetData>({});
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  });
  const handleUploadComplete = (data: SheetData) => {
    setSheetsData(data);
    console.log('Uploaded sheets data:', data);
  };

  const handleContinue = () => {
    if (Object.keys(sheetsData).length > 0) {
      console.log('Proceeding with uploaded sheets:', sheetsData);
      navigate('/purchase-staff/purchase-order/preview', { state: { sheetsData } });
    } else {
      console.log('No data available. Cannot proceed.');
    }
  };
  const purchaseOrderColumns: CustomColumnDef<ImportPurchaseOrder>[] = [
    {
      header: 'PO Number',
      accessorKey: 'poNumber',
      cell: ({ getValue }) => <div className="pl-2 font-semibold">{getValue<string>()}</div>,
      enableColumnFilter: false
    },
    {
      header: 'Production Plan ID',
      accessorKey: 'quarterlyProductionPlanId',
      cell: ({ getValue }) => <div className="pl-4">{getValue<string>()}</div>,
      enableColumnFilter: false
    },
    {
      header: 'Order Date',
      accessorKey: 'orderDate',
      enableColumnFilter: false
    },
    {
      header: 'Delivery date',
      accessorKey: 'createdAt',
      enableColumnFilter: false
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;
        let colorVariant;

        switch (status) {
          case 'incompleted':
            colorVariant = 'bg-red-500 text-white';
            break;
          case 'completed':
            colorVariant = 'bg-green-500 text-white';
            break;
          default:
            colorVariant = 'bg-gray-200 text-black';
        }

        return <Badge className={colorVariant}>{status}</Badge>;
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
          onContinue={handleContinue}
          triggerButtonLabel="Import a purchase order"
        />
      </div>
      <TanStackBasicTable
        isTableDataLoading={false}
        paginatedTableData={importPurchaseOrderData}
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
