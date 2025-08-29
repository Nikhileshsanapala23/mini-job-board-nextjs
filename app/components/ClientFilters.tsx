'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, MapPin } from 'lucide-react';

export default function ClientFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string, field: 'title' | 'location') => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(field, term);
    } else {
      params.delete(field);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="title-search">Job Title</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="title-search"
              className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 pl-10 py-2 text-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="e.g. Frontend Developer"
              defaultValue={searchParams.get('title')?.toString()}
              onChange={(e) => handleSearch(e.target.value, 'title')}
            />
          </div>
        </div>
        <div>
          <label htmlFor="location-search">Location</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin className="h-5 w-5 text-slate-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              id="location-search"
              className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 pl-10 py-2 text-sm focus:border-teal-500 focus:ring-teal-500"
              placeholder="e.g. New York"
              defaultValue={searchParams.get('location')?.toString()}
              onChange={(e) => handleSearch(e.target.value, 'location')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
