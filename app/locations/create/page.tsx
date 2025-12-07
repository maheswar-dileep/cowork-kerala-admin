'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { LocationForm } from '@/components/locations/location-form';

export default function CreateLocationPage() {
  return (
    <AppLayout>
      <Header
        title="Create Location"
        description="Add a new city or area"
        breadcrumbs={[
          { label: 'Locations', href: '/locations' },
          { label: 'Create' },
        ]}
      />

      <div className="max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <LocationForm />
      </div>
    </AppLayout>
  );
}
