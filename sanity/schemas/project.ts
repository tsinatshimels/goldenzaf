import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project / ፕሮጀክት',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAm',
      title: 'Title (Amharic / አማርኛ)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / ምድብ',
      type: 'string',
      options: {
        list: [
          { title: 'Living Room Furniture', value: 'living_room' },
          { title: 'Bedroom Furniture', value: 'bedroom' },
          { title: 'Office Furniture', value: 'office' },
          { title: 'Dining Room & Kitchen', value: 'dining_kitchen' },
          { title: 'CNC Products', value: 'cnc' },
          { title: 'Doors', value: 'doors' },
          { title: 'Interior Design', value: 'interior' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionAm',
      title: 'Description (Amharic / አማርኛ)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'images',
      title: 'Images / ፎቶዎች',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / ዋና ፎቶ',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo) — Optional',
      type: 'url',
      description: 'Paste a YouTube or Vimeo link',
    }),
    defineField({
      name: 'model3dUrl',
      title: '3D Model URL (Sketchfab) — Optional',
      type: 'url',
      description: 'Paste a Sketchfab embed link',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Project Date',
      type: 'date',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      const categoryMap: Record<string, string> = {
        living_room: 'Living Room',
        bedroom: 'Bedroom',
        office: 'Office',
        dining_kitchen: 'Dining & Kitchen',
        cnc: 'CNC',
        doors: 'Doors',
        interior: 'Interior',
        other: 'Other',
      }
      return {
        title,
        subtitle: categoryMap[subtitle] || subtitle,
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
  ],
})
