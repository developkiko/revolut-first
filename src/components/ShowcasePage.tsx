'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/useI18n'
import { setMeta } from '@/lib/meta'
import MediaGallery from '@/components/MediaGallery'
import type { GalleryItem } from '@/lib/gallery'

type ShowcaseSection = {
  key: string
  items: GalleryItem[]
}

type ShowcasePageProps = {
  pageKey: string
  heroImage: string
  sections: ShowcaseSection[]
}

type ShowcaseTranslations = {
  kicker: string
  title: string
  subtitle: string
  description: string
  highlights: Record<string, { title: string; description: string }>
  cta_title: string
  cta_description: string
  cta_button: string
  sections: Record<string, { title: string; description: string; paragraphs?: string[] }>
}

export default function ShowcasePage({ pageKey, heroImage, sections }: ShowcasePageProps) {
  const { t } = useI18n()

  useEffect(() => {
    setMeta(pageKey)
  }, [pageKey])

  const page = t(`${pageKey}.page`, { returnObjects: true }) as ShowcaseTranslations

  return (
    <>
      <section className="showcase-hero">
        <div className="showcase-hero-copy">
          <span className="section-kicker">{page.kicker}</span>
          <h1>{page.title}</h1>
          <p className="showcase-subtitle">{page.subtitle}</p>
          <p>{page.description}</p>
        </div>
        <div className="showcase-hero-visual">
          <Image src={heroImage} alt={page.title} width={1600} height={1200} className="showcase-hero-image" />
        </div>
      </section>

      <section className="showcase-overview">
        <div className="showcase-highlights">
          {Object.values(page.highlights).map((item) => (
            <article key={item.title} className="showcase-highlight-card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {sections.map((section) => {
        const sectionCopy = page.sections[section.key]

        return (
          <section key={section.key} className="showcase-gallery-section">
            <div className="showcase-section-head">
              <span className="section-kicker">{page.kicker}</span>
              <h2>{sectionCopy.title}</h2>
              <p>{sectionCopy.description}</p>
              {sectionCopy.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <MediaGallery items={section.items} />
          </section>
        )
      })}

      <section className="showcase-cta">
        <div className="showcase-cta-card">
          <h2>{page.cta_title}</h2>
          <p>{page.cta_description}</p>
          <Link href="/form" className="button">
            {page.cta_button}
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
