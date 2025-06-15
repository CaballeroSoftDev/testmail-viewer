
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SettingsFormProps {
  onSave: (apiKey: string, namespace: string) => void;
  apiKey: string | null;
  namespace: string | null;
}

export function SettingsForm({ onSave, apiKey: initialApiKey, namespace: initialNamespace }: SettingsFormProps) {
  const [apiKey, setApiKey] = useState('');
  const [namespace, setNamespace] = useState('');

  useEffect(() => {
    setApiKey(initialApiKey || '');
    setNamespace(initialNamespace || '');
  }, [initialApiKey, initialNamespace]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey && namespace) {
      onSave(apiKey, namespace);
      toast.success('Credentials saved!');
    } else {
      toast.error('Please fill in both fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="apiKey">API Key</Label>
        <Input
          id="apiKey"
          type="text"
          placeholder="Your testmail.app API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="namespace">Namespace</Label>
        <Input
          id="namespace"
          type="text"
          placeholder="Your testmail.app Namespace"
          value={namespace}
          onChange={(e) => setNamespace(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">Save and view emails</Button>
    </form>
  );
}
