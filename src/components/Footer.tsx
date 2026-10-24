'use client'
import Link from 'next/link';import Image from 'next/image';import {useI18n} from '@/lib/useI18n'
export default function Footer() {
  const {t} = useI18n();const pays = ['visa','mastercard','amex','paypal']
  return <footer><div className='wrap'>
    <p>{t('footer.copy')}</p><nav><Link href='/signup'>{t('footer.nav.reg')}</Link><Link href='/about'>{t('footer.nav.about')}</Link><Link href='/contacts'>{t('footer.nav.contacts')}</Link></nav>
    <div className='payments'><p>{t('footer.text')}</p><div className='logos'>{pays.map(p => <Image key={p} src={`/img/pay/${p}.svg`} alt={p} width={100} height={60} className='h-6 w-auto'/>)}</div></div>
  </div></footer>
}