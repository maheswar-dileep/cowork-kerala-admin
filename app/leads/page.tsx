'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { Download, Loader2, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { LeadsFilters } from '@/components/leads/leads-filters';
import { LeadsTable } from '@/components/leads/leads-table';
import { LeadsPagination } from '@/components/leads/leads-pagination';
import { api } from '@/lib/api';
import type { Lead } from '@/lib/data/leads';

interface LeadsStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
}

function LeadsPageContent() {
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<LeadsStats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const page = searchParams.get('page') || '1';
      const limit = searchParams.get('limit') || '10';
      const status = searchParams.get('status') || '';
      const search = searchParams.get('search') || '';

      const params = new URLSearchParams();
      params.set('page', page);
      params.set('limit', limit);
      if (status && status !== 'all') params.set('status', status);
      if (search) params.set('search', search);

      const { data } = await api.get(`/leads?${params.toString()}`);

      if (data.success) {
        setLeads(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/leads?limit=1000');
      if (data.success) {
        const fetchedLeads = data.data as Lead[];
        setAllLeads(fetchedLeads);
        setStats({
          total: fetchedLeads.length,
          new: fetchedLeads.filter(l => l.status === 'new').length,
          contacted: fetchedLeads.filter(l => l.status === 'contacted').length,
          qualified: fetchedLeads.filter(l => l.status === 'qualified').length,
          converted: fetchedLeads.filter(l => l.status === 'converted').length,
          lost: fetchedLeads.filter(l => l.status === 'lost').length,
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [fetchLeads, fetchStats]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await api.patch(`/leads/${leadId}`, { status: newStatus });
      fetchLeads();
      fetchStats();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (leadId: string) => {
    try {
      await api.delete(`/leads/${leadId}`);
      fetchLeads();
      fetchStats();
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const exportToCSV = () => {
    if (allLeads.length === 0) {
      alert('No leads to export');
      return;
    }

    const headers = [
      'Lead ID',
      'Name',
      'Email',
      'Phone',
      'Enquired For',
      'Space Type',
      'Number of Seats',
      'Location',
      'Status',
      'Message',
      'Date',
    ];

    const rows = allLeads.map(lead => [
      lead.leadId || lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.enquiredFor,
      lead.spaceType,
      lead.numberOfSeats || '',
      lead.location || '',
      lead.status,
      (lead.message || '').replace(/"/g, '""'),
      lead.date || lead.createdAt || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `leads-report-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <Header
        title="Leads"
        description="Track and manage enquiries from potential customers"
        breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Leads' }]}
        action={{
          label: 'Export',
          icon: Download,
          onClick: exportToCSV,
        }}
      />

      {/* Stats Grid */}
      <div className="grid gap-px overflow-hidden rounded-2xl border bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Total
          </span>
          <p className="mt-1 text-3xl font-semibold tabular-nums">
            {isLoading ? '—' : stats.total}
          </p>
        </div>
        <div className="bg-white p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            New
          </span>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-sky-600">
            {isLoading ? '—' : stats.new}
          </p>
        </div>
        <div className="bg-white p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Qualified
          </span>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-emerald-600">
            {isLoading ? '—' : stats.qualified}
          </p>
        </div>
        <div className="bg-white p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Converted
          </span>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-amber-600">
            {isLoading ? '—' : stats.converted}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6">
        <LeadsFilters />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-neutral-200 bg-white">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      ) : leads.length === 0 ? (
        <div className="mt-6 flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50">
          <Users className="h-10 w-10 text-neutral-300" />
          <p className="mt-3 text-sm font-medium text-neutral-600">
            No leads found
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            Leads will appear here when customers enquire
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200">
          <LeadsTable
            leads={leads}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-6">
          <LeadsPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalEntries={pagination.total}
            startEntry={(pagination.page - 1) * pagination.limit + 1}
            endEntry={Math.min(
              pagination.page * pagination.limit,
              pagination.total
            )}
          />
        </div>
      )}
    </AppLayout>
  );
}

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <AppLayout>
          <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          </div>
        </AppLayout>
      }
    >
      <LeadsPageContent />
    </Suspense>
  );
}
