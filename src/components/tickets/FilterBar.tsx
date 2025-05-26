import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import type { TicketFilters } from '@/types/ticket';

interface FilterBarProps {
  filters: TicketFilters;
  onFiltersChange: (filters: TicketFilters) => void;
  totalResults: number;
  isLoading?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFiltersChange, 
  totalResults,
  isLoading 
}) => {
  const handlePriorityChange = (value: string) => {
    onFiltersChange({ ...filters, priority: value === 'all' ? undefined : value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value === 'all' ? undefined : value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.priority || filters.status;
  const activeFilterCount = [filters.priority, filters.status].filter(Boolean).length;

  return (
    <div className="bg-white p-6 border-b border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={filters.priority || 'all'} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-full sm:w-[140px] h-11 bg-gray-50 border-gray-200 cursor-pointer">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="urgent">🔴 Urgent</SelectItem>
              <SelectItem value="high">🟠 High</SelectItem>
              <SelectItem value="medium">🟡 Medium</SelectItem>
              <SelectItem value="low">🟢 Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-[140px] h-11 bg-gray-50 border-gray-200 cursor-pointer">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="h-11 px-4"
              disabled={isLoading}
            >
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-600">
            {isLoading ? 'Loading...' : `${totalResults} tickets found`}
          </p>
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
