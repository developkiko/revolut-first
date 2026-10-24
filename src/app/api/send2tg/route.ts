import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  try {
    const data = await req.json();const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');const escapedMessage = escapeHtml(data.message || '-');const pageUrl = escapeHtml(data.pageUrl || '-')
    const text = `📝 Новое сообщение с <a href='${pageUrl}'><b><u>сайта</u></b></a>:\n👤 <b>Имя:</b> ${data.name}\n✈️ <b>Телеграм:</b> ${data.telegram || '-'}\n📞 <b>Телефон:</b> ${data.phone}\n💬 <b>Сообщение:</b>\n<blockquote expandable>${escapedMessage}</blockquote>`
    const r = await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({chat_id: process.env.TG_CHAT_ID, text, parse_mode: 'HTML',}),});return NextResponse.json({ ok: r.ok }, { status: r.ok ? 200 : 500 })
  } catch (e: unknown) {const error = e instanceof Error ? e.message : String(e);return NextResponse.json({ error }, { status: 500 })}
}