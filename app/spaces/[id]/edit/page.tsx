'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { SpaceForm } from '@/components/spaces/space-form';
import { api } from '@/lib/api';
import { ISpace } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function EditSpacePage() {
  const params = useParams();
  const [space, setSpace] = useState<ISpace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchSpace(params.id as string);
    }
  }, [params.id]);

  const fetchSpace = async (id: string) => {
    try {
      const { data } = await api.get(`/spaces/${id}`);
      if (data.success) {
        setSpace(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch space details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Header
        title="Edit Coworking Space"
        description={`Update details for ${space?.spaceName || 'Space'}`}
        breadcrumbs={[
          { label: 'Dashboard' },
          { label: 'Coworking Spaces', href: '/spaces' },
          { label: 'Edit Space' },
        ]}
      />

      <div className="mx-auto max-w-7xl">
        {space && <SpaceForm initialData={space} isEditing />}
      </div>
    </AppLayout>
  );
}
