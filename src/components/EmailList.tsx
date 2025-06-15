
import { useQuery } from '@tanstack/react-query';
import { Email, TestMailApiResponse } from '@/lib/types';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailListProps {
  apiKey: string;
  namespace: string;
  onSelectEmail: (email: Email) => void;
  selectedEmailId: string | null;
}

async function fetchEmails(apiKey: string, namespace: string): Promise<TestMailApiResponse> {
  const response = await fetch(`https://api.testmail.app/api/json?apikey=${apiKey}&namespace=${namespace}&limit=100`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error de red' }));
    throw new Error(errorData.message || 'Error al obtener los correos');
  }
  return response.json();
}

export function EmailList({ apiKey, namespace, onSelectEmail, selectedEmailId }: EmailListProps) {
  const { data, isLoading, isError, error, refetch } = useQuery<TestMailApiResponse, Error>({
    queryKey: ['emails', apiKey, namespace],
    queryFn: () => fetchEmails(apiKey, namespace),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // 30 seconds
    onError: (err) => {
      toast.error(`Error al obtener correos: ${err.message}`);
    },
  });

  if (isLoading) {
    return (
      <div className="p-2 space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-2 border rounded-lg p-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
       <div className="p-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || "No se pudieron cargar los correos."}
            </AlertDescription>
          </Alert>
       </div>
    );
  }

  if (!data || data.emails.length === 0) {
    return (
        <div className="flex flex-col h-full items-center justify-center text-center text-muted-foreground p-4">
            <Inbox className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Bandeja de entrada vacía</h3>
            <p className="text-sm">No se encontraron correos para este namespace.</p>
        </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
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
              <div className="flex justify-between items-start">
                <p className="font-semibold truncate pr-2">{email.from}</p>
                <p className="text-xs text-muted-foreground flex-shrink-0">
                  {formatDistanceToNow(new Date(email.timestamp), { addSuffix: true, locale: es })}
                </p>
              </div>
              <p className="font-medium truncate">{email.subject}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
