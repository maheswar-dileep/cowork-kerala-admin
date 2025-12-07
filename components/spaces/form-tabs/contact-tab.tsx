'use client';

import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import type { SpaceFormData } from '@/lib/validations/space';

export function ContactTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SpaceFormData>();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <p className="text-sm text-muted-foreground">
          Add contact details for potential customers to reach out to this space
          directly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Person Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Contact Person Name <span className="text-destructive">*</span>
          </label>
          <Input
            placeholder="e.g. John Doe"
            className={errors.contact?.name ? 'border-destructive' : ''}
            {...register('contact.name')}
          />
          {errors.contact?.name && (
            <p className="text-xs text-destructive">
              {errors.contact.name.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <Input
            placeholder="+91 9876543210"
            type="tel"
            className={errors.contact?.phone ? 'border-destructive' : ''}
            {...register('contact.phone')}
          />
          {errors.contact?.phone && (
            <p className="text-xs text-destructive">
              {errors.contact.phone.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email Address <span className="text-destructive">*</span>
          </label>
          <Input
            placeholder="info@workhub.com"
            type="email"
            className={errors.contact?.email ? 'border-destructive' : ''}
            {...register('contact.email')}
          />
          {errors.contact?.email && (
            <p className="text-xs text-destructive">
              {errors.contact.email.message}
            </p>
          )}
        </div>

        {/* Website URL - Optional */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Website URL
          </label>
          <Input
            placeholder="https://www.workhub.com"
            type="url"
            {...register('website')}
          />
        </div>
      </div>
    </div>
  );
}
