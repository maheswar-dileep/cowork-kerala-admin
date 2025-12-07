'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { SpaceForm } from '@/components/spaces/space-form';

export default function CreateSpacePage() {
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

      <div className="">
        <SpaceForm />
      </div>
    </AppLayout>
  );
}
