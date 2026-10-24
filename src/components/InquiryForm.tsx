'use client'

import React, { useState } from 'react'
import Input from 'react-phone-number-input/input'
import { useI18n } from '@/lib/useI18n'
import { LoaderCircle, MailCheck, MailWarning, Send } from 'lucide-react'

type FormStatus = 'normal' | 'sending' | 'sent' | 'error'

export default function InquiryForm({ title, className = '' }: { title: string; className?: string }) {
  const { t } = useI18n()
  const [phone, setPhone] = useState('')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [telegram, setTelegram] = useState('')
  const [status, setStatus] = useState<FormStatus>('normal')
  const [formData, setFormData] = useState({ name: '', message: '' })

  const handlePhoneChange = (value?: string) => {
    const nextValue = value || ''
    setPhone(nextValue)
    setIsPhoneValid(nextValue.replace(/\D/g, '').length >= 10)
  }

  const handleTelegramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    if (value && !value.startsWith('@')) value = `@${value.replace(/^@+/, '')}`
    setTelegram(value.replace(/[^@a-zA-Z0-9_]/g, ''))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === 'sent' || status === 'error') setStatus('normal')
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isPhoneValid) return

    setStatus('sending')

    try {
      const response = await fetch('/api/send2tg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone, telegram, pageUrl: window.location.href }),
      })

      if (response.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const buttonClassName =
    status === 'sending'
      ? 'bg-accent/70 cursor-not-allowed animate-pulse'
      : status === 'sent'
        ? 'bg-green-600 hover:bg-green-700'
        : status === 'error'
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-accent hover:bg-accent/90'

  return (
    <form
      onSubmit={handleSubmit}
      className={`inquiry-form space-y-4 bg-muted rounded-3xl p-6 sm:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`.trim()}
    >
      <h2>{title}</h2>
      <div className="inquiry-form-field">
        <label>{t('contacts.page.form.name')} *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={3}
          placeholder={t('contacts.page.form.name_placeholder')}
          className="inquiry-form-control"
        />
      </div>
      <div className="inquiry-form-field">
        <label>{t('contacts.page.form.phone')} *</label>
        <Input
          value={phone}
          onChange={handlePhoneChange}
          name="phone"
          placeholder="+49 151 ..."
          required
          className={`PhoneInputInput inquiry-form-control ${phone && !isPhoneValid ? 'border-red-500 bg-red-50 text-bg' : ''}`}
        />
      </div>
      <div className="inquiry-form-field">
        <label>{t('contacts.page.form.telegram')} *</label>
        <input
          type="text"
          name="telegram"
          value={telegram}
          onChange={handleTelegramChange}
          required
          minLength={5}
          placeholder="@username"
          className="inquiry-form-control"
        />
      </div>
      <div className="inquiry-form-field">
        <label>{t('contacts.page.form.message')}</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder={t('contacts.page.form.message_placeholder')}
          className="inquiry-form-control"
        />
      </div>
      <button
        type="submit"
        className={`inquiry-form-submit ${buttonClassName}`}
        disabled={status === 'sending' || (!!phone && !isPhoneValid)}
      >
        {status === 'sending' ? (
          <>
            <LoaderCircle className="animate-spin" /> {t('contacts.page.form.submit_sending')}
          </>
        ) : status === 'sent' ? (
          <>
            <MailCheck /> {t('contacts.page.form.submit_sent')}
          </>
        ) : status === 'error' ? (
          <>
            <MailWarning /> {t('contacts.page.form.submit_error')}
          </>
        ) : (
          <>
            <Send /> {t('contacts.page.form.submit')}
          </>
        )}
      </button>
    </form>
  )
}
