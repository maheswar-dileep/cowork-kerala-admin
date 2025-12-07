'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  spaceTypeOptions,
  cityOptions,
  categoryOptions,
} from '@/lib/validations/space';

export function BasicInfoTab() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const formValues = watch();
  const shortDescLength = watch('shortDescription')?.length || 0;
  const longDescLength = watch('longDescription')?.length || 0;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Space Name */}
        <div className="space-y-2">
          <label
            htmlFor="spaceName"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Space Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="spaceName"
            placeholder="e.g. WorkSprout Kochi"
            className={errors.spaceName ? 'border-destructive' : ''}
            {...register('spaceName')}
          />
          {errors.spaceName && (
            <p className="text-xs text-destructive">
              {errors.spaceName.message as string}
            </p>
          )}
        </div>

        {/* Space Type */}
        <div className="space-y-2">
          <label
            htmlFor="spaceType"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Space Type <span className="text-destructive">*</span>
          </label>
          <Select
            value={formValues.spaceType}
            onValueChange={value =>
              setValue('spaceType', value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="spaceType"
              className={errors.spaceType ? 'border-destructive' : ''}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {spaceTypeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.spaceType && (
            <p className="text-xs text-destructive">
              {errors.spaceType.message as string}
            </p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <label
            htmlFor="city"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            City <span className="text-destructive">*</span>
          </label>
          <Select
            value={formValues.city}
            onValueChange={value =>
              setValue('city', value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="city"
              className={errors.city ? 'border-destructive' : ''}
            >
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cityOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-xs text-destructive">
              {errors.city.message as string}
            </p>
          )}
        </div>

        {/* Space Category */}
        <div className="space-y-2">
          <label
            htmlFor="spaceCategory"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Space Category <span className="text-destructive">*</span>
          </label>
          <Select
            value={formValues.spaceCategory}
            onValueChange={value =>
              setValue('spaceCategory', value, { shouldValidate: true })
            }
          >
            <SelectTrigger
              id="spaceCategory"
              className={errors.spaceCategory ? 'border-destructive' : ''}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.spaceCategory && (
            <p className="text-xs text-destructive">
              {errors.spaceCategory.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="shortDescription"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Short Description
          </label>
          <span className="text-xs text-muted-foreground">
            {shortDescLength}/200
          </span>
        </div>
        <Textarea
          id="shortDescription"
          placeholder="Brief catchy description for card views..."
          className={`min-h-[80px] resize-none ${errors.shortDescription ? 'border-destructive' : ''}`}
          maxLength={200}
          {...register('shortDescription')}
        />
        {errors.shortDescription && (
          <p className="text-xs text-destructive">
            {errors.shortDescription.message as string}
          </p>
        )}
      </div>

      {/* Long Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="longDescription"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Long Description
          </label>
          <span className="text-xs text-muted-foreground">
            {longDescLength}/1000
          </span>
        </div>
        <Textarea
          id="longDescription"
          placeholder="Detailed description of the space, facilities, community, and what makes it unique..."
          className={`min-h-[200px] resize-y ${errors.longDescription ? 'border-destructive' : ''}`}
          maxLength={1000}
          {...register('longDescription')}
        />
        {errors.longDescription && (
          <p className="text-xs text-destructive">
            {errors.longDescription.message as string}
          </p>
        )}
        <p className="text-[0.8rem] text-muted-foreground">
          Markdown is supported. Describe the vibe, the community, and the
          amenities in detail.
        </p>
      </div>
    </div>
  );
}
