# Mini Job Board [Next.js]

This is a mini job board application built with Next.js App Router. It demonstrates understanding of modern Next.js features including Server Components, Server Actions, API Routes, dynamic routing, middleware, and more.

## Features

- **SSR/ISR:** Home page is server-rendered with Incremental Static Regeneration.
- **Dynamic Routing:** Individual job pages are dynamically generated.
- **API Routes:** A robust API for fetching, filtering, and creating jobs.
- **Server Actions:** Securely create jobs directly from the server.
- **Middleware Protection:** The admin dashboard is protected, redirecting unauthenticated users.
- **Client-Side Filtering:** Job listings can be filtered client-side with URL state synchronization.
- **Loading & Error States:** Graceful handling of loading and error states with `loading.tsx` and `error.tsx`.
- **Bonus:** Pagination, clickable tag filters, and edge runtime for the API.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI:** Custom components, `lucide-react` for icons.

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd mini-job-board
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### How to Access the Admin Panel

1.  Navigate to `/login`.
2.  Enter the password: `letmein` and click "Login".
3.  You will be redirected to the `/admin` page where you can post new jobs.
