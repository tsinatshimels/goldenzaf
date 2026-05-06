import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryDetailClient } from './CategoryDetailClient'
import { getProjectsByCategory } from '@/sanity/lib/client'
import {
  CATEGORY_KEYS,
  categoryLabels,
  type CategoryKey,
} from '@/lib/utils'

export async function generateStaticParams() {
  const params: { locale: string; category: string }[] = []
  for (const locale of ['am', 'en']) {
    for (const cat of CATEGORY_KEYS) {
      params.push({ locale, category: cat })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; locale: string }
}): Promise<Metadata> {
  if (!CATEGORY_KEYS.includes(params.category as CategoryKey)) {
    return { title: 'Category' }
  }
  const label = categoryLabels[params.category as CategoryKey].en
  return {
    title: label,
    description: `${label} — Golden Zaf Furniture and Interior`,
  }
}

export default async function CategoryDetailPage({
  params,
}: {
  params: { category: string; locale: string }
}) {
  if (!CATEGORY_KEYS.includes(params.category as CategoryKey)) {
    notFound()
  }

  let projects: any[] = []
  try {
    projects = await getProjectsByCategory(params.category)
  } catch {
    // Sanity not connected — empty list.
  }

  return (
    <CategoryDetailClient
      category={params.category as CategoryKey}
      projects={projects ?? []}
    />
  )
}
