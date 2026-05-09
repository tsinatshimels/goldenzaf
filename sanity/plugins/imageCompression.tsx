'use client'

import { useCallback, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { definePlugin } from 'sanity'
import type { AssetFromSource, AssetSource, AssetSourceComponentProps } from '@sanity/types'
import { Button, Card, Dialog, Flex, Stack, Text } from '@sanity/ui'
import { compressImage } from '@/lib/imageUpload'

function formatMb(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function toWebpFilename(file: File) {
  const base = file.name.replace(/\.[^.]+$/, '')
  return `${base}.webp`
}

function normalizeCompressedFile(original: File, compressed: File) {
  const nextName =
    compressed.type === 'image/webp' ? toWebpFilename(original) : compressed.name || original.name

  return new File([compressed], nextName, {
    type: compressed.type || original.type,
    lastModified: Date.now(),
  })
}

function buildAssetFromFile(file: File): AssetFromSource {
  return {
    kind: 'file',
    value: file as AssetFromSource['value'],
    assetDocumentProps: {
      originalFilename: file.name,
      source: {
        name: 'goldenzaf-compressed-upload',
        id: `${file.name}-${file.size}-${file.lastModified}`,
      },
      description: 'Compressed before upload in Sanity Studio',
    },
  }
}

function CompressedImageSource(props: AssetSourceComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [status, setStatus] = useState<'idle' | 'compressing' | 'error'>('idle')
  const [message, setMessage] = useState('Choose images to compress before they are stored.')
  const selectionType = (props as AssetSourceComponentProps & { selectionType?: string })
    .selectionType
  const allowMultiple = selectionType === 'multiple'

  const header = useMemo(
    () => (allowMultiple ? 'Compressed Uploads' : 'Compressed Upload'),
    [allowMultiple],
  )

  const handleClose = useCallback(() => {
    props.onClose()
  }, [props])

  const openPicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || [])
      if (files.length === 0) return
      let completed = false

      setStatus('compressing')
      setMessage(
        files.length === 1 ? `Compressing ${files[0].name}...` : `Compressing ${files.length} images...`,
      )

      try {
        const compressedFiles = await Promise.all(
          files.map(async (file) => normalizeCompressedFile(file, await compressImage(file))),
        )

        const originalTotal = files.reduce((sum, file) => sum + file.size, 0)
        const compressedTotal = compressedFiles.reduce((sum, file) => sum + file.size, 0)

        setMessage(`${formatMb(originalTotal)} -> ${formatMb(compressedTotal)} ready to upload`)
        completed = true
        props.onSelect(compressedFiles.map((file) => buildAssetFromFile(file)))
        props.onClose()
      } catch (error) {
        console.error('Compressed upload failed', error)
        setStatus('error')
        setMessage('Compression failed. Please try again with a smaller image.')
      } finally {
        event.target.value = ''
        if (completed) {
          setStatus('idle')
        }
      }
    },
    [props],
  )

  return (
    <Dialog header={header} id="compressed-image-upload" onClose={handleClose} open width={2}>
      <Card padding={4}>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={2} weight="semibold">
              Save Sanity storage
            </Text>
            <Text muted size={1}>
              This uploader shrinks large images before Sanity stores them.
            </Text>
            <Text muted size={1}>
              Target: around 1 MB max and 1920 px max width or height.
            </Text>
          </Stack>

          <input
            accept={props.accept || 'image/*'}
            multiple={allowMultiple}
            onChange={handleFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
            type="file"
          />

          <Flex gap={3}>
            <Button
              disabled={status === 'compressing'}
              mode="default"
              onClick={openPicker}
              text={allowMultiple ? 'Choose images' : 'Choose image'}
              tone="primary"
            />
            <Button
              disabled={status === 'compressing'}
              mode="ghost"
              onClick={handleClose}
              text="Cancel"
            />
          </Flex>

          <Card padding={3} radius={2} tone={status === 'error' ? 'critical' : 'transparent'}>
            <Text size={1}>{message}</Text>
          </Card>

          <Text muted size={1}>
            Tip: use this upload source for new files. The regular Browse option can still select images that are already in the library.
          </Text>
        </Stack>
      </Card>
    </Dialog>
  )
}

const compressedImageAssetSource: AssetSource = {
  name: 'compressed-upload',
  title: 'Compressed Upload (Recommended)',
  component: CompressedImageSource,
}

export const imageCompressionPlugin = definePlugin({
  name: 'image-compression-plugin',
  form: {
    image: {
      assetSources: (prev) => [compressedImageAssetSource, ...prev],
      directUploads: true,
    },
  },
})
