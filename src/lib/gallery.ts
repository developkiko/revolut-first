import { readdirSync } from 'node:fs'
import path from 'node:path'

export type GalleryItem = {
  src: string
  type: 'image' | 'video'
  alt: string
  caption?: string
}

type GalleryOptions = {
  exclude?: string[]
}

const GALLERY_ROOT = path.join(process.cwd(), 'public', 'img', 'gallery')

function getMediaType(fileName: string): GalleryItem['type'] {
  const ext = path.extname(fileName).toLowerCase()
  return ext === '.mp4' || ext === '.mov' || ext === '.webm' ? 'video' : 'image'
}

function sortByNumericName(a: string, b: string) {
  const aType = getMediaType(a)
  const bType = getMediaType(b)

  if (aType !== bType) {
    return aType === 'image' ? -1 : 1
  }

  const aNumber = Number.parseInt(path.parse(a).name, 10)
  const bNumber = Number.parseInt(path.parse(b).name, 10)

  if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  }

  return aNumber - bNumber
}

export function getGalleryItems(folderName: string, label: string, options?: GalleryOptions): GalleryItem[] {
  const folderPath = path.join(GALLERY_ROOT, folderName)
  const exclude = new Set(options?.exclude ?? [])
  const files = readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => !(folderName === '1' && (fileName === '10.jpg' || fileName === '11.jpg')))
    .filter((fileName) => !exclude.has(fileName))
    .sort(sortByNumericName)

  return files.map((fileName, index) => ({
    src: `/img/gallery/${folderName}/${fileName}`,
    type: getMediaType(fileName),
    alt: `${label} ${index + 1}`,
  }))
}
