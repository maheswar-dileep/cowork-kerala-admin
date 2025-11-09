'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

export function AdditionalTab() {
  const [nearbyLandmarks, setNearbyLandmarks] = useState<string[]>([]);
  const [landmarkInput, setLandmarkInput] = useState('');
  const [specialFeatures, setSpecialFeatures] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [houseRules, setHouseRules] = useState('');

  const addLandmark = () => {
    if (landmarkInput.trim()) {
      setNearbyLandmarks([...nearbyLandmarks, landmarkInput.trim()]);
      setLandmarkInput('');
    }
  };

  const removeLandmark = (index: number) => {
    setNearbyLandmarks(nearbyLandmarks.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm text-muted-foreground">
        Add additional details and policies for the coworking space
      </p>

      {/* Established Year */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Established Year</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Nearby Landmarks */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Nearby Landmarks</label>
        <div className="flex gap-2">
          <Input
            placeholder="Type and press Enter (e.g., Bus Stop, Metro, Railway Station, Airport, etc.)"
            value={landmarkInput}
            onChange={e => setLandmarkInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addLandmark();
              }
            }}
          />
          <Button type="button" onClick={addLandmark}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Add nearby landmarks like Bus Stop, Metro, Railway Station, Airport,
          etc.
        </p>

        {nearbyLandmarks.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {nearbyLandmarks.map((landmark, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-sm"
              >
                {landmark}
                <button
                  type="button"
                  onClick={() => removeLandmark(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Distance from Metro */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Distance from Metro (km)
          </label>
          <Input placeholder="2.5" type="number" step="0.1" />
        </div>

        {/* Distance from Airport */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Distance from Airport (km)
          </label>
          <Input placeholder="15" type="number" step="0.1" />
        </div>
      </div>

      {/* Special Features */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Special Features</label>
          <span className="text-xs text-muted-foreground">
            {specialFeatures.length}/500 characters
          </span>
        </div>
        <Textarea
          placeholder="Describe unique features, awards, certifications, or special offerings"
          className="min-h-[100px] resize-none"
          maxLength={500}
          value={specialFeatures}
          onChange={e => setSpecialFeatures(e.target.value)}
        />
      </div>

      {/* Cancellation Policy */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Cancellation Policy</label>
          <span className="text-xs text-muted-foreground">
            {cancellationPolicy.length}/500 characters
          </span>
        </div>
        <Textarea
          placeholder="Describe the cancellation and refund policy"
          className="min-h-[100px] resize-none"
          maxLength={500}
          value={cancellationPolicy}
          onChange={e => setCancellationPolicy(e.target.value)}
        />
      </div>

      {/* House Rules */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">House Rules</label>
          <span className="text-xs text-muted-foreground">
            {houseRules.length}/500 characters
          </span>
        </div>
        <Textarea
          placeholder="List important rules and guidelines for users"
          className="min-h-[100px] resize-none"
          maxLength={500}
          value={houseRules}
          onChange={e => setHouseRules(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Include rules about noise levels, food/drinks, guest policy, etc.
        </p>
      </div>
    </div>
  );
}
