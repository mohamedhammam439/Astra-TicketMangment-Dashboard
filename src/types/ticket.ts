export interface Ticket {
    id: string;
    subject: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    dateCreated: string;
    description: string;
    customer: {
      name: string;
      email: string;
      company: string;
    };
    assignedTo?: {
      name: string;
      avatar: string;
    };
    tags: string[];
    lastUpdate: string;
  }
  
  export interface TicketFilters {
    priority?: string;
    status?: string;
  }
  
  export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  }