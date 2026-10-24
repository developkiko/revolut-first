'use client'
import { useEffect } from 'react'
import { initLocale } from '@/lib/i18n'
export default function LocaleInitializer() {
  useEffect(() => {initLocale()}, [])
  return null
}