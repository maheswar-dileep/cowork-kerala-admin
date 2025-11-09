'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { StatCard } from '@/components/dashboard/stat-card';
import { RevenueTrendChart } from '@/components/dashboard/revenue-trend-chart';
import { SpaceTypeChart } from '@/components/dashboard/space-type-chart';
import { TopSpaces } from '@/components/dashboard/top-spaces';
import { CityBookingsChart } from '@/components/dashboard/city-bookings-chart';
import { DollarSign, TrendingUp, Percent, Users } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <Header
        title="Analytics & Reports"
        description="Track performance, revenue and growth metrics"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Analytics' }]}
        action={{
          label: 'Export Report',
          onClick: () => console.log('Export clicked'),
        }}
      />

      {/* Stats Cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="₹62.5L"
          change={{ value: 6.3, label: 'from last month' }}
          icon={DollarSign}
        />
        <StatCard
          title="Avg. Booking Value"
          value="₹12,500"
          change={{ value: 7, label: 'from last month' }}
          icon={TrendingUp}
        />
        <StatCard
          title="Occupancy Rate"
          value="78%"
          change={{ value: 2, label: 'from last month' }}
          icon={Percent}
        />
        <StatCard
          title="New Users"
          value="245"
          change={{ value: -2.4, label: 'from last month' }}
          icon={Users}
        />
      </div>

      {/* Charts Grid */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <RevenueTrendChart />
        <SpaceTypeChart />
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopSpaces />
        <CityBookingsChart />
      </div>
    </AppLayout>
  );
}
