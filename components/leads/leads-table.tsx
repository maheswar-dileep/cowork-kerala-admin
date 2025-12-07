'use client';

import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LeadDetailModal } from './lead-detail-modal';
import type { Lead } from '@/lib/data/leads';

interface LeadsTableProps {
  leads: Lead[];
  onStatusChange?: (leadId: string, status: string) => void;
  onDelete?: (leadId: string) => void;
}

const statusConfig: Record<
  Lead['status'],
  { label: string; className: string }
> = {
  new: { label: 'New', className: 'bg-sky-50 text-sky-700 border-0' },
  contacted: {
    label: 'Contacted',
    className: 'bg-violet-50 text-violet-700 border-0',
  },
  qualified: {
    label: 'Qualified',
    className: 'bg-emerald-50 text-emerald-700 border-0',
  },
  converted: {
    label: 'Converted',
    className: 'bg-amber-50 text-amber-700 border-0',
  },
  lost: { label: 'Lost', className: 'bg-red-50 text-red-700 border-0' },
};

export function LeadsTable({
  leads,
  onStatusChange,
  onDelete,
}: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleDeleteLead = (lead: Lead) => {
    const leadId = lead._id || lead.id;
    if (confirm('Are you sure you want to delete this lead?')) {
      onDelete?.(leadId);
    }
  };

  const handleStatusChange = (lead: Lead, newStatus: string) => {
    const leadId = lead._id || lead.id;
    onStatusChange?.(leadId, newStatus);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <div className="overflow-x-auto bg-white">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b bg-neutral-50 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Enquiry</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {leads.map(lead => (
              <tr
                key={lead._id || lead.id}
                className="transition-colors hover:bg-neutral-50/50"
              >
                <td className="px-4 py-3">
                  <span className="font-medium text-neutral-900">
                    {lead.name}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    <p className="text-sm text-neutral-600">{lead.phone}</p>
                    <p className="text-xs text-neutral-400">{lead.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-neutral-900">
                      {lead.enquiredFor}
                    </p>
                    <p className="text-xs text-neutral-500">{lead.spaceType}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-600">
                  {formatDate(lead.date || lead.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <Select
                    value={lead.status}
                    onValueChange={value => handleStatusChange(lead, value)}
                  >
                    <SelectTrigger className="h-auto w-auto border-0 bg-transparent p-0 shadow-none focus:ring-0">
                      <Badge
                        variant="secondary"
                        className={statusConfig[lead.status].className}
                      >
                        {statusConfig[lead.status].label}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([value, config]) => (
                        <SelectItem key={value} value={value}>
                          <Badge
                            variant="secondary"
                            className={config.className}
                          >
                            {config.label}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-neutral-500 hover:text-neutral-900"
                      onClick={() => handleViewLead(lead)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-neutral-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDeleteLead(lead)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LeadDetailModal
        lead={selectedLead}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
