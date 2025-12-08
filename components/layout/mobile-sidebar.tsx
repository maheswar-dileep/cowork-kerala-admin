'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Building2,
  UserPlus,
  Settings,
  LogOut,
  MapPin,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Locations',
    href: '/locations',
    icon: MapPin,
  },
  {
    name: 'Spaces',
    href: '/spaces',
    icon: Building2,
  },
  {
    name: 'Leads',
    href: '/leads',
    icon: UserPlus,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleNavClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-72 transform border-r border-neutral-200 bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header with close button */}
          <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-5">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-sm font-bold text-neutral-900">CoWork</h1>
                <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                  Admin
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <div className="space-y-1">
              {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-all',
                      isActive
                        ? 'bg-emerald-50 font-medium text-emerald-700'
                        : 'font-normal text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5',
                        isActive ? 'text-emerald-600' : 'text-neutral-400'
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="border-t border-neutral-100 px-3 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-normal text-neutral-500 transition-all hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
