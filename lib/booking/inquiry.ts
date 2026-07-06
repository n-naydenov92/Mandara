// Изпращане на запитване — клиентска граница към Formspree.
// senior-architect: сменяемо (Resend/Smoobu по-късно) без промяна по формата.
// Formspree form id-то не е тайна → ползваме публичен NEXT_PUBLIC_FORMSPREE_ID.

import type { InquiryInput, InquiryResult } from '@/lib/booking/bookingGateway'

const PLACEHOLDER = '__TBD__'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f'
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID

function isConfigured(value: string | undefined): value is string {
  return Boolean(value) && value !== PLACEHOLDER
}

export function isInquiryConfigured(): boolean {
  return isConfigured(FORMSPREE_ID)
}

export async function submitInquiry(input: InquiryInput): Promise<InquiryResult> {
  if (!isConfigured(FORMSPREE_ID)) {
    return { ok: false, error: 'not-configured' }
  }

  try {
    const response = await fetch(`${FORMSPREE_ENDPOINT}/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(input),
    })
    return response.ok ? { ok: true } : { ok: false, error: 'request-failed' }
  } catch {
    return { ok: false, error: 'network' }
  }
}
