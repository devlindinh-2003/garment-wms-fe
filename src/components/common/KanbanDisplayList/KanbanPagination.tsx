import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/Pagination';
import { PageMetaData } from '@/types/ImportRequestType';
import { PaginationState } from '@tanstack/react-table';

interface KanbanPaginationProps {
  pageMeta: PageMetaData; // Expecting a PageMeta object
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export function KanbanPagination({
  pageMeta,
  pagination,
  setPagination,
}: KanbanPaginationProps) {
  const { total = 0, page = 1, totalPages = 1, hasNext = false, hasPrevious = false } = pageMeta;

  const handlePrevious = () => {
    if (hasPrevious) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: Math.max(prev.pageIndex - 1, 0),
      }));
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: Math.min(prev.pageIndex + 1, totalPages - 1),
      }));
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: pageNumber - 1 }));
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          {hasPrevious && (
            <PaginationPrevious
              href="#"
              onClick={handlePrevious}
              aria-label="Previous Page"
            />
          )}
        </PaginationItem>

        {/* Page Links */}
        {totalPages <= 5 ? (
          // If total pages are 5 or less, show all page numbers
          [...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={pagination.pageIndex + 1 === pageNumber}
                  aria-label={`Page ${pageNumber}`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })
        ) : (
          <>
            {/* Show first page */}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(1)}
                isActive={pagination.pageIndex + 1 === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Show ellipsis if current page is greater than 3 */}
            {pagination.pageIndex > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Show current page and surrounding pages */}
            {pagination.pageIndex - 1 >= 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pagination.pageIndex)}
                  isActive={pagination.pageIndex + 1 === pagination.pageIndex}
                >
                  {pagination.pageIndex}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(pagination.pageIndex + 1)}
                isActive={pagination.pageIndex + 1 === pagination.pageIndex + 1}
              >
                {pagination.pageIndex + 2}
              </PaginationLink>
            </PaginationItem>

            {/* Show ellipsis if there are more than two pages left */}
            {pagination.pageIndex < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Show last page */}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(totalPages)}
                isActive={pagination.pageIndex + 1 === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        <PaginationItem>
          {hasNext && (
            <PaginationNext
              href="#"
              onClick={handleNext}
              aria-label="Next Page"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
