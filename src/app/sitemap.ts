import { MetadataRoute } from 'next'
import { getProjects } from '@/sanity/lib/client'
import { getProjectPathSegment } from '@/lib/utils'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldenzaf.com'
const LOCALES = ['am', 'en']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {}

  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ])

  const projectRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    projects.reduce<MetadataRoute.Sitemap>((acc, project) => {
      const segment = getProjectPathSegment(project)
      if (!segment) return acc

      acc.push({
        url: `${BASE_URL}/${locale}/projects/${segment}`,
        lastModified: project.createdAt ? new Date(project.createdAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })

      return acc
    }, [])
  )

  return [...staticRoutes, ...projectRoutes]
}
