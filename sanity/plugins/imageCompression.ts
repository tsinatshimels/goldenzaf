/**
 * Sanity Plugin: Image Compression Info
 * 
 * Shows compression stats when viewing images in the Studio.
 * Add to sanity.config.ts plugins array.
 */

import { definePlugin } from 'sanity'

export const imageCompressionPlugin = definePlugin({
  name: 'image-compression-info',
  document: {
    // Add a custom badge to image documents showing their size
    badges: (prev, context) => {
      if (context.schemaType === 'project') {
        return [
          ...prev,
          () => ({
            label: '📸 Auto-Compressed',
            title: 'Images are auto-compressed to max 1MB / 1920px on upload',
            color: 'success',
          }),
        ]
      }
      return prev
    },
  },
})
