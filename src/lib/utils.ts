import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === 'am' ? 'am-ET' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )
}

export function getProjectSlug(project: { slug?: { current?: string | null } | null }) {
  const current = project.slug?.current
  return current && current.trim() ? current : null
}

export function normalizeProjectLookupValue(value: string) {
  return value
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .replace(/\s+/g, ' ')
}

export function getProjectPathSegment(
  project: { _id?: string | null; slug?: { current?: string | null } | null },
) {
  const id = project._id?.trim()
  if (id) return id

  const slug = getProjectSlug(project)
  return slug ? slug : null
}

export function getProjectHref(
  locale: string,
  project: { _id?: string | null; slug?: { current?: string | null } | null },
) {
  const segment = getProjectPathSegment(project)
  return segment ? `/${locale}/projects/${segment}` : null
}

export type CategoryKey =
  | 'living_room'
  | 'bedroom'
  | 'office'
  | 'dining_kitchen'
  | 'doors'
  | 'interior'
  | 'wall_art'
  | 'materials'
  | 'other'

export const CATEGORY_KEYS: CategoryKey[] = [
  'living_room',
  'bedroom',
  'office',
  'dining_kitchen',
  'doors',
  'interior',
  'wall_art',
  'materials',
  'other',
]

export const categoryLabels: Record<CategoryKey, { en: string; am: string }> = {
  living_room: { en: 'Living Room Furniture', am: 'የሳሎን ዕቃዎች' },
  bedroom: { en: 'Bedroom Furniture', am: 'የመኝታ ዕቃዎች' },
  office: { en: 'Office Furniture', am: 'የቢሮ ዕቃዎች' },
  dining_kitchen: { en: 'Kitchen', am: 'ኩሽና' },
  doors: { en: 'Doors', am: 'በሮች' },
  interior: { en: 'Interior Design', am: 'የውስጥ ዲዛይን' },
  wall_art: { en: 'Wall Art', am: 'የግድግዳ ጥበብ' },
  materials: { en: 'Materials', am: 'ማቴሪያሎች' },
  other: { en: 'Other', am: 'ሌሎች' },
}

export interface SubcategoryDef {
  key: string
  en: string
  am: string
}

