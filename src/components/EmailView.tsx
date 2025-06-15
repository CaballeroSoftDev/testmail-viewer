
import { Email } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EmailViewProps {
  email: Email | null;
}

export function EmailView({ email }: EmailViewProps) {
  const isMobile = useIsMobile();

  if (!email) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <p className="text-lg">Selecciona un correo para leerlo</p>
          <p>O usa la barra de búsqueda para encontrar un correo específico.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col bg-background", isMobile ? "px-4 pb-4 pt-14" : "p-4")}>
      <div className="flex-shrink-0 border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold mb-4 break-words">{email.subject}</h1>
        <div className="flex items-start gap-4 text-sm">
            <Avatar className="h-10 w-10">
                <AvatarFallback>{email.from.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow flex flex-col md:flex-row md:items-start justify-between min-w-0">
                <div className='min-w-0'>
                    <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-foreground flex-shrink-0">De:</span>
                        <span className="text-muted-foreground truncate" title={email.from}>{email.from}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-foreground flex-shrink-0">Para:</span>
                        <span className="text-muted-foreground truncate" title={email.to}>{email.to}</span>
                    </div>
                </div>
                <div className="text-xs text-muted-foreground md:text-right mt-2 md:mt-0 md:pl-4 flex-shrink-0">
                    {format(new Date(email.timestamp), "d MMM yyyy, HH:mm:ss", { locale: es })}
                </div>
            </div>
        </div>
      </div>
      <div className="flex-grow overflow-hidden relative">
        <iframe
          srcDoc={email.html}
          title={email.subject}
          sandbox="allow-same-origin"
          className="w-full h-full border-0 rounded-md bg-white"
        />
      </div>
    </div>
  );
}
