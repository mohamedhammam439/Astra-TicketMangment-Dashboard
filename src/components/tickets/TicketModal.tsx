import React from 'react';
import { Calendar, User, Mail, Building, Clock, Tag } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import type { Ticket } from '@/types/ticket';

interface TicketModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, isOpen, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">{ticket.id}</span>
            <Badge className={`text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
            </Badge>
            <Badge className={`text-xs font-medium border ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* Subject */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {ticket.subject}
              </h3>
            </div>

            <Separator />

            {/* Customer Information */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{ticket.customer.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{ticket.customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="w-4 h-4" />
                  <span>{ticket.customer.company}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Assignment */}
            {ticket.assignedTo && (
              <>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Assigned To</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={ticket.assignedTo.avatar} alt={ticket.assignedTo.name} />
                      <AvatarFallback className="text-sm">
                        {ticket.assignedTo.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{ticket.assignedTo.name}</span>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Timestamps */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timeline
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {formatDate(ticket.dateCreated)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last Update: {formatDate(ticket.lastUpdate)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            {ticket.tags.length > 0 && (
              <>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ticket.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Description */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Description</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {ticket.description}
              </p>
            </div>
          </div>
        </ScrollArea>

       
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
