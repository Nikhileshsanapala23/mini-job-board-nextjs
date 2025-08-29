export default function LoadingJobDetail() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-6"></div>
        
        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
        </div>

        <div className="space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mt-6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
