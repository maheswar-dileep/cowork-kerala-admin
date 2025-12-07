'use client';

import { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

interface DashboardStats {
  overview: {
    totalSpaces: number;
    activeSpaces: number;
    pendingSpaces: number;
    inactiveSpaces: number;
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    totalLocations: number;
    conversionRate: string;
  };
  charts: {
    spacesByType: { name: string; value: number }[];
    spacesByCity: { name: string; value: number }[];
    leadsByStatus: { name: string; value: number }[];
  };
  recentLeads: {
    id: string;
    leadId: string;
    name: string;
    email: string;
    enquiredFor: string;
    spaceType: string;
    status: string;
    createdAt: string;
  }[];
}

const statusBadge: Record<string, string> = {
  new: 'bg-sky-50 text-sky-700 border-sky-200',
  contacted: 'bg-violet-50 text-violet-700 border-violet-200',
  qualified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  converted: 'bg-amber-50 text-amber-700 border-amber-200',
  lost: 'bg-rose-50 text-rose-700 border-rose-200',
};

const LEAD_COLORS: Record<string, string> = {
  new: '#0ea5e9',
  contacted: '#8b5cf6',
  qualified: '#10b981',
  converted: '#f59e0b',
  lost: '#f43f5e',
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/dashboard/stats');
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      </AppLayout>
    );
  }

  const overview = stats?.overview;

  const leadStatusData =
    stats?.charts.leadsByStatus?.map(item => ({
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      value: item.value,
      fill: LEAD_COLORS[item.name] || '#71717a',
    })) || [];

  return (
    <AppLayout>
      <Header
        title="Dashboard"
        description="Your coworking business at a glance"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <div className="space-y-8">
        {/* Hero Stats */}
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Spaces
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.totalSpaces || 0}
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              <span className="font-medium text-emerald-600">
                {overview?.activeSpaces || 0}
              </span>{' '}
              active ·{' '}
              <span className="font-medium text-amber-600">
                {overview?.pendingSpaces || 0}
              </span>{' '}
              pending
            </p>
          </div>

          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Leads
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.totalLeads || 0}
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              <span className="font-medium text-sky-600">
                {overview?.newLeads || 0}
              </span>{' '}
              new ·{' '}
              <span className="font-medium text-emerald-600">
                {overview?.qualifiedLeads || 0}
              </span>{' '}
              qualified
            </p>
          </div>

          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Locations
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.totalLocations || 0}
            </p>
            <p className="mt-3 text-sm text-neutral-600">Cities in Kerala</p>
          </div>

          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Conversion
            </span>
            <p className="mt-2 text-4xl font-light tabular-nums">
              {overview?.conversionRate || '0%'}
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              {overview?.convertedLeads || 0} leads converted
            </p>
          </div>
        </div>

        {/* Secondary Stats Grid - Same style as hero */}
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {/* Space Types */}
          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Space Types
            </span>
            <div className="mt-4 space-y-2">
              {stats?.charts.spacesByType &&
              stats.charts.spacesByType.length > 0 ? (
                stats.charts.spacesByType.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-600">
                      {item.name}
                    </span>
                    <span className="text-lg font-light tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No data</p>
              )}
            </div>
          </div>

          {/* Lead Pipeline */}
          <div className="bg-white p-6">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Lead Pipeline
            </span>
            <div className="mt-4 space-y-2">
              {leadStatusData.length > 0 ? (
                leadStatusData.map((item, i) => (
                  <div key={i} className="flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-sm text-neutral-600">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-lg font-light tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No data</p>
              )}
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white p-6 sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              By Location
            </span>
            <div className="mt-4 space-y-2">
              {stats?.charts.spacesByCity &&
              stats.charts.spacesByCity.length > 0 ? (
                stats.charts.spacesByCity.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-baseline justify-between">
                    <span className="text-sm text-neutral-600">
                      {item.name}
                    </span>
                    <span className="text-lg font-light tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No data</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Enquiries - Clean table */}
        <div className="overflow-hidden rounded-2xl border bg-neutral-200">
          <div className="bg-white">
            <div className="border-b px-6 py-4">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Recent Enquiries
              </span>
            </div>
            {stats?.recentLeads && stats.recentLeads.length > 0 ? (
              <div className="divide-y">
                {stats.recentLeads.map(lead => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-neutral-900">
                        {lead.name}
                      </p>
                      <p className="mt-0.5 text-sm text-neutral-500">
                        {lead.enquiredFor} · {lead.spaceType}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`ml-4 shrink-0 font-normal ${statusBadge[lead.status] || ''}`}
                    >
                      {lead.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-sm text-neutral-500">
                No enquiries yet
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
