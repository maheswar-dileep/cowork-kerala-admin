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
import { Checkbox } from '@/components/ui/checkbox';
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
      router.refresh(); // Refresh list
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
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <label className="text-sm font-medium">Cover Image</label>
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Location Name</label>
        <Input {...register('name')} placeholder="e.g. MG Road, Kochi" />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea
          {...register('description')}
          placeholder="Brief description about the location"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          checked={watch('isActive')}
          onCheckedChange={checked => setValue('isActive', checked as boolean)}
        />
        <label
          htmlFor="isActive"
          className="text-sm font-medium cursor-pointer"
        >
          Active Status
        </label>
      </div>

      <div className="flex justify-end gap-3">
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
