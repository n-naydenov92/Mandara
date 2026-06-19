export interface InquiryInput {
  name: string
  email: string
  phone?: string
  dates?: string
  guests?: string
  message?: string
}

export type InquiryResult = { ok: true } | { ok: false; error: string }

export interface EmbedConfig {
  provider: 'smoobu' | 'none'
  src?: string
}

export interface BookingGateway {
  getEmbedConfig(): EmbedConfig
  submitInquiry(input: InquiryInput): Promise<InquiryResult>
}

const PLACEHOLDER = '__TBD__'
const SMOOBU_EMBED_ID = process.env.NEXT_PUBLIC_SMOOBU_EMBED_ID

function isConfigured(value: string | undefined): value is string {
  return Boolean(value) && value !== PLACEHOLDER
}

class PlaceholderBookingGateway implements BookingGateway {
  getEmbedConfig(): EmbedConfig {
    if (isConfigured(SMOOBU_EMBED_ID)) {
      return { provider: 'smoobu', src: `https://login.smoobu.com/booking/${SMOOBU_EMBED_ID}` }
    }
    return { provider: 'none' }
  }

  async submitInquiry(): Promise<InquiryResult> {
    return { ok: false, error: 'not-configured' }
  }
}

export const bookingGateway: BookingGateway = new PlaceholderBookingGateway()
