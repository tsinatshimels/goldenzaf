import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings / የጣቢያ ቅንብሮች',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Golden Zaf Furniture',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (English)',
      type: 'string',
    }),
    defineField({
      name: 'taglineAm',
      title: 'Tagline (Amharic)',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Slideshow Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'phone2',
      title: 'Phone Number 2',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location Address',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number (with country code)',
      type: 'string',
      description: 'Example: +251911234567',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
