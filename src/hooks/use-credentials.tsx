
import { storageService } from '@/services/storage.service';
import { useCredentials as useCredentialsHook } from './use-credentials.hook';

export const useCredentials = () => {
  return useCredentialsHook(storageService);
};
