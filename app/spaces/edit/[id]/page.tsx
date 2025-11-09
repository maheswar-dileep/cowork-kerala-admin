'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { BasicInfoTab } from '@/components/spaces/form-tabs/basic-info-tab';
import { AmenitiesTab } from '@/components/spaces/form-tabs/amenities-tab';
import { PricingTab } from '@/components/spaces/form-tabs/pricing-tab';
import { MediaTab } from '@/components/spaces/form-tabs/media-tab';
import { LocationTab } from '@/components/spaces/form-tabs/location-tab';
import { ContactTab } from '@/components/spaces/form-tabs/contact-tab';
import { AdditionalTab } from '@/components/spaces/form-tabs/additional-tab';

export default function EditSpacePage() {
  const router = useRouter();
  const params = useParams();
  const spaceId = params.id as string;

  const [activeTab, setActiveTab] = useState('basic-info');
  const [spaceType, setSpaceType] = useState<string>('');

  // TODO: Fetch space data based on spaceId and populate form
  // useEffect(() => {
  //   fetchSpaceData(spaceId);
  // }, [spaceId]);

  const handleClose = () => {
    router.push('/spaces');
  };

  const handleSaveDraft = () => {
    console.log('Save as draft for space:', spaceId);
  };

  const handleUpdate = () => {
    console.log('Update space:', spaceId);
  };

  return (
    <AppLayout>
      <div className="flex min-h-[calc(100vh-180px)] flex-col rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-start justify-between border-b p-6">
          <div>
            <h1 className="text-2xl font-bold">Edit Coworking Space</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Update the details of the coworking space listing
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-1 flex-col"
        >
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 px-6">
            <TabsTrigger value="basic-info" className="rounded-none">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="amenities" className="rounded-none">
              Amenities
            </TabsTrigger>
            <TabsTrigger value="pricing" className="rounded-none">
              Pricing
            </TabsTrigger>
            <TabsTrigger value="media" className="rounded-none">
              Media
            </TabsTrigger>
            <TabsTrigger value="location" className="rounded-none">
              Location
            </TabsTrigger>
            <TabsTrigger value="contact" className="rounded-none">
              Contact
            </TabsTrigger>
            <TabsTrigger value="additional" className="rounded-none">
              Additional
            </TabsTrigger>
          </TabsList>

          {/* Tab Content - Fixed Height */}
          <div className="flex-1 overflow-auto">
            <TabsContent value="basic-info" className="m-0 h-full p-6">
              <BasicInfoTab
                spaceType={spaceType}
                onSpaceTypeChange={setSpaceType}
              />
            </TabsContent>

            <TabsContent value="amenities" className="m-0 h-full p-6">
              <AmenitiesTab />
            </TabsContent>

            <TabsContent value="pricing" className="m-0 h-full p-6">
              <PricingTab spaceType={spaceType} />
            </TabsContent>

            <TabsContent value="media" className="m-0 h-full p-6">
              <MediaTab />
            </TabsContent>

            <TabsContent value="location" className="m-0 h-full p-6">
              <LocationTab />
            </TabsContent>

            <TabsContent value="contact" className="m-0 h-full p-6">
              <ContactTab />
            </TabsContent>

            <TabsContent value="additional" className="m-0 h-full p-6">
              <AdditionalTab />
            </TabsContent>
          </div>
        </Tabs>

        {/* Fixed Bottom Actions */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button
              className="bg-accent hover:bg-accent/90"
              onClick={handleUpdate}
            >
              Update Space
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
