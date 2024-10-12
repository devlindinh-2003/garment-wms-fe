import { Table } from '@tanstack/react-table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

interface TanStackBasicTablePaginationNavigationComponentProps<TData> {
  table: Table<TData>;
}

export default function TanStackBasicTablePaginationNavigationComponent<TData>({
  table,
}: TanStackBasicTablePaginationNavigationComponentProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1; // Current page (1-based index)
  const totalPages = table.getPageCount();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  return (
    <Pagination>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationPrevious onClick={() => table.previousPage()} />
          </PaginationItem>
        )}

        {currentPage >= 4 && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationLink onClick={() => table.setPageIndex(0)}>1</PaginationLink>
          </PaginationItem>
        )}

        {currentPage >= 5 && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 2 pages before */}
        {currentPage - 2 > 0 && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationLink onClick={() => table.setPageIndex(currentPage - 3)}>
              {currentPage - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 1 page before */}
        {currentPage - 1 > 0 && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationLink onClick={() => table.setPageIndex(currentPage - 2)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Current page with bg-slate-300 */}
        <PaginationItem className="bg-bluePrimary rounded-md text-white">
          <PaginationLink>{currentPage}</PaginationLink>
        </PaginationItem>

        {/* 1 page after */}
        {currentPage + 1 <= totalPages && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationLink onClick={() => table.setPageIndex(currentPage)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 2 pages after */}
        {currentPage + 2 <= totalPages && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationLink onClick={() => table.setPageIndex(currentPage + 1)}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage + 2 < totalPages - 1 && (
          <PaginationItem className="bg-slate-100 rounded-md">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage + 2 < totalPages && (
          <>
            <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
              <PaginationLink onClick={() => table.setPageIndex(totalPages - 1)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {!isLastPage  && (
          <PaginationItem className="bg-slate-100 rounded-md hover:cursor-pointer">
            <PaginationNext onClick={() => table.nextPage()} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
