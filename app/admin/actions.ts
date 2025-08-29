'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { jobs } from '@/data/jobs'; // In-memory data source

const JobSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  company: z.string().min(2, 'Company name is required'),
  location: z.string().min(2, 'Location is required'),
  tags: z.string().min(2, 'At least one tag is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export type FormState = {
  message: string;
  errors?: {
    title?: string[];
    company?: string[];
    location?: string[];
    tags?: string[];
    description?: string[];
  };
};

export async function createJob(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = JobSchema.safeParse({
    title: formData.get('title'),
    company: formData.get('company'),
    location: formData.get('location'),
    tags: formData.get('tags'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const newJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...validatedFields.data,
      tags: validatedFields.data.tags.split(',').map(tag => tag.trim()),
      postedAt: new Date().toISOString(),
    };

    // Add to in-memory array
    jobs.unshift(newJob);

  } catch (error) {
    return {
      message: 'Database Error: Failed to create job.',
    };
  }

  // Revalidate the home page to show the new job
  revalidatePath('/');
  // Redirect to the home page
  redirect(`/`);
}
