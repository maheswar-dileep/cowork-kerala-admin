'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function LocationTab() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm text-muted-foreground">
        Provide detailed location information for the coworking space
      </p>

      {/* Complete Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Complete Address <span className="text-destructive">*</span>
        </label>
        <Textarea
          placeholder="Building name, street, area"
          className="min-h-[100px] resize-none"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Landmark */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Landmark</label>
          <Input placeholder="Near major landmark" />
        </div>

        {/* Pin Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Pin Code <span className="text-destructive">*</span>
          </label>
          <Input placeholder="682001" type="text" maxLength={6} />
        </div>
      </div>

      {/* Google Maps Embed Link */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Google Maps Embed Link</label>
        <Input
          placeholder="https://www.google.com/maps/embed?pb=..."
          type="url"
        />
        <p className="text-xs text-muted-foreground">
          Get the embed link from Google Maps → Share → Embed a map
        </p>
      </div>
    </div>
  );
}
