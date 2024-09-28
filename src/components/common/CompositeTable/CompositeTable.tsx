import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect } from 'react';
import { TableProps } from '@/types/CompositeTable';
import TanStackBasicTableTableComponent from './TableComponent';
import TanStackBasicTablePaginationNavigationComponent from './TablePagnationNavigation';
import { DataTableToolbar } from './DataTableToolbar';

export default function TanStackBasicTable<TData, TValue>({
  isTableDataLoading,
  paginatedTableData,
  columns,
  pagination = {
    pageIndex: 0,
    pageSize: 20,
  },
  sorting = [],
  setSorting,
  setPagination,
  columnFilters = [],
  setColumnFilters,
}: TableProps<TData, TValue>) {
  const table = useReactTable({
    data: paginatedTableData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),

    // sort config
    onSortingChange: setSorting,
    enableMultiSort: true,
    manualSorting: true,
    sortDescFirst: true,

    // filter config
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,

    // pagination config
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: paginatedTableData?.total_filtered,
    pageCount: Math.ceil(
      (paginatedTableData?.total_filtered || 0) /
        (paginatedTableData?.limit || 1)
    ),
    manualPagination: true,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  // to reset page index to first page
  useEffect(() => {
    if (setPagination) {
      setPagination((pagination) => ({
        pageIndex: 0,
        pageSize: pagination.pageSize,
      }));
    }
  }, [columnFilters, setPagination]);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-evenly gap-4 mb-8"></div>
      {isTableDataLoading ? (
        <div>Loading Data ...</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">User Lists</h1>
          <DataTableToolbar table={table} />
          <div className="rounded-md border mb-8">
            <TanStackBasicTableTableComponent table={table} columns={columns} />
          </div>
          <TanStackBasicTablePaginationNavigationComponent table={table} />
        </>
      )}
    </div>
  );
}
