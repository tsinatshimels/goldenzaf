import { getTeamMembers } from '@/sanity/lib/client'
import { AboutClient } from './AboutClient'

export const revalidate = 60

export const metadata = { title: 'About Us' }

export default async function AboutPage() {
  let team: any[] = []
  try { team = await getTeamMembers() } catch {}
  return <AboutClient team={team} />
}
