import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { imageCompressionPlugin } from './sanity/plugins/imageCompression'
import { SUBCATEGORIES } from './sanity/schemas/project'

const singletonTypes = new Set(['siteSettings'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

const CATEGORY_LIST: { key: string; title: string }[] = [
  { key: 'living_room', title: 'Living Room' },
  { key: 'bedroom', title: 'Bedroom' },
  { key: 'office', title: 'Office' },
  { key: 'dining_kitchen', title: 'Kitchen & Dining Room' },
  { key: 'cnc', title: 'CNC Products' },
  { key: 'doors', title: 'Doors' },
  { key: 'interior', title: 'Interior' },
  { key: 'materials', title: 'Materials' },
  { key: 'other', title: 'Other' },
]

export default defineConfig({
  name: 'goldenzaf',
  basePath: '/studio',
  title: 'Golden Zaf Furniture and Interior CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Golden Zaf CMS')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('All Projects')
              .child(
                S.documentTypeList('project')
                  .title('All Projects')
                  .defaultOrdering([{ field: 'createdAt', direction: 'desc' }]),
              ),
            S.listItem()
              .title('Featured Projects')
              .child(
                S.documentList()
                  .title('Featured Projects')
                  .filter('_type == "project" && featured == true'),
              ),
            S.divider(),
            S.listItem()
              .title('By Category & Subcategory')
              .child(
                S.list()
                  .title('By Category & Subcategory')
                  .items(
                    CATEGORY_LIST.map((category) =>
                      S.listItem()
                        .title(category.title)
                        .child(
                          S.list()
                            .title(category.title)
                            .items([
                              S.listItem()
                                .title('All in this category')
                                .child(
                                  S.documentList()
                                    .title(`${category.title} - All`)
                                    .filter('_type == "project" && category == $category')
                                    .params({ category: category.key }),
                                ),
                              S.divider(),
                              ...(SUBCATEGORIES[category.key] || []).map((subcategory) =>
                                S.listItem()
                                  .title(subcategory.title)
                                  .child(
                                    S.documentList()
                                      .title(`${category.title} - ${subcategory.title}`)
                                      .filter(
                                        '_type == "project" && category == $category && subcategory == $subcategory',
                                      )
                                      .params({
                                        category: category.key,
                                        subcategory: subcategory.value,
                                      }),
                                  ),
                              ),
                            ]),
                        ),
                    ),
                  ),
              ),
            S.divider(),
            S.documentTypeListItem('teamMember').title('Team Members'),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
    imageCompressionPlugin(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && singletonActions.has(action))
        : prev,
  },
})
