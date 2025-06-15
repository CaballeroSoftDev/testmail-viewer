
export interface Email {
  id: string;
  from: string;
  subject: string;
  html: string;
  to: string;
  timestamp: number;
  date: number;
  downloadUrl: string;
}

export interface TestMailApiResponse {
  result: string;
  emails: Email[];
  count: number;
}

export interface EmailFilters {
  tag: string;
  limit: number;
  page: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  from: number;
  to: number;
  totalCount: number;
}
