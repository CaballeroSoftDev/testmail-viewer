
import { Email } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Inbox, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEmailFilters } from '@/hooks/use-email-filters.hook';
import { useEmails } from '@/hooks/use-emails.hook';
import { emailService } from '@/services/email.service';
import { calculatePaginationInfo } from '@/utils/pagination.utils';
import { EmailListFilters } from './EmailListFilters';
import { EmailListItem } from './EmailListItem';
import { EmailListPagination } from './EmailListPagination';

interface EmailListProps {
  apiKey: string;
  namespace: string;
  onSelectEmail: (email: Email) => void;
  selectedEmailId: string | null;
}

export function EmailList({ apiKey, namespace, onSelectEmail, selectedEmailId }: EmailListProps) {
  const { filters, updateTag, updateLimit, updatePage } = useEmailFilters();
  
  const credentials = { apiKey, namespace };
  const { data, isLoading, isFetching, isError, error, refetch } = useEmails({
    credentials,
    filters,
    emailService,
  });

  const paginationInfo = data 
    ? calculatePaginationInfo(filters.page, filters.limit, data.count)
    : { currentPage: 1, totalPages: 1, from: 0, to: 0, totalCount: 0 };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col">
        <EmailListFilters
          tag={filters.tag}
          limit={filters.limit}
          onTagChange={updateTag}
          onLimitChange={updateLimit}
          onRefresh={refetch}
          isRefreshing={isFetching}
        />
        <div className="p-2 space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3 border rounded-lg p-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col">
        <EmailListFilters
          tag={filters.tag}
          limit={filters.limit}
          onTagChange={updateTag}
          onLimitChange={updateLimit}
          onRefresh={refetch}
          isRefreshing={isFetching}
        />
        <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || "Could not load emails."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!data || data.emails.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <EmailListFilters
          tag={filters.tag}
          limit={filters.limit}
          onTagChange={updateTag}
          onLimitChange={updateLimit}
          onRefresh={refetch}
          isRefreshing={isFetching}
        />
        <div className="flex flex-col h-full items-center justify-center text-center text-muted-foreground p-4">
          <Inbox className="h-12 w-12 mb-4"/>
          <h3 className="text-lg font-semibold">Empty inbox</h3>
          <p className="text-sm">No emails found for this search.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <EmailListFilters
        tag={filters.tag}
        limit={filters.limit}
        onTagChange={updateTag}
        onLimitChange={updateLimit}
        onRefresh={refetch}
        isRefreshing={isFetching}
      />
      
      <div className="flex-grow overflow-y-auto relative">
        {isFetching && !isLoading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
            <RefreshCcw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        <ul className="space-y-1 p-2">
          {data.emails.map((email) => (
            <EmailListItem
              key={email.id}
              email={email}
              isSelected={selectedEmailId === email.id}
              onSelect={onSelectEmail}
            />
          ))}
        </ul>
      </div>
      
      <EmailListPagination
        paginationInfo={paginationInfo}
        limit={filters.limit}
        onLimitChange={updateLimit}
        onPageChange={updatePage}
      />
    </div>
  );
}
