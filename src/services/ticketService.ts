import type { Ticket, TicketFilters, PaginationInfo } from '@/types/ticket';

// Mock data generator
const generateMockTickets = (): Ticket[] => {
  const priorities: Ticket['priority'][] = ['low', 'medium', 'high', 'urgent'];
  const statuses: Ticket['status'][] = ['open', 'in-progress', 'resolved', 'closed'];
  const companies = ['TechCorp', 'DataSys', 'CloudNet', 'DevWorks', 'InfoTech', 'NetSolutions'];
  const subjects = [
    'Login issues with SSO integration',
    'Database connectivity problems',
    'Performance degradation in production',
    'UI/UX feedback for dashboard',
    'API rate limiting concerns',
    'Security vulnerability report',
    'Feature request: Advanced filtering',
    'Mobile app synchronization issues',
    'Email notification not working',
    'Payment gateway integration bug'
  ];

  return Array.from({ length: 50 }, (_, index) => ({
    id: `TKT-${String(index + 1).padStart(4, '0')}`,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dateCreated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: `Detailed description for ticket ${index + 1}. This ticket requires attention and proper resolution to ensure customer satisfaction. The issue has been reported by the customer and needs immediate action from our support team.`,
    customer: {
      name: `Customer ${index + 1}`,
      email: `customer${index + 1}@${companies[Math.floor(Math.random() * companies.length)].toLowerCase()}.com`,
      company: companies[Math.floor(Math.random() * companies.length)]
    },
    assignedTo: Math.random() > 0.3 ? {
      name: `Agent ${Math.floor(Math.random() * 10) + 1}`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=40&h=40&fit=crop&crop=face`
    } : undefined,
    tags: ['support', 'bug', 'feature'].slice(0, Math.floor(Math.random() * 3) + 1),
    lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const mockTickets = generateMockTickets();

export const ticketService = {
  async getTickets(
    filters: TicketFilters = {},
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<{ tickets: Ticket[], pagination: PaginationInfo }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredTickets = [...mockTickets];

    // Apply filters
    if (filters.priority) {
      filteredTickets = filteredTickets.filter(ticket => ticket.priority === filters.priority);
    }

    if (filters.status) {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === filters.status);
    }

    // Sort by date (newest first)
    filteredTickets.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

    // Pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages: Math.ceil(filteredTickets.length / itemsPerPage),
      totalItems: filteredTickets.length,
      itemsPerPage
    };

    return { tickets: paginatedTickets, pagination };
  },

  async getTicketById(id: string): Promise<Ticket | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTickets.find(ticket => ticket.id === id) || null;
  }
};
