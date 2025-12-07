'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, MapPin, Loader2, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import Image from 'next/image';

interface Location {
  _id: string;
  name: string;
  isActive: boolean;
  image?: string;
  description?: string;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await api.get('/locations');
      if (res.data.success) {
        setLocations(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) return;
    try {
      await api.delete(`/locations/${id}`);
      fetchLocations();
    } catch (error) {
      console.error('Failed to delete location:', error);
    }
  };

  return (
    <AppLayout>
      <Header
        title="Locations"
        description="Manage coworking locations across Kerala"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Locations' },
        ]}
      >
        <Link href="/locations/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </Link>
      </Header>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      ) : locations.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50">
          <MapPin className="h-10 w-10 text-neutral-300" />
          <p className="mt-3 text-sm font-medium text-neutral-600">
            No locations yet
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            Create your first location to get started
          </p>
          <Link href="/locations/create" className="mt-4">
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map(location => (
            <div
              key={location._id}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-shadow hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-66 bg-neutral-100">
                {location.image ? (
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <MapPin className="h-10 w-10 text-neutral-300" />
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute right-3 top-3">
                  <Badge
                    variant="secondary"
                    className={
                      location.isActive
                        ? 'bg-emerald-100 text-emerald-700 border-0'
                        : 'bg-neutral-100 text-neutral-600 border-0'
                    }
                  >
                    {location.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900">
                  {location.name}
                </h3>
                {location.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                    {location.description}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/locations/${location._id}/edit`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-neutral-600 hover:text-neutral-900"
                    >
                      <Pencil className="mr-2 h-3.5 w-3.5" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                    onClick={() => handleDelete(location._id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
