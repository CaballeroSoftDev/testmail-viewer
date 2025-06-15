
export interface Credentials {
  apiKey: string;
  namespace: string;
}

export interface CredentialsState {
  apiKey: string | null;
  namespace: string | null;
  isLoading: boolean;
  hasCredentials: boolean;
}
