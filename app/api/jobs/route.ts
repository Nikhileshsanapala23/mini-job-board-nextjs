import { NextResponse } from 'next/server';
import { jobs } from '@/data/jobs';
import type { Job } from '@/lib/types';

export const runtime = 'edge'; // Bonus: Use edge runtime

// GET: supports filters and pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title')?.toLowerCase();
  const location = searchParams.get('location')?.toLowerCase();
  const tags = searchParams.get('tags')?.toLowerCase().split(',');
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  let filteredJobs: Job[] = [...jobs];

  if (title) {
    filteredJobs = filteredJobs.filter(job => job.title.toLowerCase().includes(title));
  }

  if (location) {
    filteredJobs = filteredJobs.filter(job => job.location.toLowerCase().includes(location));
  }

  if (tags && tags.length > 0) {
    filteredJobs = filteredJobs.filter(job => 
      job.tags.some(tag => tags.includes(tag.toLowerCase()))
    );
  }

  const paginatedJobs = filteredJobs.slice(offset, offset + limit);

  return NextResponse.json({
    jobs: paginatedJobs,
    total: filteredJobs.length,
    offset,
    limit,
  });
}

// POST: validates and adds a job
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, company, location, description, tags } = body;

    // Basic validation
    if (!title || !company || !location || !description || !tags) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newJob: Job = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      company,
      location,
      description,
      tags,
      postedAt: new Date().toISOString(),
    };

    // Add to our in-memory data store
    jobs.unshift(newJob);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
