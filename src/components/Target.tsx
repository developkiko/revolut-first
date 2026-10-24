'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
export default function Target({children}:{children:React.ReactNode}) {
  const pathname = usePathname()
  const targetUrl = pathname === '/' ? 'home' : pathname.split('/')[1]
  return <main className={`${targetUrl}-page`}>{children}</main>
}
export function useTargetUrl() {
  const pathname = usePathname()
  return pathname === '/' ? 'home' : pathname.split('/')[1]
}