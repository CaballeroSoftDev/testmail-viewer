
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  from: number;
  to: number;
  totalCount: number;
}

interface EmailListPaginationProps {
  paginationInfo: PaginationInfo;
  limit: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
}

export function EmailListPagination({
  paginationInfo,
  limit,
  onLimitChange,
  onPageChange,
}: EmailListPaginationProps) {
  const { currentPage, totalPages, from, to, totalCount } = paginationInfo;

  return (
    <div className="p-3 flex flex-col items-center gap-4 border-t mt-auto flex-shrink-0">
      <div className="flex items-center gap-8">
        <Select value={String(limit)} onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger className="w-auto h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground font-medium">
          {from}–{to} of {totalCount}
        </div>
      </div>

      <Separator className="w-full max-w-xs" />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => { 
                e.preventDefault(); 
                onPageChange(Math.max(1, currentPage - 1)); 
              }}
              aria-disabled={currentPage <= 1}
              className={cn("text-xs h-9", currentPage <= 1 && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-xs font-medium px-2">
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => { 
                e.preventDefault(); 
                onPageChange(Math.min(totalPages, currentPage + 1)); 
              }}
              aria-disabled={currentPage >= totalPages}
              className={cn("text-xs h-9", currentPage >= totalPages && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
