'use client';

import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

export function PricingTab() {
  const { register, watch } = useFormContext();
  const spaceType = watch('spaceType');

  // Helper to determine if a type is selected or active.
  const isCoworkingSpace = spaceType === 'Coworking Space';
  const isVirtualOffice = spaceType === 'Virtual Office';
  const isPrivateOffice = spaceType === 'Private Office';

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Pricing Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Set up pricing plans for your space. Options are customized based on
          the Space Type selected ({spaceType || 'None'}).
        </p>
      </div>

      {!spaceType && (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
          <p className="text-muted-foreground mb-2">No Space Type Selected</p>
          <p className="text-sm text-muted-foreground/80">
            Please go back to Basic Info and select a space type to configure
            pricing.
          </p>
        </div>
      )}

      {/* Coworking Space Pricing */}
      {isCoworkingSpace && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              Hot Desk (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ₹
              </span>
              <Input
                placeholder="5000"
                className="pl-7"
                type="number"
                {...register('pricing.hotDesk')}
              />
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
              Flexible desk in open area
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              Dedicated Desk (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ₹
              </span>
              <Input
                placeholder="8000"
                className="pl-7"
                type="number"
                {...register('pricing.dedicatedDesk')}
              />
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
              Reserved desk for individual
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              Private Office (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ₹
              </span>
              <Input
                placeholder="12000"
                className="pl-7"
                type="number"
                {...register('pricing.privateOffice')}
              />
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
              Starting price for private cabins
            </p>
          </div>
        </div>
      )}

      {/* Virtual Office Pricing */}
      {isVirtualOffice && (
        <div className="max-w-md">
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              Virtual Office Plan (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ₹
              </span>
              <Input
                placeholder="2000"
                className="pl-7"
                type="number"
                {...register('pricing.privateOffice')}
              />
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
              Standard monthly rate for business address & mail handling
            </p>
          </div>
        </div>
      )}

      {/* Private Office Pricing */}
      {isPrivateOffice && (
        <div className="max-w-md">
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">
              Private Office Rent (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                ₹
              </span>
              <Input
                placeholder="15000"
                className="pl-7"
                type="number"
                {...register('pricing.privateOffice')}
              />
            </div>
            <p className="text-[0.8rem] text-muted-foreground">
              Base monthly rent for private office space
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
