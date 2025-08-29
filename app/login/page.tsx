'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === 'letmein') {
      setError('');
      Cookies.set('admin', '1', { expires: 1 }); // Expires in 1 day
      const nextUrl = searchParams.get('next') || '/admin';
      router.push(nextUrl);
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Admin Login</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Enter the password to access the admin area.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
