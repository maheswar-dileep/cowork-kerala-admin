'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-4 md:flex-row rounded-b-lg">
      <p className="text-sm text-gray-600">
        Showing {startEntry} to {endEntry} of {totalEntries} entries
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              className={
                currentPage === page
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-white'
              }
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
