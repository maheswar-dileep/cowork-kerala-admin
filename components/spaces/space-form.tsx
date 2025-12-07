'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { spaceSchema, type SpaceFormData } from '@/lib/validations/space';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

import { BasicInfoTab } from './form-tabs/basic-info-tab';
import { AmenitiesTab } from './form-tabs/amenities-tab';
import { PricingTab } from './form-tabs/pricing-tab';
import { MediaTab } from './form-tabs/media-tab';
import { LocationTab } from './form-tabs/location-tab';
import { ContactTab } from './form-tabs/contact-tab';
import axios from 'axios';
import { Card } from '../ui/card';
import { ISpace } from '@/types';

interface SpaceFormProps {
  initialData?: ISpace;
  isEditing?: boolean;
}

const tabs = [
  'basic-info',
  'amenities',
  'pricing',
  'media',
  'location',
  'contact',
] as const;

export function SpaceForm({ initialData, isEditing = false }: SpaceFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('basic-info');
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<SpaceFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(spaceSchema) as any,
    defaultValues: initialData || {
      spaceName: '',
      spaceType: '',
      city: '',
      spaceCategory: '',
      shortDescription: '',
      longDescription: '',
      amenities: [],
      images: [],
      status: 'pending',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const currentTabIndex = tabs.indexOf(activeTab as (typeof tabs)[number]);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === tabs.length - 1;

  const handleNext = async () => {
    // Trigger validation for the current step if needed, or just let user proceed.
    // For specific tab validation, we might want to check fields relevant to that tab.
    // simpler approach: just move next, validate on submit.
    // Better approach: Trigger validation for current tab fields

    // For now, let's just move next
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1]);
    }
  };

  const onSubmit = async (data: SpaceFormData) => {
    setError(null);
    try {
      const spaceId = initialData?.id || initialData?._id;
      if (isEditing && spaceId) {
        await api.put(`/spaces/${spaceId}`, data);
      } else {
        await api.post('/spaces', data);
      }
      router.push('/spaces');
      router.refresh();
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
          ? err.message
          : 'Something went wrong';
      setError(errorMessage);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">
        {error && (
          <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <Card className="min-h-[600px] flex flex-col border-0 shadow-none md:border md:shadow-sm">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-1 flex-col"
          >
            <div className="px-6 pt-6 mb-6">
              <TabsList className="w-full justify-start h-auto gap-2 bg-transparent p-0 border-b pb-0 rounded-none">
                {tabs.map(tab => {
                  const tabLabel = tab
                    .replace('-', ' ')
                    .replace(/\b\w/g, c => c.toUpperCase());
                  return (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 text-muted-foreground data-[state=active]:text-foreground transition-none"
                    >
                      {tabLabel}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="flex-1 px-6 pb-6">
              <TabsContent
                value="basic-info"
                className="mt-0 outline-none animate-in fade-in-50 duration-300"
              >
                <BasicInfoTab />
              </TabsContent>
              <TabsContent
                value="amenities"
                className="mt-0 outline-none animate-in fade-in-50 duration-300"
              >
                <AmenitiesTab />
              </TabsContent>
              <TabsContent
                value="pricing"
                className="mt-0 outline-none animate-in fade-in-50 duration-300"
              >
                <PricingTab />
              </TabsContent>
              <TabsContent
                value="media"
                className="mt-0 outline-none animate-in fade-in-50 duration-300"
              >
                <MediaTab />
              </TabsContent>
              <TabsContent
                value="location"
                className="mt-0 outline-none animate-in fade-in-50 duration-300"
              >
                <LocationTab />
              </TabsContent>
              <TabsContent
                value="contact"
                className="mt-0 outline-none animate-in fade-in-50 duration-300"
              >
                <ContactTab />
              </TabsContent>
            </div>
          </Tabs>

          {/* Footer Actions */}
          <div className="border-t bg-muted/20 px-6 py-4 flex justify-between items-center rounded-b-lg mt-auto">
            <Button variant="ghost" type="button" onClick={() => router.back()}>
              Cancel
            </Button>

            <div className="flex gap-2">
              {!isFirstTab && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}

              {!isLastTab ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? 'Update Space' : 'Create Space'}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
