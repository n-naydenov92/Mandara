import { NextResponse } from 'next/server'
import { getAvailability } from '@/lib/booking/smoobu'
import { isUnit } from '@/lib/booking/smoobuUnits'

// Единствената точка, която клиентският календар вика. Тайният ключ остава сървърно.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const unit = searchParams.get('unit') ?? ''
  const from = searchParams.get('from') ?? ''
  const to = searchParams.get('to') ?? ''

  if (!isUnit(unit) || !ISO_DATE.test(from) || !ISO_DATE.test(to)) {
    return NextResponse.json({ error: 'invalid-params' }, { status: 400 })
  }

  try {
    const result = await getAvailability(unit, from, to)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'upstream' }, { status: 502 })
  }
}
