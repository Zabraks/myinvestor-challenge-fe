export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisiblePages = 5
): number[] {
  const half = Math.floor(maxVisiblePages / 2);

  let start: number;
  let end: number;

  if (currentPage <= half + 1) {
    start = 1;
    end = Math.min(maxVisiblePages, totalPages);
  } else if (currentPage >= totalPages - half) {
    end = totalPages;
    start = Math.max(1, totalPages - maxVisiblePages + 1);
  } else {
    start = currentPage - half;
    end = currentPage + half;
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}
