import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@ui/Pagination/Pagination';

import { getVisiblePages } from '@/lib/pagination/pagination';

interface PaginationData {
  page: number;
  totalPages: number;
}

interface TablePaginationProps {
  pagination?: PaginationData;
  setPage: (page: number) => void;
}

export const TablePagination = ({ pagination, setPage }: TablePaginationProps) => {
  if (!pagination) return null;

  const pages = getVisiblePages(pagination.page, pagination.totalPages);

  const goToPreviousPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPage(pagination.page - 1);
  };

  const goToNextPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPage(pagination.page + 1);
  };

  const goToPage = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <div className="flex justify-end">
      <Pagination>
        <PaginationContent>
          {pagination.page !== 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} />
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                isActive={pagination.page === page}
                onClick={(e) => goToPage(e, page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {pagination.page !== pagination.totalPages && (
            <PaginationItem>
              <PaginationNext onClick={goToNextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
