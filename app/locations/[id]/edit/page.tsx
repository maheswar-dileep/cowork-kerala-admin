'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { LocationForm } from '@/components/locations/location-form';
import { api } from '@/lib/api';
import { LocationFormData } from '@/lib/validations/location';

export default function EditLocationPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    (LocationFormData & { _id: string }) | undefined
  >(undefined);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await api.get(`/locations/${params.id}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch location:', error);
        router.push('/locations');
      } finally {
        setLoading(false);
      }
    }
    fetchLocation();
  }, [params.id, router]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Header
        title="Edit Location"
        description="Update location details"
        breadcrumbs={[
          { label: 'Locations', href: '/locations' },
          { label: 'Edit' },
        ]}
      />

      <div className="max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {data && <LocationForm initialData={data} isEditing />}
      </div>
    </AppLayout>
  );
}
