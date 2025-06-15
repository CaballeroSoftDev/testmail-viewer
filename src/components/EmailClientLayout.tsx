
import { useState } from 'react';
import { EmailList } from './email/EmailList';
import { EmailView } from './EmailView';
import { useCredentials } from '@/hooks/use-credentials';
import { Email } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export function EmailClientLayout() {
  const { getCredentials } = useCredentials();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const isMobile = useIsMobile();

  const credentials = getCredentials();
  if (!credentials) {
    return null;
  }

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };
  
  if (isMobile) {
    return (
        <div className="relative overflow-hidden h-full">
            <div className={cn("absolute inset-0 transition-transform duration-300", selectedEmail ? '-translate-x-full' : 'translate-x-0')}>
                <EmailList
                    apiKey={credentials.apiKey}
                    namespace={credentials.namespace}
                    onSelectEmail={handleSelectEmail}
                    selectedEmailId={selectedEmail?.id ?? null}
                />
            </div>
            <div className={cn("absolute inset-0 transition-transform duration-300", selectedEmail ? 'translate-x-0' : 'translate-x-full')}>
                {selectedEmail && (
                    <>
                        <Button variant="ghost" size="icon" className="absolute top-2 left-2 z-10" onClick={() => setSelectedEmail(null)}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <EmailView email={selectedEmail} />
                    </>
                )}
            </div>
        </div>
    )
  }

  return (
    <div className="flex flex-row h-full rounded-lg border overflow-hidden">
      <div className="w-[380px] border-r flex-shrink-0 bg-background">
        <EmailList
          apiKey={credentials.apiKey}
          namespace={credentials.namespace}
          onSelectEmail={handleSelectEmail}
          selectedEmailId={selectedEmail?.id ?? null}
        />
      </div>
      <div className="flex-1 min-w-0">
        <EmailView email={selectedEmail} />
      </div>
    </div>
  );
}
