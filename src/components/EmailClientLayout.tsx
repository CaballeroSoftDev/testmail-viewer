
import { useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { EmailList } from './EmailList';
import { EmailView } from './EmailView';
import { useCredentials } from '@/hooks/use-credentials';
import { Email } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export function EmailClientLayout() {
  const { apiKey, namespace } = useCredentials();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const isMobile = useIsMobile();

  if (!apiKey || !namespace) {
    return null; // or a loading/error state
  }

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
  };
  
  if (isMobile) {
    return (
        <div className="relative overflow-hidden h-full">
            <div className={cn("absolute inset-0 transition-transform duration-300", selectedEmail ? '-translate-x-full' : 'translate-x-0')}>
                <EmailList
                    apiKey={apiKey}
                    namespace={namespace}
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
    <ResizablePanelGroup direction="horizontal" className="flex-grow rounded-lg border">
      <ResizablePanel defaultSize={25} minSize={20}>
        <EmailList
          apiKey={apiKey}
          namespace={namespace}
          onSelectEmail={handleSelectEmail}
          selectedEmailId={selectedEmail?.id ?? null}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75} minSize={30}>
        <EmailView email={selectedEmail} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
