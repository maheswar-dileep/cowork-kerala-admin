'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Lead } from '@/lib/data/leads';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-700' },
  contacted: {
    label: 'Contacted',
    className: 'bg-purple-100 text-purple-700',
  },
  qualified: {
    label: 'Qualified',
    className: 'bg-green-100 text-green-700',
  },
  converted: {
    label: 'Converted',
    className: 'bg-teal-100 text-teal-700',
  },
  lost: { label: 'Lost', className: 'bg-red-100 text-red-700' },
};

export function LeadDetailModal({
  lead,
  isOpen,
  onClose,
}: LeadDetailModalProps) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">Lead Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Lead ID and Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lead ID</p>
                <p className="text-lg font-semibold text-gray-900">
                  {lead.leadId || lead.id}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={statusConfig[lead.status].className}
              >
                {statusConfig[lead.status].label}
              </Badge>
            </div>

            {/* Contact Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-600">Name</p>
                <p className="mt-1 text-sm text-gray-900">{lead.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="mt-1 text-sm text-gray-900">{lead.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="mt-1 text-sm text-gray-900">{lead.email}</p>
              </div>
            </div>

            {/* Space Details */}
            <div className="border-t pt-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Space Requirements
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Workspace Enquired
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {lead.enquiredFor}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Space Type
                  </p>
                  <p className="mt-1 text-sm text-gray-900">{lead.spaceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Number of Seats
                  </p>
                  <p className="mt-1 text-sm text-gray-900">
                    {lead.numberOfSeats}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="mt-1 text-sm text-gray-900">{lead.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Date</p>
                  <p className="mt-1 text-sm text-gray-900">{lead.date}</p>
                </div>
              </div>
            </div>

            {/* Message */}
            {lead.message && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-600">Message</p>
                <p className="mt-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                  {lead.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
