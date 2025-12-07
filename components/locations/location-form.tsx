'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  locationSchema,
  type LocationFormData,
} from '@/lib/validations/location';
import { api } from '@/lib/api';
import { ImageUpload } from '@/components/ui/image-upload';

interface LocationFormProps {
  initialData?: LocationFormData & { _id?: string };
  isEditing?: boolean;
}

export function LocationForm({
  initialData,
  isEditing = false,
}: LocationFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      image: '',
      isActive: true,
    },
  });

  const onSubmit = async (data: LocationFormData) => {
    setError(null);
    try {
      if (isEditing && initialData?._id) {
        await api.put(`/locations/${initialData._id}`, data);
      } else {
        await api.post('/locations', data);
      }
      router.push('/locations');
      router.refresh();
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'Something went wrong';
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Cover Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">
          Cover Image
        </label>
        <ImageUpload
          value={watch('image')}
          onChange={url => setValue('image', url)}
          folder="locations"
          disabled={isSubmitting}
        />
        {errors.image && (
          <p className="text-sm text-red-500">{errors.image.message}</p>
        )}
      </div>

      {/* Location Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">
          Location Name
        </label>
        <Input
          {...register('name')}
          placeholder="e.g. Kochi, Trivandrum, Kozhikode"
          className="h-11"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">
          Description
        </label>
        <Textarea
          {...register('description')}
          placeholder="Brief description about this location"
          className="min-h-[100px] resize-none"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Active Status */}
      <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4">
        <div>
          <p className="text-sm font-medium text-neutral-900">Active Status</p>
          <p className="text-sm text-neutral-500">
            Make this location visible on the website
          </p>
        </div>
        <Switch
          checked={watch('isActive')}
          onCheckedChange={checked => setValue('isActive', checked)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? 'Update Location' : 'Create Location'}
        </Button>
      </div>
    </form>
  );
}
