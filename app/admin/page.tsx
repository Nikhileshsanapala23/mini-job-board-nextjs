import JobForm from '@/app/components/JobForm';
import { createJob } from './actions';

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Create a new job listing.</p>
      </div>
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <JobForm action={createJob} />
      </div>
    </div>
  );
}
