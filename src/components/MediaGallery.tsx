'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'
import type { GalleryItem } from '@/lib/gallery'

export default function MediaGallery({ items }: { items: GalleryItem[] }) {
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({})

  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <article key={item.src} className="media-card">
          <div className="media-frame">
            {item.type === 'image' ? (
              <Image src={item.src} alt={item.alt} width={1600} height={1200} className="media-content" />
            ) : failedVideos[item.src] ? (
              <div className="media-video-fallback">
                <div className="media-video-badge">Видео</div>
                <PlayCircle />
                <p>{item.alt}</p>
                <a href={item.src} target="_blank" rel="noreferrer">
                  Открыть файл
                </a>
              </div>
            ) : (
              <video
                src={item.src}
                className="media-content"
                controls
                playsInline
                preload="metadata"
                muted
                onError={() => setFailedVideos((current) => ({ ...current, [item.src]: true }))}
              >
                Ваш браузер не поддерживает видео.
              </video>
            )}
            {item.type === 'video' && !failedVideos[item.src] ? <div className="media-video-badge">Видео</div> : null}
          </div>
          {item.caption ? <div className="media-caption"><p>{item.caption}</p></div> : null}
        </article>
      ))}
    </div>
  )
}
