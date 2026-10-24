'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import MediaGallery from '@/components/MediaGallery'
import { setMeta } from '@/lib/meta'
import { useI18n } from '@/lib/useI18n'

type TabletsPageTranslations = {
  kicker: string
  title: string
  subtitle: string
  description: string
  highlights: Record<string, { title: string; description: string }>
  comparison_intro: string
  comparison_headers: {
    parameter: string
    own: string
    pharmacy: string
  }
  comparison_rows: Array<{
    label: string
    own: string
    pharmacy: string
  }>
  sections: {
    dosage: {
      title: string
      paragraphs: string[]
    }
    pricing: {
      title: string
      note: string
      labels: {
        regular_price: string
        partner_price: string
        savings: string
      }
      items: Array<{
        label: string
        regular_price: string
        partner_price: string
        savings: string
        discount: string
      }>
    }
    bioavailability: {
      title: string
      paragraphs: string[]
    }
    taste: {
      title: string
      paragraphs: string[]
    }
    safety: {
      title: string
      paragraphs: string[]
    }
  }
  cta_title: string
  cta_description: string
  cta_button: string
}

const tabletGallery = [
  { src: '/img/tblt2.jpg', type: 'image' as const, alt: 'Tablet close-up' },
  {
    src: '/img/tblt1.jpg',
    type: 'image' as const,
    alt: 'Tablet brochure',
  },
  { src: '/img/tbltv1.mp4', type: 'video' as const, alt: 'Tablet video' },
]

export default function TabletsPage() {
  const { t } = useI18n()

  useEffect(() => {
    setMeta('tablets')
  }, [])

  const page = t('tablets.page', { returnObjects: true }) as TabletsPageTranslations

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
          <Image src="/img/gallery/1/0.jpg" alt={page.title} width={1600} height={1200} className="showcase-hero-image" />
        </div>
      </section>

      <section className="showcase-overview">
        <article className="tablets-card">
          <h2>{page.sections.pricing.title}</h2>
          {page.sections.pricing.note ? <p>{page.sections.pricing.note}</p> : null}
          <div className="pricing-grid">
            {page.sections.pricing.items.map((item) => (
              <article key={item.label} className="pricing-card">
                <h3>{item.label}</h3>
                <p><strong>{page.sections.pricing.labels.regular_price}:</strong> {item.regular_price}</p>
                <p><strong>{page.sections.pricing.labels.partner_price}:</strong> {item.partner_price}</p>
                <p><strong>{page.sections.pricing.labels.savings}:</strong> {item.savings}</p>
                <div className="pricing-discount">{item.discount}</div>
              </article>
            ))}
          </div>
        </article>
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

      <section className="showcase-gallery-section">
        <div className="showcase-section-head">
          <span className="section-kicker">{page.kicker}</span>
          <h2>{page.comparison_intro}</h2>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{page.comparison_headers.parameter}</th>
                <th>{page.comparison_headers.own}</th>
                <th>{page.comparison_headers.pharmacy}</th>
              </tr>
            </thead>
            <tbody>
              {page.comparison_rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.own}</td>
                  <td>{row.pharmacy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="showcase-gallery-section">
        <div className="showcase-section-head">
          <span className="section-kicker">{page.kicker}</span>
          <h2>{page.sections.dosage.title}</h2>
        </div>
        <MediaGallery items={tabletGallery} />
        <div className="showcase-section-head">
          {page.sections.dosage.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="showcase-gallery-section">
        <div className="tablets-grid">
          {(['bioavailability', 'taste', 'safety'] as const).map((key) => {
            const section = page.sections[key]

            return (
            <article key={section.title} className="tablets-card">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
            )
          })}
        </div>
      </section>

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
