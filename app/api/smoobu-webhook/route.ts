import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { AVAILABILITY_TAG } from '@/lib/booking/smoobu'

// Smoobu вика този URL при нова/одобрена резервация → наличността се опреснява веднага.
// Конфигурирай webhook-а в Smoobu с ?secret=<SMOOBU_REVALIDATE_WEBHOOK_SECRET>.
const PLACEHOLDER = '__TBD__'
const SECRET = process.env.SMOOBU_REVALIDATE_WEBHOOK_SECRET

export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret')
  if (!SECRET || SECRET === PLACEHOLDER || secret !== SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // Next 16 иска втори аргумент (cache life). expire: 0 → незабавно остаряване на тага.
  revalidateTag(AVAILABILITY_TAG, { expire: 0 })
  return NextResponse.json({ revalidated: true })
}
