import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { serviceCategories } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url + '/', lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: site.url + '/about', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: site.url + '/book', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: site.url + '/services', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...serviceCategories.map((c) => ({
      url: `${site.url}/services/${c.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8,
    })),
  ];
}
