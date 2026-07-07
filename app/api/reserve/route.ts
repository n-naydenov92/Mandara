import { NextResponse } from 'next/server'
import { createReservation } from '@/lib/booking/smoobu'
import type { InquiryInput } from '@/lib/booking/bookingGateway'

// Създаването на резервация иска тайния SMOOBU_API_KEY → само сървър.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export async function POST(request: Request) {
  let input: InquiryInput
  try {
    input = (await request.json()) as InquiryInput
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-body' }, { status: 400 })
  }

  const valid =
    Boolean(input?.name?.trim()) &&
    Boolean(input?.email?.trim()) &&
    ISO_DATE.test(input.arrival ?? '') &&
    ISO_DATE.test(input.departure ?? '')
  if (!valid) {
    return NextResponse.json({ ok: false, error: 'invalid-input' }, { status: 400 })
  }

  const result = await createReservation(input)
  return NextResponse.json(result, { status: result.ok ? 200 : 502 })
}
