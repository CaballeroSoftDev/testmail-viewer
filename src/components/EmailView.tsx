
import { Email } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
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
          <p className="text-lg">Select an email to read it</p>
          <p>Or use the search bar to find a specific email.</p>
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
            <div className="flex-grow min-w-0">
                <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground flex-shrink-0">From:</span>
                    <span className="text-muted-foreground truncate" title={email.from}>{email.from}</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground flex-shrink-0">To:</span>
                    <span className="text-muted-foreground truncate" title={email.to}>{email.to}</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-foreground flex-shrink-0">Date:</span>
                    <span className="text-xs text-muted-foreground">
                        {format(new Date(email.timestamp), "d MMM yyyy, HH:mm:ss", { locale: enUS })}
                    </span>
                </div>
            </div>
        </div>
      </div>
      <div className="flex-grow overflow-hidden relative">
        <iframe
          srcDoc={email.html}
          title={email.subject}
          sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          className="w-full h-full border-0 rounded-md bg-white"
        />
      </div>
    </div>
  );
}
