
import { PaginationInfo } from '@/types';

export const calculatePaginationInfo = (
  currentPage: number,
  limit: number,
  totalCount: number
): PaginationInfo => {
  const totalPages = Math.ceil(totalCount / limit);
  const offset = (currentPage - 1) * limit;
  const from = totalCount ? offset + 1 : 0;
  const to = Math.min(offset + limit, totalCount);

  return {
    currentPage,
    totalPages,
    from,
    to,
    totalCount,
  };
};
