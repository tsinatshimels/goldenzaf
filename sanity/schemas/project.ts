import { defineType, defineField } from 'sanity'

/**
 * Subcategories grouped by parent category.
 * Admins pick a category first, then assign a matching subcategory.
 */
export const SUBCATEGORIES: Record<string, { value: string; title: string }[]> =
  {
    living_room: [
      { value: 'tv_stands', title: 'TV Stands' },
      { value: 'coffee_side_tables', title: 'Coffee & Side Tables' },
      { value: 'console_tables_mirrors', title: 'Console Tables & Mirrors' },
      { value: 'center_table', title: 'Center Table' },
      { value: 'dining_table_living', title: 'Dining Table' },
    ],
    bedroom: [
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

      { value: 'bookshelves_filing', title: 'Bookshelves & Filing Cabinets' },
      { value: 'conference_table', title: 'Conference Table' },
    ],
    dining_kitchen: [
      { value: 'dining_sets', title: 'Dining Sets' },
      { value: 'kitchen_cabinets', title: 'Kitchen Cabinets' },
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
    interior: [
      { value: 'wall_finishing', title: 'Wall Finishing' },
      { value: 'shop', title: 'Shop' },
      { value: 'office_interior', title: 'Office Interior' },
      { value: 'living_interior', title: 'Living Interior' },
    ],
    materials: [
      { value: 'mdf', title: 'MDF' },
      { value: 'block_board', title: 'Block Board' },
      { value: 'australia', title: 'Australia' },
      { value: 'ply_wood', title: 'Ply Wood' },
    ],
    other: [{ value: 'shoe_racks', title: 'Shoe Racks' }],
  }

const SUBCATEGORY_OPTIONS = Object.entries(SUBCATEGORIES).flatMap(
  ([category, subs]) =>
    subs.map((sub) => ({
      title: `${categoryTitle(category)} - ${sub.title}`,
      value: sub.value,
    })),
)

function categoryTitle(value: string): string {
  return (
    {
      living_room: 'Living Room',
      bedroom: 'Bedroom',
      office: 'Office',
      dining_kitchen: 'Kitchen & Dining Room',
      cnc: 'CNC Products',
      doors: 'Doors',
      interior: 'Interior Design',
      materials: 'Materials',
      other: 'Other',
    }[value] || value
  )
}

function isSubcategoryValidForCategory(
  category: string | undefined,
  subcategory: string | undefined,
) {
  if (!category || !subcategory) return true
  return (SUBCATEGORIES[category] || []).some(
    (item) => item.value === subcategory,
  )
}

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
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
      title: 'Title (Amharic)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'meta',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'Pick the main category first.',
      type: 'string',
      group: 'content',
      options: {
        layout: 'radio',
        list: [
          { title: 'Living Room Furniture', value: 'living_room' },
          { title: 'Bedroom Furniture', value: 'bedroom' },
          { title: 'Office Furniture', value: 'office' },
          { title: 'Kitchen & Dining Room', value: 'dining_kitchen' },
          { title: 'CNC Products', value: 'cnc' },
          { title: 'Doors', value: 'doors' },
          { title: 'Interior Design', value: 'interior' },
          { title: 'Materials', value: 'materials' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required().error('Please choose a category.'),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      description:
        'Pick the subcategory that matches the category above. Each option is labeled as "Category - Subcategory".',
      type: 'string',
      group: 'content',
      options: {
        layout: 'dropdown',
        list: SUBCATEGORY_OPTIONS,
      },
      validation: (Rule) =>
        Rule.required()
          .error('Please choose a subcategory.')
          .custom((value, context) =>
            isSubcategoryValidForCategory(
              context.document?.category as string | undefined,
              value as string | undefined,
            )
              ? true
              : 'The selected subcategory does not belong to the chosen category.',
          ),
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
      title: 'Description (Amharic)',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'You can upload normally here, or use Select -> "Compressed Upload (Recommended)" to save Sanity storage.',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      description:
        'You can upload normally here, or use Select -> "Compressed Upload (Recommended)" to save Sanity storage.',
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
      title: 'Video URL (optional)',
      type: 'url',
      group: 'media',
      description: 'Paste a YouTube or Vimeo link.',
    }),
    defineField({
      name: 'model3dUrl',
      title: '3D Model URL (optional)',
      type: 'url',
      group: 'media',
      description: 'Paste a Sketchfab embed link.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
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
      const categoryLabel = categoryTitle(category)
      const subcategoryLabel =
        subcategory &&
        SUBCATEGORY_OPTIONS.find(
          (option) => option.value === subcategory,
        )?.title.split(' - ')[1]

      return {
        title,
        subtitle: subcategoryLabel
          ? `${categoryLabel} - ${subcategoryLabel}`
          : categoryLabel,
        media,
      }
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
