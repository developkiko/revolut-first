'use client'
import React, {useEffect} from 'react'
import {useI18n} from '@/lib/useI18n'
import {setMeta} from '@/lib/meta'
import {Heart, Building, Zap, Rocket, TrendingUp} from 'lucide-react'
export default function About() {
    const {t} = useI18n()
    useEffect(() => {setMeta('about')}, [])
    return <>
        <section className="hero"><h1>{t('about.meta.title')}</h1><p>{t('about.meta.descr')}</p></section>
        <section className="mission-section">
            <h2>{t('about.page.mission.title')}</h2>
            <div className="mission-grid">
                <div className="mission-card">
                    <div className='icon-block-classes'><Heart className='icon-classes'/></div>
                    <h3>{t('about.page.mission.health.title')}</h3>
                    <p>{t('about.page.mission.health.desc')}</p>
                </div>
                <div className="mission-card">
                    <div className='icon-block-classes'><TrendingUp className='icon-classes'/></div>
                    <h3>{t('about.page.mission.finance.title')}</h3>
                    <p>{t('about.page.mission.finance.desc')}</p>
                </div>
                <div className="mission-card">
                    <div className='icon-block-classes'><Rocket className='icon-classes'/></div>
                    <h3>{t('about.page.mission.innovation.title')}</h3>
                    <p>{t('about.page.mission.innovation.desc')}</p>
                </div>
            </div>
        </section>

        <section className="why-us-section">
            <h2>{t('about.page.structure.title')}</h2>
            <div className="why-us-card">
                <ul>
                    <li><span>A</span><div><strong>{t('about.page.structure.level_a')}</strong><br/>{t('about.page.structure.level_a_desc')}</div></li>
                    <li><span>B</span><div><strong>{t('about.page.structure.level_b')}</strong><br/>{t('about.page.structure.level_b_desc')}</div></li>
                    <li><span>C</span><div><strong>{t('about.page.structure.level_c')}</strong><br/>{t('about.page.structure.level_c_desc')}</div></li>
                    <li><span>D</span><div><strong>{t('about.page.structure.level_d')}</strong><br/>{t('about.page.structure.level_d_desc')}</div></li>
                </ul>
            </div>
        </section>

        <section className="vacancies-section">
            <h2>{t('about.page.opportunities')}</h2>
            <div className="vacant-wrap">
                <div className="vacancy-card">
                    <div className='icon-block-classes'><Zap className='icon-classes'/></div>
                    <div className="vacancy-info">
                        <h3>{t('about.page.partner_a.title')}</h3>
                        <div className="vacancy-meta">
                            <p><span>{t('about.page.package')}:</span> {t('about.page.partner_a.package')}</p>
                            <p><span>{t('about.page.income')}:</span> {t('about.page.partner_a.income')}</p>
                            <p><span>{t('about.page.requirements')}:</span> {t('about.page.partner_a.requirements')}</p>
                        </div>
                        <ul>
                            <li>{t('about.page.partner_a.benefit1')}</li>
                            <li>{t('about.page.partner_a.benefit2')}</li>
                            <li>{t('about.page.partner_a.benefit3')}</li>
                        </ul>
                    </div>
                </div>
                <div className="vacancy-card">
                    <div className='icon-block-classes'><Building className='icon-classes'/></div>
                    <div className="vacancy-info">
                        <h3>{t('about.page.manager_b.title')}</h3>
                        <div className="vacancy-meta">
                            <p><span>{t('about.page.package')}:</span> {t('about.page.manager_b.package')}</p>
                            <p><span>{t('about.page.income')}:</span> {t('about.page.manager_b.income')}</p>
                            <p><span>{t('about.page.requirements')}:</span> {t('about.page.manager_b.requirements')}</p>
                        </div>
                        <ul>
                            <li>{t('about.page.manager_b.benefit1')}</li>
                            <li>{t('about.page.manager_b.benefit2')}</li>
                            <li>{t('about.page.manager_b.benefit3')}</li>
                            <li>{t('about.page.manager_b.benefit4')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </>
}