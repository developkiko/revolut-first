'use client'

import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LocaleInitializer from '@/components/LocaleInitializer'
import Target from '@/components/Target'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LocaleInitializer />
      <Header />
      <Target>{children}</Target>
      <Footer />
    </>
  )
}
