'use client';

import { Input } from '@/components/ui/input';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { statuses } from '@/lib/data/spaces';

export function SpacesFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    // Reset to page 1 when searching
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search spaces..."
            className="pl-9"
            defaultValue={searchParams.get('search')?.toString()}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-4">
          <Select
            defaultValue={searchParams.get('status') || 'all'}
            onValueChange={value => handleFilter('status', value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map(status => (
                <SelectItem
                  key={status}
                  value={status.toLowerCase().replace(/\s+/g, '-')}
                >
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Show Entries */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              defaultValue={searchParams.get('limit') || '10'}
              onValueChange={value => handleFilter('limit', value)}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">entries</span>
          </div>
        </div>
      </div>
    </div>
  );
}
