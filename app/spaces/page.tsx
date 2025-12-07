'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { SpacesFilters } from '@/components/spaces/spaces-filters';
import { SpacesTable } from '@/components/spaces/spaces-table';
import { api } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { ISpace } from '@/types';

function SpacesContent() {
  const searchParams = useSearchParams();
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpaces = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      const { data } = await api.get(`/spaces?${params.toString()}`);
      if (data.success) {
        setSpaces(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch spaces:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/spaces/${id}`);
      fetchSpaces();
    } catch (error) {
      console.error('Failed to delete space', error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-240px)] flex-col rounded-lg bg-white">
      {/* Filters Section - Inside white container */}
      <div className="border-b p-6">
        <SpacesFilters />
      </div>

      {/* Table Section - Grows to fill available space */}
      <div className="flex-1 overflow-auto p-6">
        <SpacesTable
          spaces={spaces}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function SpacesPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <Header
        title="Coworking Space Management"
        description="Create, list, and manage coworking spaces, virtual offices, and private offices"
        breadcrumbs={[{ label: 'Dashboard' }, { label: 'Coworking Spaces' }]}
        action={{
          label: 'Add New Space',
          onClick: () => router.push('/spaces/create'),
        }}
      />

      {/* White Background Container with Full Height */}
      <Suspense
        fallback={
          <div className="flex h-[400px] items-center justify-center rounded-lg bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        }
      >
        <SpacesContent />
      </Suspense>
    </AppLayout>
  );
}
