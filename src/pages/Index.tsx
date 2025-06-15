
import { useCredentials } from '@/hooks/use-credentials';
import { EmailClientLayout } from '@/components/EmailClientLayout';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SettingsModal } from '@/components/SettingsModal';

const Index = () => {
  const { hasCredentials, saveCredentials, clearCredentials, isLoading, apiKey, namespace } = useCredentials();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !hasCredentials) {
      setIsSettingsModalOpen(true);
    }
  }, [isLoading, hasCredentials]);

  const handleSaveCredentials = (key: string, ns: string) => {
    saveCredentials(key, ns);
    setIsSettingsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col">
        <header className="flex items-center justify-between p-2 border-b">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </header>
        <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md p-4 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-2 border-b flex-shrink-0">
        <h1 className="text-xl font-bold tracking-tight">TestMail Viewer</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {hasCredentials && (
            <>
              <Button variant="outline" size="icon" onClick={() => setIsSettingsModalOpen(true)} aria-label="Settings">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={clearCredentials} aria-label="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        {hasCredentials ? (
          <EmailClientLayout />
        ) : (
          <div className="flex flex-col h-full items-center justify-center text-center text-muted-foreground p-4">
            <Settings className="h-12 w-12 mb-4"/>
            <h3 className="text-lg font-semibold">Welcome!</h3>
            <p className="text-sm">Please set your credentials to start viewing emails.</p>
            <Button onClick={() => setIsSettingsModalOpen(true)} className="mt-4">
                Open Settings
            </Button>
          </div>
        )}
      </main>
      <SettingsModal 
        open={isSettingsModalOpen}
        onOpenChange={setIsSettingsModalOpen}
        onSave={handleSaveCredentials}
        apiKey={apiKey}
        namespace={namespace}
      />
    </div>
  );
};

export default Index;
