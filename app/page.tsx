'use client';

import { useEffect, useState, useCallback } from 'react';
import { Loader2, MapPin, Building2, Users, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
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

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-purple-100 text-purple-700',
  qualified: 'bg-green-100 text-green-700',
  converted: 'bg-teal-100 text-teal-700',
  lost: 'bg-red-100 text-red-700',
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
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </AppLayout>
    );
  }

  const overview = stats?.overview;

  return (
    <AppLayout>
      <Header
        title="Dashboard"
        description="Welcome back! Here's an overview of your coworking spaces"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spaces</p>
              <p className="text-2xl font-semibold text-gray-900">
                {overview?.totalSpaces || 0}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-green-600">
              {overview?.activeSpaces || 0} Active
            </span>
            <span className="text-amber-600">
              {overview?.pendingSpaces || 0} Pending
            </span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-semibold text-gray-900">
                {overview?.totalLeads || 0}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-blue-600">{overview?.newLeads || 0} New</span>
            <span className="text-green-600">
              {overview?.qualifiedLeads || 0} Qualified
            </span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-3">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Locations</p>
              <p className="text-2xl font-semibold text-gray-900">
                {overview?.totalLocations || 0}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">Active cities</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-teal-100 p-3">
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {overview?.conversionRate || '0%'}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            {overview?.convertedLeads || 0} converted leads
          </p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Spaces by Type */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Spaces by Type
          </h3>
          {stats?.charts.spacesByType &&
          stats.charts.spacesByType.length > 0 ? (
            <div className="space-y-3">
              {stats.charts.spacesByType.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${(item.value / (overview?.totalSpaces || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No spaces yet</p>
          )}
        </Card>

        {/* Spaces by City */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Spaces by Location
          </h3>
          {stats?.charts.spacesByCity &&
          stats.charts.spacesByCity.length > 0 ? (
            <div className="space-y-3">
              {stats.charts.spacesByCity.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full bg-green-500"
                        style={{
                          width: `${(item.value / (overview?.totalSpaces || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No locations yet</p>
          )}
        </Card>
      </div>

      {/* Recent Leads */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Recent Leads
        </h3>
        {stats?.recentLeads && stats.recentLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b text-left text-sm text-gray-600">
                <tr>
                  <th className="pb-3 font-medium">Lead ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Enquired For</th>
                  <th className="pb-3 font-medium">Space Type</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {stats.recentLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">
                      {lead.leadId}
                    </td>
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-500">{lead.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">{lead.enquiredFor}</td>
                    <td className="py-3 text-gray-700">{lead.spaceType}</td>
                    <td className="py-3">
                      <Badge
                        className={statusColors[lead.status] || 'bg-gray-100'}
                      >
                        {lead.status.charAt(0).toUpperCase() +
                          lead.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No leads yet</p>
        )}
      </Card>
    </AppLayout>
  );
}
