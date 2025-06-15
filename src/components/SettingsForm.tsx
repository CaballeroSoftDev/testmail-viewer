
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SettingsFormProps {
  onSave: (apiKey: string, namespace: string) => void;
}

export function SettingsForm({ onSave }: SettingsFormProps) {
  const [apiKey, setApiKey] = useState('');
  const [namespace, setNamespace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey && namespace) {
      onSave(apiKey, namespace);
      toast.success('¡Credenciales guardadas!');
    } else {
      toast.error('Por favor, completa ambos campos.');
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Configuración de TestMail</CardTitle>
          <CardDescription>Ingresa tu API Key y Namespace para comenzar.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="text"
                placeholder="Tu API Key de testmail.app"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="namespace">Namespace</Label>
              <Input
                id="namespace"
                type="text"
                placeholder="Tu Namespace de testmail.app"
                value={namespace}
                onChange={(e) => setNamespace(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Guardar y ver correos</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
