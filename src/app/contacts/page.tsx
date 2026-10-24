'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { useI18n } from '@/lib/useI18n'
import { setMeta } from '@/lib/meta'
import InquiryForm from '@/components/InquiryForm'

export default function Contacts() {
  const { t } = useI18n()

  useEffect(() => {
    setMeta('contacts')
  }, [])

  return (
    <>
      <section className="feedback">
        <div className="contact-cards">
          <h2>{t('contacts.page.contact_info')}</h2>
          <div className="cards-wrap">
            <div>
              <Phone />
              <p>{t('contacts.page.phone')}</p>
              <Link href="tel:+491759590916">+49 175 9590916 RU</Link>
            </div>
            <div>
              <Phone />
              <p>{t('contacts.page.phone')}</p>
              <Link href="tel:+491627997737">+49 162 7997737 DE</Link>
            </div>
          </div>
        </div>
        <InquiryForm title={t('contacts.page.form_title')} />
      </section>
    </>
  )
}
