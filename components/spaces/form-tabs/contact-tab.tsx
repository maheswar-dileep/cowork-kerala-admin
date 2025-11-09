'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function ContactTab() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm text-muted-foreground">
        Add contact information and working hours for the coworking space
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Contact Person Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Contact Person Name <span className="text-destructive">*</span>
          </label>
          <Input placeholder="John Doe" />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <Input placeholder="+91 9876543210" type="tel" />
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium">WhatsApp Number</label>
          <Input placeholder="+91 9876543210" type="tel" />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email Address <span className="text-destructive">*</span>
          </label>
          <Input placeholder="info@workhub.com" type="email" />
        </div>
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Website URL</label>
        <Input placeholder="https://www.workhub.com" type="url" />
      </div>

      {/* Working Days */}
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Working Days <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {weekDays.map(day => (
            <div key={day} className="flex items-center space-x-2">
              <Checkbox
                id={day}
                defaultChecked={![' Saturday', 'Sunday'].includes(day)}
              />
              <label
                htmlFor={day}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {day}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Opening Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Opening Time <span className="text-destructive">*</span>
          </label>
          <Input type="time" defaultValue="09:00" />
        </div>

        {/* Closing Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Closing Time <span className="text-destructive">*</span>
          </label>
          <Input type="time" defaultValue="18:00" />
        </div>
      </div>

      {/* 24/7 Open Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="24-7-open" />
        <label
          htmlFor="24-7-open"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          This space is open 24/7
        </label>
      </div>
    </div>
  );
}
