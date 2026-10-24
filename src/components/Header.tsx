'use client'
import React,{useEffect,useState}from'react';import Link from'next/link';import {loadLocale,setLang}from'@/lib/i18n';import {useI18n}from'@/lib/useI18n';import {useTargetUrl}from'@/components/Target'
export default function Header(){
  const {t,lang}=useI18n();const [menuOpen,setMenuOpen]=useState(false);const targetUrl=useTargetUrl();useEffect(()=>{loadLocale(lang).then()},[lang])
  const switchLang=async()=>{const n=lang==='ru'?'en':'ru';setLang(n);await loadLocale(n)};const handleLinkClick=()=>setMenuOpen(false);
  const menuTitle=`${t(`header.menu-sw.${menuOpen?'open':'close'}`)} ${t('header.menu-sw.end')}`
  return<header data-menu-open={menuOpen}>
    <div className='wrap'>
      <Link href='/' className='logo'><div className="logo-wrap"><div className="bg">Revolut<b>TIME</b></div><div className="fg">Revolut<b>TIME</b></div></div></Link>
      <nav><Link href='/' onClick={handleLinkClick} className={targetUrl==='home'?'active':''}>{t('header.nav.home')}</Link><Link href='/about' onClick={handleLinkClick} className={targetUrl==='about'?'active':''}>{t('header.nav.about')}</Link><Link href='/contacts' onClick={handleLinkClick} className={targetUrl==='contacts'?'active':''}>{t('header.nav.contacts')}</Link></nav>
      <aside>
        <button onClick={()=>setMenuOpen(!menuOpen)} className='menu-sw' title={menuTitle}>{menuOpen?'✖':'☰'}</button>
        <button onClick={switchLang} className='lang-sw' title={`${t('header.lang-sw')}: ${lang==='ru'?'EN':'RU'}`}>{lang==='ru'?'EN':'RU'}</button>
      </aside>
    </div>
  </header>
}