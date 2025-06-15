import { Email } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface EmailViewProps {
  email: Email | null;
}

export function EmailView({ email }: EmailViewProps) {
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
    <div className="p-4 h-full flex flex-col bg-background">
      <div className="flex-shrink-0 border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold mb-4">{email.subject}</h1>
        <div className="flex items-start gap-4 text-sm">
            <Avatar className="h-10 w-10">
                <AvatarFallback>{email.from.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground">De:</span>
                    <span className="text-muted-foreground">{email.from}</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground">Para:</span>
                    <span className="text-muted-foreground">{email.to}</span>
                </div>
            </div>
            <div className="text-xs text-muted-foreground text-right">
                {format(new Date(email.timestamp), "d MMM yyyy, HH:mm", { locale: es })}
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
