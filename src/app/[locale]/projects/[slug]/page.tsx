import { getProjectBySlug, getProjects } from '@/sanity/lib/client'
import { getProjectSlug } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { ProjectDetailClient } from './ProjectDetailClient'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects
      .map((p: any) => getProjectSlug(p))
      .filter((slug: string | null): slug is string => Boolean(slug))
      .map((slug: string) => ({ slug }))
  } catch {
    return []
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let project: any = null

  try {
    project = await getProjectBySlug(params.slug)
  } catch {
    // Try demo fallback
  }

  if (!project && !params.slug.startsWith('demo-')) {
    notFound()
  }

  if (!project) {
    const demoMap: Record<string, any> = {
      'demo-1': {
        _id: '1',
        title: 'Modern Living Room Set',
        titleAm: 'ዘመናዊ የሳሎን ዕቃ',
        category: 'living_room',
        subcategory: 'center_table',
        description:
          'A stunning modern living room furniture collection featuring clean lines and premium materials.',
        descriptionAm: 'ዘመናዊ የሳሎን የቤት ዕቃ ስብስብ።',
        slug: { current: 'demo-1' },
      },
      'demo-2': {
        _id: '2',
        title: 'Executive Office Suite',
        titleAm: 'ዋና የቢሮ ዕቃ',
        category: 'office',
        subcategory: 'executive_desk',
        description: 'Professional office furniture with ergonomic design.',
        descriptionAm: 'ፕሮፌሽናል የቢሮ ዕቃ።',
        slug: { current: 'demo-2' },
      },
    }
    project =
      demoMap[params.slug] || {
        _id: params.slug,
        title: 'Sample Project',
        category: 'living_room',
        slug: { current: params.slug },
      }
  }

  return <ProjectDetailClient project={project} />
}
