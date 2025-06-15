
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { TestMailApiResponse, EmailFilters, Credentials } from '@/types';
import { IEmailService } from '@/services/email.service';

interface UseEmailsParams {
  credentials: Credentials | null;
  filters: EmailFilters;
  emailService: IEmailService;
}

export const useEmails = ({ credentials, filters, emailService }: UseEmailsParams) => {
  const offset = (filters.page - 1) * filters.limit;

  const queryResult = useQuery<TestMailApiResponse, Error>({
    queryKey: ['emails', credentials?.apiKey, credentials?.namespace, filters.tag, filters.limit, filters.page],
    queryFn: () => {
      if (!credentials) {
        throw new Error('No credentials available');
      }
      return emailService.fetchEmails(credentials, filters, offset);
    },
    enabled: !!credentials,
    staleTime: 60 * 1000, // 1 minute
  });

  useEffect(() => {
    if (queryResult.isError) {
      toast.error(`Error fetching emails: ${queryResult.error?.message || 'Unknown error'}`);
    }
  }, [queryResult.isError, queryResult.error]);

  return queryResult;
};
</lov-hook>

<lov-write file_path="src/components/email/EmailListFilters.tsx">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailListFiltersProps {
  tag: string;
  limit: number;
  onTagChange: (tag: string) => void;
  onLimitChange: (limit: number) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function EmailListFilters({
  tag,
  limit,
  onTagChange,
  onLimitChange,
  onRefresh,
  isRefreshing,
}: EmailListFiltersProps) {
  return (
    <div className="p-2 border-b">
      <div className="flex items-center gap-2">
        <Input 
          placeholder="Filter by tag..." 
          value={tag} 
          onChange={(e) => onTagChange(e.target.value)}
          className="h-9"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onRefresh} 
          className="h-9 w-9 flex-shrink-0" 
          disabled={isRefreshing}
        >
          <RefreshCcw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
        </Button>
      </div>
    </div>
  );
}
