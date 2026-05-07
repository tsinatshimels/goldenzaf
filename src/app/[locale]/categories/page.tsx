import { redirect } from 'next/navigation'

export default function CategoriesIndexPage({
  params,
}: {
  params: { locale: string }
}) {
  redirect(`/${params.locale}/projects`)
}
