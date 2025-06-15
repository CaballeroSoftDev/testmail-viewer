
import { Email } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="p-4 h-full overflow-y-auto">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{email.subject}</CardTitle>
          <div className="text-sm text-muted-foreground">
            <p>De: {email.from}</p>
            <p>Para: {email.to}</p>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <iframe
            srcDoc={email.html}
            title={email.subject}
            sandbox="allow-same-origin"
            className="w-full h-full border-0 rounded-md bg-white"
          />
        </CardContent>
      </Card>
    </div>
  );
}
