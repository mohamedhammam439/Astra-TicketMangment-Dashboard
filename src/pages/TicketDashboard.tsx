import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Ticket, TicketFilters } from '@/types/ticket';
import { ticketService } from '../services/ticketService';
import FilterBar from '../components/tickets/FilterBar';
import TicketTable from '../components/tickets/TicketTable';
import TicketModal from '../components/tickets/TicketModal';
import Pagination from '../components/tickets/Pagination';
import LoadingState from '../components/tickets/LoadingState';
import EmptyState from '../components/tickets/EmptyState';

const TicketDashboard: React.FC = () => {
  const [filters, setFilters] = useState<TicketFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tickets', filters, currentPage],
    queryFn: () => ticketService.getTickets(filters, currentPage, itemsPerPage),
    staleTime: 5 * 60 * 1000,
  });

  const handleFiltersChange = useCallback((newFilters: TicketFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleTicketClick = useCallback(async (ticket: Ticket) => {
    const fullTicket = await ticketService.getTicketById(ticket.id);
    if (fullTicket) {
      setSelectedTicket(fullTicket);
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setCurrentPage(1);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error Loading Tickets</h1>
          <p className="text-gray-600">Failed to load tickets. Please try again later.</p>
        </div>
      </div>
    );
  }

  const tickets = data?.tickets || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage
  };

  const hasActiveFilters = Boolean(filters.priority || filters.status);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
                <p className="mt-2 text-gray-600">
                  Manage and track customer support requests
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{pagination.totalItems}</div>
                  <div className="text-sm text-gray-500">Total Tickets</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          totalResults={pagination.totalItems}
          isLoading={isLoading}
        />

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <LoadingState />
          ) : tickets.length === 0 ? (
            <EmptyState 
              hasFilters={hasActiveFilters} 
              onClearFilters={clearFilters}
            />
          ) : (
            <>
              <TicketTable 
                tickets={tickets}
                onTicketClick={handleTicketClick}
              />

              {pagination.totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Ticket Modal */}
      <TicketModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TicketDashboard;