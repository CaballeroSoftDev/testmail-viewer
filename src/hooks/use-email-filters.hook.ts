
import { useState, useCallback } from 'react';
import { EmailFilters } from '@/types';

interface UseEmailFiltersReturn {
  filters: EmailFilters;
  updateTag: (tag: string) => void;
  updateLimit: (limit: number) => void;
  updatePage: (page: number) => void;
  resetPage: () => void;
}

export const useEmailFilters = (
  initialFilters: Partial<EmailFilters> = {}
): UseEmailFiltersReturn => {
  const [filters, setFilters] = useState<EmailFilters>({
    tag: '',
    limit: 25,
    page: 1,
    ...initialFilters,
  });

  const updateTag = useCallback((tag: string) => {
    setFilters(prev => ({ ...prev, tag, page: 1 }));
  }, []);

  const updateLimit = useCallback((limit: number) => {
    setFilters(prev => ({ ...prev, limit, page: 1 }));
  }, []);

  const updatePage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const resetPage = useCallback(() => {
    setFilters(prev => ({ ...prev, page: 1 }));
  }, []);

  return {
    filters,
    updateTag,
    updateLimit,
    updatePage,
    resetPage,
  };
};
