'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from 'react-hook-form';

const amenitiesData = {
  infrastructure: [
    'High-Speed WiFi',
    'Power Backup',
    '24/7 Access',
    'CCTV Security',
    'Parking Available',
    'Elevator Access',
    'Wheelchair Accessible',
  ],
  workspaceFeatures: [
    'Meeting Rooms',
    'Private Cabins',
    'Hot Desks',
    'Dedicated Desks',
    'Conference Room',
    'Event Space',
    'Phone Booths',
  ],
  officeFacilities: [
    'Printer & Scanner',
    'Projector',
    'Whiteboard',
    'Lockers',
    'Mail Handling',
    'Reception Service',
    'IT Support',
  ],
  amenities: [
    'Cafeteria/Kitchen',
    'Tea/Coffee',
    'Air Conditioning',
    'Natural Lighting',
    'Breakout Areas',
    'Gaming Zone',
    'Outdoor Seating',
  ],
};

export function AmenitiesTab() {
  const { watch, setValue } = useFormContext();
  const selectedAmenities = watch('amenities') || [];

  const toggleAmenity = (amenity: string, checked: boolean) => {
    if (checked) {
      setValue('amenities', [...selectedAmenities, amenity]);
    } else {
      setValue(
        'amenities',
        selectedAmenities.filter((a: string) => a !== amenity)
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Amenities & Features</h3>
        <p className="text-sm text-muted-foreground">
          Select all the amenities and features that are available at your
          coworking space.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Infrastructure */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur py-2 z-10 border-b">
            Infrastructure
          </h4>
          <div className="space-y-3 pt-1">
            {amenitiesData.infrastructure.map(item => (
              <div key={item} className="flex items-start space-x-2">
                <Checkbox
                  id={item}
                  checked={selectedAmenities.includes(item)}
                  onCheckedChange={checked =>
                    toggleAmenity(item, checked as boolean)
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor={item}
                  className="text-sm font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Features */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur py-2 z-10 border-b">
            Workspace Features
          </h4>
          <div className="space-y-3 pt-1">
            {amenitiesData.workspaceFeatures.map(item => (
              <div key={item} className="flex items-start space-x-2">
                <Checkbox
                  id={item}
                  checked={selectedAmenities.includes(item)}
                  onCheckedChange={checked =>
                    toggleAmenity(item, checked as boolean)
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor={item}
                  className="text-sm font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Office Facilities */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur py-2 z-10 border-b">
            Office Facilities
          </h4>
          <div className="space-y-3 pt-1">
            {amenitiesData.officeFacilities.map(item => (
              <div key={item} className="flex items-start space-x-2">
                <Checkbox
                  id={item}
                  checked={selectedAmenities.includes(item)}
                  onCheckedChange={checked =>
                    toggleAmenity(item, checked as boolean)
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor={item}
                  className="text-sm font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur py-2 z-10 border-b">
            Amenities
          </h4>
          <div className="space-y-3 pt-1">
            {amenitiesData.amenities.map(item => (
              <div key={item} className="flex items-start space-x-2">
                <Checkbox
                  id={item}
                  checked={selectedAmenities.includes(item)}
                  onCheckedChange={checked =>
                    toggleAmenity(item, checked as boolean)
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor={item}
                  className="text-sm font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
