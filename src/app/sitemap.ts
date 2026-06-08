import { Metadata } from 'next';
import { GYM_INFO } from '@/lib/constants';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vikingsgym.vercel.app';

export default async function sitemap() {
  const routes = [
    '',
    '/about',
    '/plans',
    '/trainers',
    '/transformations',
    '/gallery',
    '/blog',
    '/contact',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // You would ideally fetch dynamic routes here (e.g., blog posts)
  // const blogs = await prisma.post.findMany();
  // const blogRoutes = blogs.map((post) => ({ ... }))

  return [...routes];
}
