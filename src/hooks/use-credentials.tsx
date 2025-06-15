
import { useState, useEffect, useCallback } from 'react';

export const useCredentials = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [namespace, setNamespace] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedApiKey = localStorage.getItem('testmail-apikey');
      const storedNamespace = localStorage.getItem('testmail-namespace');
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
      if (storedNamespace) {
        setNamespace(storedNamespace);
      }
    } catch (error) {
      console.error("Failed to read credentials from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCredentials = useCallback((key: string, ns: string) => {
    try {
      localStorage.setItem('testmail-apikey', key);
      localStorage.setItem('testmail-namespace', ns);
      setApiKey(key);
      setNamespace(ns);
    } catch (error) {
      console.error("Failed to save credentials to localStorage", error);
    }
  }, []);
  
  const clearCredentials = useCallback(() => {
    try {
      localStorage.removeItem('testmail-apikey');
      localStorage.removeItem('testmail-namespace');
      setApiKey(null);
      setNamespace(null);
    } catch (error) {
      console.error("Failed to clear credentials from localStorage", error);
    }
  }, []);

  return { 
    apiKey, 
    namespace, 
    saveCredentials, 
    clearCredentials, 
    isLoading, 
    hasCredentials: !!apiKey && !!namespace 
  };
};
