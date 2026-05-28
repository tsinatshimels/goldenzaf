import { getProjectBySlug, getProjects } from '@/sanity/lib/client'
import { getProjectPathSegment, normalizeProjectLookupValue } from '@/lib/utils'
import { notFound } from 'next/navigation'
import { ProjectDetailClient } from './ProjectDetailClient'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects
      .map((p: any) => getProjectPathSegment(p))
      .filter((segment: string | null): segment is string => Boolean(segment))
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
  const normalizedSlug = normalizeProjectLookupValue(params.slug)

  try {
    project = await getProjectBySlug(params.slug)
    if (!project && normalizedSlug !== params.slug) {
      project = await getProjectBySlug(normalizedSlug)
    }

    if (!project) {
      const projects = await getProjects()
      const matchedProject = projects.find((candidate: any) => {
        const candidates = [
          candidate._id,
          candidate.slug?.current,
          candidate.title,
          candidate.titleAm,
        ]

        return candidates.some((value) => {
          if (typeof value !== 'string') return false
          return normalizeProjectLookupValue(value) === normalizedSlug
        })
      })

      if (matchedProject) {
        const lookupValue = getProjectPathSegment(matchedProject) || matchedProject.title || matchedProject.titleAm
        if (lookupValue) {
          project = await getProjectBySlug(lookupValue)
        }
      }
    }
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
