'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
        description="Manage coworking locations"
        breadcrumbs={[{ label: 'Locations' }]}
      >
        <Link href="/locations/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Location
          </Button>
        </Link>
      </Header>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                </TableCell>
              </TableRow>
            ) : locations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <MapPin className="h-8 w-8 text-gray-300" />
                    <p>No locations found. Create one to get started.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              locations.map(location => (
                <TableRow key={location._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {location.image ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={location.image}
                            alt={location.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {location.name}
                        </div>
                        {location.description && (
                          <div className="text-xs text-gray-500 max-w-[200px] truncate">
                            {location.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={location.isActive ? 'default' : 'secondary'}
                      className={
                        location.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                      }
                    >
                      {location.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/locations/${location._id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(location._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
