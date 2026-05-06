/**
 * Sanity Plugin: Auto-compressing image input
 * 
 * To use this in sanity.config.ts, add it to the schemaTypes 
 * as a custom input component, or use the imageUpload utility
 * in your own upload forms.
 * 
 * This plugin hooks into Sanity's file input to compress before upload.
 */

'use client'
import { useState, useCallback } from 'react'
import { compressImage } from '@/lib/imageUpload'

interface ImageUploaderProps {
  onUpload: (file: File) => void
  accept?: string
  label?: string
}

export function CompressedImageUploader({
  onUpload,
  accept = 'image/*',
  label = 'Upload Image',
}: ImageUploaderProps) {
  const [status, setStatus] = useState<'idle' | 'compressing' | 'done'>('idle')
  const [info, setInfo] = useState<string>('')

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      setStatus('compressing')
      setInfo(`Original: ${(file.size / 1024 / 1024).toFixed(2)}MB`)

      const compressed = await compressImage(file)
      setInfo(`${(file.size / 1024 / 1024).toFixed(2)}MB → ${(compressed.size / 1024 / 1024).toFixed(2)}MB ✓`)
      setStatus('done')
      onUpload(compressed)
    },
    [onUpload]
  )

  return (
    <div className="border-2 border-dashed border-gold-500/30 p-6 text-center rounded-sm">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id="compressed-upload"
      />
      <label
        htmlFor="compressed-upload"
        className="cursor-pointer flex flex-col items-center gap-3"
      >
        <div className="w-12 h-12 border border-gold-500/50 flex items-center justify-center">
          <span className="text-2xl">📸</span>
        </div>
        <span className="text-sm font-medium text-gold-500">{label}</span>
        <span className="text-xs text-gray-500">Auto-compressed to max 1MB, 1920px</span>
      </label>

      {status === 'compressing' && (
        <p className="mt-3 text-xs text-amber-500 animate-pulse">Compressing...</p>
      )}
      {status === 'done' && (
        <p className="mt-3 text-xs text-emerald-500">{info}</p>
      )}
    </div>
  )
}
