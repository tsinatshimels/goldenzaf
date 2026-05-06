import { getProjects } from '@/sanity/lib/client'
import { ProjectsClient } from './ProjectsClient'

export const metadata = {
  title: 'Projects',
  description: 'Browse all Golden Zaf Furniture projects',
}

export default async function ProjectsPage() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    // Use demo data when Sanity not connected
  }

  return <ProjectsClient serverProjects={projects} />
}
