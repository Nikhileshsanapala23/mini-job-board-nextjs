export default function Loading() {
  const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 dark:before:via-black/60 before:to-transparent';

  const JobCardSkeleton = () => (
    <div className={`relative overflow-hidden rounded-lg border bg-white dark:bg-slate-800 p-6 shadow-sm ${shimmer}`}>
      <div className="h-5 w-3/5 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      <div className="mt-3 h-4 w-2/5 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      <div className="mt-1 h-4 w-1/4 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <aside className="md:col-span-3">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <div className="h-6 w-1/2 mb-4 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
            <div className="space-y-3">
              <div className="h-8 w-full rounded-lg bg-slate-200 dark:bg-slate-700"></div>
              <div className="h-8 w-full rounded-lg bg-slate-200 dark:bg-slate-700"></div>
            </div>
          </div>
        </aside>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
