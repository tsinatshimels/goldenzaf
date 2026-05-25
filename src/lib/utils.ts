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

export type CategoryKey =
  | 'living_room'
  | 'bedroom'
  | 'office'
  | 'dining_kitchen'
  | 'cnc'
  | 'doors'
  | 'interior'
  | 'materials'
  | 'other'

export const CATEGORY_KEYS: CategoryKey[] = [
  'living_room',
  'bedroom',
  'office',
  'dining_kitchen',
  'cnc',
  'doors',
  'interior',
  'materials',
  'other',
]

export const categoryLabels: Record<CategoryKey, { en: string; am: string }> = {
  living_room: { en: 'Living Room Furniture', am: 'የሳሎን ዕቃዎች' },
  bedroom: { en: 'Bedroom Furniture', am: 'የመኝታ ዕቃዎች' },
  office: { en: 'Office Furniture', am: 'የቢሮ ዕቃዎች' },
  dining_kitchen: { en: 'Kitchen & Dining Room', am: 'ኩሽና እና የምግብ ቤት' },
  cnc: { en: 'CNC Products', am: 'CNC ምርቶች' },
  doors: { en: 'Doors', am: 'በሮች' },
  interior: { en: 'Interior Design', am: 'የውስጥ ዲዛይን' },
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
    { key: 'tv_stands', en: 'TV Stands', am: 'የቴሌቪዥን መቆሚያ' },
    { key: 'coffee_side_tables', en: 'Coffee & Side Tables', am: 'የቡና እና ጎን ጠረጴዛዎች' },
    { key: 'console_tables_mirrors', en: 'Console Tables & Mirrors', am: 'ኮንሶል ጠረጴዛ እና መስታወት' },
    { key: 'center_table', en: 'Center Table', am: 'መካከለኛ ጠረጴዛ' },
    { key: 'dining_table_living', en: 'Dining Table', am: 'የምግብ ጠረጴዛ' },
  ],
  bedroom: [
    { key: 'infant_bed', en: 'Infant Bed', am: 'የሕፃን አልጋ' },
    { key: 'big_size_bed', en: 'Big-sized Bed', am: 'ትልቅ አልጋ' },
    { key: 'closet', en: 'Closet', am: 'ቁምሳጥን' },
    { key: 'walk_in_closet', en: 'Walk-in Closet', am: 'ዎክ-ኢን ቁምሳጥን' },
    { key: 'dressing_tables', en: 'Dressing Tables', am: 'የመልበሻ ጠረጴዛ' },
    { key: 'nightstands', en: 'Nightstands', am: 'የመኝታ ጎን ጠረጴዛ' },
  ],
  office: [
    { key: 'executive_desk', en: 'Executive Desk / Managerial Table', am: 'ዋና የቢሮ ጠረጴዛ' },
    { key: 'reception_desk', en: 'Reception Desk', am: 'የመቀበያ ጠረጴዛ' },
    { key: 'bookshelves_filing', en: 'Bookshelves & Filing Cabinets', am: 'የመጻሕፍት መደርደሪያ እና የፋይል ካቢኔ' },
    { key: 'conference_table', en: 'Conference Table', am: 'የስብሰባ ጠረጴዛ' },
  ],
  dining_kitchen: [
    { key: 'dining_sets', en: 'Dining Sets', am: 'የምግብ ስብስብ' },
    { key: 'kitchen_cabinets', en: 'Kitchen Cabinets', am: 'የኩሽና ካቢኔ' },
  ],
  cnc: [
    { key: 'arabian_majlis', en: 'Arabian Majlis', am: 'አረቢያ ምቀኛ' },
    { key: 'partitions', en: 'Partitions', am: 'መከፋፈያዎች' },
    { key: 'patterns_logos', en: 'Patterns & Logos', am: 'ቅርጻ ቅርጽ እና ሎጎ' },
    { key: 'door_designs', en: 'Door Designs', am: 'የበር ዲዛይን' },
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
  materials: [
    { key: 'mdf', en: 'MDF', am: 'MDF' },
    { key: 'block_board', en: 'Block Board', am: 'Block Board' },
    { key: 'australia', en: 'Australia', am: 'Australia' },
    { key: 'ply_wood', en: 'Ply Wood', am: 'Ply Wood' },
  ],
  other: [{ key: 'shoe_racks', en: 'Shoe Racks', am: 'የጫማ መደርደሪያ' }],
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
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  ],
  bedroom: [
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  ],
  office: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80',
  ],
  dining_kitchen: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=800&q=80',
  ],
  cnc: [
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&q=80',
  ],
  doors: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=800&q=80',
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
  ],
  interior: [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  ],
  materials: [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
  ],
  other: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
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
