import usersData from '@/../users.json'
import Link from 'next/link'
import { User } from '@/types/user'

interface Props { params: { id: string } }

export default function UserPage({ params }: Props) {
  const user = (usersData as User[]).find(u => u.id===params.id)
  if (!user) return (
    <div className="contacts-page feedback max-w-md mx-auto">
      <div className="space-y-4 bg-muted rounded-3xl p-6 sm:p-8 border border-border shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Пользователь не найден</h2>
        <Link href="/partners" className="text-accent hover:text-accent-hover underline">Вернуться к партнёрской сети</Link>
      </div>
    </div>
  )

  const referrals = (usersData as User[]).filter(u=>user.referrals.includes(u.id))

  return (
    <div className="partners-page max-w-4xl mx-auto px-4 text-center">
      <div className="space-y-4 bg-muted rounded-3xl p-8 border border-border shadow-lg">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-bg">
          <img src={user.avatarUrl} alt={user.nick} className="w-full h-full object-cover"/>
        </div>

        <h1 className="text-3xl font-bold text-fg mb-2">
          {user.nick}
          <span className="ml-3 text-sm font-normal px-3 py-1 bg-bg text-fg/80 rounded-full">{user.status}</span>
        </h1>

        <div className="text-fg/80 mb-8">
          <div className="text-sm">ID: {user.id}</div>
          <div className="mt-2">В сети с {user.registeredAt}</div>
        </div>

        <div className="bg-bg rounded-xl p-6">
          <h3 className="text-xl font-bold text-fg mb-6">Мои рефералы ({referrals.length})</h3>
          {referrals.length>0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {referrals.map(r=>(
                <Link key={r.id} href={`/partners/user/${r.id}`} className="cursor-pointer group">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border group-hover:border-accent def-transit">
                    <img src={r.avatarUrl} alt={r.nick} className="w-full h-full object-cover"/>
                  </div>
                  <div className="mt-2 text-sm font-medium text-fg group-hover:text-accent def-transit">{r.nick}</div>
                </Link>
              ))}
            </div>
          ) : <div className="text-fg/60 py-8">Пока нет рефералов</div>}
        </div>

        <div className="mt-8 text-sm text-fg/60">
          Это публичный профиль партнёра. Хотите стать частью сети?
        </div>
      </div>
    </div>
  )
}
