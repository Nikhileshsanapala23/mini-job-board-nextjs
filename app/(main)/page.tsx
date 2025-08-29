import { Suspense } from 'react';
import ClientFilters from '@/app/components/ClientFilters';
import JobCard from '@/app/components/JobCard';
import type { Job } from '@/lib/types';

// ISR Configuration
export const revalidate = 60; // Revalidate every 60 seconds

async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }
  const data = await res.json();
  return data.jobs;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const jobs = await getJobs();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">Find Your Next Opportunity</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Browse our curated list of jobs from top companies.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-3 lg:col-span-3">
          <div className="sticky top-24">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ClientFilters />
            </Suspense>
          </div>
        </aside>
        <section className="md:col-span-9 lg:col-span-9">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.length > 0 ? (
               jobs.map((job) => <JobCard key={job.id} job={job} searchParams={searchParams} />)
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
          {/* Pagination could go here */}
        </section>
      </div>
    </main>
  );
}
