import type { Metadata } from 'next'
import { CategoriesIndexClient } from './CategoriesIndexClient'
import { getProjects } from '@/sanity/lib/client'

export const metadata: Metadata = {
  title: 'Categories',
  description:
    'Browse Golden Zaf Furniture and Interior categories — living room, bedroom, office, dining, CNC, doors, interior, and more.',
}

export default async function CategoriesIndexPage() {
  let projects: any[] = []
  try {
    projects = await getProjects()
  } catch {
    // Sanity not connected — fall through to empty data.
  }
  return <CategoriesIndexClient serverProjects={projects ?? []} />
}
