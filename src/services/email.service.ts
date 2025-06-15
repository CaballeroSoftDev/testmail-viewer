
import { TestMailApiResponse, EmailFilters, Credentials } from '@/types';

export interface IEmailService {
  fetchEmails(credentials: Credentials, filters: EmailFilters, offset: number): Promise<TestMailApiResponse>;
}

export class EmailService implements IEmailService {
  private readonly baseUrl = 'https://api.testmail.app/api/json';

  async fetchEmails(
    credentials: Credentials, 
    filters: EmailFilters, 
    offset: number
  ): Promise<TestMailApiResponse> {
    const params = new URLSearchParams({
      apikey: credentials.apiKey,
      namespace: credentials.namespace,
      limit: String(filters.limit),
      offset: String(offset),
    });

    if (filters.tag) {
      params.append('tag', filters.tag);
    }
    
    const response = await fetch(`${this.baseUrl}?${params.toString()}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || 'Error fetching emails');
    }
    
    return response.json();
  }
}

export const emailService = new EmailService();
