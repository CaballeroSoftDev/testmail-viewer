
import { Email } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onSelect: (email: Email) => void;
}

export function EmailListItem({ email, isSelected, onSelect }: EmailListItemProps) {
  return (
    <li>
      <button
        onClick={() => onSelect(email)}
        className={cn(
          "w-full text-left p-3 rounded-lg hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isSelected ? 'bg-accent' : ''
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
  );
}
