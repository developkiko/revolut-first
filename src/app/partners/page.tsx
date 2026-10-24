'use client'
import { useState, useEffect, FormEvent } from 'react'
import usersData from '@/../users.json'
import Link from 'next/link'
import Image from 'next/image'
import { User } from '@/types/user'

export default function PartnersPage() {
  const [nick, setNick] = useState('')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  const [logged, setLogged] = useState<User | null>(null)
  const [selected, setSelected] = useState<User | null>(null)
  const [anim, setAnim] = useState(false)

  const normalize = (u: User): User => ({
    ...u,
    referrals: Array.isArray(u.referrals) ? u.referrals : [],
    earnedFromRefs: Array.isArray(u.earnedFromRefs) ? u.earnedFromRefs : []
  })
useEffect(() => {
  const savedUser = localStorage.getItem('partnerUser')
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser)
      const found = (usersData as User[]).find(u => u.id === user.id)
      if (found && found.password === user.password) {
        const normalized = normalize(found)
        setTimeout(() => {
          setLogged(normalized)
          setSelected(normalized)
        }, 0)
      } else {
        localStorage.removeItem('partnerUser')
      }
    } catch {
      localStorage.removeItem('partnerUser')
    }
  }
}, [])


  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const u = (usersData as User[]).find(x =>
      x.nick.trim().toLowerCase() === nick.trim().toLowerCase()
    )
    if (!u) {
      setError('Неверный логин')
      return
    }
    if (u.password !== pwd) {
      setError('Неверный пароль')
      return
    }
    const n = normalize(u)
    setLogged(n)
    setSelected(n)
    localStorage.setItem('partnerUser', JSON.stringify({ id: u.id, password: u.password }))
  }

  const openUser = (id: string) => {
    const u = (usersData as User[]).find(x => x.id === id)
    if (!u) return
    setAnim(true)
    setTimeout(() => {
      setSelected(normalize(u))
      setAnim(false)
    }, 260)
  }

  const goHome = () => {
    if (logged) {
      setAnim(true)
      setTimeout(() => {
        setSelected(logged)
        setAnim(false)
      }, 260)
    }
  }

  const handleLogout = () => {
    setLogged(null)
    setSelected(null)
    localStorage.removeItem('partnerUser')
  }

  if (!logged) return (
    <div className="contacts-page feedback max-w-md mx-auto">
      <form onSubmit={handleLogin} className="space-y-4 bg-muted rounded-3xl p-6 sm:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-2">Вход партнёра</h2>

        <div className="flex flex-row items-center p-4 bg-bg rounded-xl border border-border hover:border-accent def-transit shadow-sm flex-wrap content-center">
          <label className="block text-sm font-medium text-fg mb-2 w-full">Логин *</label>
          <input
            type="text"
            value={nick}
            onChange={e => setNick(e.target.value)}
            required
            minLength={3}
            placeholder="Введите ник"
            className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-fg placeholder:text-fg/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
          />
        </div>

        <div className="flex flex-row items-center p-4 bg-bg rounded-xl border border-border hover:border-accent def-transit shadow-sm flex-wrap content-center">
          <label className="block text-sm font-medium text-fg mb-2 w-full">Пароль *</label>
          <input
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            required
            minLength={4}
            placeholder="Введите пароль"
            className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-fg placeholder:text-fg/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
          />
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <button
          type="submit"
          className="mt-4 w-full py-3 focus:ring-2 rounded-xl font-semibold items-center flex justify-center gap-2 focus:outline-none focus:ring-accent/20 transition-colors px-4 bg-accent hover:bg-accent/90 text-bg"
        >
          Войти
        </button>
      </form>
    </div>
  )

  const current = selected
  if (!current) return null

  const children = (usersData as User[]).filter(u =>
    (current.referrals || []).includes(u.id)
  )
  const isAtRoot = current.id === logged.id

  return (
    <div className="partners-page">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-fg">Партнёрская сеть</h1>
          {!isAtRoot && (
            <button
              onClick={goHome}
              className="text-accent hover:text-accent-hover hover:bg-muted px-4 py-2 rounded-lg transition-colors"
            >
              ← Назад к себе
            </button>
          )}
        </div>

        <div className={`diagram-wrapper relative mb-12 ${anim ? 'scale-out' : 'scale-in'}`}>
          <div className="diagram-bg" />
          <svg className="diagram w-full mx-auto" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
            <g className="diagram-node cursor-pointer">
              <defs>
                <clipPath id="mainAvatar">
                  <circle cx="300" cy="120" r="56"/>
                </clipPath>
              </defs>
              <circle className="node-circle" cx="300" cy="120" r="56"/>
              {current.avatarUrl && (
                <image
                  href={current.avatarUrl}
                  x="244"
                  y="64"
                  width="112"
                  height="112"
                  clipPath="url(#mainAvatar)"
                  preserveAspectRatio="xMidYMid slice"
                />
              )}
              <text x="300" y="200" textAnchor="middle" className="text-sm font-semibold fill-fg">{current.nick}</text>
            </g>

            {children.map((r, idx) => {
              const gap = (idx - (children.length - 1) / 2) * 110
              const x = 300 + gap
              const y = 260
              return (
                <g key={r.id} onClick={() => openUser(r.id)} className="diagram-node cursor-pointer">
                  <defs>
                    <clipPath id={`c_${r.id}`}>
                      <circle cx={x} cy={y} r="40"/>
                    </clipPath>
                  </defs>
                  <line x1="300" y1="176" x2={x} y2={y - 40} className="diagram-line"/>
                  <circle className="node-circle" cx={x} cy={y} r="40"/>
                  {r.avatarUrl && (
                    <image
                      href={r.avatarUrl}
                      x={x - 40}
                      y={y - 40}
                      width="80"
                      height="80"
                      clipPath={`url(#c_${r.id})`}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  )}
                  <text x={x} y={y + 50} textAnchor="middle" className="text-xs fill-fg/80">{r.nick}</text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="space-y-4 bg-muted rounded-3xl p-6 sm:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h2 className="text-xl font-bold text-fg mb-2">
                {current.fullName}
                {current.nameType?.enabled && current.nameType.variant === 'Vip' && (
                  <span className="ml-2 px-2 py-1 text-xs bg-yellow-400 text-bg rounded-full">VIP</span>
                )}
              </h2>
              <div className="text-sm text-fg/80 space-y-1">
                <div>ID: {current.id}</div>
                <div>Зарегистрирован: {current.registeredAt}</div>
                <div>Рефералов: {(current.referrals || []).length}</div>
                {current.invitedBy && (
                  <div>
                    Пригласил:{' '}
                    <button
                      onClick={() => openUser(current.invitedBy!)}
                      className="text-accent hover:text-accent-hover underline"
                    >
                      {current.invitedBy}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/partners/user/${current.id}`}
                className="px-4 py-2 bg-accent hover:bg-accent/90 text-bg font-medium rounded-xl transition-colors"
              >
                Личный кабинет
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-border hover:bg-bg text-fg font-medium rounded-xl transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>

          {children.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border/40">
              <h3 className="text-lg font-semibold text-fg mb-4">Мои рефералы</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {children.map(r => (
                  <div key={r.id} onClick={() => openUser(r.id)} className="cursor-pointer p-4 bg-bg hover:bg-bg/80 rounded-xl border border-border hover:border-accent def-transit text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-border">
                      <Image src={r.avatarUrl} alt={r.nick} width={64} height={64} className="w-full h-full object-cover"/>
                    </div>
                    <div className="font-medium text-fg">{r.nick}</div>
                    <div className="text-xs text-fg/60 mt-1">ID: {r.id}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
