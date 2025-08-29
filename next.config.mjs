/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
            ? 'https://your-production-url.com' // Replace with your actual production URL
            : 'http://localhost:3000',
    },
};

export default nextConfig;
