'use client';

import { useFormState, useFormStatus } from 'react-dom';
import type { FormState } from '@/app/admin/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus:ring-slate-300"
    >
      {pending ? 'Creating Job...' : 'Create Job'}
    </button>
  );
}

const initialState: FormState = {
  message: '',
};

export default function JobForm({ action }: { action: (prevState: FormState, formData: FormData) => Promise<FormState> }) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
        />
        {state.errors?.title && <p className="mt-1 text-sm text-red-500">{state.errors.title.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          required
          className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
        />
        {state.errors?.company && <p className="mt-1 text-sm text-red-500">{state.errors.company.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
        />
        {state.errors?.location && <p className="mt-1 text-sm text-red-500">{state.errors.location.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          required
          className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
        />
        {state.errors?.tags && <p className="mt-1 text-sm text-red-500">{state.errors.tags.join(', ')}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={6}
          required
          className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
        ></textarea>
        {state.errors?.description && <p className="mt-1 text-sm text-red-500">{state.errors.description.join(', ')}</p>}
      </div>

      {state.message && !state.errors && <p className="text-sm text-red-500">{state.message}</p>}

      <SubmitButton />
    </form>
  );
}
