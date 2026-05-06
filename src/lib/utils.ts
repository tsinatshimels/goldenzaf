import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === 'am' ? 'am-ET' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )
}

export const categoryLabels: Record<string, { en: string; am: string }> = {
  living_room: { en: 'Living Room Furniture', am: 'የሳሎን ዕቃዎች' },
  bedroom: { en: 'Bedroom Furniture', am: 'የመኝታ ዕቃዎች' },
  office: { en: 'Office Furniture', am: 'የቢሮ ዕቃዎች' },
  dining_kitchen: { en: 'Dining Room & Kitchen', am: 'የምግብ ቤት እና ኩሽና' },
  cnc: { en: 'CNC Products', am: 'CNC ምርቶች' },
  doors: { en: 'Doors', am: 'በሮች' },
  interior: { en: 'Interior Design', am: 'የውስጥ ዲዛይን' },
  other: { en: 'Other', am: 'ሌሎች' },
}

export const categoryImages: Record<string, string[]> = {
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
    'https://images.unsplash.com/photo-1616137303-5de61f02b75d?w=800&q=80',
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
  other: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    'https://images.unsplash.com/photo-1591843644882-08d78b605c8d?w=800&q=80',
  ],
}
