'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ElementType;
    className?: string;
  };
}

export function Header({
  title,
  description,
  breadcrumbs,
  children,
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

        <div className="flex items-center gap-3">
          {children}
          {action && (
            <Button onClick={action.onClick} className={cn(action.className)}>
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
