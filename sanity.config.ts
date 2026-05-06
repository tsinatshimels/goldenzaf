import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { imageCompressionPlugin } from './sanity/plugins/imageCompression'

export default defineConfig({
  name: 'goldenzaf',
  title: 'Golden Zaf Furniture — ወርቃማ ዛፍ CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Golden Zaf CMS')
          .items([
            S.listItem()
              .title('⚙️  Site Settings / ቅንብሮች')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('📁  All Projects / ሁሉም ፕሮጀክቶች')
              .child(
                S.documentTypeList('project')
                  .title('All Projects')
                  .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('⭐  Featured Projects')
              .child(
                S.documentList()
                  .title('Featured Projects')
                  .filter('_type == "project" && featured == true')
              ),
            S.divider(),
            S.listItem()
              .title('🛋️  By Category / በምድብ')
              .child(
                S.list().title('By Category').items([
                  makeCategoryItem(S, 'living_room', '🛋️  Living Room'),
                  makeCategoryItem(S, 'bedroom', '🛏️  Bedroom'),
                  makeCategoryItem(S, 'office', '🖥️  Office'),
                  makeCategoryItem(S, 'dining_kitchen', '🍽️  Dining & Kitchen'),
                  makeCategoryItem(S, 'cnc', '⚙️  CNC Products'),
                  makeCategoryItem(S, 'doors', '🚪  Doors'),
                  makeCategoryItem(S, 'interior', '🏠  Interior'),
                  makeCategoryItem(S, 'other', '📦  Other'),
                ])
              ),
            S.divider(),
            S.documentTypeListItem('teamMember').title('👥  Team Members / ቡድን'),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    imageCompressionPlugin(),
  ],
  schema: { types: schemaTypes },
})

function makeCategoryItem(S: any, category: string, title: string) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "project" && category == $category')
        .params({ category })
    )
}
