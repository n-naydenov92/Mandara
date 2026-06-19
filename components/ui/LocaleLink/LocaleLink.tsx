import Link from 'next/link'
import type { ComponentProps } from 'react'
import { buildLocalePath } from '@/lib/routing/paths'
import type { Locale } from '@/lib/i18n/settings'

interface LocaleLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  lng: Locale
  href: string
}

export function LocaleLink({ lng, href, ...props }: LocaleLinkProps) {
  return <Link href={buildLocalePath(lng, href)} {...props} />
}
