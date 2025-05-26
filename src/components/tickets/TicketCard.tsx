import React from 'react';
import { Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Ticket } from '@/types/ticket';

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 hover:border-gray-300 bg-white"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-500">{ticket.id}</span>
            <Badge className={`text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
            </Badge>
          </div>
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {ticket.subject}
          </h3>
        </div>
        <Badge className={`ml-3 text-xs font-medium border ${getStatusColor(ticket.status)}`}>
          {ticket.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{ticket.customer.company}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDate(ticket.dateCreated)}</span>
          </div>
        </div>
        
        {ticket.assignedTo && (
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
              <AvatarFallback className="text-xs">
                {ticket.assignedTo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500">{ticket.assignedTo.name}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TicketCard;
