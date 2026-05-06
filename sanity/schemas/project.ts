import { defineType, defineField } from 'sanity'

/**
 * Subcategories grouped by parent category.
 * Admin first picks a category, then sees only the subcategories that
 * belong to that category. The website can then filter by either.
 */
export const SUBCATEGORIES: Record<string, { value: string; title: string }[]> = {
  living_room: [
    { value: 'tv_stands', title: 'TV Stands' },
    { value: 'coffee_side_tables', title: 'Coffee & Side Tables' },
    { value: 'console_tables_mirrors', title: 'Console Tables & Mirrors' },
    { value: 'center_table', title: 'Center Table' },
    { value: 'dining_table_living', title: 'Dining Table' },
  ],
  bedroom: [
    { value: 'beds', title: 'Beds' },
    { value: 'infant_bed', title: 'Infant Bed' },
    { value: 'big_size_bed', title: 'Big-sized Bed' },
    { value: 'closet', title: 'Closet' },
    { value: 'walk_in_closet', title: 'Walk-in Closet' },
    { value: 'dressing_tables', title: 'Dressing Tables' },
    { value: 'nightstands', title: 'Nightstands' },
  ],
  office: [
    { value: 'executive_desk', title: 'Executive Desk / Managerial Table' },
    { value: 'reception_desk', title: 'Reception Desk' },
    { value: 'office_chairs', title: 'Office Chairs' },
    { value: 'bookshelves_filing', title: 'Bookshelves & Filing Cabinets' },
    { value: 'conference_table', title: 'Conference Table' },
  ],
  dining_kitchen: [
    { value: 'dining_sets', title: 'Dining Sets' },
    { value: 'kitchen_cabinets', title: 'Kitchen Cabinets' },
    { value: 'sideboards_buffets', title: 'Sideboards & Buffets' },
  ],
  cnc: [
    { value: 'arabian_majlis', title: 'Arabian Majlis' },
    { value: 'partitions', title: 'Partitions' },
    { value: 'patterns_logos', title: 'Patterns & Logos' },
    { value: 'door_designs', title: 'Door Designs' },
  ],
  doors: [
    { value: 'internal_doors', title: 'Internal Doors' },
    { value: 'main_gate', title: 'Main Gate' },
  ],
  interior: [{ value: 'wall_finishing', title: 'Wall Finishing' }],
  other: [{ value: 'shoe_racks', title: 'Shoe Racks' }],
}

// Flat list for the Sanity dropdown (with "Category — Subcategory" labels so
// admins always know what they're picking even at a glance).
const SUBCATEGORY_OPTIONS = Object.entries(SUBCATEGORIES).flatMap(
  ([cat, subs]) =>
    subs.map((s) => ({
      title: `${categoryTitle(cat)} — ${s.title}`,
      value: s.value,
    })),
)

function categoryTitle(value: string): string {
  return (
    {
      living_room: 'Living Room',
      bedroom: 'Bedroom',
      office: 'Office',
      dining_kitchen: 'Dining & Kitchen',
      cnc: 'CNC Products',
      doors: 'Doors',
      interior: 'Interior Design',
      other: 'Other',
    }[value] || value
  )
}

export const projectSchema = defineType({
  name: 'project',
  title: 'Project / ፕሮጀክት',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title (English)',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAm',
      title: 'Title (Amharic / አማርኛ)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    // ── 1) Category (radio for fast picking) ──────────────────────────────
    defineField({
      name: 'category',
      title: '1. Category / ምድብ',
      description: 'Pick the main category first.',
      type: 'string',
      group: 'content',
      options: {
        layout: 'radio',
        list: [
          { title: '🛋️  Living Room Furniture', value: 'living_room' },
          { title: '🛏️  Bedroom Furniture', value: 'bedroom' },
          { title: '🖥️  Office Furniture', value: 'office' },
          { title: '🍽️  Dining Room & Kitchen', value: 'dining_kitchen' },
          { title: '⚙️  CNC Products', value: 'cnc' },
          { title: '🚪  Doors', value: 'doors' },
          { title: '🏠  Interior Design', value: 'interior' },
          { title: '📦  Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required().error('Please choose a category.'),
    }),
    // ── 2) Subcategory (filtered list) ────────────────────────────────────
    defineField({
      name: 'subcategory',
      title: '2. Subcategory / ንዑስ ምድብ',
      description:
        'Pick the subcategory that matches the category above. The list shows every option labeled "Category — Subcategory".',
      type: 'string',
      group: 'content',
      options: {
        layout: 'dropdown',
        list: SUBCATEGORY_OPTIONS,
      },
      validation: (Rule) => Rule.required().error('Please choose a subcategory.'),
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'descriptionAm',
      title: 'Description (Amharic / አማርኛ)',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / ዋና ፎቶ',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images / ፎቶዎች',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo) — Optional',
      type: 'url',
      group: 'media',
      description: 'Paste a YouTube or Vimeo link',
    }),
    defineField({
      name: 'model3dUrl',
      title: '3D Model URL (Sketchfab) — Optional',
      type: 'url',
      group: 'media',
      description: 'Paste a Sketchfab embed link',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Project Date',
      type: 'date',
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      subcategory: 'subcategory',
      media: 'coverImage',
    },
    prepare({ title, category, subcategory, media }) {
      const cat = categoryTitle(category)
      const sub =
        subcategory &&
        SUBCATEGORY_OPTIONS.find((o) => o.value === subcategory)?.title.split(' — ')[1]
      const subtitle = sub ? `${cat} • ${sub}` : cat
      return { title, subtitle, media }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'subcategory', direction: 'asc' },
      ],
    },
  ],
})
