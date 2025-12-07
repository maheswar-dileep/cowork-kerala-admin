'use client';

import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
interface HeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export function Header({
  title,
  description,
  breadcrumbs,
  children,
}: HeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span>›</span>}
                  <span>{breadcrumb.label}</span>
                </div>
              ))}
            </div>
          )}
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>
    </div>
  );
}
