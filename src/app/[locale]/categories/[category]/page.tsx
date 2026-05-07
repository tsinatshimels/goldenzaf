import { notFound, redirect } from 'next/navigation'
import { CATEGORY_KEYS, type CategoryKey } from '@/lib/utils'

export function generateStaticParams() {
  const params: { locale: string; category: string }[] = []
  for (const locale of ['am', 'en']) {
    for (const category of CATEGORY_KEYS) {
      params.push({ locale, category })
    }
  }
  return params
}

export default function CategoryDetailPage({
  params,
}: {
  params: { category: string; locale: string }
}) {
  if (!CATEGORY_KEYS.includes(params.category as CategoryKey)) {
    notFound()
  }

  redirect(`/${params.locale}/projects?category=${params.category}`)
}
