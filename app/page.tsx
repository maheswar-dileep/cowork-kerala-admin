'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Loader2,
  MapPin,
  Building2,
  Users,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const CHART_COLORS = [
  '#3b82f6',
  '#10b981',
  '#8b5cf6',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
];

const LEAD_STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#8b5cf6',
  qualified: '#10b981',
  converted: '#14b8a6',
  lost: '#ef4444',
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
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AppLayout>
    );
  }

  const overview = stats?.overview;

  // Prepare lead status chart data
  const leadStatusData =
    stats?.charts.leadsByStatus?.map(item => ({
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      value: item.value,
      fill: LEAD_STATUS_COLORS[item.name] || '#6b7280',
    })) || [];

  return (
    <AppLayout>
      <Header
        title="Dashboard"
        description="Overview of your coworking space operations"
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Spaces
                  </p>
                  <p className="text-3xl font-bold">
                    {overview?.totalSpaces || 0}
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {overview?.activeSpaces || 0} Active
                </span>
                <span className="flex items-center gap-1 text-amber-600">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {overview?.pendingSpaces || 0} Pending
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Leads
                  </p>
                  <p className="text-3xl font-bold">
                    {overview?.totalLeads || 0}
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-blue-600">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  {overview?.newLeads || 0} New
                </span>
                <span className="flex items-center gap-1 text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {overview?.qualifiedLeads || 0} Qualified
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Locations
                  </p>
                  <p className="text-3xl font-bold">
                    {overview?.totalLocations || 0}
                  </p>
                </div>
                <div className="rounded-full bg-purple-100 p-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Active cities across Kerala
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </p>
                  <p className="text-3xl font-bold">
                    {overview?.conversionRate || '0%'}
                  </p>
                </div>
                <div className="rounded-full bg-teal-100 p-3">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3" />
                {overview?.convertedLeads || 0} converted
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Spaces by Type - Bar Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Spaces by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.charts.spacesByType &&
              stats.charts.spacesByType.length > 0 ? (
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.charts.spacesByType}
                      layout="vertical"
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        width={100}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
                  No spaces data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leads by Status - Pie Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Lead Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leadStatusData.length > 0 ? (
                <div className="flex h-[200px] items-center">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={leadStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {leadStatusData.map((entry, index) => (
                            <Cell key={index} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-2">
                    {leadStatusData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: item.fill }}
                          />
                          <span className="text-muted-foreground">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
                  No leads data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Spaces by City */}
        {stats?.charts.spacesByCity && stats.charts.spacesByCity.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">
                Spaces by Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.charts.spacesByCity}
                    margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                      {stats.charts.spacesByCity.map((_, index) => (
                        <Cell
                          key={index}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Leads */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              Recent Leads
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {stats?.recentLeads && stats.recentLeads.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left text-xs font-medium text-muted-foreground">
                      <th className="px-6 py-3">Lead ID</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Enquired For</th>
                      <th className="px-6 py-3">Space Type</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {stats.recentLeads.map(lead => (
                      <tr
                        key={lead.id}
                        className="transition-colors hover:bg-muted/50"
                      >
                        <td className="px-6 py-4 font-medium">{lead.leadId}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {lead.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {lead.enquiredFor}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {lead.spaceType}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="secondary"
                            className={
                              statusColors[lead.status] || 'bg-gray-100'
                            }
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
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No leads yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
