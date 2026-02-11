import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ui/Pagination/Pagination';

import { getVisiblePages } from '@lib/pagination';

export const TablePagination = ({ pagination, setPage }) => {
  const pages = getVisiblePages(pagination?.page, pagination?.totalPages);

  const goToPreviousPage = (e) => {
    e.preventDefault();
    setPage(pagination.page - 1);
  };

  const goToNextPage = (e) => {
    e.preventDefault();
    setPage(pagination.page + 1);
  };

  const goToPage = (e, page) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <div className="flex justify-end">
      <Pagination>
        <PaginationContent>
          {pagination?.page !== 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} />
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                isActive={pagination?.page === page}
                onClick={(e) => goToPage(e, page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pagination?.page !== pagination?.totalPages && (
            <PaginationItem>
              <PaginationNext onClick={goToNextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
