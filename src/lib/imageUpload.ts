/**
 * Image compression utility for Sanity uploads.
 * This is used in the Sanity Studio or any client-side uploader.
 * 
 * Usage:
 *   import { compressAndUpload } from '@/lib/imageUpload'
 *   const asset = await compressAndUpload(file, sanityClient)
 */

import imageCompression from 'browser-image-compression'

export const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,           // Max 1MB
  maxWidthOrHeight: 1920, // Max 1920px
  useWebWorker: true,
  fileType: 'image/webp', // Convert to WebP for better compression
  initialQuality: 0.85,
}

/**
 * Compress a file before uploading
 */
export async function compressImage(file: File): Promise<File> {
  // Skip compression for SVG and GIF
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
    return file
  }

  try {
    const compressed = await imageCompression(file, COMPRESSION_OPTIONS)
    console.log(`[Image Compression] ${file.name}: ${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressed.size / 1024 / 1024).toFixed(2)}MB`)
    return compressed
  } catch (err) {
    console.warn('[Image Compression] Failed, uploading original:', err)
    return file
  }
}

/**
 * Compress and upload to Sanity using the API token
 */
export async function compressAndUploadToSanity(
  file: File,
  projectId: string,
  dataset: string,
  token: string
): Promise<{ _id: string; url: string }> {
  const compressed = await compressImage(file)

  const formData = new FormData()
  formData.append('file', compressed, compressed.name || 'image.webp')

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v2024-01-01/assets/images/${dataset}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  )

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.statusText}`)
  }

  const data = await res.json()
  return {
    _id: data.document._id,
    url: data.document.url,
  }
}

/**
 * Get image dimensions from a File
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
      URL.revokeObjectURL(url)
    }
    img.onerror = reject
    img.src = url
  })
}
