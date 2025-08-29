import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 ${inter.className}`}>
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="text-teal-500" size={28} />
            <span className="text-xl font-bold tracking-tight">JobBoard</span>
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-300"
          >
            Post a Job
          </Link>
        </nav>
      </header>
      {children}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Mini Job Board. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
