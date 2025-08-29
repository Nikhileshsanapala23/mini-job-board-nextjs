export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  description: string;
  postedAt: string; // ISO string
}
