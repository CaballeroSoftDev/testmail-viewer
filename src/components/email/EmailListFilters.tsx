
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailListFiltersProps {
  tag: string;
  limit: number;
  onTagChange: (tag: string) => void;
  onLimitChange: (limit: number) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function EmailListFilters({
  tag,
  limit,
  onTagChange,
  onLimitChange,
  onRefresh,
  isRefreshing,
}: EmailListFiltersProps) {
  return (
    <div className="p-2 border-b">
      <div className="flex items-center gap-2">
        <Input 
          placeholder="Filter by tag..." 
          value={tag} 
          onChange={(e) => onTagChange(e.target.value)}
          className="h-9"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onRefresh} 
          className="h-9 w-9 flex-shrink-0" 
          disabled={isRefreshing}
        >
          <RefreshCcw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
        </Button>
      </div>
    </div>
  );
}
