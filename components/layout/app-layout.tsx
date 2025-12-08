'use client';

import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';
import { MobileSidebar } from './mobile-sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Mobile Header with Toggle */}
      <div className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-neutral-200 bg-white px-4 md:hidden">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="ml-3">
          <h1 className="text-sm font-bold text-neutral-900">CoWork</h1>
          <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
            Admin
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4 pb-16 pt-[72px] md:ml-60 md:p-8 md:pb-16 md:pt-8">
        {children}
      </main>

      {/* Fixed Footer Branding */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-10 items-center justify-center border-t border-neutral-100 bg-white/80 backdrop-blur-sm md:left-60">
        <p className="text-xs text-neutral-400">
          Powered by{' '}
          <a
            href="https://mastrovia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-500 transition-colors hover:text-emerald-600"
          >
            mastrovia.com
          </a>
        </p>
      </div>
    </div>
  );
}
