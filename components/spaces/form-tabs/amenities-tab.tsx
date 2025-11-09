'use client';

import { Checkbox } from '@/components/ui/checkbox';

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
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm text-muted-foreground">
        Select all amenities and features available at this coworking space
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Infrastructure */}
        <div className="space-y-4">
          <h3 className="font-semibold">Infrastructure</h3>
          <div className="space-y-3">
            {amenitiesData.infrastructure.map(item => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item} />
                <label
                  htmlFor={item}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Workspace Features */}
        <div className="space-y-4">
          <h3 className="font-semibold">Workspace Features</h3>
          <div className="space-y-3">
            {amenitiesData.workspaceFeatures.map(item => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item} />
                <label
                  htmlFor={item}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Office Facilities */}
        <div className="space-y-4">
          <h3 className="font-semibold">Office Facilities</h3>
          <div className="space-y-3">
            {amenitiesData.officeFacilities.map(item => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item} />
                <label
                  htmlFor={item}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h3 className="font-semibold">Amenities</h3>
          <div className="space-y-3">
            {amenitiesData.amenities.map(item => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item} />
                <label
                  htmlFor={item}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
