import { Suspense } from 'react'
import { getProjects } from '@/sanity/lib/client'
import { ProjectsClient } from './ProjectsClient'

export const revalidate = 60

export const metadata = {
  title: 'Our Works',
  description: 'Browse Golden Zaf works by category and subcategory.',
}

export default async function ProjectsPage() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    // demo fallback
  }

  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen container-site">
          <div className="skeleton h-8 w-64 mx-auto mb-6 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-72 w-full" />
            ))}
          </div>
        </div>
      }
    >
      <ProjectsClient serverProjects={projects} />
    </Suspense>
  )
}
