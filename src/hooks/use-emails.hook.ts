
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { TestMailApiResponse, EmailFilters, Credentials } from '@/lib/types';
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
