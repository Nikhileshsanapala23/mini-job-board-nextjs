import { notFound } from 'next/navigation';
import { Clock, MapPin, Briefcase } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Job } from '@/lib/types';
import GoBackButton from '@/app/components/GoBackButton';

async function getJob(id: string): Promise<Job | null> {
  // In a real app, you'd fetch from your API
  // For this assignment, we import directly to simulate a direct data layer access
  const { jobs } = await import('@/data/jobs');
  const job = jobs.find((job) => job.id === id);
  return job || null;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) {
    return { title: 'Job Not Found' };
  }
  return {
    title: `${job.title} at ${job.company}`,
    description: job.description.substring(0, 160),
  };
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  const postedAt = new Date(job.postedAt);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <header className="bg-white dark:bg-slate-800/50 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
           <GoBackButton />
        </div>
      </header>
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{job.title}</h1>
          <h2 className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-300">{job.company}</h2>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Briefcase size={16} />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>Posted {formatDistanceToNow(postedAt, { addSuffix: true })}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {job.tags.map((tag) => (
              <span key={tag} className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-teal-900 dark:text-teal-300">
                {tag}
              </span>
            ))}
          </div>

          <hr className="my-8 border-slate-200 dark:border-slate-700" />

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Job Description</h3>
            <p>{job.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
