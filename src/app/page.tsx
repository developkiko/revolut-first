'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/useI18n'
import { setMeta } from '@/lib/meta'
import InquiryForm from '@/components/InquiryForm'

const blockLinks: Record<string, string> = {
  clinic: 'https://hidrogen-hho.vercel.app/',
  referral: '/partners',
  travel: '/sports-tourism',
  startup: '/medical-tourism',
  investment: '/tablets',
}

const blockImages: Record<string, string> = {
  clinic: '/img/hydrogen-clinic.jpg',
  referral: '/img/membership.gif',
  startup: '/img/gallery/1/22.jpg',
  investment: '/img/medical.jpg',
  travel: '/img/sports-track.jpg',
}

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

function BlockCard({
  title,
  description,
  cta,
  image,
  href,
}: {
  title: string
  description: string
  cta: string
  image: string
  href: string
}) {
  const external = isExternalHref(href)

  return (
    <Link className="block-card group" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      <div className="block-card-image">
        <Image src={image} alt={title} width={720} height={480} className="image" />
        <div className="image-overlay" />
      </div>
      <div className="block-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="cta">
          {cta} <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}

export default function Home() {
  const { t } = useI18n()

  useEffect(() => {
    setMeta('home')
  }, [])

  const blocks = t('home.blocks', { returnObjects: true }) as Record<
    string,
    { title: string; description: string; cta: string }
  >
  const presentationItems = t('home.presentation.items', { returnObjects: true }) as Record<
    string,
    { title: string; description: string }
  >
  const join = t('home.join', { returnObjects: true }) as {
    title: string
    subtitle: string
    body?: string[]
    form_title: string
  }
  const orderedBlockKeys = ['clinic', 'investment', 'startup', 'travel', 'referral'] as const

  return (
    <>
      <section className="hero home-hero-i">
        <div className="logo-wrap">
          <div className="bg">
            Revolut<b>TIME</b>
          </div>
          <h1 className="fg">
            Revolut<b>TIME</b>
          </h1>
        </div>
        <p>{t('home.meta.descr')}</p>
        <Link href="/#advent" className="button-to-bot">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </section>

      <section className="advent" id="advent">
        <div className="advent-wrap">
          <span className="section-kicker">{t('home.meta.descr')}</span>
          <h2>{t('home.page.heading')}</h2>
          <p>{t('home.page.subheading')}</p>
          <Link className="button" href="/form">
            {t('home.page.cta')}
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="eco-block">
        <div className="eco-wrap">
          <div className="block-wrapper">
            <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-fg">{t('home.hero.headline')}</h2>
            <p className="mt-6 text-lg text-fg/80 max-w-3xl">{t('home.hero.subheadline')}</p>
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {orderedBlockKeys.map((key) => (
                <BlockCard key={key} {...blocks[key]} image={blockImages[key]} href={blockLinks[key]} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="presentation-section">
        <div className="presentation-shell">
          <span className="section-kicker">{t('home.presentation.subtitle')}</span>
          <h2>{t('home.presentation.title')}</h2>
          <div className="presentation-grid">
            {Object.entries(presentationItems).map(([key, item]) => (
              <article key={key} className="presentation-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="join-section">
        <div className="join-shell">
          <div className="join-copy">
            <span className="section-kicker">{t('home.page.cta')}</span>
            <h2>{join.title}</h2>
            <p>{join.subtitle}</p>
            {join.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <InquiryForm title={join.form_title} />
        </div>
      </section>
    </>
  )
}
