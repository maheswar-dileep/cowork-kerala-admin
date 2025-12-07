'use client';

import { useFormContext } from 'react-hook-form';
import { MapPin, Navigation, Map } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { SpaceFormData } from '@/lib/validations/space';

export function LocationTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SpaceFormData>();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Location Details</h3>
        <p className="text-sm text-muted-foreground">
          Detailed location information helps potential members find us easily.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Address Card */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-base">Address Information</CardTitle>
                <CardDescription>
                  Official postal address of the space
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Complete Address <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="Building Name, Street Number, Area, City..."
                className={`min-h-[100px] resize-none ${errors.location?.address ? 'border-destructive' : ''}`}
                {...register('location.address')}
              />
              {errors.location?.address && (
                <p className="text-xs text-destructive">
                  {errors.location.address.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Landmark (Optional)
                </label>
                <Input
                  placeholder="e.g. Near Central Metro Station"
                  {...register('location.landmark')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Pin Code <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="682001"
                  maxLength={6}
                  className={
                    errors.location?.pincode ? 'border-destructive' : ''
                  }
                  {...register('location.pincode')}
                />
                {errors.location?.pincode && (
                  <p className="text-xs text-destructive">
                    {errors.location.pincode.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coordinates Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                <Navigation className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-base">
                  Geographic Coordinates
                </CardTitle>
                <CardDescription>
                  Precise location for map services
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Latitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="9.9312"
                  {...register('location.latitude')}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Longitude
                </label>
                <Input
                  type="number"
                  step="any"
                  placeholder="76.2673"
                  {...register('location.longitude')}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              You can find these by right-clicking a point in Google Maps.
            </p>
          </CardContent>
        </Card>

        {/* Maps Link Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
                <Map className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-base">Map Embed</CardTitle>
                <CardDescription>Google Maps embed URL</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Embed URL
              </label>
              <Input
                placeholder="https://www.google.com/maps/embed?pb=..."
                type="url"
                {...register('location.googleMapsUrl')}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Share → Embed a map → Copy HTML (src attribute only)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
