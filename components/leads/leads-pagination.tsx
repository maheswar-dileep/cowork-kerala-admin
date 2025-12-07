'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  startEntry: number;
  endEntry: number;
}

export function LeadsPagination({
  currentPage,
  totalPages,
  totalEntries,
  startEntry,
  endEntry,
}: LeadsPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    replace(`${pathname}?${params.toString()}`);
  };

  if (totalEntries === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3">
      <p className="text-sm text-neutral-500">
        <span className="font-medium text-neutral-900">{startEntry}</span>
        {' – '}
        <span className="font-medium text-neutral-900">{endEntry}</span>
        {' of '}
        <span className="font-medium text-neutral-900">{totalEntries}</span>
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="h-8 px-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-1">Prev</span>
        </Button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="h-8 px-2"
        >
          <span className="mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
