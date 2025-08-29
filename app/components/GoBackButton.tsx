'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function GoBackButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    // Preserve search params when going back
    const params = searchParams.toString();
    router.push(`/?${params}`);
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
    >
      <ArrowLeft size={16} />
      Back to Jobs
    </button>
  );
}
