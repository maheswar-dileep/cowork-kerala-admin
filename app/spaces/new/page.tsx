'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { BasicInfoTab } from '@/components/spaces/form-tabs/basic-info-tab';
import { AmenitiesTab } from '@/components/spaces/form-tabs/amenities-tab';
import { PricingTab } from '@/components/spaces/form-tabs/pricing-tab';
import { MediaTab } from '@/components/spaces/form-tabs/media-tab';
import { LocationTab } from '@/components/spaces/form-tabs/location-tab';
import { ContactTab } from '@/components/spaces/form-tabs/contact-tab';
import { AdditionalTab } from '@/components/spaces/form-tabs/additional-tab';

export default function NewSpacePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic-info');
  const [spaceType, setSpaceType] = useState<string>('');

  const handleSaveDraft = () => {
    console.log('Save as draft');
  };

  const handlePublish = () => {
    console.log('Publish space');
  };

  return (
    <AppLayout>
      <Header
        title="Add New Coworking Space"
        description="Fill in the details to create a coworking space listing"
        breadcrumbs={[
          { label: 'Dashboard' },
          { label: 'Coworking Spaces', href: '/spaces' },
          { label: 'Add New' },
        ]}
      />

      <div className="flex min-h-[calc(100vh-240px)] flex-col rounded-lg bg-white">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-1 flex-col"
        >
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 px-6 h-auto gap-1">
            <TabsTrigger
              value="basic-info"
              className="rounded-none border-b-2 border-transparent pb-3 pt-4 px-4 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="amenities"
              className="rounded-none border-b-2 border-transparent pb-3 pt-4 px-4 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900"
            >
              Amenities
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="rounded-none border-b-2 border-transparent pb-3 pt-4 px-4 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900"
            >
              Pricing
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-none border-b-2 border-transparent pb-3 pt-4 px-4 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900"
            >
              Media
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="rounded-none border-b-2 border-transparent pb-3 pt-4 px-4 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900"
            >
              Location
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="rounded-none border-b-2 border-transparent pb-3 pt-4 px-4 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900"
            >
              Contact
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className="rounded-none border-b-2 border-transparent pb-3 pt-4 px-4 data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900"
            >
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
        <div className="flex items-center justify-between border-t bg-white px-6 py-4">
          <Button variant="ghost" onClick={() => router.push('/spaces')}>
            Cancel
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handlePublish}
            >
              Publish Space
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
