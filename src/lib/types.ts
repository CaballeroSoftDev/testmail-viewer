
export interface Email {
  id: string;
  from: string;
  subject: string;
  html: string;
  to: string;
  timestamp: number;
}

export interface TestMailApiResponse {
  result: string;
  emails: Email[];
  count: number;
}
