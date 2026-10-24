'use client'

import React, { useEffect } from 'react'
import InquiryForm from '@/components/InquiryForm'
import { useI18n } from '@/lib/useI18n'
import { setMeta } from '@/lib/meta'

export default function FormPage() {
  const { t } = useI18n()

  useEffect(() => {
    setMeta('form')
  }, [])

  return (
    <section className="feedback max-w-2xl mx-auto">
      <InquiryForm title={t('contacts.page.form_title')} />
    </section>
  )
}
