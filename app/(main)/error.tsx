'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-5xl font-extrabold text-red-500 tracking-tight">Oops!</h1>
        <h2 className="mt-4 text-2xl font-semibold text-slate-800 dark:text-slate-200">Something went wrong.</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          An unexpected error occurred. We've been notified and are looking into it. Please try again later.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-300"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