export const subcategoriesByCategory: Record<CategoryKey, SubcategoryDef[]> = {
  living_room: [
    { key: 'tv_unit_stand', en: 'TV Unit & Stand', am: 'የቴሌቪዥን ዩኒት እና ስታንድ' },
    { key: 'sofa', en: 'Sofa', am: 'ሶፋ' },
    { key: 'book_shelf_living', en: 'Book Shelf', am: 'የመጽሐፍ መደርደሪያ' },
    { key: 'coffee_side_tables', en: 'Coffee & Side Tables', am: 'የቡና እና ጎን ጠረጴዛዎች' },
    { key: 'console_tables_mirrors', en: 'Console Tables & Mirrors', am: 'ኮንሶል ጠረጴዛ እና መስታወት' },
    { key: 'center_table', en: 'Center Table', am: 'መካከለኛ ጠረጴዛ' },
    { key: 'dining_table_living', en: 'Dining Table', am: 'የምግብ ጠረጴዛ' },
  ],
  bedroom: [
    { key: 'infant_bed', en: 'Infant Bed', am: 'የሕፃን አልጋ' },
    { key: 'big_size_bed', en: 'Big-sized Bed', am: 'ትልቅ አልጋ' },
    { key: 'kids_bed', en: 'Kids Bed', am: 'የልጆች አልጋ' },
    { key: 'closet', en: 'Closet', am: 'ቁምሳጥን' },
    { key: 'chest_of_drawers', en: 'Chest of Drawers', am: 'ቼስት ኦፍ ድሮወርስ' },
    { key: 'walk_in_closet', en: 'Walk-in Closet', am: 'ዎክ-ኢን ቁምሳጥን' },
    { key: 'dressing_tables', en: 'Dressing Tables', am: 'የመልበሻ ጠረጴዛ' },
    { key: 'nightstands', en: 'Nightstands', am: 'የመኝታ ጎን ጠረጴዛ' },
    { key: 'accent_chairs', en: 'Accent Chairs', am: 'አክሰንት ወንበሮች' },
  ],
  office: [
    { key: 'executive_desk', en: 'Executive Desk / Managerial Table', am: 'ዋና የቢሮ ጠረጴዛ' },
    { key: 'computer_desk', en: 'Computer Desk', am: 'የኮምፒውተር ጠረጴዛ' },
    { key: 'reception_desk', en: 'Reception Desk', am: 'የመቀበያ ጠረጴዛ' },
    { key: 'bookshelves_filing', en: 'Bookshelves & Filing Cabinets', am: 'የመጻሕፍት መደርደሪያ እና የፋይል ካቢኔ' },
    { key: 'conference_table', en: 'Conference and Meeting Tables', am: 'የኮንፈረንስ እና የስብሰባ ጠረጴዛዎች' },
  ],
  dining_kitchen: [
    { key: 'kitchen_cabinets', en: 'Kitchen Cabinets', am: 'የኩሽና ካቢኔ' },
  ],
  doors: [
    { key: 'internal_doors', en: 'Internal Doors', am: 'የውስጥ በሮች' },
    { key: 'main_gate', en: 'Main Gate', am: 'ዋና ደጃፍ' },
  ],
  interior: [
    { key: 'shop', en: 'Shop', am: 'ሱቅ' },
    { key: 'office_interior', en: 'Office Interior', am: 'የቢሮ ውስጥ ዲዛይን' },
    { key: 'living_interior', en: 'Living Interior', am: 'የሳሎን ውስጥ ዲዛይን' },
  ],
  wall_art: [{ key: 'wall_art', en: 'Wall Art', am: 'የግድግዳ ጥበብ' }],
  materials: [
    { key: 'mdf', en: 'MDF', am: 'MDF' },
    { key: 'local_material', en: 'Local Material', am: 'Local Material' },
    { key: 'block_board', en: 'Block Board', am: 'Block Board' },
    { key: 'australia', en: 'Australia', am: 'Australia' },
    { key: 'ply_wood', en: 'Ply Wood', am: 'Ply Wood' },
  ],
  other: [
    { key: 'shoe_rack', en: 'Shoe Rack', am: 'የጫማ መደርደሪያ' },
    { key: 'book_shelf_other', en: 'Book Shelf', am: 'የመጽሐፍ መደርደሪያ' },
  ],
}

export const subcategoryLabels: Record<string, { en: string; am: string }> = (() => {
  const out: Record<string, { en: string; am: string }> = {}
  for (const subs of Object.values(subcategoriesByCategory)) {
    for (const s of subs) out[s.key] = { en: s.en, am: s.am }
  }
  return out
})()

export const subcategoryParent: Record<string, CategoryKey> = (() => {
  const out: Record<string, CategoryKey> = {}
  for (const [cat, subs] of Object.entries(subcategoriesByCategory)) {
    for (const s of subs) out[s.key] = cat as CategoryKey
  }
  return out
})()

export const categoryImages: Record<CategoryKey, string[]> = {
  living_room: [
    '/images/Living.png',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  ],
  bedroom: [
    '/images/Bedroom.png',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  ],
  office: [
    '/images/Office.png',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80',
  ],
  dining_kitchen: [
    '/images/kitchen.jpg',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=800&q=80',
  ],
  doors: [
    '/images/DOOR (1).png',
    'https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=800&q=80',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
  ],
  interior: [
    '/images/Interior.png',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  ],
  wall_art: [
    '/images/Wall Art 1.png',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  ],
  materials: [
    '/images/Material.jpg',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
  ],
  other: [
    '/images/Others.png',
    'https://images.unsplash.com/photo-1591843644882-08d78b605c8d?w=800&q=80',
  ],
}

export function getImageFor(category?: string, subcategory?: string): string {
  const cat = (category && category in categoryImages ? category : 'living_room') as CategoryKey
  const arr = categoryImages[cat]
  if (!subcategory) return arr[0]

  let h = 0
  for (let i = 0; i < subcategory.length; i++) h = (h * 31 + subcategory.charCodeAt(i)) >>> 0

  return arr[h % arr.length]
}
