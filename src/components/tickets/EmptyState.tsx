import React from 'react';
import { Ticket as TicketIcon, Search } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  if (hasFilters) {
    return (
      <div className="text-center py-12">
        <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
        <p className="text-gray-500 mb-6">
          No tickets match your current filters. Try adjusting your search criteria.
        </p>
        <Button onClick={onClearFilters} variant="outline">
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <TicketIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
      <p className="text-gray-500">
        When customers submit support requests, they'll appear here.
      </p>
    </div>
  );
};

export default EmptyState;
