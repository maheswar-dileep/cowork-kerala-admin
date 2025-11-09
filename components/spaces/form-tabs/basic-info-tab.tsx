'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface BasicInfoTabProps {
  spaceType: string;
  onSpaceTypeChange: (value: string) => void;
}

export function BasicInfoTab({
  spaceType,
  onSpaceTypeChange,
}: BasicInfoTabProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Space Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Space Name <span className="text-destructive">*</span>
          </label>
          <Input placeholder="Enter space name" />
        </div>

        {/* Space Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Space Type <span className="text-destructive">*</span>
          </label>
          <Select value={spaceType} onValueChange={onSpaceTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select space type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coworking-space">Coworking Space</SelectItem>
              <SelectItem value="virtual-office">Virtual Office</SelectItem>
              <SelectItem value="private-office">Private Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            City <span className="text-destructive">*</span>
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kochi">Kochi</SelectItem>
              <SelectItem value="trivandrum">Trivandrum</SelectItem>
              <SelectItem value="kozhikode">Kozhikode</SelectItem>
              <SelectItem value="thrissur">Thrissur</SelectItem>
              <SelectItem value="kannur">Kannur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Space Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Space Category <span className="text-destructive">*</span>
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="budget">Budget</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Short Description <span className="text-destructive">*</span>
          </label>
          <span className="text-xs text-muted-foreground">
            0/200 characters
          </span>
        </div>
        <Textarea
          placeholder="Brief description of the space"
          className="min-h-[80px] resize-none"
          maxLength={200}
        />
      </div>

      {/* Long Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Long Description <span className="text-destructive">*</span>
          </label>
          <span className="text-xs text-muted-foreground">
            0/1000 characters
          </span>
        </div>
        <Textarea
          placeholder="Detailed description of the space, facilities, and unique features"
          className="min-h-[150px] resize-none"
          maxLength={1000}
        />
        <p className="text-xs text-muted-foreground">
          Describe your space in detail. Include information about the location,
          facilities, and what makes it unique.
        </p>
      </div>
    </div>
  );
}
