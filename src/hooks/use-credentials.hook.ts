
import { useState, useEffect, useCallback } from 'react';
import { CredentialsState, Credentials } from '@/types';
import { IStorageService } from '@/services/storage.service';
import { validateCredentials } from '@/utils/validation.utils';

interface UseCredentialsReturn extends CredentialsState {
  saveCredentials: (key: string, ns: string) => void;
  clearCredentials: () => void;
  getCredentials: () => Credentials | null;
}

export const useCredentials = (storageService: IStorageService): UseCredentialsReturn => {
  const [state, setState] = useState<CredentialsState>({
    apiKey: null,
    namespace: null,
    isLoading: true,
    hasCredentials: false,
  });

  useEffect(() => {
    const storedApiKey = storageService.getItem('testmail-apikey');
    const storedNamespace = storageService.getItem('testmail-namespace');
    
    const hasValidCredentials = validateCredentials(storedApiKey || '', storedNamespace || '');
    
    setState({
      apiKey: storedApiKey,
      namespace: storedNamespace,
      isLoading: false,
      hasCredentials: hasValidCredentials,
    });
  }, [storageService]);

  const saveCredentials = useCallback((key: string, ns: string) => {
    if (!validateCredentials(key, ns)) {
      throw new Error('Invalid credentials provided');
    }

    storageService.setItem('testmail-apikey', key);
    storageService.setItem('testmail-namespace', ns);
    
    setState(prev => ({
      ...prev,
      apiKey: key,
      namespace: ns,
      hasCredentials: true,
    }));
  }, [storageService]);
  
  const clearCredentials = useCallback(() => {
    storageService.removeItem('testmail-apikey');
    storageService.removeItem('testmail-namespace');
    
    setState(prev => ({
      ...prev,
      apiKey: null,
      namespace: null,
      hasCredentials: false,
    }));
  }, [storageService]);

  const getCredentials = useCallback((): Credentials | null => {
    if (!state.hasCredentials || !state.apiKey || !state.namespace) {
      return null;
    }
    
    return {
      apiKey: state.apiKey,
      namespace: state.namespace,
    };
  }, [state.hasCredentials, state.apiKey, state.namespace]);

  return {
    ...state,
    saveCredentials,
    clearCredentials,
    getCredentials,
  };
};
