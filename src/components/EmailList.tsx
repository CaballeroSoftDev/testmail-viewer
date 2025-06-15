import { useQuery } from '@tanstack/react-query';
import { Email, TestMailApiResponse } from '@/lib/types';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Inbox, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback } from './ui/avatar';

interface EmailListProps {
  apiKey: string;
  namespace: string;
  onSelectEmail: (email: Email) => void;
  selectedEmailId: string | null;
}

async function fetchEmails(apiKey: string, namespace: string, tag: string, limit: number, offset: number): Promise<TestMailApiResponse> {
  const params = new URLSearchParams({
    apikey: apiKey,
    namespace: namespace,
    limit: String(limit),
    offset: String(offset),
  });
  if (tag) {
    params.append('tag', tag);
  }
  
  const response = await fetch(`https://api.testmail.app/api/json?${params.toString()}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.message || 'Error fetching emails');
  }
  return response.json();
}

export function EmailList({ apiKey, namespace, onSelectEmail, selectedEmailId }: EmailListProps) {
  const [tag, setTag] = useState('');
  const [limit, setLimit] = useState(25);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<TestMailApiResponse, Error>({
    queryKey: ['emails', apiKey, namespace, tag, limit, page],
    queryFn: () => fetchEmails(apiKey, namespace, tag, limit, offset),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // 30 seconds
  });

  useEffect(() => {
    if (isError) {
      toast.error(`Error fetching emails: ${error?.message || 'Unknown error'}`);
    }
  }, [isError, error]);
  
  const totalPages = data ? Math.ceil(data.count / limit) : 1;

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
    setPage(1);
  }

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b">
        <div className="flex items-center gap-2">
            <Input 
                placeholder="Filter by tag..." 
                value={tag} 
                onChange={handleTagChange}
                className="h-9"
            />
             <Button variant="ghost" size="icon" onClick={() => refetch()} className="h-9 w-9 flex-shrink-0" disabled={isFetching}>
                <RefreshCcw className={cn("h-4 w-4", isFetching && "animate-spin")} />
            </Button>
        </div>
      </div>
      
      {isLoading ? (
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
      ) : isError ? (
         <div className="p-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || "Could not load emails."}
              </AlertDescription>
            </Alert>
         </div>
      ) : !data || data.emails.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center text-center text-muted-foreground p-4">
              <Inbox className="h-12 w-12 mb-4"/>
              <h3 className="text-lg font-semibold">Empty inbox</h3>
              <p className="text-sm">No emails found for this search.</p>
          </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto relative">
             {isFetching && !isLoading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                <RefreshCcw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            <ul className="space-y-1 p-2">
              {data.emails.map((email) => (
                <li key={email.id}>
                  <button
                    onClick={() => onSelectEmail(email)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      selectedEmailId === email.id ? 'bg-accent' : ''
                    )}
                  >
                    <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10 border">
                            <AvatarFallback>{email.from.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow overflow-hidden text-sm">
                            <p className="font-semibold truncate" title={email.subject}>{email.subject}</p>
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-card-foreground flex-shrink-0">From:</span>
                                <span className="text-muted-foreground truncate" title={email.from}>{email.from}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-card-foreground flex-shrink-0">To:</span>
                                <span className="text-muted-foreground truncate" title={email.to}>{email.to}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-card-foreground flex-shrink-0">Date:</span>
                                <span className="text-xs text-muted-foreground">
                                    {format(new Date(email.timestamp), "d MMM yyyy, HH:mm:ss", { locale: enUS })}
                                </span>
                            </div>
                        </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
           <div className="p-2 flex flex-col gap-2 md:flex-row justify-between items-center border-t mt-auto flex-shrink-0">
                <div className="text-xs text-muted-foreground">
                    {data?.count} total emails
                </div>
                <div className="flex items-center gap-4">
                    <Select value={String(limit)} onValueChange={handleLimitChange}>
                        <SelectTrigger className="w-full md:w-[120px] h-9 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10 per page</SelectItem>
                            <SelectItem value="25">25 per page</SelectItem>
                            <SelectItem value="50">50 per page</SelectItem>
                        </SelectContent>
                    </Select>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setPage(p => Math.max(1, p - 1)); }}
                                    aria-disabled={page <= 1}
                                    className={cn("text-xs h-9", page <= 1 && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <span className="text-xs font-medium px-4 py-2">
                                    Page {page} of {totalPages}
                                </span>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setPage(p => Math.min(totalPages, p + 1)); }}
                                    aria-disabled={page >= totalPages}
                                    className={cn("text-xs h-9", page >= totalPages && "pointer-events-none opacity-50")}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
      )}
    </div>
  );
}
