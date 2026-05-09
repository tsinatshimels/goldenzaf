import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // Prefer fresh published content over CDN speed so Studio changes show up reliably.
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const projectsQuery = `*[_type == "project"] | order(createdAt desc) {
  _id, title, titleAm, slug, category, subcategory,
  description, descriptionAm,
  coverImage, featured, createdAt, tags
}`

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(createdAt desc)[0..5] {
  _id, title, titleAm, slug, category, subcategory,
  coverImage, description, descriptionAm, tags
}`

export const projectsByCategoryQuery = `*[_type == "project" && category == $category] | order(createdAt desc) {
  _id, title, titleAm, slug, category, subcategory,
  coverImage, description, descriptionAm
}`

export const projectsBySubcategoryQuery = `*[_type == "project" && subcategory == $subcategory] | order(createdAt desc) {
  _id, title, titleAm, slug, category, subcategory,
  coverImage, description, descriptionAm
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id, title, titleAm, slug, category, subcategory, description, descriptionAm,
  images[]{ ..., asset-> }, coverImage, videoUrl, model3dUrl, createdAt, tags
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  companyName, tagline, taglineAm, logo,
  heroImages, email, phone, phone2, location,
  googleMapsUrl, instagram, facebook, tiktok, youtube, whatsapp
}`

export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc) {
  _id, name, role, roleAm, photo
}`

export async function getProjects() {
  return client.fetch(projectsQuery)
}
export async function getFeaturedProjects() {
  return client.fetch(featuredProjectsQuery)
}
export async function getProjectsByCategory(category: string) {
  return client.fetch(projectsByCategoryQuery, { category })
}
export async function getProjectsBySubcategory(subcategory: string) {
  return client.fetch(projectsBySubcategoryQuery, { subcategory })
}
export async function getProjectBySlug(slug: string) {
  return client.fetch(projectBySlugQuery, { slug })
}
export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery)
}
export async function getTeamMembers() {
  return client.fetch(teamMembersQuery)
}
