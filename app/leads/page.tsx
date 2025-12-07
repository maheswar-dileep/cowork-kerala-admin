'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
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
      // Fetch all leads to compute stats (or you could have a /leads/stats endpoint)
      const { data } = await api.get('/leads?limit=1000');
      if (data.success) {
        const allLeads = data.data as Lead[];
        setStats({
          total: allLeads.length,
          new: allLeads.filter(l => l.status === 'new').length,
          contacted: allLeads.filter(l => l.status === 'contacted').length,
          qualified: allLeads.filter(l => l.status === 'qualified').length,
          converted: allLeads.filter(l => l.status === 'converted').length,
          lost: allLeads.filter(l => l.status === 'lost').length,
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
      // Refetch leads after status change
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

  const statCards = [
    {
      label: 'Total Enquiries',
      value: String(stats.total),
      className: 'bg-white',
    },
    {
      label: 'Qualified',
      value: String(stats.qualified),
      className: 'bg-white',
    },
    { label: 'New', value: String(stats.new), className: 'bg-white' },
    {
      label: 'Converted',
      value: String(stats.converted),
      className: 'bg-white',
    },
  ];

  return (
    <AppLayout>
      <Header
        title="Lead Management"
        description="View and manage all leads across your spaces"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Leads' }]}
        action={{
          label: 'Export Report',
          icon: Download,
          onClick: () => console.log('Export report'),
          className: 'bg-green-500 text-white hover:bg-green-600',
        }}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(stat => (
          <Card key={stat.label} className={`p-6 ${stat.className}`}>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {isLoading ? '-' : stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-6">
        <LeadsFilters />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <LeadsTable
          leads={leads}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
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
    </AppLayout>
  );
}

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <AppLayout>
          <div className="flex h-[80vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </AppLayout>
      }
    >
      <LeadsPageContent />
    </Suspense>
  );
}
