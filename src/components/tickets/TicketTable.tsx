import React from 'react';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import  type { Ticket } from '@/types/ticket';

interface TicketTableProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets, onTicketClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow 
              key={ticket.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onTicketClick(ticket)}
            >
              <TableCell className="font-medium text-sm text-gray-600">
                {ticket.id}
              </TableCell>
              <TableCell className="max-w-xs">
                <div className="truncate font-medium text-gray-900">
                  {ticket.subject}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                  {ticket.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {formatDate(ticket.dateCreated)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;
