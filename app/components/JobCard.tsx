'use client';

import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Job } from '@/lib/types';

interface JobCardProps {
  job: Job;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function JobCard({ job, searchParams: serverSearchParams }: JobCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const clientSearchParams = useSearchParams();

  // Combine server and client search params for filtering logic
  const currentParams = new URLSearchParams(clientSearchParams.toString());
  if (serverSearchParams) {
      Object.entries(serverSearchParams).forEach(([key, value]) => {
          if (value && !currentParams.has(key)) {
              currentParams.set(key, Array.isArray(value) ? value.join(',') : value);
          }
      });
  }

  const titleFilter = currentParams.get('title')?.toLowerCase();
  const locationFilter = currentParams.get('location')?.toLowerCase();
  const tagFilter = currentParams.get('tags')?.toLowerCase().split(',');

  const isVisible = () => {
    if (titleFilter && !job.title.toLowerCase().includes(titleFilter)) return false;
    if (locationFilter && !job.location.toLowerCase().includes(locationFilter)) return false;
    if (tagFilter && !job.tags.some(tag => tagFilter.includes(tag.toLowerCase()))) return false;
    return true;
  };

  if (!isVisible()) {
    return null;
  }
  
  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(clientSearchParams);
    params.set('tags', tag.toLowerCase());
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const postedAt = new Date(job.postedAt);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              <Link
                href={`/jobs/${job.id}?${currentParams.toString()}`}
                className="hover:text-teal-500 transition-colors"
              >
                {job.title}
              </Link>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{job.company}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{formatDistanceToNow(postedAt, { addSuffix: true })}</span>
          </div>
        </div>
      </div>
      <div className="px-6 pt-4 pb-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-2">
          {job.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-slate-700 dark:text-slate-300 hover:bg-teal-100 dark:hover:bg-teal-900 hover:text-teal-800 dark:hover:text-teal-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
