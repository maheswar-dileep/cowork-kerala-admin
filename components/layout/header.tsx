'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface HeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: {
    label: string;
    onClick?: () => void;
  };
}

export function Header({
  title,
  description,
  breadcrumbs,
  action,
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

        {action && (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground"
            >
              Last 30 days
            </Button>
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90"
              onClick={action.onClick}
            >
              <Download className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{action.label}</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
