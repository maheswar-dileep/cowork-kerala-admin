'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface PricingTabProps {
  spaceType: string;
}

export function PricingTab({ spaceType }: PricingTabProps) {
  const isCoworkingSpace = spaceType === 'coworking-space';
  const isVirtualOffice = spaceType === 'virtual-office';
  const isPrivateOffice = spaceType === 'private-office';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm text-muted-foreground">
        Configure pricing for different space types and services
      </p>

      {/* Coworking Space */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="coworking-space"
            checked={isCoworkingSpace}
            disabled={isCoworkingSpace}
          />
          <label
            htmlFor="coworking-space"
            className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Coworking Space
          </label>
        </div>

        {isCoworkingSpace && (
          <div className="ml-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Hot Desk (per month)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
                <Input placeholder="5000" className="pl-7" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Dedicated Desk (per month)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
                <Input placeholder="8000" className="pl-7" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Cabin Seat (per month)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
                <Input placeholder="12000" className="pl-7" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Total Capacity (persons)
              </label>
              <Input placeholder="50" type="number" />
            </div>
          </div>
        )}
      </div>

      {/* Virtual Office */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="virtual-office"
            checked={isVirtualOffice}
            disabled={isVirtualOffice}
          />
          <label
            htmlFor="virtual-office"
            className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Virtual Office
          </label>
        </div>
        {isVirtualOffice && (
          <p className="ml-6 text-sm text-muted-foreground">
            Virtual Office selected. No additional pricing details required.
          </p>
        )}
      </div>

      {/* Private Office */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="private-office"
            checked={isPrivateOffice}
            disabled={isPrivateOffice}
          />
          <label
            htmlFor="private-office"
            className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Private Office
          </label>
        </div>
        {isPrivateOffice && (
          <p className="ml-6 text-sm text-muted-foreground">
            Private Office selected. No additional pricing details required.
          </p>
        )}
      </div>

      {/* Additional Services - Only for Coworking Space */}
      {isCoworkingSpace && (
        <div className="space-y-4 border-t pt-6">
          <h3 className="font-semibold">Additional Services</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Day Pass Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
                <Input placeholder="500" className="pl-7" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Meeting Room (per hour)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
                <Input placeholder="300" className="pl-7" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Conference Room (per hour)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₹
                </span>
                <Input placeholder="500" className="pl-7" type="number" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
