import React, { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { PurchaseOrderData, fetchPurchaseOrders } from '@/data/purchaseOrderData'; // replace with actual data fetching logic
import TanStackBasicTable from '@/components/common/CompositeTable';

const PurchaseOrderList: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<PurchaseOrderData>({ data: [], total_filtered: 0, limit: 10 });

  // Simulate fetching data on component load or pagination change
  React.useEffect(() => {
    setIsLoading(true);
    fetchPurchaseOrders(pagination.pageIndex, pagination.pageSize)
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [pagination]);

  // Define columns for purchase order data
  const columns: ColumnDef<any>[] = [
    { header: 'Order ID', accessorKey: 'orderId' },
    { header: 'Supplier', accessorKey: 'supplier' },
    { header: 'Order Date', accessorKey: 'orderDate' },
    { header: 'Status', accessorKey: 'status' },
    { header: 'Total Amount', accessorKey: 'totalAmount', cell: ({ value }) => `$${value}` }
  ];

  return (
    <div className="pb-4">
      <h1 className="text-2xl font-semibold mb-4">Purchase Orders</h1>
      <div className="w-full bg-white rounded-md shadow-lg p-6">
        <TanStackBasicTable
          isTableDataLoading={isLoading}
          paginatedTableData={data}
          columns={columns}
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

export default PurchaseOrderList;
