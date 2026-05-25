export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  alt?: string
  caption?: string
}

export interface Project {
  _id: string
  title: string
  titleAm?: string
  slug: { current: string }
  category: ProjectCategory
  subcategory?: string
  description?: string
  descriptionAm?: string
  images?: SanityImage[]
  coverImage?: SanityImage
  videoUrl?: string
  model3dUrl?: string
  featured?: boolean
  createdAt?: string
  tags?: string[]
}

export type ProjectCategory =
  | 'living_room'
  | 'bedroom'
  | 'office'
  | 'dining_kitchen'
  | 'cnc'
  | 'doors'
  | 'interior'
  | 'materials'
  | 'other'

export interface SiteSettings {
  companyName: string
  tagline?: string
  taglineAm?: string
  logo?: SanityImage
  heroImages?: SanityImage[]
  email?: string
  phone?: string
  phone2?: string
  location?: string
  googleMapsUrl?: string
  instagram?: string
  facebook?: string
  tiktok?: string
  youtube?: string
  whatsapp?: string
}

export interface TeamMember {
  _id: string
  name: string
  role?: string
  roleAm?: string
  photo?: SanityImage
  order?: number
}

export type Locale = 'am' | 'en'
